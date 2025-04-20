import json
from datetime import datetime, timedelta
from pathlib import Path


def load_stage1_jsonl(file_path):
    """Load stage 1 JSONL file with potentially malformed entries."""
    raw = Path(file_path).read_text()

    # Try to split between closing and opening braces only when they are flush together (e.g. }{)
    fixed_raw = raw.replace('}{', '}\n{')

    # Ensure we split on actual top-level JSON objects only
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
    for item in data:
        item["timestamp"] = datetime.fromisoformat(item["timestamp"])
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



if __name__ == "__main__":
    input_path = "data/classification.jsonl"  # replace with your path
    output_path = "data/stage2_grouped_simple.json"

    stage1_data = load_stage1_jsonl(input_path)
    grouped_blocks = group_stage1_data(stage1_data)
    write_stage2_json(grouped_blocks, output_path)

    print(f"✅ Grouped {len(stage1_data)} entries into {len(grouped_blocks)} blocks → saved to {output_path}")
