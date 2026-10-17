import { Product } from '../types/product';
import rox2 from '../assets/rox-2.png';
import rox4 from '../assets/rox-4.png';
import rox6 from '../assets/rox-6.png';

export const PRODUCTS: Product[] = [
  {
    id: 'rox-2',
    name: 'ROX 2%',
    subtitle: 'Leve e Refrescante',
    abv: '2% VOL.',
    abvNumber: 2,
    volume: '300 ML',
    category: 'Açaí com Vodka',
    description:
      'O drink que combina o melhor do açaí com vodka selecionada, em sua versão mais leve e refrescante para consumo descontraído.',
    sensoryProfile: {
      intensity: 2,
      bubbles: 'Microbolhas delicadas e persistentes',
      notes: 'Açaí puro refrescante, vodka suave, final limpo',
      finish: 'Seco, nítido e extremamente refrescante',
    },
    servingTemp: '2°C a 4°C (Bem Gelado)',
    ingredients: [
      'Açaí premium natural',
      'Vodka selecionada de pureza superior',
      'Água gaseificada cristalina',
      'Extrato natural de açaí',
    ],
    imageSrc: rox2,
    accentColor: '#a855f7',
    glowClass: 'from-purple-500/20 via-purple-900/20 to-transparent',
    badgeFinish: 'Rótulo em Prata Escovada com Borda Violeta',
  },
  {
    id: 'rox-4',
    name: 'ROX 4%',
    subtitle: 'O Equilíbrio Perfeito',
    abv: '4% VOL.',
    abvNumber: 4,
    volume: '300 ML',
    category: 'Açaí com Vodka',
    description:
      'O drink que combina o melhor do açaí com vodka, entregando uma experiência única em cada gole. A harmonia exata entre energia, sabor e atitude.',
    sensoryProfile: {
      intensity: 3.5,
      bubbles: 'Efervescência viva e equilibrada',
      notes: 'Açaí encorpado, vodka de alta pureza, notas aveludadas',
      finish: 'Aveludado, vibrante e refrescante',
    },
    servingTemp: '2°C a 4°C (Bem Gelado)',
    ingredients: [
      'Açaí premium selecionado',
      'Vodka destilada triplamente filtrada',
      'Água mineral com carbonatação suave',
      'Aroma natural botânico de açaí',
    ],
    imageSrc: rox4,
    accentColor: '#9333ea',
    glowClass: 'from-purple-600/30 via-violet-900/30 to-transparent',
    badgeFinish: 'Rótulo em Prata Escovada com Brasão ROX',
  },
  {
    id: 'rox-6',
    name: 'ROX 6%',
    subtitle: 'Mais Intenso',
    abv: '6% VOL.',
    abvNumber: 6,
    volume: '300 ML',
    category: 'Açaí com Vodka',
    description:
      'A versão com maior intensidade alcoólica e densidade de sabor. Presença marcante de vodka selecionada com o toque autêntico do açaí nobre.',
    sensoryProfile: {
      intensity: 5,
      bubbles: 'Carbonatação fina e encorpada',
      notes: 'Açaí concentrado, vodka potente e macia, final prolongado',
      finish: 'Prolongado, marcante e encorpado',
    },
    servingTemp: '2°C a 4°C (Bem Gelado)',
    ingredients: [
      'Açaí nobre concentrado',
      'Vodka premium de alta graduação',
      'Água pura gaseificada',
      'Extrato natural purificado',
    ],
    imageSrc: rox6,
    accentColor: '#7c3aed',
    glowClass: 'from-indigo-600/35 via-purple-950/40 to-transparent',
    badgeFinish: 'Rótulo em Prata Metálica Escurecida',
  },
];

