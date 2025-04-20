import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../types';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    ///{ code: 'es', label: 'ES' },
    ///{ code: 'ar', label: 'AR' }
  ];

  return (
    <div className="mt-auto p-4">
      <div className="mt-1 flex space-x-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2 py-1 text-xs rounded-md transition-colors duration-200 ${
              language === lang.code
                ? 'bg-teal-600 text-white'
                : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;