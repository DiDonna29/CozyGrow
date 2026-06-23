
"use client"

import React, { useState } from 'react';
import { AppProvider, useAppContext } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { SeasonNav } from '@/components/SeasonNav';
import { CropCard } from '@/components/CropCard';
import { TaskBoard } from '@/components/TaskBoard';
import { Season, CROPS } from '@/lib/crops';
import Image from 'next/image';

const DashboardContent = () => {
  const { t } = useAppContext();
  const [season, setSeason] = useState<Season>('spring');

  const bannerImages = {
    spring: 'https://picsum.photos/seed/spring-farm-new/1200/400',
    summer: 'https://picsum.photos/seed/summer-farm-new/1200/400',
    autumn: 'https://picsum.photos/seed/autumn-farm-new/1200/400',
    winter: 'https://picsum.photos/seed/winter-farm-new/1200/400',
  };

  const getSeasonDesc = () => {
    switch (season) {
      case 'spring': return t.seasonDesc.spring;
      case 'summer': return t.seasonDesc.summer;
      case 'autumn': return t.seasonDesc.autumn;
      case 'winter': return t.seasonDesc.winter;
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 pb-20">
      <Header />
      
      <div className="relative w-full h-[250px] md:h-[350px] rounded-[2rem] overflow-hidden mb-8 shadow-2xl border-4 border-white/20">
        <Image 
          src={bannerImages[season]} 
          alt={season} 
          fill
          className="object-cover transition-all duration-1000 ease-in-out scale-105"
          priority
          data-ai-hint={`${season} farm`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <h2 className="text-4xl md:text-5xl font-headline font-black text-foreground drop-shadow-lg mb-2 capitalize">
            {t[season]}
          </h2>
          <p className="text-lg md:text-xl font-body text-foreground/80 max-w-2xl italic">
            {getSeasonDesc()}
          </p>
        </div>
      </div>

      <SeasonNav currentSeason={season} onSeasonChange={setSeason} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 items-start">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-12 bg-primary rounded-full"></div>
            <h3 className="text-2xl font-headline font-bold text-foreground">
              {t.optimalCrops}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {CROPS[season].map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-8">
          <TaskBoard />
        </div>
      </div>

      <footer className="mt-20 py-8 border-t border-border/30 text-center text-muted-foreground font-body text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} {t.title} • Made with 🧡 for cozy farmers</p>
      </footer>
    </div>
  );
};

export default function Home() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
