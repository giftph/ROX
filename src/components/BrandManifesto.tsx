import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data/products';

export const BrandManifesto: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (idx: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const pillars = [
    {
      num: '01',
      title: 'Açaí Premium & Vodka',
      shortDesc: 'Extrato genuíno de açaí brasileiro combinado com vodka de alta pureza e tripla destilação.',
      fullDesc:
        'Extrato genuíno de açaí brasileiro combinado com vodka de alta pureza e tripla destilação, criando notas densas e aveludadas no paladar. Processo de infusão a frio que preserva antioxidantes naturais, cor violeta profunda e aroma botânico fresco sem adição de conservantes artificiais.',
    },
    {
      num: '02',
      title: 'Brasão em Prata Metálica',
      shortDesc: 'Rótulo de alumínio escovado com a coroa ROX em relevo tátil. Objeto icônico para noites exclusivas.',
      fullDesc:
        'Rótulo de alumínio escovado com a coroa ROX em relevo tátil. Uma garrafa pensada como objeto icônico para mesas, clubes e lounges exclusivos. Tratamento superficial anodizado resistente à condensação térmica e ao atrito em baldes de gelo.',
    },
    {
      num: '03',
      title: 'Três Versões de Teor',
      shortDesc: 'Três variações calibradas — 2%, 4% e 6% — para você escolher a medida ideal de atitude.',
      fullDesc:
        'Três variações calibradas — 2% (Leve e Refrescante para consumo descontraído), 4% (O Equilíbrio Perfeito entre energia e sabor) e 6% (Mais Intenso para momentos marcantes). Controle volumétrico rigoroso de 300 ml com graduações precisas.',
    },
  ];

  return (
    <section id="identidade" className="relative w-full border-b border-slate-800/80 bg-[#07070a] py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-2 md:max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-purple-400">
            A Identidade ROX
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            A fusão do melhor do açaí com vodka selecionada.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Energia, sabor e atitude em uma garrafa escultural de 300 ml. Criada para quem busca 
            intensidade, controle e uma experiência visual e gustativa autêntica na noite.
          </p>
        </div>

        {/* 3 Pillars of Identity - Informative Boxes starting shortened with 'Ler mais' */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar, idx) => {
            const isExpanded = !!expandedCards[idx];
            return (
              <div
                key={pillar.num}
                className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#0d0d14]/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-[#100f1c]/70"
              >
                <div>
                  <span className="font-mono text-xs text-purple-400 font-semibold">{pillar.num}</span>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {pillar.title}
                  </h3>
                  
                  <div className="mt-3">
                    <p className={`text-sm text-slate-400 leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                      {isExpanded ? pillar.fullDesc : pillar.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60">
                  <button
                    onClick={() => toggleCard(idx)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 rounded"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Ler menos' : 'Ler mais'}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Atmospheric Showcase Imagery - Lineup of the 3 ROX Bottles */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-[#090910] to-[#040407] p-8 sm:p-12">
          <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
            <div className="pointer-events-none absolute -inset-10 bg-purple-900/10 blur-3xl rounded-full" />
            <div className="relative z-10 grid grid-cols-3 gap-4 sm:gap-8 items-end justify-center w-full max-w-2xl">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="flex flex-col items-center">
                  <div className="relative h-44 sm:h-60 md:h-72 w-full flex items-center justify-center">
                    <img
                      src={p.imageSrc}
                      alt={`${p.name} Garrafa 300ml`}
                      className="h-full w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                    />
                  </div>
                  <span className="mt-3 font-display text-sm sm:text-base font-bold text-white">
                    {p.name}
                  </span>
                  <span className="font-mono text-[10px] text-purple-400">
                    {p.subtitle}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative z-10 mt-8 border-t border-slate-800/80 pt-4 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <span className="font-mono uppercase tracking-wider text-slate-400">
                Linha Oficial ROX Drink · 300 ml
              </span>
              <span>Serviço recomendado: bem gelada entre 2°C e 4°C</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
