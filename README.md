# AmICookedChat
Project for HackDavis 2025.

## Data Stages terminology

### Stage 0 Data
Data that holds ungrouped raw unlabelled browser activity. It has no classification for what the user was doing on that webpage/website.
Example:
```json
[
  {
    "timestamp": "2025-04-19T23:50:01.008120",
    "tab_title": "Reddit - r/unpopularopinion",
    "tab_url": "https://reddit.com",
    "html_snippet": "<html><body><h1>Reddit - r/unpopularopinion</h1><p>Simulated page content...</p></body></html>"
  },
  {
    "timestamp": "2025-04-19T23:55:01.008120",
    "tab_title": "Netflix - Family Guy",
    "tab_url": "https://netflix.com",
    "html_snippet": "<html><body><h1>Netflix - Family Guy</h1><p>Simulated page content...</p></body></html>"
  },
  {
    "timestamp": "2025-04-20T00:00:01.008120",
    "tab_title": "Gmail - UC Davis Email",
    "tab_url": "https://mail.google.com",
    "html_snippet": "<html><body><h1>Gmail - UC Davis Email</h1><p>Simulated page content...</p></body></html>"
  },
  {
    "timestamp": "2025-04-20T00:05:01.008120",
    "tab_title": "Leetcode - Medium Problem",
    "tab_url": "https://leetcode.com",
    "html_snippet": "<html><body><h1>Leetcode - Medium Problem</h1><p>Simulated page content...</p></body></html>"
  },
  {
    "timestamp": "2025-04-20T00:10:01.008120",
    "tab_title": "YouTube - Minecraft Let's Play",
    "tab_url": "https://youtube.com",
    "html_snippet": "<html><body><h1>YouTube - Minecraft Let's Play</h1><p>Simulated page content...</p></body></html>"
  }
]
```

### Stage 1 Data
Data that holds ungrouped labeled browser activity. Everything is classified with a 1 line summary of what the user was doing (Watching a TV show, studying for a test, etc), and a mental context (work, study, entertainment, distraction, etc). Labels that can later be easily classified into productive or not (productivity can be stored as a binary value)

```json
[
  {
    "timestamp": "2025-04-19T23:50:01.008120",
    "tab_title": "Reddit - r/unpopularopinion",
    "tab_url": "https://reddit.com",
    "summary": "Doomscrolling forums",
    "mental_context": "distraction"
  },
  {
    "timestamp": "2025-04-19T23:55:01.008120",
    "tab_title": "Netflix - Family Guy",
    "tab_url": "https://netflix.com",
    "summary": "Watching TV shows",
    "mental_context": "entertainment"
  },
  {
    "timestamp": "2025-04-20T00:00:01.008120",
    "tab_title": "Gmail - UC Davis Email",
    "tab_url": "https://mail.google.com",
    "summary": "Checking email",
    "mental_context": "neutral"
  },
  {
    "timestamp": "2025-04-20T00:05:01.008120",
    "tab_title": "Leetcode - Medium Problem",
    "tab_url": "https://leetcode.com",
    "summary": "Solving coding problems",
    "mental_context": "study"
  },
  {
    "timestamp": "2025-04-20T00:10:01.008120",
    "tab_title": "YouTube - Minecraft Let's Play",
    "tab_url": "https://youtube.com",
    "summary": "Watching entertainment content",
    "mental_context": "entertainment"
  },
  {
    "timestamp": "2025-04-20T00:15:01.008120",
    "tab_title": "Netflix - Family Guy",
    "tab_url": "https://netflix.com",
    "summary": "Watching TV shows",
    "mental_context": "entertainment"
  },
  {
    "timestamp": "2025-04-20T00:20:01.008120",
    "tab_title": "Reddit - r/unpopularopinion",
    "tab_url": "https://reddit.com",
    "summary": "Doomscrolling forums",
    "mental_context": "distraction"
  },
  {
    "timestamp": "2025-04-20T00:25:01.008120",
    "tab_title": "Gmail - UC Davis Email",
    "tab_url": "https://mail.google.com",
    "summary": "Checking email",
    "mental_context": "neutral"
  },
  {
    "timestamp": "2025-04-20T00:30:01.008120",
    "tab_title": "ChatGPT - Asking About LLM Pipelines",
    "tab_url": "https://chat.openai.com",
    "summary": "Researching or coding with ChatGPT",
    "mental_context": "work"
  },
  {
    "timestamp": "2025-04-20T00:35:01.008120",
    "tab_title": "Twitter - Trending Topics",
    "tab_url": "https://twitter.com",
    "summary": "Scrolling through social media",
    "mental_context": "distraction"
  },
  {
    "timestamp": "2025-04-20T00:40:01.008120",
    "tab_title": "Reddit - r/unpopularopinion",
    "tab_url": "https://reddit.com",
    "summary": "Doomscrolling forums",
    "mental_context": "distraction"
  },
  {
    "timestamp": "2025-04-20T00:45:01.008120",
    "tab_title": "Google Docs - HackDavis Plan",
    "tab_url": "https://docs.google.com",
    "summary": "Working on HackDavis project",
    "mental_context": "work"
  },
  {
    "timestamp": "2025-04-20T00:50:01.008120",
    "tab_title": "Twitter - Trending Topics",
    "tab_url": "https://twitter.com",
    "summary": "Scrolling through social media",
    "mental_context": "distraction"
  }
]
```

### Stage 2 Data
Data that holds grouped labeled browser activity. All activities are now clustered into blocks/groups, and are grouped together if they are for the same/similar task. For example, watching 3 different videos of Minecraft Let's Play content would be put under the same group, then studying for 20mins for a math test would be in 1 group, then working on a project for 10 mins would be another group

```json
{
    [
    {
      "timestamp": "2025-04-20T00:10:01.008120",
      "tab_title": "YouTube - Minecraft Let's Play",
      "tab_url": "https://youtube.com",
      "summary": "Watching entertainment content",
      "mental_context": "entertainment"
    },
    {
      "timestamp": "2025-04-20T00:15:01.008120",
      "tab_title": "Netflix - Family Guy",
      "tab_url": "https://netflix.com",
      "summary": "Watching TV shows",
      "mental_context": "entertainment"
    }
  ],
  [
    {
      "timestamp": "2025-04-20T00:20:01.008120",
      "tab_title": "Reddit - r/unpopularopinion",
      "tab_url": "https://reddit.com",
      "summary": "Doomscrolling forums",
      "mental_context": "distraction"
    }
  ],
  [
    {
      "timestamp": "2025-04-20T00:25:01.008120",
      "tab_title": "Gmail - UC Davis Email",
      "tab_url": "https://mail.google.com",
      "summary": "Checking email",
      "mental_context": "neutral"
    }
  ],
  [
    {
      "timestamp": "2025-04-20T01:25:01.008120",
      "tab_title": "ChatGPT - Asking About LLM Pipelines",
      "tab_url": "https://chat.openai.com",
      "summary": "Researching or coding with ChatGPT",
      "mental_context": "work"
    },
    {
      "timestamp": "2025-04-20T01:30:01.008120",
      "tab_title": "Google Docs - HackDavis Plan",
      "tab_url": "https://docs.google.com",
      "summary": "Working on HackDavis project",
      "mental_context": "work"
    }
  ]
}
```

### Final metric/Stage 3 Data
Final metrics are determined using the stage 2 data
```json
{
  "mental_clarity_score": 16.7,
  "current_activity": "Doomscrolling forums",
  "tab_switch_count": 29,
  "focus_blocks": 0,
  "deep_work_minutes": 0,
  "breaks": 13,
  "focus_timeline": [
    {
      "start": "2025-04-19T23:50:01.008120",
      "end": "2025-04-19T23:50:01.008120",
      "duration_min": 0.0,
      "context": "distraction",
      "summary": "Doomscrolling forums"
    },
    {
      "start": "2025-04-19T23:55:01.008120",
      "end": "2025-04-19T23:55:01.008120",
      "duration_min": 0.0,
      "context": "entertainment",
      "summary": "Watching TV shows"
    },
    {
      "start": "2025-04-20T00:00:01.008120",
      "end": "2025-04-20T00:00:01.008120",
      "duration_min": 0.0,
      "context": "neutral",
      "summary": "Checking email"
    },
    {
      "start": "2025-04-20T00:05:01.008120",
      "end": "2025-04-20T00:05:01.008120",
      "duration_min": 0.0,
      "context": "study",
      "summary": "Solving coding problems"
    },
    {
      "start": "2025-04-20T00:10:01.008120",
      "end": "2025-04-20T00:15:01.008120",
      "duration_min": 5.0,
      "context": "entertainment",
      "summary": "Watching entertainment content"
    },
    {
      "start": "2025-04-20T00:20:01.008120",
      "end": "2025-04-20T00:20:01.008120",
      "duration_min": 0.0,
      "context": "distraction",
      "summary": "Doomscrolling forums"
    },
    {
      "start": "2025-04-20T01:45:01.008120",
      "end": "2025-04-20T01:45:01.008120",
      "duration_min": 0.0,
      "context": "study",
      "summary": "Researching academic topics"
    },
    {
      "start": "2025-04-20T01:50:01.008120",
      "end": "2025-04-20T01:50:01.008120",
      "duration_min": 0.0,
      "context": "distraction",
      "summary": "Scrolling through social media"
    },
    {
      "start": "2025-04-20T01:55:01.008120",
      "end": "2025-04-20T02:00:01.008120",
      "duration_min": 5.0,
      "context": "entertainment",
      "summary": "Watching TV shows"
    },
    {
      "start": "2025-04-20T02:05:01.008120",
      "end": "2025-04-20T02:05:01.008120",
      "duration_min": 0.0,
      "context": "distraction",
      "summary": "Scrolling through social media"
    },
    {
      "start": "2025-04-20T02:10:01.008120",
      "end": "2025-04-20T02:10:01.008120",
      "duration_min": 0.0,
      "context": "study",
      "summary": "Solving coding problems"
    },
    {
      "start": "2025-04-20T02:15:01.008120",
      "end": "2025-04-20T02:15:01.008120",
      "duration_min": 0.0,
      "context": "distraction",
      "summary": "Doomscrolling forums"
    }
  ],
  "distraction_loops": [
    {
      "type": "distraction-work-distraction",
      "start": "2025-04-20T00:50:01.008120",
      "duration_min": 10.0,
      "impact": "high"
    }
  ],
  "suggestions": [
    "Schedule a 90-minute deep work block at 2PM",
    "Block YouTube and Reddit from 1-4PM",
    "Switch to a quiet space during study hours"
  ]
}
```


## Concerns:
- What if a user is looking at a minecraft lets play for web scraping or productive reasons? We would need to be able to derive this if this activity is surrounded by an activity that shows productivity related to this (E.g. coding a minecraft plugin on Java)
