import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';

export type PageId = 'colecao' | 'manifesto' | 'anatomia' | 'comparativo';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPurchase: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onOpenPurchase,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll progress spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems: { id: PageId; label: string }[] = [
    { id: 'colecao', label: 'Coleção' },
    { id: 'manifesto', label: 'Manifesto & História' },
    { id: 'anatomia', label: 'Anatomia 300ml' },
    { id: 'comparativo', label: 'Comparativo' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#050507]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-8 px-6 lg:px-12">
        {/* Zone 1: Brand Wordmark with Crown */}
        <button
          onClick={() => handleNavClick('colecao')}
          className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 cursor-pointer"
          aria-label="ROX Drink página inicial"
        >
          {/* 3-Point Crown Icon */}
          <svg
            className="h-5 w-5 text-slate-200 transition-colors group-hover:text-purple-400"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
          </svg>
          <div className="flex flex-col">
            <span className="font-sans text-xl font-medium tracking-[0.15em] text-white">
              ROX
            </span>
          </div>
        </button>

        {/* Zone 2: Clean SPA Navigation Links: Coleção · Manifesto · Anatomia · Comparativo */}
        <nav className="hidden md:flex items-center gap-7 text-[12px] font-normal tracking-[0.18em] uppercase text-zinc-400">
          {navItems.map((item, idx) => {
            const isActive = activePage === item.id;
            return (
              <React.Fragment key={item.id}>
                {idx > 0 && <span className="text-zinc-700 select-none">·</span>}
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 rounded ${
                    isActive ? 'text-white font-medium' : 'hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    />
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Zone 3: Thin Purple Outline Action Button */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenPurchase}
            className="inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-full border border-purple-500/50 bg-transparent px-5 py-1.5 text-xs font-normal tracking-[0.15em] uppercase text-white transition-all hover:border-purple-400 hover:bg-purple-950/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 cursor-pointer"
          >
            Comprar
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Subtle Scroll Progress Bar at the top of the main area */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04] overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-purple-700 via-purple-500 to-fuchsia-300"
          style={{
            scaleX,
            boxShadow:
              '0 0 10px rgba(168, 85, 247, 0.75), 0 0 3px rgba(255, 255, 255, 0.5)',
          }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-[#0a0a0f] px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-zinc-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-1 text-left flex items-center justify-between ${
                  activePage === item.id ? 'text-purple-400 font-semibold' : 'hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {activePage === item.id && (
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

