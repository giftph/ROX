import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Shield, Clock, Flame, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

interface ManifestoPageProps {
  onSelectProductAndNavigate: (productIndex: number) => void;
  onOpenPurchase: () => void;
}

export const ManifestoPage: React.FC<ManifestoPageProps> = ({
  onSelectProductAndNavigate,
  onOpenPurchase,
}) => {
  const timelineMilestones = [
    {
      year: 'FASE 01',
      title: 'A Inquietação Noturna',
      desc: 'Nos clubes e lounges cosmopolitas, as opções se dividiam entre coquetéis excessivamente doces ou destilados pesados. Nasceu o desejo de criar uma bebida pronta, com identidade visual escultural e teor alcoólico milimetricamente calibrado.',
    },
    {
      year: 'FASE 02',
      title: 'A Extração do Açaí Nobre',
      desc: 'Pesquisa com produtores sustentáveis do Norte brasileiro para extrair o purê de açaí a frio, mantendo os antioxidantes naturais, a coloração violeta profunda e a textura sedosa sem recorrer a xaropes industriais.',
    },
    {
      year: 'FASE 03',
      title: 'Destilação & Microcarbonatação',
      desc: 'A harmonização da vodka de cereais destilada por triplo processo em coluna de cobre com uma injeção de microbolhas finas a 2°C, criando o frescor efervescente que equilibra a densidade do açaí.',
    },
    {
      year: 'FASE 04',
      title: 'A Garrafa de 300 ml & Rótulo Metálico',
      desc: 'Modelagem 3D proprietária de um frasco ergonômico em vidro fumê de alta densidade, tampa preto fosco e brasão em relevo tátil de alumínio anodizado. Um produto feito para ser visto na mesa.',
    },
  ];

  const pillars = [
    {
      icon: Sparkles,
      num: '01',
      title: 'Autenticidade Botânica',
      desc: 'Nenhum corante artificial. A cor roxa intensa e luminosa vem exclusivamente da concentração natural do açaí puro.',
    },
    {
      icon: Shield,
      num: '02',
      title: 'Pureza da Vodka Tripla',
      desc: 'Base destilada com água pura de aquífero e filtragem gradual, entregando final limpo, seco e sem retrogosto pesado.',
    },
    {
      icon: Flame,
      num: '03',
      title: 'Precisão de Atitude',
      desc: 'Três graduações honestas (2%, 4% e 6%) para você decidir o ritmo da sua noite com controle e elegância.',
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-white pt-12 pb-24 px-6 lg:px-12 selection:bg-purple-600/30">
      {/* Background Ambient Violet Mist */}
      <div
        className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #9333ea 0%, rgba(124, 58, 237, 0.15) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Breadcrumb / Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-purple-400 mb-6">
          <span>A Marca</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">História da Criação</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="font-sans font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.12]">
            A alquimia do açaí nobre com vodka selecionada.{' '}
            <span className="font-normal text-purple-400">
              Engenharia noturna para quem busca atitude.
            </span>
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal max-w-3xl">
            A ROX Drink não é apenas uma bebida pronta para beber. É um manifesto contra o óbvio.
            Criada para unir a força enérgica do açaí brasileiro com a sofisticação da coquetelaria
            moderna, numa garrafa escultural que transforma qualquer celebração em um ritual noturno.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-purple-400">
                      {pillar.num}
                    </span>
                    <Icon className="h-5 w-5 text-purple-400/80" />
                  </div>
                  <h2 className="mt-5 font-sans text-xl font-medium text-white">
                    {pillar.title}
                  </h2>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Narrative Section: The Philosophy */}
        <div className="mt-28 border-y border-white/[0.08] py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400">
                A Filosofia da Criação
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-light text-white leading-snug">
                Por que criamos três versões milimetricamente calibradas?
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-300 leading-relaxed font-normal text-base">
              <p>
                Entendemos que a noite não é homogênea. Há momentos que pedem um consumo leve e descontraído,
                como um final de tarde na praia ou um esquenta despretensioso — para isso criamos o{' '}
                <strong className="text-white font-medium">ROX 2%</strong>, suave e ultra-refrescante.
              </p>
              <p>
                Para as noites que pedem harmonia perfeita entre corpo de sabor e intensidade destilada,
                desenvolvemos o <strong className="text-purple-300 font-medium">ROX 4%</strong>, nossa assinatura
                mais consumida em mesas e camarotes.
              </p>
              <p>
                E para ocasiões marcantes de máxima atitude, calibramos o{' '}
                <strong className="text-white font-medium">ROX 6%</strong>, que traz a presença encorpada da
                vodka selecionada sem perder o aroma sedutor do açaí puro.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Timeline of Creation */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400">
              Linha do Tempo
            </span>
            <h2 className="mt-3 font-sans text-3xl sm:text-4xl font-light text-white">
              Do Conceito ao Palco Oficial
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Quatro anos de testes de laboratório, moldagem em vidro e degustações cegas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineMilestones.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-white/[0.07] bg-[#0a0a0f] p-7 flex flex-col justify-between transition-all hover:border-purple-500/50"
              >
                <div>
                  <span className="inline-block font-mono text-[11px] font-semibold text-purple-400 border border-purple-500/30 rounded-full px-3 py-0.5 mb-4">
                    {item.year}
                  </span>
                  <h3 className="font-sans text-lg font-medium text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  <span>Especificação Aprovada</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Showcase: Return to Bottle Palco */}
        <div className="mt-28 rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.03] to-[#0a0a10] p-8 sm:p-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-left">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">
                Explore a Coleção Oficial
              </span>
              <h2 className="mt-2 font-sans text-3xl font-light text-white">
                Pronto para viver a experiência ROX?
              </h2>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Navegue pelas três versões calibradas de 300 ml em renderização 3D, confira a tabela
                sensorial de cada bebida ou garanta sua garrafa para a próxima noite.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectProductAndNavigate(1)}
                className="h-12 px-6 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs uppercase tracking-[0.16em] font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>Ver no Palco 3D</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={onOpenPurchase}
                className="h-12 px-6 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] text-white text-xs uppercase tracking-[0.16em] font-medium transition-all"
              >
                Comprar Agora
              </button>
            </div>
          </div>

          {/* Mini Cards of the 3 Products */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/[0.06]">
            {PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => onSelectProductAndNavigate(idx)}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-all hover:border-purple-500/60 hover:bg-white/[0.05]"
              >
                <div className="h-14 w-8 shrink-0 flex items-center justify-center">
                  <img
                    src={prod.imageSrc}
                    alt={prod.name}
                    className="max-h-full w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-base font-light text-white">
                      {prod.name}
                    </span>
                    <span className="font-mono text-xs text-purple-400">
                      {prod.abv}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400">{prod.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
