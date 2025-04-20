import React from 'react';
import { Lightbulb, Clock, Shield } from 'lucide-react';

const ImprovementSuggestions: React.FC = () => {
  return (
    <div className="bg-indigo-500 rounded-3xl p-8 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Lightbulb size={24} />
        Notes & To-do
      </h2>

      <div className="space-y-4">
        <div className="bg-indigo-400 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={20} />
            <span className="font-bold">Time Check</span>
          </div>
          <ul className="space-y-3 text-indigo-100">
            <li>• Let's spend less time on YouTube around 2pm</li>
            <li>• You switched apps/tabs every ~90s on average</li>
            <li>• You've never worked more than 7 min without switching today</li>
          </ul>
        </div>

        <div className="bg-indigo-400 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={20} />
            <span className="font-bold">Suggested Actions</span>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-white text-indigo-600 rounded-xl py-2 font-medium hover:bg-indigo-50 transition-colors">
              Block Social Media (2pm - 4pm)
            </button>
            <button className="w-full bg-white text-indigo-600 rounded-xl py-2 font-medium hover:bg-indigo-50 transition-colors">
              Start 25min Focus Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;