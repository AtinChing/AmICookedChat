import { UserData, Activity, FocusSession } from '../types';
import rawActivities from './data.json';

const getCurrentDate = () => new Date();

const getTimeAgo = (minutes: number): Date => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date;
};

const mockActivities: Activity[] = rawActivities.map(activity => {
  const startTime = new Date(activity.startTime);
  const endTime = new Date(activity.endTime);
  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // ms → min

  return {
    ...activity,
    startTime,
    endTime,
    duration: Math.round(duration)
  };
});

// Mock focus sessions
const mockFocusSessions: FocusSession[] = [
  {
    id: '1',
    startTime: getTimeAgo(90),
    endTime: getTimeAgo(65),
    duration: 25,
    completed: true
  },
  {
    id: '2',
    startTime: getTimeAgo(150),
    endTime: getTimeAgo(130),
    duration: 20,
    completed: true
  },
  {
    id: '3',
    startTime: getTimeAgo(210),
    endTime: getTimeAgo(195),
    duration: 15,
    completed: false
  }
];

// ✅ Mental Clarity Score Calculation
const calculateClarityScore = (activities: Activity[]): number => {
  let productiveTime = 0;
  let totalTime = 0;

  for (const activity of activities) {
    const start = new Date(activity.startTime).getTime();
    const end = new Date(activity.endTime).getTime();
    const durationMinutes = (end - start) / (1000 * 60); // ms to minutes

    totalTime += durationMinutes;
    if (!activity.isDistractive) {
      productiveTime += durationMinutes;
    }
  }

  if (totalTime === 0) return 0;
  return Math.round((productiveTime / totalTime) * 100);
};

const clarityScore = calculateClarityScore(mockActivities);

// Mock user data
export const mockUserData: UserData = {
  name: 'Ahmed',
  clarityScore,
  dailyGoal: 'Complete the project proposal by 5 PM',
  language: 'en',
  activities: mockActivities,
  focusSessions: mockFocusSessions
};


//current activities; activities in the array (last one in the array)
export const currentActivity: Activity = mockActivities[mockActivities.length - 1];

export const alertNotifications = [
  {
    id: '1',
    message: 'You\'ve switched 15 tabs in 20 minutes – try a 5-minute focus block.',
    type: 'warning',
    actionable: true,
    action: 'Start Focus Block'
  }
];