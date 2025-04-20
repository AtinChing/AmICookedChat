import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { alertNotifications } from '../../data/mockData';

const AlertBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  
  if (!visible || alertNotifications.length === 0) return null;
  
  const alert = alertNotifications[0];

  return (
    <div className="bg-amber-400 rounded-3xl p-6 mb-6 text-white shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <AlertTriangle size={24} className="mt-1" />
          <div>
            <p className="font-bold text-lg">Hey, heads up! 👋</p>
            <p className="mt-1">{alert.message}</p>
            {alert.actionable && (
              <button className="mt-3 px-4 py-2 bg-white text-amber-500 rounded-xl font-medium hover:bg-amber-50 transition-colors">
                {alert.action}
              </button>
            )}
          </div>
        </div>
        <button 
          onClick={() => setVisible(false)}
          className="text-white hover:text-amber-100 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;