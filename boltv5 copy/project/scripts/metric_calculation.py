import json
import google.generativeai as genai
from pathlib import Path
import datetime
def update_metrics(input_path, output_path):
    # 1. Set up Gemini API
    genai.configure(api_key="")

    #model = genai.GenerativeModel("gemini-2.0-flash")
    model = genai.GenerativeModel("gemini-2.5-flash-preview-04-17")

    # 2. Read the JS/JSON file
    with open(input_path, "r") as f:
        js_data = f.read()
    if len(js_data)==0: # empty file, dont update metrics
        print("No grouped data exists to use to determine metrics atm.")
        return
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
    • focus_timeline: this contains groups that include information about a task that may have been performed many times, non-continuously. for each group:
        • start, end: earliest timestamp of this task that you can find and last timestamp ever
        • duration_min: all the durations of doing this activity added up
        • context: mental_context
        • isDistractive: is it distractive as an activity?
        • summary: from the first activity
        • title : title will be based on summary. it will be extremely brief and an overview of what the task was. Examples: "Youtube - Gaming", "Google Docs - Project Report", "Gmail - Inbox", "Twitter Feed", "Online Course - Web Developer", "YouTube - Educational"
    • distraction_loops: any sequence of tasks or websites which seem to be a common recurrence and are mostly distractions, for example Google Docs -> YouTube could be a common occurence, or Netflix -> YouTube can be a common transition which is mostly distraction too. Feel free to include upto 3 distraction loops. Do NOT include vague/umbrella terms like "Entertainment", "Work", "Study". Do not include loops that ONLY contain non-distractive activities. At least both or the second activity of each loop needs to be a distractive activity.
    • suggestions: 2-3 action tips to improve focus
    Make sure to NOT include entries with a duration_min value lesser than 3!
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
        #print(json.dumps(stage3_summary, indent=2))
        print("Refreshed metric data at" + datetime.datetime.now().strftime(format="%m/%d/%Y, %H:%M:%S"))
        with open(output_path, "w") as f:
            json.dump(stage3_summary, f, indent=2)

    except json.JSONDecodeError:
        print("⚠️ Failed to parse Gemini output. Here's the raw text:")
        print(response.text)

