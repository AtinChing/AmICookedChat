from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
import os
import time
from datetime import datetime, timezone
from scripts.topic_classification import classify
from scripts.metric_calculation import update_metrics
import scripts.complex_grouping as grouping
import asyncio

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LOG_FILE = "boltv5 copy/project/src/data/classification.jsonl"
is_tracking = False  # Use this instead of server_process
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
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, "r") as f:
                lines = f.readlines()
        else:
            lines = []

        # Update the *last* entry with end_timestamp = this entry's timestamp
        if lines:
            last_entry = json.loads(lines[-1])
            #last_entry["end_timestamp"] = data.timestamp.isoformat()
            start = datetime.fromisoformat(last_entry["timestamp"]).astimezone(timezone.utc).replace(tzinfo=None)
            end = data.timestamp.astimezone(timezone.utc).replace(tzinfo=None)
            print("start", start.strftime(format="%m/%d/%Y, %H:%M:%S"))
            print("end", end.strftime(format="%m/%d/%Y, %H:%M:%S"))
            duration = (end - start).total_seconds() / 60
            print(f"duration is {duration}")
            last_entry["duration"] = round(duration, 2)
            lines[-1] = json.dumps(last_entry) + "\n"
        #print("Received log:", data)
        await asyncio.sleep(1) # to prevent rate limiting, we dont need ON-THE-SPOT-ON-THE-SPOT live streaming
        res = classify(html_content=data.html_content, title=data.tab_title, url=data.tab_url)
        lines.append(json.dumps(res) + "\n") # new final log output

        # Append to file as JSON Lines
        #with open(LOG_FILE, "a") as f:
        #    f.write(json.dumps(res) + "\n")
        with open(LOG_FILE, "w") as f:
            f.writelines(lines)

    except Exception as e:
        print("❌ ERROR writing log:", str(e))
        return {"status": "error", "message": str(e)}, 500
    return {"status": "ok"}

@app.post("/start")
async def start_server():
    global is_tracking
    if not is_tracking:
        try:
            # Clear the log files before starting
            for file_path in [
                LOG_FILE, 
                "boltv5 copy/project/src/data/stage2_grouped_complex.json", 
                "boltv5 copy/project/src/data/data.json"
            ]:
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                open(file_path, 'w').close()
            
            is_tracking = True
            # Start background tasks
            await start_background_jobs()
            return {"status": "success", "message": "Server started successfully"}
        except Exception as e:
            print(f"Error starting server: {str(e)}")
            return {"status": "error", "message": str(e)}
    return {"status": "error", "message": "Server is already running"}

@app.post("/stop")
async def stop_server():
    global is_tracking
    if is_tracking:
        try:
            # Stop all background tasks
            for task in asyncio.all_tasks():
                if task != asyncio.current_task():
                    task.cancel()
            is_tracking = False
            return {"status": "success", "message": "Server stopped successfully"}
        except Exception as e:
            print(f"Error stopping server: {str(e)}")
            return {"status": "error", "message": str(e)}
    return {"status": "error", "message": "Server is not running"}

@app.get("/status")
async def get_status():
    return {"is_tracking": is_tracking}

def group_data():
    input_path = "boltv5 copy/project/src/data/classification.jsonl"  # replace with your path
    output_path = "boltv5 copy/project/src/data/stage2_grouped_complex.json"
    grouping.group(input_path, output_path)
    #open(input_path, "w").close() # clear the file

def calculate_metrics():
    input_path = "boltv5 copy/project/src/data/stage2_grouped_complex.json"
    output_path = "boltv5 copy/project/src/data/data.json"
    update_metrics(input_path, output_path)
    #open(input_path, "w").close() # clear the file
    

@app.on_event("startup")
async def start_background_jobs():
    asyncio.create_task(schedule_stage1_to_2())
    asyncio.create_task(schedule_stage2_to_3())

async def schedule_stage1_to_2(): # grouping
    while True:
        group_data()
        await asyncio.sleep(60)  # every 1 min

async def schedule_stage2_to_3(): # metric calculation
    while True:
        try:
            calculate_metrics()
        except Exception as e:
            print(f"❌ Stage 2→3 task error: {e}")
        await asyncio.sleep(60)  # every 3 min (or pick between 120–300)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=5001, reload=True)
