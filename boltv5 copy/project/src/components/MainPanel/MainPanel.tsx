import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ActivityTracker from './ActivityTracker';
import FocusTimeline from './FocusTimeline';
import AlertBanner from './AlertBanner';
import MentalClarityScore from './MentalClarityScore';
import DistractionPatterns from './DistractionPatterns';
import ImprovementSuggestions from './ImprovementSuggestions';

const MainPanel: React.FC = () => {
  const { user } = useAuth0();

  return (
    <div className="flex-1 ml-64 p-6 overflow-y-auto bg-gradient-to-b from-purple-50 to-white">
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
