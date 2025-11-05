import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const HeroSection = ({ onCTAClick }) => {
  return (
    <section
      className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
      style={{
        background: 'linear-gradient(180deg, #FAF6F2 0%, #E9E3DC 100%)',
      }}
    >
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/Tu-wEVxfDuICpwJI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FAF6F2]/70 via-transparent to-[#E9E3DC]/80" />

      <div className="relative z-10 max-w-[1200px] px-6 md:px-8 py-16 md:py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-[44px] md:text-[64px] leading-[1.05] tracking-tight text-[#2D2A26] font-semibold"
          style={{ fontFamily: 'Clash Display, Recoleta, ui-serif' }}
        >
          Plant a dream. Watch it grow.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.1 }}
          className="mt-4 md:mt-6 text-[18px] md:text-[20px] text-[#2D2A26]/80 max-w-2xl mx-auto"
          style={{ fontFamily: 'Inter, ui-sans-serif' }}
        >
          A digital garden where anonymous dreams take root.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
          className="mt-8 md:mt-10"
        >
          <button
            onClick={onCTAClick}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base md:text-lg font-medium shadow-sm transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: '#B9D7A5',
              color: '#2D2A26',
              boxShadow: '0 10px 30px rgba(185,215,165,0.45)',
            }}
            aria-label="Plant your first dream"
          >
            Plant your first dream
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
