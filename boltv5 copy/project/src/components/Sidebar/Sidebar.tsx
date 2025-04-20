import React from 'react';
import ProfileSection from './ProfileSection';
import Navigation from './Navigation';
import LanguageSelector from './LanguageSelector';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 fixed top-0 left-0 h-screen flex flex-col justify-between bg-gradient-to-b from-purple-100 to-indigo-100 text-black px-6 py-10 rounded-r-3xl shadow-xl">
      <div className="space-y-10">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-center leading-tight">
            AmICooked
            <span className="text-indigo-300">.chat</span>
          </h1>
        </div>

        <div className="animate-fadeIn">
        <ProfileSection />
        </div>

        {/* Stats Prompt */}
        <div className="text-center space-y-2 animate-fadeIn" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          <p className="text-base text-black/70 font-medium">Check your stats!</p>
          <div className="text-3xl text-black/30">→</div>
        </div>
      </div>

      {/* Footer with Devpost */}
        <div className="text-xs text-black/50 text-center pt-6 border-t border-black/10">
          <p>Built for HackDavis 2025 🌍</p>
          <a
            href="https://devpost.com/software/amicooked-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline mt-2 inline-block"
          >
            View on Devpost ↗
          </a>
        </div>
    </div>
  );
};

export default Sidebar;
