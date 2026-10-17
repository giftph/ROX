import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Product } from '../types/product';
import { BottleVisualizer } from './BottleVisualizer';
import { Studio3DBackground } from './Studio3DBackground';

interface HeroCarouselProps {
  products: Product[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenPurchase: () => void;
  onOpenSpecs?: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  products,
  currentIndex,
  onSelectIndex,
  onOpenPurchase,
}) => {
  const currentProduct = products[currentIndex];
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Reset expansion when switching products
  useEffect(() => {
    setIsDescExpanded(false);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + products.length) % products.length);
  }, [currentIndex, products.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % products.length);
  }, [currentIndex, products.length, onSelectIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      id="produtos"
      className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#050507] pt-6 pb-14 flex flex-col justify-between"
    >
      {/* 3D Immersive Studio Background Environment with depth and parallax */}
      <Studio3DBackground
        accentColor={currentProduct.accentColor}
        versionAbv={currentProduct.abvNumber}
      />

      {/* Animated breathing purple mist in Hero background (Framer Motion pulse for living luxury atmosphere) */}
      <motion.div
        key={`hero-pulse-${currentProduct.id}`}
        animate={{
          scale: [1, 1.14, 0.96, 1.1, 1],
          opacity: [0.35, 0.65, 0.38, 0.6, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[520px] sm:w-[720px] lg:w-[920px] h-[520px] sm:h-[720px] lg:h-[920px] rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${currentProduct.accentColor}44 0%, rgba(124, 58, 237, 0.16) 38%, rgba(13, 8, 24, 0.05) 62%, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Discrete Navigation Arrows positioned at the far viewport edges */}
      <button
        onClick={handlePrev}
        aria-label="Versão anterior"
        className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/[0.08] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Próxima versão"
        className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/[0.08] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Main 3-Column Stage Grid (Desktop: 4 text / 4 bottle / 4 info) */}
      <div className="relative mx-auto w-full max-w-[1440px] px-[6vw] my-auto">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-14">
          
          {/* Column 1 (Left 4 cols): Eyebrow, 3-Line Headline, Short Body with 'Ler mais' */}
          <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4"
              >
                <div>
                  <span className="block text-[11px] font-medium uppercase tracking-[0.35em] text-purple-400 mb-2">
                    Açaí com Vodka
                  </span>
                  
                  {/* Headline: ENERGIA / SABOR / ATITUDE in 3 lines, only ATITUDE in purple */}
                  <h1 className="font-sans font-light tracking-[0.1em] uppercase text-white leading-[1.08] text-[clamp(32px,3.6vw,54px)]">
                    Energia<br />
                    Sabor<br />
                    <span className="text-purple-400">Atitude</span>
                  </h1>
                </div>

                {/* Body Text & Informative Box: starts shortened with 'Ler mais' / 'Ler menos' button */}
                <div className="flex flex-col gap-2 max-w-sm">
                  <p
                    className={`text-[15px] leading-[1.7] text-zinc-400 font-normal transition-all duration-300 ${
                      !isDescExpanded ? 'line-clamp-2' : ''
                    }`}
                  >
                    {currentProduct.description}
                  </p>

                  {/* Expandable sensory details when user clicks 'Ler mais' */}
                  <AnimatePresence>
                    {isDescExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-purple-500/20 pt-3 mt-1 space-y-2 text-xs text-zinc-300"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono text-purple-400 text-[10px] uppercase tracking-wider">
                            Perfil Sensorial:
                          </span>
                          <span className="text-zinc-300">
                            {currentProduct.sensoryProfile.notes}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono text-purple-400 text-[10px] uppercase tracking-wider">
                            Sensação & Acabamento:
                          </span>
                          <span className="text-zinc-300">
                            {currentProduct.sensoryProfile.finish}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="font-mono text-purple-400 text-[10px] uppercase tracking-wider">
                            Temperatura ideal:
                          </span>
                          <span className="text-zinc-300">{currentProduct.servingTemp}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => setIsDescExpanded(!isDescExpanded)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-purple-400 hover:text-purple-300 transition-colors w-fit pt-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 rounded"
                  >
                    <span>{isDescExpanded ? 'Ler menos' : 'Ler mais'}</span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-300 ${
                        isDescExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Subtle Scroll Hint */}
                <div className="flex items-center gap-2.5 pt-2 text-zinc-500">
                  <div className="flex h-6 w-3.5 items-center justify-center rounded-full border border-white/20">
                    <div className="h-1 w-0.5 rounded-full bg-purple-400 animate-bounce" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Arraste para alternar
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Column 2 (Center 4 cols): The Bottle as Hero */}
          <div className="order-1 lg:order-2 lg:col-span-4 relative flex flex-col items-center justify-center">
            <BottleVisualizer
              product={currentProduct}
              onPrev={handlePrev}
              onNext={handleNext}
            />

            {/* 3 Fine Dots below the bottle */}
            <div className="flex items-center justify-center gap-2 mt-2" aria-label="Indicador de versão ativa">
              {products.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => onSelectIndex(idx)}
                  aria-label={`Versão ${p.name}`}
                  className={`h-1 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 ${
                    idx === currentIndex
                      ? 'w-6 bg-purple-500'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Column 3 (Right 4 cols): Percentage Pill, Product Name, 3 Attributes, Single Primary CTA */}
          <div className="order-3 lg:col-span-4 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-5 max-w-sm"
              >
                <div>
                  {/* Thin Pill with Percentage */}
                  <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-950/20 px-3.5 py-0.5 text-[11px] font-normal tracking-[0.15em] text-purple-300 uppercase">
                    {currentProduct.abv}
                  </span>

                  {/* Name: "ROX 4%" on one line with percentage in purple */}
                  <h2 className="mt-2.5 font-sans font-light text-3xl sm:text-4xl tracking-tight text-white">
                    ROX <span className="text-purple-400 font-normal">{currentProduct.abvNumber}%</span>
                  </h2>

                  <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Açaí com Vodka
                  </p>
                </div>

                {/* 3 Attributes in simple clean text (no boxes) */}
                <div className="space-y-2 py-1 text-sm text-zinc-300 font-normal">
                  <div className="flex items-center gap-2.5">
                    <span className="h-1 w-1 rounded-full bg-purple-400 shrink-0" />
                    <span>Açaí premium</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-1 w-1 rounded-full bg-purple-400 shrink-0" />
                    <span>Vodka selecionada</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-1 w-1 rounded-full bg-purple-400 shrink-0" />
                    <span>Bem gelado é melhor</span>
                  </div>
                </div>

                {/* 300 ml discrete */}
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-normal">
                    300 ml
                  </span>
                </div>

                {/* Single Primary CTA: Solid Purple Button, 52-56px height, rounded-full */}
                <div className="pt-2">
                  <button
                    onClick={onOpenPurchase}
                    className="w-full h-14 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(168,85,247,0.4)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  >
                    Comprar Agora
                  </button>

                  {/* Microcopy of trust */}
                  <p className="mt-3 text-center text-[11px] text-zinc-500 font-normal">
                    Venda exclusiva para maiores de 18 anos
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Bottom Versions Selector (Synchronized thumbnails) */}
      <div id="versoes" className="relative z-10 mx-auto w-full max-w-[1440px] px-[6vw] pt-6">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
          {products.map((prod, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={prod.id}
                onClick={() => onSelectIndex(idx)}
                className={`group relative flex items-center gap-3 rounded-xl border p-2.5 transition-all text-left ${
                  isActive
                    ? 'border-purple-500/80 bg-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                    : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {/* Miniature Bottle Render */}
                <div className="relative h-12 w-7 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={prod.imageSrc}
                    alt={prod.name}
                    width="28"
                    height="48"
                    referrerPolicy="no-referrer"
                    className="max-h-full w-auto object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-sm font-light text-white">
                      {prod.abvNumber}%
                    </span>
                    <span className={`text-xs ${isActive ? 'text-purple-400 font-medium' : 'text-zinc-400 font-normal'}`}>
                      {prod.name}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                    {prod.subtitle}
                  </span>
                </div>

                {isActive && (
                  <div className="ml-auto mr-1 h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

