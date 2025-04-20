import React, { useState } from 'react';
import { Smile, Frown, Meh } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const MoodCheckIn: React.FC = () => {
  const { t } = useLanguage();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const moods = [
    { name: 'happy', icon: <Smile size={24} />, color: 'text-green-500 hover:bg-green-50' },
    { name: 'neutral', icon: <Meh size={24} />, color: 'text-amber-500 hover:bg-amber-50' },
    { name: 'stressed', icon: <Frown size={24} />, color: 'text-red-500 hover:bg-red-50' },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
      <h2 className="text-gray-700 text-lg font-medium mb-3">
        {t('moodCheckIn')}
      </h2>
      
      <div className="flex justify-center space-x-4 mt-2">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => setSelectedMood(mood.name)}
            className={`p-3 rounded-full transition-all ${mood.color} ${
              selectedMood === mood.name 
                ? 'ring-2 ring-offset-2 ring-opacity-50 ring-blue-400 transform scale-110' 
                : ''
            }`}
          >
            {mood.icon}
          </button>
        ))}
      </div>
      
      {selectedMood && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {selectedMood === 'happy' && "Great to hear you're doing well! Keep up the momentum."}
            {selectedMood === 'neutral' && "Taking things as they come - that's a balanced approach."}
            {selectedMood === 'stressed' && "Sorry to hear that. Consider a short mindfulness break."}
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodCheckIn;