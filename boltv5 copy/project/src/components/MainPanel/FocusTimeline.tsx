import React from 'react';
import { Clock } from 'lucide-react';
import userData  from '../../data/atin_stage3.json';

const FocusTimeline: React.FC = () => {
  const { focus_timeline } = userData;
  
  // Get top 5 activities by duration
  const recentActivities = focus_timeline
    .sort((a, b) => b.duration_min - a.duration_min)
    .slice(0, 5);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-700 text-lg font-medium flex items-center">
          <Clock size={18} className="mr-2 text-teal-600" />
          Focus Timeline
        </h2>
      </div>

      <div className="space-y-3">
        {recentActivities.map((activity, index) => {
          const cappedDuration = Math.min(activity.duration_min, 60);
          const isOver60 = activity.duration_min > 60;
          const progressPercent = (cappedDuration / 60) * 100;

          return (
            <div key={index} className="flex items-center">
              <div 
                className={`w-3 h-3 rounded-full mr-3 ${
                  activity.isDistractive ? 'bg-red-400' : 'bg-green-400'
                }`}
              ></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                    {activity.title.split(' ').slice(0, 4).join(' ')}...
                  </span>
                  <span className="text-xs text-gray-500">
                    {isOver60 ? '60+ min' : `${Math.round(activity.duration_min)} min`}
                  </span>
                </div>
                <div 
                  className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden"
                >
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
