import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const Flower = ({ text, index }) => {
  const [hovered, setHovered] = useState(false);
  const hue = useMemo(() => 330 + (index * 23) % 30, [index]);
  const size = useMemo(() => randomBetween(18, 28), []);
  const floatDur = useMemo(() => randomBetween(4, 7), []);
  const xOffset = useMemo(() => randomBetween(-10, 10), []);

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative isolate rounded-full"
      style={{ width: size + 8, height: size + 8 }}
      aria-label={"Dream: " + text}
      title="Each flower is someone's dream."
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.span
        style={{
          display: 'inline-block',
          filter: hovered ? 'drop-shadow(0 6px 16px rgba(252,139,170,0.5))' : 'drop-shadow(0 2px 6px rgba(45,42,38,0.15))',
        }}
        animate={{ y: [0, -6, 0], x: [0, xOffset, 0] }}
        transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          style={{ fontSize: size, lineHeight: 1 }}
          className="select-none"
          role="img"
          aria-hidden="true"
        >
          🌸
        </span>
      </motion.span>
      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs text-[#2D2A26]"
          style={{ backgroundColor: '#F3E3DC', boxShadow: '0 8px 20px rgba(243,227,220,0.65)' }}
        >
          {text.length > 32 ? text.slice(0, 32) + '…' : text}
        </motion.span>
      )}
    </motion.button>
  );
};

const Garden = ({ dreams, onOpenModal, formRef }) => {
  const gardenFlowers = useMemo(() => {
    const base = dreams.length > 0 ? dreams : [
      { id: 'seed-1', text: 'A gentle place to rest' },
      { id: 'seed-2', text: 'New courage at sunrise' },
      { id: 'seed-3', text: 'Writing letters to future me' },
      { id: 'seed-4', text: 'Healing in small steps' },
      { id: 'seed-5', text: 'Finding home in my body' },
    ];
    return base.slice(0, 24);
  }, [dreams]);

  return (
    <section aria-label="Garden preview">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
          <div className="md:w-1/2">
            <h2 className="text-[32px] md:text-[40px] text-[#2D2A26] font-semibold" style={{ fontFamily: 'Clash Display, Recoleta, ui-serif' }}>
              Garden of Dreams
            </h2>
            <p className="mt-3 text-[16px] md:text-[18px] text-[#2D2A26]/80" style={{ fontFamily: 'Inter, ui-sans-serif' }}>
              Each flower is someone’s dream. Hover to feel its glow. Plant yours and watch this meadow slowly bloom.
            </p>
            <div className="mt-6">
              <button
                onClick={onOpenModal}
                className="rounded-full px-5 py-3 text-base font-medium transition hover:scale-[1.02]"
                style={{ backgroundColor: '#B9D7A5', color: '#2D2A26', boxShadow: '0 10px 30px rgba(185,215,165,0.45)' }}
              >
                Plant a Dream
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <div
              className="relative rounded-3xl p-4 md:p-6 border overflow-hidden"
              style={{
                borderColor: '#E9E3DC',
                background: 'linear-gradient(180deg, #FAF6F2 0%, #FDFBF9 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 20px 60px rgba(200,162,124,0.15)'
              }}
            >
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-9 gap-3 md:gap-4 min-h-[260px]">
                {gardenFlowers.map((d, i) => (
                  <Flower key={d.id + '-' + i} text={d.text} index={i} />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#E9E3DC]/50 to-transparent" />
            </div>
            <p className="mt-3 text-sm text-[#2D2A26]/60 text-center">Tip: “Each flower is someone’s dream.”</p>
          </motion.div>
        </div>

        <div ref={formRef} className="mt-16 text-center">
          <h3 className="text-[24px] md:text-[28px] text-[#2D2A26] font-semibold" style={{ fontFamily: 'Clash Display, Recoleta, ui-serif' }}>
            Your dream belongs here too.
          </h3>
          <div className="mt-5">
            <button
              onClick={onOpenModal}
              className="rounded-full px-6 py-3 text-base md:text-lg font-medium transition hover:scale-[1.02]"
              style={{ backgroundColor: '#C8A27C', color: '#2D2A26', boxShadow: '0 10px 30px rgba(200,162,124,0.35)' }}
            >
              Plant a Dream
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Garden;
