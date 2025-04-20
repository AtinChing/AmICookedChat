import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';

const DistractionPatterns: React.FC = () => {
  const distractors = [
    { 
      name: 'YouTube',
      icon: '📺',
      time: '43 mins',
      impact: 'High',
      percentage: 85
    },
    { 
      name: 'Reddit',
      icon: '🤖',
      time: '27 mins',
      impact: 'Medium',
      percentage: 65
    },
    { 
      name: 'Instagram',
      icon: '📸',
      time: '15 mins',
      impact: 'Low',
      percentage: 35
    }
  ].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="bg-rose-400 rounded-3xl p-8 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp size={24} />
        Biggest Distractors
      </h2>

      <div className="space-y-4">
        {distractors.map((distractor) => (
          <div 
            key={distractor.name}
            className="bg-rose-300 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{distractor.icon}</span>
                <div>
                  <span className="font-medium">{distractor.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-rose-100">
                      {distractor.impact} impact • {distractor.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1.5 bg-rose-200/50 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-white/30 transition-all duration-300"
                style={{ width: `${distractor.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-rose-500 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={20} />
          <span className="font-bold">Last Distraction Pattern:</span>
        </div>
        <p>Google Docs → YouTube (15 mins ago)</p>
        <p className="text-sm mt-2 text-rose-100">
          This happens most often around 2pm 🕑
        </p>
      </div>
    </div>
  );
};

export default DistractionPatterns;