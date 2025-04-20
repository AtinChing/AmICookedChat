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
          bgColor: 'bg-green-500',
          hoverBgColor: 'hover:bg-amber-500',
          hoverTextColor: 'hover:text-green-100',
          Icon: CheckCircle
        };
      case 'warning':
      default:
        return {
          bgColor: 'bg-yellow-500',
          hoverBgColor: 'hover:bg-amber-600',
          hoverTextColor: 'hover:text-yellow-100',
          Icon: AlertTriangle
        };
    }
  };  

  const { bgColor, hoverBgColor, hoverTextColor, Icon } = getAlertStyles(alert.type);

  return (
    <div className={`${bgColor} ${hoverBgColor} transition-colors duration-200 rounded-3xl p-6 mb-6 text-white shadow-lg group`}>
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
          className={`text-white ${hoverTextColor} transition-colors duration-200`}
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;