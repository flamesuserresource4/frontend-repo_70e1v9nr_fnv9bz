import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Petal = ({ delay }) => {
  const left = useMemo(() => Math.random() * 100, []);
  const size = useMemo(() => 6 + Math.random() * 10, []);
  const rotate = useMemo(() => (Math.random() * 80 - 40), []);
  return (
    <motion.span
      className="absolute rounded-full"
      style={{
        top: -10,
        left: `${left}%`,
        width: size,
        height: size,
        backgroundColor: '#F3E3DC',
        boxShadow: '0 6px 18px rgba(243,227,220,0.6)'
      }}
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{ opacity: [0, 1, 0], y: [0, 240, 300], rotate }}
      transition={{ duration: 1.6, delay, ease: 'easeInOut' }}
    />
  );
};

const PlantModal = ({ open, onClose, onPlant }) => {
  const [value, setValue] = useState('');
  const [dropping, setDropping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      setValue('');
      setDropping(false);
    }
  }, [open]);

  const handlePlant = () => {
    const text = value.trim();
    if (!text) return;
    setDropping(true);
    setTimeout(() => {
      onPlant(text);
      setDropping(false);
      onClose();
      setValue('');
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#2D2A26]/40" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative w-full max-w-lg rounded-2xl p-6 md:p-8 border"
            style={{ background: '#FFFCF8', borderColor: '#E9E3DC', boxShadow: '0 30px 80px rgba(45,42,38,0.25)' }}
          >
            <h3 className="text-[24px] md:text-[28px] text-[#2D2A26] font-semibold" style={{ fontFamily: 'Clash Display, Recoleta, ui-serif' }}>
              Plant a Dream
            </h3>
            <p className="mt-2 text-[14px] md:text-[16px] text-[#2D2A26]/80" style={{ fontFamily: 'Inter, ui-sans-serif' }}>
              Whisper it softly. You can keep it simple.
            </p>

            <div className="mt-5">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="I want to feel brave..."
                className="w-full rounded-xl border px-4 py-3 text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:ring-2"
                style={{ borderColor: '#E9E3DC' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePlant();
                }}
              />
              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{ backgroundColor: '#F3E3DC', color: '#2D2A26' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlant}
                  className="px-5 py-2 rounded-full text-sm font-medium hover:scale-[1.02] transition"
                  style={{ backgroundColor: '#B9D7A5', color: '#2D2A26', boxShadow: '0 10px 30px rgba(185,215,165,0.45)' }}
                >
                  Plant
                </button>
              </div>
            </div>

            {/* Seed drop animation */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-full overflow-hidden">
              <AnimatePresence>
                {dropping && (
                  <>
                    <motion.span
                      className="absolute left-1/2 -translate-x-1/2 rounded-full"
                      style={{ width: 14, height: 14, backgroundColor: '#C8A27C', boxShadow: '0 6px 20px rgba(200,162,124,0.6)' }}
                      initial={{ y: -40, opacity: 0 }}
                      animate={{ y: 160, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                    {Array.from({ length: 12 }).map((_, i) => (
                      <Petal key={i} delay={0.4 + i * 0.05} />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlantModal;
