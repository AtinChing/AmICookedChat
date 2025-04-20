import React from 'react';
import { Monitor, AlertCircle, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { currentActivity } from '../../data/mockData';

const ActivityTracker: React.FC = () => {
  const { t } = useLanguage();
  const { name, category, isDistractive } = currentActivity;

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm mb-6 border border-gray-100">
      <h2 className="text-gray-700 text-lg font-medium mb-3 flex items-center">
        <Monitor size={18} className="mr-2 text-teal-600" />
        {t('currentActivity')}
      </h2>
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-800">{name}</h3>
          <span className="text-sm text-gray-500">{category}</span>
        </div>
        
        <div className={`flex items-center px-3 py-1 rounded-full ${
          isDistractive 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {isDistractive ? (
            <>
              <AlertCircle size={14} className="mr-1" />
              <span className="text-xs font-medium">Distractive</span>
            </>
          ) : (
            <>
              <Check size={14} className="mr-1" />
              <span className="text-xs font-medium">Productive</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTracker;