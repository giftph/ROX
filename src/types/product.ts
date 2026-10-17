export interface Product {
  id: string;
  name: string;
  subtitle: string;
  abv: string;
  abvNumber: number;
  volume: string;
  category: string;
  description: string;
  sensoryProfile: {
    intensity: number; // 1 to 5
    bubbles: string;
    notes: string;
    finish: string;
  };
  servingTemp: string;
  ingredients: string[];
  imageSrc: string;
  accentColor: string;
  glowClass: string;
  badgeFinish: string;
}
