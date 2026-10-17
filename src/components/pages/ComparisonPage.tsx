import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types/product';

interface ComparisonPageProps {
  products: Product[];
  currentProductIndex: number;
  onSelectProductAndNavigate: (productIndex: number) => void;
  onOpenPurchase: () => void;
}

export const ComparisonPage: React.FC<ComparisonPageProps> = ({
  products,
  currentProductIndex,
  onSelectProductAndNavigate,
  onOpenPurchase,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<number>(currentProductIndex);

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-white pt-12 pb-24 px-6 lg:px-12 selection:bg-purple-600/30">
      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #9333ea 0%, rgba(124, 58, 237, 0.15) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-purple-400 mb-6">
          <span>Tabela Oficial</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">Comparativo Técnico</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-sans font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              A Medida Exata de Atitude
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              Três formulações precisas projetadas com a mesma base destilada de alta pureza,
              extrato autêntico de açaí brasileiro e volumes calibrados de 300 ml.
            </p>
          </div>

          <button
            onClick={onOpenPurchase}
            className="h-12 px-6 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs uppercase tracking-[0.16em] font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0"
          >
            Comprar Agora
          </button>
        </div>

        {/* 3 Version Cards Side-by-Side */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item, idx) => {
            const isSelected = idx === selectedVersion;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedVersion(idx)}
                className={`cursor-pointer relative flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 ${
                  isSelected
                    ? 'border-purple-500/80 bg-[#0f0e1a] shadow-2xl shadow-purple-950/30'
                    : 'border-white/[0.08] bg-[#0a0a0f] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                      {item.subtitle}
                    </span>
                    <span
                      className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40'
                          : 'bg-white/[0.06] text-zinc-400'
                      }`}
                    >
                      {item.abv}
                    </span>
                  </div>

                  {/* Bottle Render Thumbnail */}
                  <div className="my-6 h-40 w-full flex items-center justify-center">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="max-h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  <h2 className="font-sans text-2xl font-medium text-white">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Specifications Matrix */}
                  <div className="mt-6 space-y-3 border-t border-white/[0.08] pt-5 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-zinc-400 font-mono">Volume</span>
                      <span className="font-semibold text-zinc-200 font-mono tabular-nums">{item.volume}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-zinc-400 font-mono">Intensidade</span>
                      <span className="font-semibold text-purple-400 font-mono tabular-nums">
                        {item.sensoryProfile.intensity} / 5
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-zinc-400 font-mono">Serviço</span>
                      <span className="font-semibold text-zinc-200">{item.servingTemp}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-zinc-400 font-mono">Rótulo</span>
                      <span className="font-semibold text-zinc-200 truncate max-w-[140px]">
                        {item.badgeFinish}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-zinc-400 block font-mono text-[11px] mb-2">
                        Ingredientes Declarados:
                      </span>
                      <div className="space-y-1.5">
                        {item.ingredients.map((ing, i) => (
                          <div key={i} className="flex items-center gap-2 text-zinc-300 text-[11px]">
                            <Check className="h-3 w-3 text-purple-400 shrink-0" />
                            <span>{ing}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProductAndNavigate(idx);
                    }}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-medium uppercase tracking-wider transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-md shadow-purple-600/30'
                        : 'border border-white/20 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <span>Ver {item.name} no Palco 3D</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
