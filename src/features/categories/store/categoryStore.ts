import { create } from 'zustand';
import { Guitar, Piano, Headphones, Mic2, Radio } from 'lucide-react';

export const useCategoryStore = create(() => ({
  categories: [
    { icon: Guitar, name: 'Guitars' },
    { icon: Piano, name: 'Pianos' },
    { icon: Headphones, name: 'Audio' },
    { icon: Mic2, name: 'Microphones' },
    { icon: Radio, name: 'Accessories' }
  ]
}));