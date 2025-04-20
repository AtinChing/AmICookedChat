import React from 'react';
import { Brain, Flame, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockUserData } from '../../data/mockData';

const MentalClarityScore: React.FC = () => {
  const { clarityScore } = mockUserData;
  
  const getCookedStatus = () => {
    if (clarityScore > 70) return { status: 'Fresh', emoji: '🧊', color: 'bg-green-400' };
    if (clarityScore > 40) return { status: 'Medium', emoji: '🫠', color: 'bg-amber-400' };
    return { status: 'Fried', emoji: '🍳', color: 'bg-red-400' };
  };

  const statusInfo = getCookedStatus();
  
  return (
    <div className="bg-violet-500 rounded-3xl p-8 text-white shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain size={24} />
          How cooked are you?
        </h2>
        <span className="text-4xl">{statusInfo.emoji}</span>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Mental Clarity Score</span>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} text-white`}>
                {statusInfo.status}
              </span>
              <span className="text-3xl font-bold">{clarityScore}%</span>
            </div>
          </div>
          <div className="h-3 bg-violet-400 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out ${
                clarityScore > 70 ? 'bg-green-400' : clarityScore > 40 ? 'bg-amber-400' : 'bg-red-400'
              }`}
              style={{ width: `${clarityScore}%` }}
            />
          </div>
        </div>

        <div className="bg-violet-600 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">{statusInfo.emoji}</span>
            <span className="text-xl font-bold">{statusInfo.status}</span>
          </div>
          
          <div className="space-y-3 text-violet-100">
            <p className="flex items-center gap-2">
              <Flame size={16} className="text-orange-400" />
              Switched apps {mockUserData.activities.length} times in the last hour
            </p>
            <p className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-400" />
              Longest focus streak: 7 minutes
            </p>
            <p className="text-sm italic mt-4">
              {clarityScore < 40 
                ? "You are, respectfully, cooked 🔥" 
                : clarityScore > 70 
                  ? "You're crushing it! Keep this momentum 🚀" 
                  : "You're doing alright, but there's room for improvement 💪"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalClarityScore;