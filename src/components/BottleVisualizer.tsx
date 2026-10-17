import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types/product';
import rox2 from '../assets/rox-2.png';
import rox4 from '../assets/rox-4.png';
import rox6 from '../assets/rox-6.png';

const BOTTLE_MAP: Record<string, string> = {
  'rox-2': rox2,
  'rox-4': rox4,
  'rox-6': rox6,
};

interface BottleVisualizerProps {
  product: Product;
  onPrev: () => void;
  onNext: () => void;
}

export const BottleVisualizer: React.FC<BottleVisualizerProps> = ({
  product,
  onPrev,
  onNext,
}) => {
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const currentBottleSrc = BOTTLE_MAP[product.id] || product.imageSrc;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[480px] sm:h-[560px] md:h-[640px] lg:h-[720px] xl:h-[750px] w-full items-center justify-center select-none"
    >
      {/* Soft pulsing purple mist behind the bottle (Framer Motion pulse for living luxury atmosphere) */}
      <motion.div
        animate={{
          scale: [1, 1.1, 0.96, 1.06, 1],
          opacity: [0.42, 0.72, 0.46, 0.65, 0.42],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -inset-10 transition-colors duration-700 blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 46%, ${product.accentColor}36 0%, rgba(13, 8, 24, 0.3) 45%, transparent 72%)`,
        }}
        aria-hidden="true"
      />

      {/* Enhanced Architectural Brand Watermark & Precision Contour Framing the ROX Bottle */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none">
        {/* Concentric Precision Orbital Halo Watermark */}
        <div
          className="absolute h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] md:h-[480px] md:w-[480px] lg:h-[540px] lg:w-[540px] rounded-full border border-purple-400/20 transition-all duration-700"
          style={{
            boxShadow: `0 0 60px ${product.accentColor}25, inset 0 0 45px ${product.accentColor}15`,
            transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
          }}
        />
        <div
          className="absolute h-[390px] w-[390px] sm:h-[480px] sm:w-[480px] md:h-[550px] md:w-[550px] lg:h-[620px] lg:w-[620px] rounded-full border border-white/[0.08] border-dashed transition-all duration-700"
          style={{
            transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
          }}
        />

        {/* Giant Stylized Outline Typographic Watermark "ROX" Contouring the Bottle */}
        <div
          className="absolute flex flex-col items-center justify-center transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 16}px)`,
          }}
        >
          <span
            className="font-display font-extrabold uppercase tracking-[0.22em] text-transparent leading-none text-[110px] sm:text-[150px] md:text-[190px] lg:text-[230px] opacity-30 transition-all duration-700"
            style={{
              WebkitTextStroke: `1.5px ${product.accentColor}`,
              textShadow: `0 0 50px ${product.accentColor}40`,
            }}
          >
            ROX
          </span>
          {/* Micro-typographic Watermark Arc & Version Indicator */}
          <div className="flex items-center gap-3 -mt-3 sm:-mt-6 opacity-40">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.35em] uppercase text-purple-200 font-medium">
              {product.abv} · 300 ML · EDIÇÃO NOTURNA
            </span>
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
        </div>
      </div>

      {/* Bottle Presentation with Gesture Drag and Parallax */}
      <motion.div
        className="relative z-10 flex h-full w-full items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            onPrev();
          } else if (info.offset.x < -50) {
            onNext();
          }
        }}
        animate={{
          rotateY: mousePos.x * 7,
          rotateX: -mousePos.y * 5,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 150 }}
        style={{ perspective: 1200 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-full w-full flex-col items-center justify-center"
          >
            {!imageError ? (
              <div className="relative flex flex-col items-center justify-center">
                {/* Luminous Rim Light Aura Hugging Bottle Silhouette */}
                <div
                  className="pointer-events-none absolute w-40 sm:w-52 h-[340px] sm:h-[440px] rounded-full blur-2xl opacity-40 transition-colors duration-700 z-0"
                  style={{
                    background: `radial-gradient(circle, ${product.accentColor} 0%, transparent 70%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Main Bottle on Stage */}
                <div className="relative flex items-center justify-center z-10">
                  <img
                    src={currentBottleSrc}
                    alt={`${product.name} - Açaí com Vodka 300 ml Garrafa`}
                    width="1024"
                    height="1536"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    style={{
                      maskImage:
                        'radial-gradient(ellipse 58% 74% at 50% 48%, #000 48%, rgba(0,0,0,0.85) 65%, transparent 88%)',
                      WebkitMaskImage:
                        'radial-gradient(ellipse 58% 74% at 50% 48%, #000 48%, rgba(0,0,0,0.85) 65%, transparent 88%)',
                    }}
                    className="w-full max-h-[440px] sm:max-h-[510px] md:max-h-[580px] lg:max-h-[640px] xl:max-h-[680px] object-contain mx-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] pointer-events-none transition-transform duration-300"
                  />
                </div>
              </div>
            ) : (
              /* High-fidelity CSS fallback container */
              <div className="flex h-[480px] w-52 flex-col items-center justify-between rounded-3xl border border-purple-500/30 bg-gradient-to-b from-zinc-900 via-purple-950/40 to-zinc-950 p-6 text-center shadow-2xl">
                <div className="h-10 w-16 rounded-t-lg bg-neutral-900 border border-zinc-700" />
                <div className="my-auto flex flex-col items-center">
                  <span className="font-sans text-3xl font-light text-white tracking-widest">
                    ROX
                  </span>
                  <span className="mt-2 text-lg font-normal text-purple-400">
                    {product.abv}
                  </span>
                  <span className="mt-1 text-xs text-zinc-400">{product.volume}</span>
                </div>
                <div className="h-6 w-full rounded-b-full bg-zinc-900/60" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
