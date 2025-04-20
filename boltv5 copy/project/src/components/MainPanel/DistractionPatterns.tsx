import React from 'react';
import { TrendingUp } from 'lucide-react';
import { mockUserData } from '../../data/mockData';

const DistractionPatterns: React.FC = () => {
  const { focus_timeline } = mockUserData;

  // Group distractive activities by context and accumulate duration
  const distractorMap = focus_timeline
    .filter((entry) => entry.isDistractive)
    .reduce<Record<string, { context: string; duration: number; count: number; title: string; }>>(
      (acc, entry) => {
        if (!acc[entry.context]) {
          acc[entry.context] = { context: entry.context, title: entry.title, duration: 0, count: 0 };
        }
        acc[entry.context].duration += entry.duration_min;
        acc[entry.context].count += 1;
        return acc;
      },
      {}
    );

  // Transform map into array with visual properties
  const distractors = Object.values(distractorMap)
    .map((entry) => {
      const percentage = Math.min(100, Math.round((entry.duration / 60) * 100));
      const impact = percentage > 80 ? 'High' : percentage > 50 ? 'Medium' : 'Low';

      const icon = entry.context.toLowerCase().includes('entertainment')
        ? '📺'
        : entry.context.toLowerCase().includes('social')
        ? '🤖'
        : entry.context.toLowerCase().includes('communication')
        ? '📱'
        : '💻';

      return {
        name: entry.context,
        title: entry.title,
        icon,
        time: `${Math.round(entry.duration)} mins`,
        impact,
        percentage,
      };
    })
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

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
                  <span className="font-medium">{distractor.title}</span>
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
    </div>
  );
};

export default DistractionPatterns;
