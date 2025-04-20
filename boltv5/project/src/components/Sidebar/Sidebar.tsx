import React from 'react';
import ProfileSection from './ProfileSection';
import Navigation from './Navigation';
import LanguageSelector from './LanguageSelector';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 fixed top-0 left-0 h-screen flex flex-col bg-gradient-to-b from-purple-900 to-indigo-900 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">
          am i cooked.chat
        </h1>
      </div>
      
      <ProfileSection />
      <Navigation />
      <LanguageSelector />
    </div>
  );
};

export default Sidebar;