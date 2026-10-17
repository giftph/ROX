# ROX Drink — Experiência Multi-Páginas 100% Interativa (SPA)

Transformação da landing page da ROX Drink em uma aplicação web multi-páginas de alta fidelidade e fluidez contínua, permitindo navegação instantânea e cinematográfica entre o Palco Principal de Produtos, a nova página de Manifesto Completo da Marca & História da Criação, a Anatomia da Engenharia 300 ml e o Comparativo Técnico Interativo.

## User Review & Critical Decisions

> [!IMPORTANT]
> As decisões principais de UX e arquitetura foram alinhadas com suas respostas na Fase de Clarificação:

- **Estrutura de Navegação Confirmada**: Arquitetura SPA (Single Page Application) com abas e rotas fluidas com barra de navegação superior e inferior persistentes, sem recarregamento de página.
- **Novas Telas Interativas Confirmadas**: Nova tela de experiência aprofundada: **"Manifesto Completo da Marca e História da Criação"** com capítulos editoriais, filosofia noturna dos fundadores, processo botânico do açaí e segredo da destilação tripla.
- **Estilo de Transição Visual Confirmado**: Transições cinematográficas com fade suave e deslizamento lateral sutil (`motion/react` AnimatePresence com curvas físicas amortecidas `[0.16, 1, 0.3, 1]`).

---

## 1. Visão Geral & Conceito Central

- **O Que Faz**: Converte a experiência linear em uma plataforma de marca completa com navegação instantânea entre 4 páginas imersivas:
  1. **Palco Coleção (Home / Showroom 3D)**: Carrossel interativo 3D com as 3 versões (2%, 4% e 6%), visualizador com paralaxe, marca d'água de precisão e compra rápida.
  2. **Manifesto da Marca (História & Essência)**: Nova página dedicada com narrativa editorial cinematográfica sobre o nascimento da ROX Drink, a busca pelo açaí autêntico em blend com vodka de alta pureza e os pilares de atitude noturna.
  3. **Engenharia & Anatomia da Garrafa**: Página dedicada com dissecção técnica em 4 fases da garrafa escultural de 300 ml, materiais térmicos e filtro UV.
  4. **Comparativo Técnico & Degustação**: Mesa técnica interativa lado a lado com seletor de serviço, ficha de ingredientes e simulador de ocasião.
- **Público-Alvo**: Consumidores premium de coquetelaria pronta e frequentadores de eventos noturnos, clubes e lounges que valorizam design escultural, pureza de ingredientes e graduação sob medida.
- **Valor Principal**: Sensação de um aplicativo nativo ultra-rápido, cinematográfico e envolvente, onde cada clique transporta o usuário sem atrito para uma nova faceta da marca.

---

## 2. Experiência do Usuário & Design Visual

### Fluxos Principais de Navegação
1. **Navegação Superior Persistente**: Barra de abas com indicador luminoso ativo na aba atual (`Coleção`, `Manifesto & História`, `Anatomia 300ml`, `Comparativo`), barra de progresso sutil no topo e botão de ação direta `Comprar`.
2. **Nova Tela: Manifesto Completo da Marca**:
   - *Capítulo 1: A Gênese Noturna*: A inquietação que gerou a fusão entre açaí nobre da Amazônia e vodka triplamente retificada.
   - *Capítulo 2: Alquimia dos Três Teores*: Por que criamos 2%, 4% e 6% para diferentes ritmos da noite.
   - *Capítulo 3: Design Brutalista em Alumínio e Vidro*: A garrafa como peça de mesa para lounges e festas.
   - *Linha do Tempo Visual*: Linha do tempo interativa destacando a evolução da fórmula e certificações de pureza.
   - *CTA de Retorno e Degustação*: Botão de retorno direto ao palco central do produto escolhido.
3. **Persistência de Estado do Produto**: Se o usuário estiver explorando a versão 4% na Home, ao navegar para o Comparativo ou Manifesto, o contexto da versão 4% permanece ativo e sincronizado.

### Identidade Visual & Tema
- **Paleta Noturna de Alto Luxo**:
  - Base: Preto profundo `#050507` e ardósia escura `#0a0a0f`.
  - Superfícies Estruturais: Borda fosca ultrafina `rgba(255,255,255,0.06)` com painéis em vidro fumê translúcido.
  - Acentos: Violeta imperial `#9333ea`, fúcsia elétrico `#c084fc` e prata metálica usinada `#e2e8f0`.
- **Tipografia**:
  - Títulos e Destaques: `Plus Jakarta Sans` / `Syne` em caixa alta e pesos elegantes (Light 300 e Bold 700).
  - Corpo de Texto: `Plus Jakarta Sans` regular com espaçamento respirável (15px–16px, line-height 1.7).
  - Dados Técnicos: Numerais tabulares `font-mono tabular-nums`.

---

## 3. Decisões de Produto & Arquitetura

- **Roteamento SPA Integrado via Estado Reativo**:
  - *Abordagem*: Gerenciamento de rotas leves baseado em estado reativo (`activePage: 'home' | 'manifesto' | 'anatomy' | 'comparison'`) com sincronização de hash na URL (`#colecao`, `#manifesto`, `#anatomia`, `#comparativo`).
  - *Por que*: Permite transições 100% fluidas com AnimatePresence e Framer Motion sem atraso de carregamento de página do navegador e sem interferir no WebGL do Three.js em segundo plano.
  - *Alternativa descartada*: Roteador com recarregamento completo de janela (destruiria a cena 3D e causaria tela branca perceptível a cada clique).
- **Cenário 3D Compartilhado**:
  - *Abordagem*: O estúdio 3D (`Studio3DBackground`) permanece ativo em segundo plano em todas as telas com ajustes graduais de profundidade e névoa para manter a continuidade sensorial da marca.

---

## 4. Arquitetura Técnica & Diagrama de Componentes

```
┌────────────────────────────────────────────────────────────────────────┐
│                               Header                                   │
│  [ROX Logo] ─── [Abas: Coleção · Manifesto · Anatomia · Comparativo]  │
│  [Progresso de Rolagem Suave 2px] ─── [Botão Comprar Agora]           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         ┌──────────┴──────────┐
                         │   Page Router State │
                         │ (activeTab & URL #) │
                         └──────────┬──────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
┌──────────▼──────────┐  ┌──────────▼──────────┐  ┌──────────▼──────────┐
│   ShowroomPage      │  │    ManifestoPage    │  │    AnatomyPage      │
│  • Hero 3D Stage    │  │  • História & Origem│  │  • 4 Fases Garrafa  │
│  • BottleVisualizer │  │  • Pilares Noturnos │  │  • Vidro UV & Tampa │
│  • Seletor 2/4/6%   │  │  • Linha do Tempo   │  │  • Especificação    │
│  • 'Ler Mais' Info  │  │  • Filosofia        │  │  • Call to Action   │
└──────────┬──────────┘  └─────────────────────┘  └─────────────────────┘
           │
┌──────────▼──────────┐
│   ComparisonPage    │
│  • Mesa Técnica 1:1 │
│  • Matriz de Teores │
│  • Ingredientes     │
└─────────────────────┘
```

### Mapeamento de Arquivos e Estados
- `src/App.tsx`: Controle de roteamento SPA com `activeTab`, transições de página via `AnimatePresence` (`mode="wait"`), e modal de compra global.
- `src/components/Header.tsx`: Atualizado com as 4 abas interativas com micro-indicador de rota ativa e suporte a navegação por teclado.
- `src/components/pages/ManifestoPage.tsx`: Nova página detalhada de Manifesto, História e Origem da ROX Drink.
- `src/components/pages/ShowroomPage.tsx`: Módulo do carrossel principal e palco 3D.
- `src/components/pages/AnatomyPage.tsx`: Visualização dedicada da anatomia da garrafa.
- `src/components/pages/ComparisonPage.tsx`: Visualização dedicada do comparativo técnico.
