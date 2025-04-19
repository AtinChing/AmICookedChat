from flask import Flask, request
import json
import os
from datetime import datetime

app = Flask(__name__)
LOG_FILE = "attention_log.jsonl"
print("🔍 Writing to:", os.path.abspath(LOG_FILE))
@app.route("/log", methods=["POST"])
def log_tab_data():
    try:
        data = request.get_json()
        print("Received log:", data)
        
        # Append to file as JSON Lines
        with open(LOG_FILE, "a") as f:
            f.write(json.dumps(data) + "\n")
    except Exception as e:
        print("❌ ERROR writing log:", str(e))
        return {"status": "error", "message": str(e)}, 500
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(port=5000)
