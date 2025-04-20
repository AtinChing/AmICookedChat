from google import genai
import json

def generate_stage3_summary(stage2_group):
    client = genai.Client(api_key="AIzaSyDSyIBzIJ9yVnXYd6sJaE7oZ0Vqnc4kEPM")
    
    prompt = (
        "You are a productivity analyst. A user has the following sequence of browser activity logs. "
        "Each entry includes a timestamp, summary, and mental context. Analyze this timeline and summarize the user's mental clarity, "
        "task-switching behavior, and productivity. Return a single JSON object with fields:\n\n"
        "- mental_clarity_score (0–100)\n"
        "- current_activity (string)\n"
        "- tab_switch_count (int)\n"
        "- focus_blocks (int)\n"
        "- deep_work_minutes (float)\n"
        "- breaks (int)\n"
        "- focus_timeline (list of {start, end, duration_min, context, summary})\n"
        "- distraction_loops (list of {type, start, duration_min, impact})\n"
        "- suggestions (list of actionable advice)\n\n"
        "Here is the user's activity:\n\n"
    )
    
    prompt += json.dumps(stage2_group, indent=2)
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    return json.loads(response.text.strip().strip("```json").strip("```"))

# Usage example:
with open("data/stage2_grouped_complex.json") as f:
    groups = json.load(f)
    result = generate_stage3_summary(groups[0])
    with open("data/stage3_gemini_2.json", "w") as f2:
        f2.write(json.dumps(result, indent=4))
