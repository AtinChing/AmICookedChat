// Define common types for the application

export type Language = 'en' | 'es' | 'ar';

export type Activity = {
  id: string;
  name: string;
  category: string;
  isDistractive: boolean;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
};

export type FocusSession = {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  completed: boolean;
};

export type UserData = {
  name: string;
  clarityScore: number;
  dailyGoal: string;
  language: Language;
  activities: Activity[];
  focusSessions: FocusSession[];
};

export type NavItem = {
  name: string;
  icon: string;
  path: string;
};

export type TimerState = 'idle' | 'focus' | 'break';