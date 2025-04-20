import React from 'react';
import { Clock } from 'lucide-react';
import { mockUserData } from '../../data/mockData';

const FocusTimeline: React.FC = () => {
  const { activities } = mockUserData;
  
  // Get last 8 activities for display
  const recentActivities = activities.slice(0, 6);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-700 text-lg font-medium flex items-center">
          <Clock size={18} className="mr-2 text-teal-600" />
          Focus Timeline
        </h2>
      </div>

      <div className="space-y-3">
        {recentActivities.map((activity) => {
          const cappedDuration = Math.min(activity.duration, 60);
          const isOver60 = activity.duration > 60;
          const progressPercent = (cappedDuration / 60) * 100;

          return (
            <div key={activity.id} className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${
                  activity.isDistractive ? 'bg-red-400' : 'bg-green-400'
                }`}
              ></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                    {activity.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {isOver60 ? '60+ min' : `${Math.round(activity.duration)} min`}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ease-in-out ${
                      activity.isDistractive ? 'bg-red-400' : 'bg-green-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FocusTimeline;
