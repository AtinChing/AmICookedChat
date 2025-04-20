import React from 'react';
import WelcomeHeader from './WelcomeHeader';
import ActivityTracker from './ActivityTracker';
import FocusTimeline from './FocusTimeline';
import AlertBanner from './AlertBanner';
import MentalClarityScore from './MentalClarityScore';
import DistractionPatterns from './DistractionPatterns';
import ImprovementSuggestions from './ImprovementSuggestions';

const MainPanel: React.FC = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-purple-50 to-white">
      <WelcomeHeader />
      <AlertBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ActivityTracker />
          <FocusTimeline />
          <DistractionPatterns />
        </div>
        
        <div className="space-y-6">
          <MentalClarityScore />
          <ImprovementSuggestions />
        </div>
      </div>
    </div>
  );
};

export default MainPanel;