
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
    <Card className={`group transition-all duration-300 bg-card overflow-hidden border-2 ${isPlanted ? 'border-primary shadow-lg' : 'border-transparent hover:border-primary/30 hover:shadow-xl'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
          {name}
        </CardTitle>
        <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">
          {isPlanted && progress < 100 ? '🌱' : isPlanted && progress >= 100 ? crop.icon : crop.icon}
        </span>
      </CardHeader>
      <CardContent>
        {isPlanted ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
              <span>{progress >= 100 ? (language === 'en' ? 'Ready to harvest!' : '¡Listo para cosechar!') : (language === 'en' ? 'Growing...' : 'Creciendo...')}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            {progress >= 100 && (
              <Button onClick={onHarvest} className="w-full bg-green-500 hover:bg-green-600">
                {language === 'en' ? 'Harvest' : 'Cosechar'}
              </Button>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-4">
              {description}
            </p>
            <div className="flex justify-between items-center pt-2 border-t border-border/50 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                {crop.growthTime > 0 ? `${crop.growthTime} ${t.growthTime}` : '---'}
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-primary">
                <Coins className="w-4 h-4" />
                {crop.value} <span className="text-[10px] uppercase ml-0.5">{t.gold}</span>
              </div>
            </div>
            <Button onClick={onPlant} variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary hover:text-white group">
              <Sprout className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              {language === 'en' ? 'Plant Seeds' : 'Plantar Semillas'}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
