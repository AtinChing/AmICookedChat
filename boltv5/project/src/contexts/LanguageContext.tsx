import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from '../types';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    dashboard: 'Dashboard',
    focusTimeline: 'Focus Timeline',
    insights: 'Insights',
    tasks: 'Tasks',
    community: 'Community',
    settings: 'Settings',
    welcome: 'Welcome',
    todayGoal: 'Today\'s Goal',
    startFocus: 'Start Focus',
    takeBreak: 'Take Break',
    mentalClarity: 'Mental Clarity',
    suggestedContent: 'Suggested Content',
    currentActivity: 'Current Activity',
    moodCheckIn: 'How are you feeling?',
    alert: 'You\'ve switched 15 tabs in 20 minutes – try a 5-minute focus block.'
  },
  es: {
    dashboard: 'Panel',
    focusTimeline: 'Línea de Tiempo',
    insights: 'Estadísticas',
    tasks: 'Tareas',
    community: 'Comunidad',
    settings: 'Configuración',
    welcome: 'Bienvenido',
    todayGoal: 'Meta de Hoy',
    startFocus: 'Iniciar Enfoque',
    takeBreak: 'Tomar Descanso',
    mentalClarity: 'Claridad Mental',
    suggestedContent: 'Contenido Sugerido',
    currentActivity: 'Actividad Actual',
    moodCheckIn: '¿Cómo te sientes?',
    alert: 'Has cambiado 15 pestañas en 20 minutos - intenta un bloque de enfoque de 5 minutos.'
  },
  ar: {
    dashboard: 'لوحة المعلومات',
    focusTimeline: 'جدول التركيز',
    insights: 'الإحصائيات',
    tasks: 'المهام',
    community: 'المجتمع',
    settings: 'الإعدادات',
    welcome: 'مرحباً',
    todayGoal: 'هدف اليوم',
    startFocus: 'ابدأ التركيز',
    takeBreak: 'خذ استراحة',
    mentalClarity: 'وضوح ذهني',
    suggestedContent: 'محتوى مقترح',
    currentActivity: 'النشاط الحالي',
    moodCheckIn: 'كيف تشعر؟',
    alert: 'لقد قمت بتبديل 15 تبويب في 20 دقيقة - جرب فترة تركيز لمدة 5 دقائق.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};