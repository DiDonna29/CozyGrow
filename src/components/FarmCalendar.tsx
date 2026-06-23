
"use client"

import React from 'react';
import { useAppContext } from './AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';

export const FarmCalendar: React.FC = () => {
  const { currentDay, nextDay, t } = useAppContext();

  // Simple logic to determine season from day (28 days per season)
  const seasons: ('spring' | 'summer' | 'autumn' | 'winter')[] = ['spring', 'summer', 'autumn', 'winter'];
  const seasonIndex = Math.floor((currentDay - 1) / 28) % 4;
  const season = seasons[seasonIndex];
  const dayInSeason = ((currentDay - 1) % 28) + 1;

  return (
    <Card className="border-2 border-primary/20 bg-card/60 backdrop-blur-md shadow-lg overflow-hidden w-full">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="flex items-center gap-3 font-headline text-2xl text-foreground truncate">
          <CalendarIcon className="w-6 h-6 text-primary flex-shrink-0" />
          <span className="truncate">{t.seasonalInfo}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4 overflow-hidden">
          <div className="bg-background/80 w-full py-4 rounded-2xl border shadow-inner px-2">
            <p className="text-sm font-body uppercase tracking-widest text-muted-foreground mb-1 truncate">
              {t[season]}
            </p>
            <h4 className="text-3xl md:text-5xl font-headline font-black text-primary break-all">
              Day {dayInSeason}
            </h4>
          </div>
          
          <Button 
            onClick={nextDay}
            className="w-full h-14 rounded-2xl text-lg font-headline shadow-lg hover:scale-105 transition-transform flex items-center justify-center px-4"
          >
            <span className="truncate">
              {t.language === 'en' ? 'Sleep / Next Day' : 'Dormir / Siguiente Día'}
            </span>
            <ArrowRight className="ml-2 w-5 h-5 flex-shrink-0" />
          </Button>
          
          <p className="text-xs text-muted-foreground italic font-body truncate w-full">
            {t.language === 'en' ? 'Total Days in Farm:' : 'Días Totales en Granja:'} {currentDay}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
