


import json
from datetime import datetime, timedelta
from pathlib import Path
from google import genai
import os

def load_stage1_jsonl(file_path):
    """Load stage 1 JSONL file assuming valid newline-delimited JSON objects."""
    raw = Path(file_path).read_text()
    if len(raw) == 0:
        return ""
    # Try to split between closing and opening braces only when they are flush together (e.g. }{)
    fixed_raw = raw.replace('}{', '}\n{')
    fixed = []
    buffer = ""
    brace_count = 0
    for char in fixed_raw:
        buffer += char
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
            if brace_count == 0:
                fixed.append(buffer.strip())
                buffer = ""

    data = [json.loads(entry) for entry in fixed]
    return sorted(data, key=lambda x: x["timestamp"])


def group_stage1_data(data, max_gap_min=5):
    """Group entries by mental_context and time proximity."""
    grouped = []
    current_group = [data[0]]

    for i in range(1, len(data)):
        curr, prev = data[i], data[i - 1]
        gap = datetime.fromisoformat(curr["timestamp"])- datetime.fromisoformat(prev["timestamp"])
        same_context = curr["mental_context"] == prev["mental_context"]

        if same_context and gap <= timedelta(minutes=max_gap_min):
            current_group.append(curr)
        else:
            grouped.append(current_group)
            current_group = [curr]

    grouped.append(current_group)
    return grouped


def write_stage2_json(grouped_data, output_path):
    existing_data = []
    if os.path.exists(output_path) and os.path.getsize(output_path) > 0:
        with open(output_path, "r") as f:
            existing_data = json.load(f)
    else:
        existing_data = []
    combined_data = existing_data + grouped_data
    print(combined_data)
    with open(output_path, "w") as f:
        json.dump(combined_data, f, indent=2)


def llm_group_entries(entries):
    """Send a sequence of Stage 1 entries to an LLM to group based on intent."""
    
    client = genai.Client(api_key="AIzaSyDSyIBzIJ9yVnXYd6sJaE7oZ0Vqnc4kEPM")
    
    """prompt = (
        "Below is a list of user activity logs including timestamps, summaries, and mental contexts. "
        "Group them based on user intent or task flow. If multiple tabs seem part of the same task, group them together. "
        "Return a JSON array of groups, each group being a list of these items.\n\n"
    )"""
    """prompt = You are an assistant that understands human attention.

Below is a list of user activities including timestamps, summaries, and contexts. Group them into logical task blocks based on intent, even if the mental_context varies. Include only 3–5 blocks per batch.
If it feels that the activities aren't necessarily part of the same task, then feel free to leave them in different groups, even if they have the same mental_context value.
Respond with a JSON array of grouped lists."""
    prompt = """You are a backend system that receives a list of user activities with timestamps, summaries, and mental contexts.

Group them into logical task blocks based on shared **intent**, not just mental_context. Some tasks may include multiple different mental contexts. Limit to 3–5 task groups per batch.

⛔ Do not explain. Do not include markdown.  
✅ Output only valid JSON: a list of groups, each group being a list of activity objects.

Start the output with '[' and end with ']'. Do not return anything before or after the JSON array.\n\n"""

    prompt += json.dumps(entries, indent=2)
    response = client.models.generate_content(
        model="gemini-2.5-flash-preview-04-17", contents=prompt
    )
    print(response.text)
    try:
        grouped_output = json.loads(response.text.strip().strip("```json").strip("```"))
    except Exception as e:
        with open("debug.json", 'w') as f:
            f.write(response.text.strip().strip("```json").strip("```"))
    return grouped_output


def group(input_path, output_path):
    

    stage1_data = load_stage1_jsonl(input_path)
    if stage1_data == "":
        print("No activities to group atm!")
        return
    #rule_based_groups = group_stage1_data(stage1_data)
    smart_groups = llm_group_entries(stage1_data)
    write_stage2_json(smart_groups, output_path)
    print(f"✅ Grouped {len(stage1_data)} entries into {len(smart_groups)} blocks → saved to {output_path}")

    # Optional LLM-enhanced pass (example on first 10 entries)
    # Replace with your real API key before running
    # smart_groups = llm_group_entries(stage1_data[:10], api_key="your_key_here")
    # print(json.dumps(smart_groups, indent=2))
if __name__ == "__main__":
    input_path = "data/classification.jsonl"  # replace with your path
    output_path = "data/stage2_grouped_complex.json"
    stage1_data = load_stage1_jsonl(input_path)
    #rule_based_groups = group_stage1_data(stage1_data)
    smart_groups = llm_group_entries(stage1_data)
    write_stage2_json(smart_groups, output_path)
    print(f"✅ Grouped {len(stage1_data)} entries into {len(smart_groups)} blocks → saved to {output_path}")
