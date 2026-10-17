import React from 'react';
import { HeroCarousel } from '../HeroCarousel';
import { Product } from '../../types/product';
import { BrandManifesto } from '../BrandManifesto';
import { BottleAnatomy } from '../BottleAnatomy';
import { ProductComparison } from '../ProductComparison';

interface ShowroomPageProps {
  products: Product[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenPurchase: () => void;
  onOpenSpecs: () => void;
  onNavigateToManifesto: () => void;
  onNavigateToAnatomy: () => void;
  onNavigateToComparison: () => void;
}

export const ShowroomPage: React.FC<ShowroomPageProps> = ({
  products,
  currentIndex,
  onSelectIndex,
  onOpenPurchase,
  onOpenSpecs,
  onNavigateToManifesto,
  onNavigateToAnatomy,
  onNavigateToComparison,
}) => {
  return (
    <div className="w-full flex flex-col">
      {/* 3D Interactive Hero Carousel Showcase */}
      <HeroCarousel
        products={products}
        currentIndex={currentIndex}
        onSelectIndex={onSelectIndex}
        onOpenPurchase={onOpenPurchase}
        onOpenSpecs={onOpenSpecs}
      />

      {/* Quick Navigation Gateways to In-Depth Pages */}
      <section className="relative w-full border-t border-white/[0.06] bg-[#07070a] py-16 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gateway 1: Manifesto */}
            <div
              onClick={onNavigateToManifesto}
              className="cursor-pointer group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/[0.04]"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">
                  Capítulo 01
                </span>
                <h3 className="mt-3 font-sans text-xl font-medium text-white group-hover:text-purple-300 transition-colors">
                  Manifesto & História
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-normal">
                  Descubra a origem botânica do açaí, a pureza da tripla destilação e a filosofia noturna.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-400 group-hover:text-purple-300">
                <span>Explorar História</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>

            {/* Gateway 2: Anatomia */}
            <div
              onClick={onNavigateToAnatomy}
              className="cursor-pointer group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/[0.04]"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">
                  Capítulo 02
                </span>
                <h3 className="mt-3 font-sans text-xl font-medium text-white group-hover:text-purple-300 transition-colors">
                  Anatomia da Garrafa 300 ml
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-normal">
                  Vidro com filtro UV, tampa usinada preto fosco e rótulo de alumínio escovado.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-400 group-hover:text-purple-300">
                <span>Ver Engenharia</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>

            {/* Gateway 3: Comparativo */}
            <div
              onClick={onNavigateToComparison}
              className="cursor-pointer group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/[0.04]"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">
                  Capítulo 03
                </span>
                <h3 className="mt-3 font-sans text-xl font-medium text-white group-hover:text-purple-300 transition-colors">
                  Comparativo de Teores
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-normal">
                  Tabela técnica detalhada comparando notas sensoriais, intensidade e serviço de 2%, 4% e 6%.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-400 group-hover:text-purple-300">
                <span>Ver Especificações</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections below for seamless deep exploration */}
      <BrandManifesto />
      <BottleAnatomy />
      <ProductComparison
        products={products}
        currentIndex={currentIndex}
        onSelectProduct={onSelectIndex}
      />
    </div>
  );
};
