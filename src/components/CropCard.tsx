
"use client"

import React from 'react';
import { Crop } from '@/lib/crops';
import { useAppContext } from './AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Coins, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface CropCardProps {
  crop: Crop;
  isPlanted?: boolean;
  progress?: number;
  onPlant?: () => void;
  onHarvest?: () => void;
}

export const CropCard: React.FC<CropCardProps> = ({ crop, isPlanted, progress = 0, onPlant, onHarvest }) => {
  const { language, t } = useAppContext();
  
  const name = language === 'en' ? crop.nameEn : crop.nameEs;
  const description = language === 'en' ? crop.descriptionEn : crop.descriptionEs;

  return (
    <Card className={`group transition-all duration-300 bg-card overflow-hidden border-2 w-full ${isPlanted ? 'border-primary shadow-lg' : 'border-transparent hover:border-primary/30 hover:shadow-xl'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 overflow-hidden gap-2">
        <CardTitle className="text-lg md:text-xl font-headline font-bold text-foreground group-hover:text-primary transition-colors truncate">
          {name}
        </CardTitle>
        <span className="text-3xl md:text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
          {isPlanted && progress < 100 ? '🌱' : isPlanted && progress >= 100 ? crop.icon : crop.icon}
        </span>
      </CardHeader>
      <CardContent className="overflow-hidden">
        {isPlanted ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
              <span className="truncate">{progress >= 100 ? (language === 'en' ? 'Ready!' : '¡Listo!') : (language === 'en' ? 'Growing...' : 'Creciendo...')}</span>
              <span className="flex-shrink-0">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 w-full" />
            {progress >= 100 && (
              <Button onClick={onHarvest} className="w-full bg-green-500 hover:bg-green-600 truncate">
                {language === 'en' ? 'Harvest' : 'Cosechar'}
              </Button>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-4 break-words">
              {description}
            </p>
            <div className="flex justify-between items-center pt-2 border-t border-border/50 mb-4 gap-2">
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold text-muted-foreground bg-background/50 px-2 py-1 rounded-full truncate">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{crop.growthTime > 0 ? `${crop.growthTime} ${t.growthTime}` : '---'}</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-primary flex-shrink-0">
                <Coins className="w-4 h-4" />
                <span>{crop.value}</span> <span className="text-[10px] uppercase">{t.gold}</span>
              </div>
            </div>
            <Button onClick={onPlant} variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary hover:text-white group px-2">
              <Sprout className="w-4 h-4 mr-2 group-hover:animate-bounce flex-shrink-0" />
              <span className="truncate">{language === 'en' ? 'Plant Seeds' : 'Plantar Semillas'}</span>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
