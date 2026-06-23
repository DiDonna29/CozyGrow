
"use client"

import React from 'react';
import { Season } from '@/lib/crops';
import { useAppContext } from './AppContext';
import { Button } from '@/components/ui/button';
import { Sprout, Sun, Leaf, Snowflake } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SeasonNavProps {
  currentSeason: Season;
  onSeasonChange: (season: Season) => void;
}

export const SeasonNav: React.FC<SeasonNavProps> = ({ currentSeason, onSeasonChange }) => {
  const { t } = useAppContext();

  const seasons = [
    { id: 'spring' as Season, label: t.spring, icon: Sprout, color: 'text-green-500' },
    { id: 'summer' as Season, label: t.summer, icon: Sun, color: 'text-amber-400' },
    { id: 'autumn' as Season, label: t.autumn, icon: Leaf, color: 'text-orange-500' },
    { id: 'winter' as Season, label: t.winter, icon: Snowflake, color: 'text-blue-300' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {seasons.map((season) => (
        <Button
          key={season.id}
          onClick={() => onSeasonChange(season.id)}
          variant={currentSeason === season.id ? 'default' : 'outline'}
          className={cn(
            "h-16 px-6 rounded-2xl border-2 transition-all duration-300 flex items-center gap-3 text-lg font-headline",
            currentSeason === season.id 
              ? "scale-105 shadow-md border-primary" 
              : "hover:bg-card/30 hover:scale-102 border-border"
          )}
        >
          <season.icon className={cn("w-6 h-6", currentSeason === season.id ? "text-primary-foreground" : season.color)} />
          {season.label}
        </Button>
      ))}
    </div>
  );
};
