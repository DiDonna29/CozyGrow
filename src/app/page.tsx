
"use client"

import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { SeasonNav } from '@/components/SeasonNav';
import { CropCard } from '@/components/CropCard';
import { TaskBoard } from '@/components/TaskBoard';
import { FarmCalendar } from '@/components/FarmCalendar';
import { Season, CROPS, PlantedCrop } from '@/lib/crops';
import Image from 'next/image';

const DashboardContent = () => {
  const { t, currentDay } = useAppContext();
  const [season, setSeason] = useState<Season>('spring');
  const [plantedCrops, setPlantedCrops] = useState<PlantedCrop[]>([]);

  // Update visual season based on simulated day if needed, 
  // but keep manual override for "Seed Catalog" browsing
  useEffect(() => {
    const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
    const autoSeason = seasons[Math.floor((currentDay - 1) / 28) % 4];
    setSeason(autoSeason);
  }, [currentDay]);

  useEffect(() => {
    const saved = localStorage.getItem('plantedCrops');
    if (saved) setPlantedCrops(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('plantedCrops', JSON.stringify(plantedCrops));
  }, [plantedCrops]);

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

  const plantCrop = (cropId: string) => {
    const crop = CROPS[season].find(c => c.id === cropId);
    if (!crop) return;
    
    const newPlanted: PlantedCrop = {
      instanceId: Math.random().toString(36).substr(2, 9),
      cropId,
      plantedDay: currentDay,
      harvestDay: currentDay + crop.growthTime,
      season
    };
    setPlantedCrops([...plantedCrops, newPlanted]);
  };

  const harvestCrop = (instanceId: string) => {
    setPlantedCrops(plantedCrops.filter(p => p.instanceId !== instanceId));
    // Here you could add "Gold" logic
  };

  const getCropProgress = (planted: PlantedCrop) => {
    const crop = [...CROPS.spring, ...CROPS.summer, ...CROPS.autumn, ...CROPS.winter].find(c => c.id === planted.cropId);
    if (!crop || crop.growthTime === 0) return 100;
    
    const elapsed = currentDay - planted.plantedDay;
    const progress = (elapsed / crop.growthTime) * 100;
    return Math.min(100, Math.max(0, progress));
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
        {/* Sidebar: Calendar */}
        <div className="lg:col-span-3 space-y-6">
          <FarmCalendar />
          <div className="bg-primary/5 p-6 rounded-3xl border-2 border-primary/10">
            <h4 className="font-headline font-bold text-lg mb-2">{t.language === 'en' ? 'Farm Tips' : 'Consejos de Granja'}</h4>
            <p className="text-sm font-body text-muted-foreground italic">
              {t.language === 'en' 
                ? "Crops will only grow when you sleep. Make sure to check your fields daily!" 
                : "Los cultivos solo crecerán cuando duermas. ¡Asegúrate de revisar tus campos a diario!"}
            </p>
          </div>
        </div>

        {/* Center: Tasks & Growing Crops */}
        <div className="lg:col-span-6 space-y-8">
          <TaskBoard />
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-1 w-12 bg-green-500 rounded-full"></div>
              <h3 className="text-2xl font-headline font-bold text-foreground">
                {t.language === 'en' ? 'My Growing Crops' : 'Mis Cultivos en Crecimiento'}
              </h3>
            </div>
            {plantedCrops.length === 0 ? (
              <div className="text-center py-12 bg-muted/20 rounded-3xl border-2 border-dashed border-muted-foreground/20">
                <p className="font-body text-muted-foreground italic">
                  {t.language === 'en' ? 'No crops planted yet. Check the catalog below!' : 'No hay cultivos plantados. ¡Revisa el catálogo abajo!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plantedCrops.map((p) => {
                  const crop = [...CROPS.spring, ...CROPS.summer, ...CROPS.autumn, ...CROPS.winter].find(c => c.id === p.cropId);
                  if (!crop) return null;
                  return (
                    <CropCard 
                      key={p.instanceId} 
                      crop={crop} 
                      isPlanted 
                      progress={getCropProgress(p)} 
                      onHarvest={() => harvestCrop(p.instanceId)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Seed Catalog (Current Selection) */}
        <div className="lg:col-span-3">
          <div className="sticky top-8 space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <h3 className="text-2xl font-headline font-bold text-foreground">
                {t.optimalCrops}
              </h3>
            </div>
            <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20">
              {CROPS[season].map((crop) => (
                <CropCard 
                  key={crop.id} 
                  crop={crop} 
                  onPlant={() => plantCrop(crop.id)} 
                />
              ))}
            </div>
          </div>
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
