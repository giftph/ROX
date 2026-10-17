import React from 'react';
import { PageId } from './Header';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
  onOpenPurchase?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPurchase }) => {
  const handleNav = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#050507] text-slate-400 py-14 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-extrabold tracking-wider text-metallic-silver">
                ROX
              </span>
              <span className="font-mono text-xs tracking-widest text-slate-400 uppercase">
                Drink
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400 max-w-sm">
              Bebida alcoólica mista gaseificada em garrafa de 300 ml. Estética metálica, 
              precisão botânica e moderação noturna.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400">
            <button
              onClick={() => handleNav('colecao')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Coleção
            </button>
            <button
              onClick={() => handleNav('manifesto')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Manifesto & História
            </button>
            <button
              onClick={() => handleNav('anatomia')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Anatomia 300ml
            </button>
            <button
              onClick={() => handleNav('comparativo')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Comparativo
            </button>
            {onOpenPurchase && (
              <button
                onClick={onOpenPurchase}
                className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer font-semibold"
              >
                Comprar Agora
              </button>
            )}
          </nav>
        </div>

        {/* Regulatory & Responsibility Section */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-col gap-1 max-w-2xl">
            <p className="font-bold text-slate-300">
              AVISO LEGAL: PROIBIDA A VENDA E O CONSUMO PARA MENORES DE 18 ANOS.
            </p>
            <p className="text-[11px] text-slate-400">
              Aprecie com responsabilidade e moderação. Não compartilhe este conteúdo com menores de idade.
              Não dirija sob a influência de álcool.
            </p>
          </div>

          <div className="font-mono text-[11px] text-slate-400 shrink-0">
            © {new Date().getFullYear()} ROX Drink. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
