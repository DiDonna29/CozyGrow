
"use client"

import React from 'react';
import { useAppContext } from './AppContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sun, Moon, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage, t } = useAppContext();

  return (
    <header className="w-full flex flex-col md:flex-row justify-between items-center py-8 px-6 bg-card/50 backdrop-blur-sm rounded-b-3xl shadow-lg mb-8 transition-all duration-500">
      <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary animate-in fade-in slide-in-from-top-4 duration-700">
          {t.title}
        </h1>
        <p className="text-muted-foreground font-body italic mt-1">
          {t.tagline}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center space-x-2 bg-background/50 p-2 rounded-full px-4 border">
          <Globe className="w-4 h-4 text-primary" />
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-full h-8 px-3 font-body ${language === 'en' ? 'bg-primary text-primary-foreground shadow-sm' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-full h-8 px-3 font-body ${language === 'es' ? 'bg-primary text-primary-foreground shadow-sm' : ''}`}
            onClick={() => setLanguage('es')}
          >
            ES
          </Button>
        </div>

        <div className="flex items-center space-x-3 bg-background/50 p-2 rounded-full px-4 border">
          <Label htmlFor="theme-mode" className="cursor-pointer">
            {theme === 'light' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-amber-200" />}
          </Label>
          <Switch 
            id="theme-mode" 
            checked={theme === 'dark'} 
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </header>
  );
};
