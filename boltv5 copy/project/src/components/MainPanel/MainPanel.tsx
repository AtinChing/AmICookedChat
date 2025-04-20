import React, { useState, useEffect } from 'react';
import { Play, StopCircle } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import AlertBanner from './AlertBanner';
import ActivityTracker from './ActivityTracker';
import FocusTimeline from './FocusTimeline';
import DistractionPatterns from './DistractionPatterns';
import MentalClarityScore from './MentalClarityScore';
import ImprovementSuggestions from './ImprovementSuggestions';

const MainPanel: React.FC = () => {
  const { user } = useAuth0();
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check initial status when component mounts
  useEffect(() => {
    checkTrackingStatus();
  }, []);

  const checkTrackingStatus = async () => {
    try {
      const response = await fetch('http://localhost:5001/status');
      const data = await response.json();
      setIsTracking(data.is_tracking);
    } catch (error) {
      console.error('Error checking status:', error);
      setError('Failed to connect to server');
    }
  };

  const toggleTracking = async () => {
    try {
      setError(null);
      const endpoint = isTracking ? 'stop' : 'start';
      const response = await fetch(`http://localhost:5001/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        setIsTracking(!isTracking);
        console.log(`Server ${endpoint}ed successfully`);
      } else {
        setError(data.message);
        console.error(`Failed to ${endpoint} server:`, data.message);
      }
    } catch (error) {
      setError(`Failed to ${isTracking ? 'stop' : 'start'} tracking`);
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex-1 ml-64 p-6 overflow-y-auto bg-gradient-to-b from-purple-50 to-white">
      <AlertBanner />
      
      <div className="mb-6">
        <button
          onClick={toggleTracking}
          className={`${
            isTracking 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white px-6 py-3 rounded-lg 
          font-semibold shadow-md hover:shadow-lg transition-all duration-200 
          flex items-center gap-2`}
        >
          {isTracking ? (
            <>
              <StopCircle size={20} />
              Stop Tracking
            </>
          ) : (
            <>
              <Play size={20} />
              Start Tracking
            </>
          )}
        </button>
        {error && (
          <p className="mt-2 text-red-600 text-sm">{error}</p>
        )}
      </div>

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
