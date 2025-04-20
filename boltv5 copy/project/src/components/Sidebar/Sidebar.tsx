import React from 'react';
import ProfileSection from './ProfileSection';
import Navigation from './Navigation';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from '../ThemeToggle';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 fixed top-0 left-0 h-screen flex flex-col 
                    bg-gradient-to-b from-purple-900 to-indigo-900 
                    dark:from-gray-900 dark:to-gray-800 
                    text-white p-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          am i cooked.chat
        </h1>
        <ThemeToggle />
      </div>
      
      <ProfileSection />
      <LanguageSelector />
    </div>
  );
};

export default Sidebar;
