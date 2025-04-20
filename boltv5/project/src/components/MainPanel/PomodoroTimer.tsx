import React, { useState } from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TimerState } from '../../types';

const PomodoroTimer: React.FC = () => {
  const { t } = useLanguage();
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const toggleTimer = () => {
    if (timerState === 'idle') {
      setTimerState('focus');
      setMinutes(25);
      setSeconds(0);
    }
    setIsRunning(!isRunning);
  };

  const switchToBreak = () => {
    setTimerState('break');
    setMinutes(5);
    setSeconds(0);
    setIsRunning(false);
  };

  // Calculate progress percentage
  const totalSeconds = timerState === 'focus' ? 25 * 60 : 5 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = 100 - ((currentSeconds / totalSeconds) * 100);

  return (
    <div className={`rounded-lg shadow-sm p-5 mb-6 border ${
      timerState === 'focus' 
        ? 'bg-teal-50 border-teal-100' 
        : timerState === 'break' 
          ? 'bg-blue-50 border-blue-100' 
          : 'bg-white border-gray-100'
    }`}>
      <h2 className="text-gray-700 text-lg font-medium mb-4">Pomodoro Timer</h2>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          {/* Progress circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={timerState === 'idle' ? '#E5E7EB' : timerState === 'focus' ? '#99F6E4' : '#BFDBFE'} 
              strokeWidth="8" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={timerState === 'focus' ? '#14B8A6' : timerState === 'break' ? '#3B82F6' : '#9CA3AF'} 
              strokeWidth="8" 
              strokeDasharray="283" 
              strokeDashoffset={283 - ((progress * 283) / 100)} 
              strokeLinecap="round" 
              transform="rotate(-90 50 50)" 
            />
          </svg>
          {/* Timer text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 justify-center">
        <button 
          onClick={toggleTimer}
          className={`px-5 py-2 rounded-md flex items-center justify-center ${
            timerState === 'focus' 
              ? 'bg-teal-600 text-white hover:bg-teal-700' 
              : timerState === 'break' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-700 text-white hover:bg-gray-800'
          } transition-colors`}
        >
          {isRunning ? (
            <>
              <Pause size={16} className="mr-1" />
              Pause
            </>
          ) : (
            <>
              <Play size={16} className="mr-1" />
              {timerState === 'idle' ? t('startFocus') : timerState === 'focus' ? 'Resume Focus' : 'Resume Break'}
            </>
          )}
        </button>
        
        {timerState === 'focus' && (
          <button 
            onClick={switchToBreak}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center"
          >
            <SkipForward size={16} className="mr-1" />
            {t('takeBreak')}
          </button>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;