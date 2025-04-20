import { UserData } from '../types';
import rawData from './data.json';

// Convert the raw data into our UserData type
export const mockUserData: UserData = {
  mental_clarity_score: rawData.mental_clarity_score,
  current_activity: rawData.current_activity,
  tab_switch_count: rawData.tab_switch_count,
  focus_blocks: rawData.focus_blocks,
  deep_work_minutes: rawData.deep_work_minutes,
  breaks: rawData.breaks,
  focus_timeline: rawData.focus_timeline
    .sort((a, b) => b.duration_min - a.duration_min)
    .map(entry => ({
      ...entry,
      start: new Date(entry.start).toISOString(),
      end: new Date(entry.end).toISOString()
    })),
  distraction_loops: rawData.distraction_loops,
  suggestions: rawData.suggestions
};

// Current activity is the latest entry in the timeline
export const currentActivity = mockUserData.focus_timeline[mockUserData.focus_timeline.length - 1];

export const alertNotifications = [
  {
    id: '1',
    message: 'You\'ve switched tabs frequently in the last 20 minutes – consider taking a focus break.',
    type: 'warning',
    actionable: true,
    action: 'Start Focus Block'
  }
];
