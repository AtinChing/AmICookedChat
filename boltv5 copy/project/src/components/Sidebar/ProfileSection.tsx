import React from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../hooks/useUser';
import { mockUserData } from '../../data/mockData';

const { clarityScore } = mockUserData;

const ProfileSection: React.FC = () => {
  const { t } = useLanguage();
  const { firstName, picture } = useUser();
  clarityScore; // This should eventually come from your actual user data

  return (
    <div className="flex items-center p-4 mb-6 bg-opacity-10 bg-purple-400 rounded-lg">
      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 mr-3 overflow-hidden">
        {picture ? (
          <img 
            src={picture} 
            alt={firstName}
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={20} />
        )}
      </div>
      <div>
        <h3 className="text-black font-medium">{firstName}</h3>
        <div className="flex items-center">
          <span className="text-xs text-teal-600">{t('Clarity')}:</span>
          <div className="ml-2 w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: `${clarityScore}%`, 
                backgroundColor: clarityScore > 70 ? '#4ADE80' : clarityScore > 40 ? '#FBBF24' : '#F87171' 
              }}
            ></div>
          </div>
          <span className="ml-1 text-xs text-black">{clarityScore}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
