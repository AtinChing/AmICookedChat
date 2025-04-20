import React from 'react';

interface WelcomeHeaderProps {
  userName: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ userName }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, {userName}!
      </h1>
      <p className="text-gray-600 mt-2">
        Track your focus and improve your productivity
      </p>
    </div>
  );
};

export default WelcomeHeader;
