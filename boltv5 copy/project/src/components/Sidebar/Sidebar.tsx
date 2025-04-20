import React from 'react';
import ProfileSection from './ProfileSection';
import Navigation from './Navigation';
import LanguageSelector from './LanguageSelector';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 fixed top-0 left-0 h-screen flex flex-col bg-gradient-to-b from-purple-100 to-indigo-100 text-black p-4 rounded-r-3xl shadow-xl">
      <div className="mb-8">
        <h1 className="text-xl font-bold">
        <span>AmICooked</span>
        <span className="text-indigo-300">.chat</span>
        </h1>
      </div>
      
      <ProfileSection />
      <LanguageSelector />
    </div>
  );
};

export default Sidebar;