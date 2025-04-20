import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockUserData } from '../../data/mockData';

const WelcomeHeader: React.FC = () => {
  const { t } = useLanguage();
  const { name, dailyGoal } = mockUserData;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {t('welcome')}, {name}!
      </h1>
      <div className="mt-2">
        <h2 className="text-sm font-medium text-gray-500">{t('todayGoal')}</h2>
        <p className="text-gray-700 font-medium">{dailyGoal}</p>
      </div>
    </div>
  );
};

export default WelcomeHeader;