import React from 'react';
import { LayoutDashboard, Clock, LineChart, CheckSquare, Users, Settings } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { NavItem } from '../../types';

const Navigation: React.FC = () => {
  const { t } = useLanguage();
  
  const navItems: NavItem[] = [
    { name: t('dashboard'), icon: 'dashboard', path: '/' },
    { name: t('focusTimeline'), icon: 'timeline', path: '/timeline' },
    { name: t('insights'), icon: 'insights', path: '/insights' },
    { name: t('tasks'), icon: 'tasks', path: '/tasks' },
    { name: t('community'), icon: 'community', path: '/community' },
    { name: t('settings'), icon: 'settings', path: '/settings' },
  ];

  const getIcon = (iconName: string, isActive: boolean) => {
    const activeClass = isActive ? 'text-white' : 'text-gray-300 group-hover:text-white';
    const iconSize = 20;

    switch (iconName) {
      case 'dashboard':
        return <LayoutDashboard size={iconSize} className={activeClass} />;
      case 'timeline':
        return <Clock size={iconSize} className={activeClass} />;
      case 'insights':
        return <LineChart size={iconSize} className={activeClass} />;
      case 'tasks':
        return <CheckSquare size={iconSize} className={activeClass} />;
      case 'community':
        return <Users size={iconSize} className={activeClass} />;
      case 'settings':
        return <Settings size={iconSize} className={activeClass} />;
      default:
        return <LayoutDashboard size={iconSize} className={activeClass} />;
    }
  };

  return (
    <nav className="mt-6">
      <ul>
        {navItems.map((item, index) => {
          const isActive = index === 0;
          return (
            <li key={item.path} className="mb-2">
              <a 
                href={item.path} 
                className={`flex items-center p-3 rounded-lg group transition-colors duration-200 ${
                  isActive 
                    ? 'bg-teal-700 bg-opacity-60 text-white' 
                    : 'text-gray-300 hover:bg-teal-700 hover:bg-opacity-40'
                }`}
              >
                {getIcon(item.icon, isActive)}
                <span className="ml-3 font-medium">{item.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;