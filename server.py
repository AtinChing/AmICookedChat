from flask import Flask, request
import json
import os
import time
from datetime import datetime
from scripts.topic_classification import classify
app = Flask(__name__)
LOG_FILE = "data/classification.jsonl"
print("🔍 Writing to:", os.path.abspath(LOG_FILE))
@app.route("/log", methods=["POST"])
def log_tab_data():
    try:
        data : dict = request.get_json()
        
        #print("Received log:", data)
        time.sleep(1) # to prevent rate limiting, we dont need ON-THE-SPOT-ON-THE-SPOT t
        res = classify(html_content=data["html_content"], title=data["tab_title"], url=data["tab_url"])
        # Append to file as JSON Lines
        with open(LOG_FILE, "a") as f:
            f.write(json.dumps(res) + "\n")
    except Exception as e:
        print("❌ ERROR writing log:", str(e))
        return {"status": "error", "message": str(e)}, 500
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(port=5001)
