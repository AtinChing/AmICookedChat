from google import genai
import datetime
from clean_data import clean_html
import json
import re
client = genai.Client(api_key="")

def extract_json_from_gemini(text):
    # Remove the "json" header or code block formatting
    cleaned = re.sub(r"^```(?:json)?\s*", "", text.strip(), flags=re.IGNORECASE)
    cleaned = re.sub(r"\s*```$", "", cleaned.strip())
    
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        print("❌ JSON decode error:", e)
        print("👀 Raw text was:\n", cleaned)
        return None

# categories are [neutral, work, distraction, study, entertainment]

def isDistractive(category):
    if category in ["work", "study", "neutral"]: # for now consider neutral a productive category
        return False
    else:
        return True

def classify(title, url, html_content):
    prompt = "This is the content of the webpage I am currently on right now, derived from original raw html content which has been stripped of tags and bloat.\n" + clean_html(html_content) + "\n\n\nPlease summarise what the user is doing in 1 sentence. Examples include: \"User is watching a fun YouTube video.\", \"User is learning from a YouTube video.\" \"User is playing video games.\". In addition to this, please give me a mental_context classification, which classifies what the user is doing into one of these categories: [neutral, work, distraction, study, entertainment]. Return the output in a json format of the 2 fields named summary and mental_context."
    time1 = datetime.datetime.now()
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    time2 = datetime.datetime.now()
    timediff = time2-time1
    # this is for logging print(response.text + "\nResponse took " + str(timediff.microseconds/1000) + "ms")
    json_out = extract_json_from_gemini(response.text)
    print(json_out)
    json_out["timestamp"] = datetime.datetime.now().isoformat()
    json_out["tab_title"] = title
    json_out["tab_url"] = url
    json_out["isDistractive"] = isDistractive(json_out["mental_context"])

    output_file="classified_logs.jsonl"
    #with open(output_file, "a") as f:
    #    f.write()
    return json_out
import os


"""
# this is for testing
directory = "."
html_files = []
for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            html_files.append(os.path.join(root, file))
for f in html_files:
    f = open(f, 'r')
    test_content = f.read()
    new_test_content = clean_html(test_content)
    f.close()
    classify("", new_test_content)"""
