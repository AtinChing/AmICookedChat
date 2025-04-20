import { UserData, Activity, FocusSession } from '../types';

const getCurrentDate = () => new Date();

const getTimeAgo = (minutes: number): Date => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date;
};

// Mock activities
const mockActivities: Activity[] = [
  {
    id: '1',
    name: 'YouTube - Gaming Highlights',
    category: 'Entertainment',
    isDistractive: true,
    startTime: getTimeAgo(20),
    endTime: getTimeAgo(10),
    duration: 10
  },
  {
    id: '2',
    name: 'Google Docs - Project Report',
    category: 'Work',
    isDistractive: false,
    startTime: getTimeAgo(45),
    endTime: getTimeAgo(25),
    duration: 20
  },
  {
    id: '3',
    name: 'Gmail - Inbox',
    category: 'Communication',
    isDistractive: false,
    startTime: getTimeAgo(60),
    endTime: getTimeAgo(50),
    duration: 10
  },
  {
    id: '4',
    name: 'Twitter Feed',
    category: 'Social Media',
    isDistractive: true,
    startTime: getTimeAgo(120),
    endTime: getTimeAgo(90),
    duration: 30
  },
  {
    id: '5',
    name: 'Online Course - Web Development',
    category: 'Education',
    isDistractive: false,
    startTime: getTimeAgo(180),
    endTime: getTimeAgo(130),
    duration: 50
  },
  {
    id: '6',
    name: 'YouTube - Educational',
    category: 'Education',
    isDistractive: false,
    startTime: getTimeAgo(5),
    endTime: getCurrentDate(),
    duration: 5
  }
];

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

// Mock user data
export const mockUserData: UserData = {
  name: 'Ahmed',
  clarityScore: 40,
  dailyGoal: 'Complete the project proposal by 5 PM',
  language: 'en',
  activities: mockActivities,
  focusSessions: mockFocusSessions
};

// Current activity (mock)
export const currentActivity: Activity = {
  id: '6',
  name: 'YouTube - Educational',
  category: 'Education',
  isDistractive: false,
  startTime: getTimeAgo(5),
  duration: 5
};

// Suggested content (mock)
export const suggestedContent = [
  {
    id: '1',
    title: 'How to Improve Focus',
    type: 'video',
    duration: '5 min',
    url: 'https://example.com/video1'
  },
  {
    id: '2',
    title: 'Quick Mindfulness Exercise',
    type: 'audio',
    duration: '3 min',
    url: 'https://example.com/audio1'
  },
  {
    id: '3',
    title: '3 Ways to Clear Mental Fog',
    type: 'article',
    duration: '4 min',
    url: 'https://example.com/article1'
  }
];

export const alertNotifications = [
  {
    id: '1',
    message: 'You\'ve switched 15 tabs in 20 minutes – try a 5-minute focus block.',
    type: 'warning',
    actionable: true,
    action: 'Start Focus Block'
  }
];