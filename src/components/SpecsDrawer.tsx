import React from 'react';
import { X, Check } from 'lucide-react';
import { Product } from '../types/product';

interface SpecsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const SpecsDrawer: React.FC<SpecsDrawerProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-in Drawer */}
      <div className="relative z-10 h-full w-full max-w-md border-l border-slate-800 bg-[#09090e] p-6 sm:p-8 overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="font-mono text-xs uppercase text-purple-400">
              Ficha Técnica Oficial
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar especificações"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm">
          <div>
            <span className="font-mono text-xs text-slate-400 uppercase">Classificação</span>
            <p className="mt-1 font-semibold text-slate-200">{product.category}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
            <div>
              <span className="font-mono text-xs text-slate-400 uppercase">Teor Alcoólico</span>
              <p className="mt-1 font-display text-xl font-bold text-purple-400">{product.abv}</p>
            </div>
            <div>
              <span className="font-mono text-xs text-slate-400 uppercase">Volume Líquido</span>
              <p className="mt-1 font-display text-xl font-bold text-slate-200">{product.volume}</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <span className="font-mono text-xs text-slate-400 uppercase">Perfil Sensorial</span>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Intensidade:</span>
                <span className="text-slate-200 font-semibold">{product.sensoryProfile.intensity} de 5</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Carbonatação:</span>
                <span className="text-slate-200">{product.sensoryProfile.bubbles}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Paladar:</span>
                <span className="text-slate-200">{product.sensoryProfile.notes}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Finalização:</span>
                <span className="text-slate-200">{product.sensoryProfile.finish}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <span className="font-mono text-xs text-slate-400 uppercase">Ingredientes Transparentes</span>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
              {product.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <span className="font-mono text-xs text-slate-400 uppercase">Armazenamento & Consumo</span>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Conservar em local seco, fresco e protegido da luz solar direta. Para a melhor 
              experiência, manter refrigerada entre {product.servingTemp} antes do consumo.
            </p>
          </div>

          <div className="border-t border-slate-800 pt-4 text-[11px] font-mono text-slate-400">
            EMBALAGEM: Vidro 100% reciclável · Tampa em alumínio reciclável
          </div>
        </div>
      </div>
    </div>
  );
};
