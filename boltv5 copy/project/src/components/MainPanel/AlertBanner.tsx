import React, { useState } from 'react';
import { AlertTriangle, X, CheckCircle } from 'lucide-react';
import { alertNotifications } from '../../data/mockData';

const AlertBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const alert = alertNotifications[0]; // You can modify this logic to show different alerts based on conditions

  if (!visible) return null;

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-400',
          hoverColor: 'hover:text-green-100',
          Icon: CheckCircle
        };
      case 'warning':
        return {
          bgColor: 'bg-amber-400',
          hoverColor: 'hover:text-amber-100',
          Icon: AlertTriangle
        };
      default:
        return {
          bgColor: 'bg-amber-400',
          hoverColor: 'hover:text-amber-100',
          Icon: AlertTriangle
        };
    }
  };

  const { bgColor, hoverColor, Icon } = getAlertStyles(alert.type);

  return (
    <div className={`${bgColor} rounded-3xl p-6 mb-6 text-white shadow-lg`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <Icon size={24} className="mt-1" />
          <div>
            <p className="font-bold text-lg">
              {alert.type === 'success' ? 'Nice work! 🌟' : 'Hey, heads up! 👋'}
            </p>
            <p className="mt-1">{alert.message}</p>
          </div>
        </div>
        <button 
          onClick={() => setVisible(false)}
          className={`text-white ${hoverColor} transition-colors`}
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;
