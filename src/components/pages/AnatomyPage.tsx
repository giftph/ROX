import React, { useState } from 'react';
import { Disc, ShieldCheck, Sparkles, Flame, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

interface AnatomyPageProps {
  onSelectProductAndNavigate: (productIndex: number) => void;
  onOpenPurchase: () => void;
}

export const AnatomyPage: React.FC<AnatomyPageProps> = ({
  onSelectProductAndNavigate,
  onOpenPurchase,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<number>(0);

  const anatomyDetails = [
    {
      step: '01',
      title: 'Tampa Usinada Preto Fosco',
      subtitle: 'Vedação Estanque & Estalo Seco',
      desc: 'Desenvolvida com liga de polímero técnico fosco e recartilhado perimetral de 0.8mm que garante aderência perfeita mesmo com as mãos molhadas por gelo. O sistema de rosca de passo rápido produz o característico estalo sonoro que atesta a integridade do vácuo e preservação do gás carbônico.',
      icon: Disc,
      specs: [
        'Material: Polímero técnico anodizado fosco',
        'Torque de abertura: Calibrado para conforto ergonômico',
        'Vedação: Anel elastomérico livre de BPA',
      ],
    },
    {
      step: '02',
      title: 'Vidro Escuro com Filtro UV',
      subtitle: 'Proteção Antioxidante Natural',
      desc: 'Formulação especial de vidro âmbar-violeta de alta densidade que bloqueia 99.4% da radiação ultravioleta prejudicial. Essa barreira fotoquímica protege os polifenóis e antocianinas do purê natural de açaí, garantindo estabilidade de cor viva e sabor inalterado durante todo o ciclo de consumo.',
      icon: ShieldCheck,
      specs: [
        'Filtro UV: 99.4% de retenção no espectro solar',
        'Volume Nominal: 300 ml com precisão milimétrica',
        'Resistência térmica: Choques de 0°C a 25°C sem estresse',
      ],
    },
    {
      step: '03',
      title: 'Rótulo em Alumínio Escovado',
      subtitle: 'Brasão Tátil & Alta Resistência',
      desc: 'Substrato em folha de alumínio de 0.25mm estampada com relevo tátil da coroa ROX. O acabamento escovado interage de forma cinematográfica com os jogos de luz dos clubes e lounges noturnos, além de resistir à imersão contínua em baldes de gelo sem descolar ou desbotar.',
      icon: Sparkles,
      specs: [
        'Substrato: Alumínio automotivo texturizado',
        'Relevo: Microrelevo tátil tridimensional',
        'Adesão: Cola impermeável de cura ultravioleta',
      ],
    },
    {
      step: '04',
      title: 'Carbonatação Microfina Calibrada',
      subtitle: 'Microbolhas Sedosas & Frescor Nítido',
      desc: 'Dissolução de CO2 em tanques pressurizados a 2.2 bar em temperatura de -1°C, gerando microbolhas persistentes que não agridem o paladar nem mascaram o perfil aveludado do açaí. A efervescência abre as notas aromáticas da vodka selecionada a cada gole gelado.',
      icon: Flame,
      specs: [
        'Pressão de envase: 2.2 bar a 2°C',
        'Perfil de bolhas: Microesferas de longa duração',
        'Sensação: Refrescância sem excesso de acidez',
      ],
    },
  ];

  const current = anatomyDetails[selectedPoint];
  const CurrentIcon = current.icon;

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-white pt-12 pb-24 px-6 lg:px-12 selection:bg-purple-600/30">
      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full blur-[110px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-purple-400 mb-6">
          <span>Design & Engenharia</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">Garrafa 300 ml</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="font-sans font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
            Anatomia da Garrafa 300 ml
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            Cada curva, material e vedação foi pensado para entregar uma experiência tátil,
            visual e gustativa autêntica sob as luzes da noite.
          </p>
        </div>

        {/* Interactive Selector Tabs for Anatomy Points */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {anatomyDetails.map((item, idx) => {
            const isSelected = idx === selectedPoint;
            return (
              <button
                key={item.step}
                onClick={() => setSelectedPoint(idx)}
                className={`flex flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-purple-500/80 bg-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-purple-400">
                    {item.step}
                  </span>
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  )}
                </div>
                <span className="font-sans text-sm font-medium text-white line-clamp-1">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Highlighted Feature Deep-Dive Card */}
        <div className="mt-8 rounded-3xl border border-white/[0.1] bg-[#090910] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-400">
                  <CurrentIcon className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-purple-400 block">
                    Fase {current.step} de Engenharia
                  </span>
                  <span className="text-xs text-zinc-400">{current.subtitle}</span>
                </div>
              </div>

              <h2 className="font-sans text-2xl sm:text-3xl font-medium text-white mt-2">
                {current.title}
              </h2>

              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base font-normal">
                {current.desc}
              </p>

              {/* Specs List */}
              <div className="mt-4 space-y-2 pt-4 border-t border-white/[0.06]">
                {current.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <Check className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Preview Action Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 text-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-2">
                Visualização Interativa 3D
              </span>
              <p className="text-xs text-zinc-400 mb-6">
                Interaja com o modelo tridimensional oficial da garrafa no palco interativo.
              </p>

              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={() => onSelectProductAndNavigate(1)}
                  className="w-full h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs uppercase tracking-[0.16em] font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2"
                >
                  <span>Inspecionar no Palco 3D</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={onOpenPurchase}
                  className="w-full h-12 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] text-white text-xs uppercase tracking-[0.16em] font-medium transition-all flex items-center justify-center"
                >
                  Garantir Garrafa 300 ml
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid - Complete Specs Overview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {anatomyDetails.map((item, idx) => {
            const Icon = item.icon;
            const isCurrent = idx === selectedPoint;
            return (
              <div
                key={item.step}
                onClick={() => setSelectedPoint(idx)}
                className={`cursor-pointer group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                  isCurrent
                    ? 'border-purple-500/70 bg-[#0e0e17] shadow-lg shadow-purple-950/20'
                    : 'border-white/[0.06] bg-[#0a0a0f] hover:border-white/20 hover:bg-[#0c0c14]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-zinc-400">
                      {item.step}
                    </span>
                    <Icon className="h-5 w-5 text-purple-400/80 group-hover:text-purple-300 transition-colors" />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>{isCurrent ? 'SELECIONADO' : 'CLIQUE PARA LER'}</span>
                  <span className="text-purple-400">{item.step}/04</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
