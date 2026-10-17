import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, Check, Link as LinkIcon } from 'lucide-react';
import { Product } from '../types/product';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentProductIndex: number;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  products,
  currentProductIndex,
}) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(currentProductIndex);
  const [packType, setPackType] = useState<'single' | 'pack6' | 'pack12' | 'trio'>('pack6');
  const [customCheckoutUrl, setCustomCheckoutUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showConfigLink, setShowConfigLink] = useState(false);

  // Sync if opened
  React.useEffect(() => {
    setSelectedProductIndex(currentProductIndex);
  }, [currentProductIndex, isOpen]);

  if (!isOpen) return null;

  const currentProduct = products[selectedProductIndex];

  const packOptions = [
    {
      id: 'single' as const,
      label: 'Garrafa Individual',
      detail: '1x 300 ml',
    },
    {
      id: 'pack6' as const,
      label: 'Pack com 6 Unidades',
      detail: '6x 300 ml (Mais Escolhido)',
    },
    {
      id: 'pack12' as const,
      label: 'Pack com 12 Unidades',
      detail: '12x 300 ml',
    },
    {
      id: 'trio' as const,
      label: 'Trio Degustação',
      detail: '1x 2% + 1x 4% + 1x 6%',
    },
  ];

  const handleCheckout = () => {
    if (customCheckoutUrl.trim()) {
      window.open(customCheckoutUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    // If no custom URL provided yet, generate an order summary to clipboard and alert
    const summary = `Pedido ROX Drink: ${packType === 'trio' ? 'Trio Degustação (2% + 4% + 6%)' : `${currentProduct.name} - ${packOptions.find(p => p.id === packType)?.label}`}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl shadow-purple-950/30">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-purple-400">
              Canal de Aquisição Oficial
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              Adquirir ROX Drink
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar janela"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Product selector tabs inside modal */}
        <div className="mt-5">
          <label className="block text-xs font-mono text-slate-400 mb-2">
            ESCOLHA A VERSÃO:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedProductIndex(idx)}
                className={`rounded-lg border p-2.5 text-center transition-all ${
                  selectedProductIndex === idx
                    ? 'border-purple-500 bg-purple-950/40 text-white font-semibold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-display">{p.name}</div>
                <div className="text-[10px] font-mono text-slate-400">{p.abv}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pack Selection */}
        <div className="mt-5">
          <label className="block text-xs font-mono text-slate-400 mb-2">
            FORMATO DO PEDIDO:
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {packOptions.map((pack) => (
              <button
                key={pack.id}
                onClick={() => setPackType(pack.id)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  packType === pack.id
                    ? 'border-purple-400/80 bg-slate-800/90 text-white'
                    : 'border-slate-800/80 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-semibold text-slate-200">{pack.label}</div>
                <div className="mt-0.5 text-[11px] text-slate-400 font-mono">{pack.detail}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prepared Real Link Configuration */}
        <div className="mt-5 rounded-lg border border-slate-800/70 bg-slate-900/40 p-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400 flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5 text-purple-400" />
              DESTINO DE CHECKOUT (LINK REAL)
            </span>
            <button
              onClick={() => setShowConfigLink(!showConfigLink)}
              className="text-[11px] text-purple-400 hover:underline"
            >
              {showConfigLink ? 'Ocultar' : 'Configurar Link'}
            </button>
          </div>

          {showConfigLink ? (
            <div className="mt-2.5">
              <input
                type="url"
                value={customCheckoutUrl}
                onChange={(e) => setCustomCheckoutUrl(e.target.value)}
                placeholder="Insira a URL real do e-commerce ou WhatsApp"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:border-purple-500 focus:outline-none"
              />
              <p className="mt-1 text-[10px] text-slate-400">
                O botão abaixo direcionará diretamente para este endereço quando configurado.
              </p>
            </div>
          ) : (
            <p className="mt-1 text-[11px] text-slate-400">
              {customCheckoutUrl ? `Destino ativo: ${customCheckoutUrl}` : 'Pronto para redirecionar para a plataforma de vendas ou canal de concierge.'}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={handleCheckout}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3.5 px-6 text-sm font-bold text-slate-950 transition-all hover:bg-white hover:shadow-lg hover:shadow-purple-500/20 active:scale-98"
          >
            {customCheckoutUrl ? (
              <>
                <ExternalLink className="h-4 w-4" />
                <span>Ir para Checkout Externo</span>
              </>
            ) : copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Resumo Copiado para a Área de Transferência!</span>
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4" />
                <span>Prosseguir com Pedido de {packType === 'trio' ? 'Trio Degustação' : currentProduct.name}</span>
              </>
            )}
          </button>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
          <span>Venda restrita para maiores de 18 anos. Beba com moderação.</span>
        </div>
      </div>
    </div>
  );
};
