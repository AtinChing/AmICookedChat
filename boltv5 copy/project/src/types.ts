export interface FocusTimelineEntry {
  start: string;
  end: string;
  duration_min: number;
  context: string;
  isDistractive: boolean;
  summary: string;
}

export interface UserData {
  mental_clarity_score: number;
  current_activity: string;
  tab_switch_count: number;
  focus_blocks: number;
  deep_work_minutes: number;
  breaks: number;
  focus_timeline: FocusTimelineEntry[];
  distraction_loops?: string[];
  suggestions?: string[];
}