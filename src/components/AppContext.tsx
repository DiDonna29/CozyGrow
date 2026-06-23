
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';

type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: typeof translations.en;
  currentDay: number;
  nextDay: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('light');
  const [currentDay, setCurrentDay] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedDay = localStorage.getItem('currentDay');
    
    if (savedLang) setLanguage(savedLang);
    if (savedTheme) setTheme(savedTheme);
    if (savedDay) setCurrentDay(parseInt(savedDay));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
    localStorage.setItem('currentDay', currentDay.toString());
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [language, theme, currentDay, mounted]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const nextDay = () => setCurrentDay(prev => prev + 1);

  const t = translations[language];

  if (!mounted) {
    return <div className="min-h-screen bg-[#FFF8E1]"></div>;
  }

  return (
    <AppContext.Provider value={{ 
      language, 
      setLanguage, 
      theme, 
      toggleTheme, 
      t, 
      currentDay, 
      nextDay 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
