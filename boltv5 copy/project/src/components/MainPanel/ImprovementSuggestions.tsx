import React from 'react';
import { Lightbulb, Clock, Shield } from 'lucide-react';
import { mockUserData } from '../../data/mockData';

const ImprovementSuggestions: React.FC = () => {
  const { suggestions, distraction_loops } = mockUserData;

  return (
    <div className="bg-indigo-500 rounded-3xl p-8 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Lightbulb size={24} />
        Notes & To-do
      </h2>

      <div className="space-y-4">
        <div className="bg-indigo-400 hover:bg-blue-500 transform hover:scale-[1.02] transition-all duration-200 ease-in-out rounded-2xl p-6 cursor-pointer">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={20} />
            <span className="font-bold">Common Patterns</span>
          </div>
          <ul className="space-y-3 text-indigo-100">
            {distraction_loops?.map((loop, index) => (
              <li key={index}>• {loop}</li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-400 hover:bg-blue-500 transform hover:scale-[1.02] transition-all duration-200 ease-in-out rounded-2xl p-6 cursor-pointer">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={20} />
            <span className="font-bold">Suggestions</span>
          </div>
          <ul className="space-y-3 text-indigo-100">
            {suggestions?.map((suggestion, index) => (
              <li key={index}>• {suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;
