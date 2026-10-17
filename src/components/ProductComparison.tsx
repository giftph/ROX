import React, { useState } from 'react';
import { Product } from '../types/product';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';

interface ProductComparisonProps {
  products: Product[];
  currentIndex: number;
  onSelectProduct: (index: number) => void;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  products,
  currentIndex,
  onSelectProduct,
}) => {
  const [expandedDesc, setExpandedDesc] = useState<Record<string, boolean>>({});

  const toggleDesc = (id: string) => {
    setExpandedDesc((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <section id="comparativo" className="relative w-full border-b border-slate-800/80 bg-[#07070a] py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-purple-400">
              Linha Completa
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Comparativo Técnico
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md">
            Três formulações precisas projetadas com a mesma base destilada de alta pureza e 
            volumes calibrados de 300 ml.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-8 transition-all ${
                  isSelected
                    ? 'border-purple-500/60 bg-[#0f0e1a] shadow-xl shadow-purple-950/20'
                    : 'border-slate-800/90 bg-[#0a0a0f] hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                      {item.subtitle}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-purple-900/60 text-purple-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.abv}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold text-white">
                    {item.name}
                  </h3>

                  <div>
                    <p
                      className={`mt-2 text-xs text-slate-300 leading-relaxed transition-all duration-300 ${
                        !expandedDesc[item.id] ? 'line-clamp-2' : ''
                      }`}
                    >
                      {item.description}
                    </p>
                    <button
                      onClick={() => toggleDesc(item.id)}
                      className="mt-1 inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 rounded"
                    >
                      <span>{expandedDesc[item.id] ? 'Ler menos' : 'Ler mais'}</span>
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-300 ${
                          expandedDesc[item.id] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-6 space-y-3.5 border-t border-slate-800 pt-5 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span className="text-slate-400 font-mono">Volume</span>
                      <span className="font-semibold text-slate-200 font-mono-tabular">{item.volume}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span className="text-slate-400 font-mono">Intensidade</span>
                      <span className="font-semibold text-purple-400 font-mono-tabular">
                        {item.sensoryProfile.intensity} / 5
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span className="text-slate-400 font-mono">Temperatura</span>
                      <span className="font-semibold text-slate-200">{item.servingTemp}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span className="text-slate-400 font-mono">Rótulo</span>
                      <span className="font-semibold text-slate-200 truncate max-w-[140px]">
                        {item.badgeFinish}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-slate-400 block font-mono text-[11px] mb-1">
                        Ingredientes Declarados:
                      </span>
                      <div className="space-y-1">
                        {item.ingredients.map((ing, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-slate-300 text-[11px]">
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
                    onClick={() => {
                      onSelectProduct(idx);
                      const el = document.getElementById('produtos');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-md shadow-purple-600/20'
                        : 'border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>{isSelected ? 'Versão em Exibição' : `Ver ${item.name} no Palco`}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
