/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from './data/products';
import { Header, PageId } from './components/Header';
import { ShowroomPage } from './components/pages/ShowroomPage';
import { ManifestoPage } from './components/pages/ManifestoPage';
import { AnatomyPage } from './components/pages/AnatomyPage';
import { ComparisonPage } from './components/pages/ComparisonPage';
import { PurchaseModal } from './components/PurchaseModal';
import { SpecsDrawer } from './components/SpecsDrawer';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('colecao');
  const [currentProductIndex, setCurrentProductIndex] = useState(1); // Default to ROX 4% signature
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSpecsDrawerOpen, setIsSpecsDrawerOpen] = useState(false);

  // Synchronize hash in URL for back/forward and deep linking
  useEffect(() => {
    const syncWithHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'colecao' || hash === 'manifesto' || hash === 'anatomia' || hash === 'comparativo') {
        setCurrentPage(hash);
      } else if (hash === 'produtos' || hash === 'versoes') {
        setCurrentPage('colecao');
      } else if (hash === 'identidade') {
        setCurrentPage('manifesto');
      }
    };

    syncWithHash();
    window.addEventListener('hashchange', syncWithHash);
    return () => window.removeEventListener('hashchange', syncWithHash);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col selection:bg-purple-600/30 selection:text-white relative">
      {/* Subtle Animated Energy Particle Canvas Background */}
      <ParticleBackground />

      {/* Top Persistent Header with SPA Navigation & Progress Bar */}
      <Header
        activePage={currentPage}
        onNavigate={navigateTo}
        onOpenPurchase={() => setIsPurchaseModalOpen(true)}
      />

      {/* Main Interactive View with Cinematic Page Transitions */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1 flex flex-col"
          >
            {currentPage === 'colecao' && (
              <ShowroomPage
                products={PRODUCTS}
                currentIndex={currentProductIndex}
                onSelectIndex={setCurrentProductIndex}
                onOpenPurchase={() => setIsPurchaseModalOpen(true)}
                onOpenSpecs={() => setIsSpecsDrawerOpen(true)}
                onNavigateToManifesto={() => navigateTo('manifesto')}
                onNavigateToAnatomy={() => navigateTo('anatomia')}
                onNavigateToComparison={() => navigateTo('comparativo')}
              />
            )}

            {currentPage === 'manifesto' && (
              <ManifestoPage
                onSelectProductAndNavigate={(index) => {
                  setCurrentProductIndex(index);
                  navigateTo('colecao');
                }}
                onOpenPurchase={() => setIsPurchaseModalOpen(true)}
              />
            )}

            {currentPage === 'anatomia' && (
              <AnatomyPage
                onSelectProductAndNavigate={(index) => {
                  setCurrentProductIndex(index);
                  navigateTo('colecao');
                }}
                onOpenPurchase={() => setIsPurchaseModalOpen(true)}
              />
            )}

            {currentPage === 'comparativo' && (
              <ComparisonPage
                products={PRODUCTS}
                currentProductIndex={currentProductIndex}
                onSelectProductAndNavigate={(index) => {
                  setCurrentProductIndex(index);
                  navigateTo('colecao');
                }}
                onOpenPurchase={() => setIsPurchaseModalOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Footer with SPA links & Legal */}
      <Footer
        onNavigate={navigateTo}
        onOpenPurchase={() => setIsPurchaseModalOpen(true)}
      />

      {/* Global Purchase Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        products={PRODUCTS}
        currentProductIndex={currentProductIndex}
      />

      {/* Technical Specifications Drawer */}
      <SpecsDrawer
        isOpen={isSpecsDrawerOpen}
        onClose={() => setIsSpecsDrawerOpen(false)}
        product={PRODUCTS[currentProductIndex]}
      />
    </div>
  );
}
