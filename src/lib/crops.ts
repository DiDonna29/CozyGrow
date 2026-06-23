
export type Crop = {
  id: string;
  nameEn: string;
  nameEs: string;
  growthTime: number;
  value: number;
  descriptionEn: string;
  descriptionEs: string;
  icon: string;
};

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type PlantedCrop = {
  instanceId: string;
  cropId: string;
  plantedDay: number;
  harvestDay: number;
  season: Season;
};

export const CROPS: Record<Season, Crop[]> = {
  spring: [
    { id: 'parsnip', nameEn: 'Parsnip', nameEs: 'Chirivía', growthTime: 4, value: 35, icon: '🥕', descriptionEn: 'A spring tuber that is easy to grow.', descriptionEs: 'Un tubérculo de primavera fácil de cultivar.' },
    { id: 'kale', nameEn: 'Kale', nameEs: 'Col rizada', growthTime: 6, value: 110, icon: '🥬', descriptionEn: 'The waxy leaves are great in soups.', descriptionEs: 'Sus hojas son excelentes en sopas.' },
    { id: 'cauliflower', nameEn: 'Cauliflower', nameEs: 'Coliflor', growthTime: 12, value: 175, icon: '🥦', descriptionEn: 'Takes a long time to grow, but worth it.', descriptionEs: 'Tarda en crecer, pero vale la pena.' },
    { id: 'potato', nameEn: 'Potato', nameEs: 'Patata', growthTime: 6, value: 80, icon: '🥔', descriptionEn: 'A staple crop for any spring farm.', descriptionEs: 'Un cultivo básico para cualquier granja.' }
  ],
  summer: [
    { id: 'blueberry', nameEn: 'Blueberry', nameEs: 'Arándano', growthTime: 13, value: 50, icon: '🫐', descriptionEn: 'Produces multiple berries per harvest.', descriptionEs: 'Produce varios frutos por cosecha.' },
    { id: 'melon', nameEn: 'Melon', nameEs: 'Melón', growthTime: 12, value: 250, icon: '🍉', descriptionEn: 'Sweet and juicy, a summer favorite.', descriptionEs: 'Dulce y jugoso, un favorito del verano.' },
    { id: 'tomato', nameEn: 'Tomato', nameEs: 'Tomate', growthTime: 11, value: 60, icon: '🍅', descriptionEn: 'Keeps producing after reaching maturity.', descriptionEs: 'Sigue produciendo después de madurar.' },
    { id: 'corn', nameEn: 'Corn', nameEs: 'Maíz', growthTime: 14, value: 50, icon: '🌽', descriptionEn: 'Grows in both Summer and Autumn.', descriptionEs: 'Crece tanto en verano como en otoño.' }
  ],
  autumn: [
    { id: 'pumpkin', nameEn: 'Pumpkin', nameEs: 'Calabaza', growthTime: 13, value: 320, icon: '🎃', descriptionEn: 'Prized for its seeds and festive spirit.', descriptionEs: 'Apreciada por sus semillas y espíritu festivo.' },
    { id: 'eggplant', nameEn: 'Eggplant', nameEs: 'Berenjena', growthTime: 5, value: 60, icon: '🍆', descriptionEn: 'A tasty and healthy autumn vegetable.', descriptionEs: 'Un vegetal de otoño sabroso y saludable.' },
    { id: 'yam', nameEn: 'Yam', nameEs: 'Batata', growthTime: 10, value: 160, icon: '🍠', descriptionEn: 'An earthy starch that stores well.', descriptionEs: 'Un almidón terroso que se conserva bien.' },
    { id: 'cranberry', nameEn: 'Cranberry', nameEs: 'Arándano rojo', growthTime: 7, value: 75, icon: '🍒', descriptionEn: 'Produces a lot of berries very quickly.', descriptionEs: 'Produce muchas bayas muy rápidamente.' }
  ],
  winter: [
    { id: 'winter-root', nameEn: 'Winter Root', nameEs: 'Raíz invernal', growthTime: 0, value: 70, icon: '❄️', descriptionEn: 'Can be found foraged in the snow.', descriptionEs: 'Se puede encontrar recolectando en la nieve.' },
    { id: 'snow-yam', nameEn: 'Snow Yam', nameEs: 'Batata de nieve', growthTime: 0, value: 100, icon: '🍠', descriptionEn: 'A rare treat hidden beneath the frost.', descriptionEs: 'Un manjar raro escondido bajo la escarcha.' },
    { id: 'crystal-fruit', nameEn: 'Crystal Fruit', nameEs: 'Fruta de cristal', growthTime: 0, value: 150, icon: '💎', descriptionEn: 'Shimmers like freshly fallen ice.', descriptionEs: 'Brilla como hielo recién caído.' },
    { id: 'holly', nameEn: 'Holly', nameEs: 'Acebo', growthTime: 0, value: 80, icon: '🌿', descriptionEn: 'Festive red berries for winter decor.', descriptionEs: 'Bayas rojas festivas para decoración.' }
  ]
};
