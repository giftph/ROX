import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Disc, Flame, ChevronDown } from 'lucide-react';

export const BottleAnatomy: React.FC = () => {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (step: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  const anatomyPoints = [
    {
      step: '01',
      title: 'Tampa Usinada Preto Fosco',
      shortDesc:
        'Vedação estanque de alta precisão com acabamento recartilhado que proporciona aderência e estalo seco ao abrir.',
      fullDesc:
        'Vedação estanque de alta precisão com acabamento recartilhado que proporciona aderência e estalo seco ao abrir. Desenvolvida em polímero técnico fosco de alta densidade que conserva a carbonatação e resiste a variações bruscas de temperatura no gelo.',
      icon: Disc,
    },
    {
      step: '02',
      title: 'Vidro Violeta com Filtro UV',
      shortDesc:
        'Formulação especial de vidro escurecido que preserva os compostos botânicos delicados contra a fotodegradação luminosa.',
      fullDesc:
        'Formulação especial de vidro escurecido que preserva os compostos botânicos delicados contra a fotodegradação luminosa. Garante a pureza dos pigmentos naturais do açaí e a estabilidade gustativa da vodka selecionada.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Rótulo em Prata Metálica',
      shortDesc:
        'Liga de alumínio texturizado com a marca ROX estampada em relevo tátil fosco, resistente à condensação térmica.',
      fullDesc:
        'Liga de alumínio texturizado com a marca ROX estampada em relevo tátil fosco, resistente à condensação térmica. Tratamento superficial com micropigmentos que refletem a iluminação noturna com sofisticação.',
      icon: Sparkles,
    },
    {
      step: '04',
      title: 'Carbonatação Microfina',
      shortDesc:
        'Injeção de microbolhas controladas que intensificam a sensação de frescor no paladar sem sobrecarregar com acidez.',
      fullDesc:
        'Injeção de microbolhas controladas que intensificam a sensação de frescor no paladar sem sobrecarregar com acidez. Calibração milimétrica de pressão que abre os ésteres aromáticos a cada gole gelado.',
      icon: Flame,
    },
  ];

  return (
    <section id="anatomia" className="relative w-full border-b border-slate-800/80 bg-[#060608] py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-purple-400">
            Design & Engenharia
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Anatomia da Garrafa 300 ml
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Cada elemento da garrafa ROX foi projetado para elevar a experiência do toque, 
            da visão e do consumo em baixas temperaturas.
          </p>
        </div>

        {/* Anatomical Grid of Informative Boxes */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {anatomyPoints.map((item) => {
            const Icon = item.icon;
            const isExpanded = !!expandedSteps[item.step];
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#0a0a10] p-6 transition-all duration-300 hover:border-purple-500/40 hover:bg-[#0e0e17]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {item.step}
                    </span>
                    <Icon className="h-5 w-5 text-purple-400/80 transition-colors group-hover:text-purple-300" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <div className="mt-2">
                    <p className={`text-sm text-slate-300 leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                      {isExpanded ? item.fullDesc : item.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-800/60 pt-3 flex items-center justify-between">
                  <button
                    onClick={() => toggleStep(item.step)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 rounded"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Ler menos' : 'Ler mais'}</span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <span className="text-[10px] font-mono text-slate-500">
                    ESPECIFICAÇÃO
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
