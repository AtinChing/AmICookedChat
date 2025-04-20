import json
import google.generativeai as genai
from pathlib import Path

# 1. Set up Gemini API
genai.configure(api_key="AIzaSyChVe6HRoHi9GFVUW27jXQ3BmLtJJAbJ4w")

model = genai.GenerativeModel("gemini-2.0-flash")

# 2. Read the JS/JSON file
with open("data/stage2_grouped_complex.json", "r") as f:
    js_data = f.read()

# 3. Prepare prompt
prompt = f"""
You are a digital focus coach analyzing browser activity grouped into high-level mental task blocks. The input is a Stage 2 JSON object, where each list represents a focused group of browser activity (e.g., watching videos, working on a document). Your task is to convert this into a Stage 3 JSON summary.

🎯 Stage 2: Input Format

{js_data}

✅ Stage 3: Expected Output
Generate the following fields in JSON format:
• mental_clarity_score: % of time spent in work or study vs total activity
• current_activity: summary from the last activity
• tab_switch_count: total number of activities (individual entries)
• focus_blocks: number of work or study blocks that lasted 15+ minutes
• deep_work_minutes: total minutes spent on work
• breaks: number of entertainment or distraction blocks
• focus_timeline: for each group:
  • start, end: first and last timestamp in that block
  • duration_min: duration in minutes
  • context: mental_context
  • summary: from the first activity
• distraction_loops: any sequence of tasks or websites which seem to be a common recurrence and are mostly distractions, for example Google Docs -> YouTube could be a common occurence, or Netflix -> YouTube can be a common transition which is mostly distraction too. Feel free to include upto 3 distraction loops
• suggestions: 3 action tips to improve focus

Only return valid JSON. Do not include explanation or prose.
"""

# 4. Generate response
response = model.generate_content(prompt)

# 5. Try parsing output JSON
try:
    # Clean and validate the response text
    response_text = response.text.strip()
    # Remove any markdown code block markers if present
    response_text = response_text.replace('```json', '').replace('```', '')
    stage3_summary = json.loads(response_text)
    print(json.dumps(stage3_summary, indent=2))
    with open("data/atin_stage3.json", "w") as f:
        json.dump(stage3_summary, f, indent=2)

except json.JSONDecodeError:
    print("⚠️ Failed to parse Gemini output. Here's the raw text:")
    print(response.text)

