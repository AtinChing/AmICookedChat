import React from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockUserData } from '../../data/mockData';

const ProfileSection: React.FC = () => {
  const { t } = useLanguage();
  const { name, clarityScore } = mockUserData;

  return (
    <div className="flex items-center p-4 mb-6 bg-opacity-20 bg-white rounded-lg">
      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 mr-3">
        <User size={20} />
      </div>
      <div>
        <h3 className="text-white font-medium">{name}</h3>
        <div className="flex items-center">
          <span className="text-xs text-teal-100">{t('mentalClarity')}:</span>
          <div className="ml-2 w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: `${clarityScore}%`, 
                backgroundColor: clarityScore > 60 ? '#4ADE80' : clarityScore > 30 ? '#FBBF24' : '#F87171' 
              }}
            ></div>
          </div>
          <span className="ml-1 text-xs text-white">{clarityScore}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;