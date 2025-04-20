


import json
from datetime import datetime, timedelta
from pathlib import Path
import google.generativeai as genai


def load_stage1_jsonl(file_path):
    """Load stage 1 JSONL file assuming valid newline-delimited JSON objects."""
    data = []
    with open(file_path, 'r') as f:
        for line in f:
            item = json.loads(line)
            item["timestamp"] = datetime.fromisoformat(item["timestamp"])
            data.append(item)
    return sorted(data, key=lambda x: x["timestamp"])


def group_stage1_data(data, max_gap_min=5):
    """Group entries by mental_context and time proximity."""
    grouped = []
    current_group = [data[0]]

    for i in range(1, len(data)):
        curr, prev = data[i], data[i - 1]
        gap = curr["timestamp"] - prev["timestamp"]
        same_context = curr["mental_context"] == prev["mental_context"]

        if same_context and gap <= timedelta(minutes=max_gap_min):
            current_group.append(curr)
        else:
            grouped.append(current_group)
            current_group = [curr]

    grouped.append(current_group)
    return grouped


def write_stage2_json(grouped_data, output_path):
    for group in grouped_data:
        for item in group:
            item["timestamp"] = item["timestamp"].isoformat()
    with open(output_path, "w") as f:
        json.dump(grouped_data, f, indent=2)


def llm_group_entries(entries):
    """Send a sequence of Stage 1 entries to an LLM to group based on intent."""
    
    client = genai.Client(api_key="AIzaSyDSyIBzIJ9yVnXYd6sJaE7oZ0Vqnc4kEPM")
    
    """prompt = (
        "Below is a list of user activity logs including timestamps, summaries, and mental contexts. "
        "Group them based on user intent or task flow. If multiple tabs seem part of the same task, group them together. "
        "Return a JSON array of groups, each group being a list of these items.\n\n"
    )"""
    prompt = """You are an assistant that understands human attention.

Below is a list of user activities including timestamps, summaries, and contexts. Group them into logical task blocks based on intent, even if the mental_context varies. Include only 3–5 blocks per batch.
If it feels that the activities aren't necessarily part of the same task, then feel free to leave them in different groups, even if they have the same mental_context value.
Respond with a JSON array of grouped lists."""
    prompt += json.dumps(entries, indent=2)
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    grouped_output = json.loads(response.text.strip().strip("```json").strip("```"))
    return grouped_output


if __name__ == "__main__":
    input_path = "data/classification.jsonl"  # replace with your path
    output_path = "data/stage2_grouped_complex.json"

    stage1_data = load_stage1_jsonl(input_path)
    rule_based_groups = group_stage1_data(stage1_data)
    write_stage2_json(rule_based_groups, output_path)

    print(f"✅ Grouped {len(stage1_data)} entries into {len(rule_based_groups)} blocks → saved to {output_path}")

    # Optional LLM-enhanced pass (example on first 10 entries)
    # Replace with your real API key before running
    # smart_groups = llm_group_entries(stage1_data[:10], api_key="your_key_here")
    # print(json.dumps(smart_groups, indent=2))
