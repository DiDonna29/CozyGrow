
"use client"

import React from 'react';
import { Crop } from '@/lib/crops';
import { useAppContext } from './AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Coins } from 'lucide-react';

interface CropCardProps {
  crop: Crop;
}

export const CropCard: React.FC<CropCardProps> = ({ crop }) => {
  const { language, t } = useAppContext();
  
  const name = language === 'en' ? crop.nameEn : crop.nameEs;
  const description = language === 'en' ? crop.descriptionEn : crop.descriptionEs;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 bg-card overflow-hidden border-2 border-transparent hover:border-primary/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
          {name}
        </CardTitle>
        <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">
          {crop.icon}
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {crop.growthTime > 0 ? `${crop.growthTime} ${t.growthTime}` : '---'}
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-primary">
            <Coins className="w-4 h-4" />
            {crop.value} <span className="text-[10px] uppercase ml-0.5">{t.gold}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
