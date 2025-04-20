import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { mockUserData } from '../../data/mockData';

const DistractionPatterns: React.FC = () => {
  const { activities } = mockUserData;

  // Group distractive activities by name and accumulate total duration
  const distractorMap = activities
    .filter((activity) => activity.isDistractive)
    .reduce<Record<string, { name: string; duration: number; count: number }>>((acc, activity) => {
      if (!acc[activity.name]) {
        acc[activity.name] = { name: activity.name, duration: 0, count: 0 };
      }
      acc[activity.name].duration += activity.duration;
      acc[activity.name].count += 1;
      return acc;
    }, {});

  // Transform map into array with extra visual properties
  const distractors = Object.values(distractorMap)
    .map((entry) => {
      const percentage = Math.min(100, Math.round((entry.duration / 60) * 100));
      const impact =
        percentage > 80 ? 'High' : percentage > 50 ? 'Medium' : 'Low';

      const icon = entry.name.toLowerCase().includes('youtube')
        ? '📺'
        : entry.name.toLowerCase().includes('reddit')
        ? '🤖'
        : entry.name.toLowerCase().includes('instagram')
        ? '📸'
        : '💻';

      return {
        name: entry.name,
        icon,
        time: `${Math.round(entry.duration)} mins`,
        impact,
        percentage,
      };
    })
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3); // Top 3

  return (
    <div className="bg-rose-400 rounded-3xl p-8 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp size={24} />
        Biggest Distractors
      </h2>

      <div className="space-y-4">
        {distractors.map((distractor) => (
          <div key={distractor.name} className="bg-rose-300 rounded-2xl p-4">
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
