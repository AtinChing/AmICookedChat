from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import json
import os
import time
from datetime import datetime
from scripts.topic_classification import classify
from scripts.metric_calculation import update_metrics
from scripts.complex_grouping import llm_group_entries
import asyncio


app = FastAPI()
LOG_FILE = "data/classification.jsonl"
print("🔍 Writing to:", os.path.abspath(LOG_FILE))

class Data(BaseModel):
    timestamp: datetime
    tab_title: str
    tab_url: str
    html_content: str
    event_type: str

@app.post("/log")
async def log_tab_data(data : Data, background_tasks: BackgroundTasks):
    try:
        
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
# for stage 1 - 2
input_path = "data/classification.jsonl"  # replace with your path
    output_path = "data/stage2_grouped_complex.json"
@app.on_event("startup")
async def start_background_jobs():
    asyncio.create_task(schedule_stage1_to_2())
    asyncio.create_task(schedule_stage2_to_3())

async def schedule_stage1_to_2():
    while True:
        run_stage1_to_stage2()
        await asyncio.sleep(60)  # every 1 min

async def schedule_stage2_to_3():
    while True:
        run_stage2_to_stage3()
        await asyncio.sleep(180)  # every 3 min (or pick between 120–300)


if __name__ == "__main__":
    app.run(port=5001)
