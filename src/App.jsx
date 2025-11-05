import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Garden from './components/Garden.jsx';
import PlantModal from './components/PlantModal.jsx';

const STORAGE_KEY = 'garden_of_dreams';

const App = () => {
  const [dreams, setDreams] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setDreams(JSON.parse(saved));
      }
    } catch (_) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
    } catch (_) {
      // ignore
    }
  }, [dreams]);

  const handlePlant = (text) => {
    const entry = { id: Date.now().toString(), text, plantedAt: new Date().toISOString() };
    setDreams((d) => [entry, ...d].slice(0, 200));
    // naive share copy for delight
    try {
      const url = window.location.origin + window.location.pathname;
      const shareText = `${text} — #GardenOfDreams ${url}`;
      navigator.clipboard?.writeText(shareText);
    } catch (_) {}
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FAF6F2 0%, #E9E3DC 100%)' }}>
      <HeroSection onCTAClick={scrollToForm} />

      <HowItWorks />

      <Garden dreams={dreams} onOpenModal={() => setModalOpen(true)} formRef={formRef} />

      <section className="mt-8 md:mt-12">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-6 md:p-8 text-center border"
            style={{ borderColor: '#E9E3DC', background: 'linear-gradient(180deg, #FFFAF4 0%, #FFF8F0 100%)' }}
          >
            <h3 className="text-[24px] md:text-[28px] text-[#2D2A26] font-semibold" style={{ fontFamily: 'Clash Display, Recoleta, ui-serif' }}>
              Your dream belongs here too.
            </h3>
            <p className="mt-2 text-[16px] text-[#2D2A26]/80" style={{ fontFamily: 'Inter, ui-sans-serif' }}>
              Plant it now and share a little light with someone who needs it.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setModalOpen(true)}
                className="rounded-full px-6 py-3 text-base md:text-lg font-medium transition hover:scale-[1.02]"
                style={{ backgroundColor: '#B9D7A5', color: '#2D2A26', boxShadow: '0 10px 30px rgba(185,215,165,0.45)' }}
              >
                Plant a Dream
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: '#E9E3DC' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm md:text-base text-[#2D2A26]/80" style={{ fontFamily: 'Inter, ui-sans-serif' }}>
            🌿 Garden of Dreams — a tiny home for human hope.
          </p>
          <div className="flex items-center gap-5">
            <a className="text-sm text-[#2D2A26]/80 hover:underline" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a className="text-sm text-[#2D2A26]/80 hover:underline" href="https://twitter.com" target="_blank" rel="noreferrer">X / Twitter</a>
            <a className="text-sm text-[#2D2A26]/80 hover:underline" href="mailto:hello@example.com">Email</a>
          </div>
        </div>
      </footer>

      <PlantModal open={modalOpen} onClose={() => setModalOpen(false)} onPlant={handlePlant} />
    </div>
  );
};

export default App;
