import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Leaf, Sparkles, Quote } from 'lucide-react';

const steps = [
  {
    icon: Sprout,
    title: 'Write your dream',
    text: 'Whisper a hope into the field below. Keep it gentle, keep it true.',
  },
  {
    icon: Leaf,
    title: 'Plant your seed',
    text: 'Drop it into the soil. It will rest, then begin to glow.',
  },
  {
    icon: Sparkles,
    title: 'Watch it grow',
    text: 'Over time, your dream becomes a flower in the garden.',
  },
];

const quotes = [
  '“I dream of quiet mornings.”',
  '“I hope to see my friend again.”',
  '“I want to feel brave.”',
];

const HowItWorks = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="w-full" aria-label="How it works">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[32px] md:text-[40px] text-[#2D2A26] font-semibold text-center"
          style={{ fontFamily: 'Clash Display, Recoleta, ui-serif' }}
        >
          How it works
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-2xl p-6 md:p-8 bg-white/60 backdrop-blur border border-[#E9E3DC] hover:shadow-lg transition"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: '#F3E3DC' }}
              >
                <s.icon className="w-6 h-6" color="#2D2A26" />
              </div>
              <h3
                className="text-xl md:text-2xl text-[#2D2A26] font-semibold"
                style={{ fontFamily: 'Clash Display, Recoleta, ui-serif' }}
              >
                {s.title}
              </h3>
              <p className="mt-2 text-[16px] md:text-[18px] text-[#2D2A26]/80" style={{ fontFamily: 'Inter, ui-sans-serif' }}>
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 flex items-center justify-center">
          <Quote className="w-5 h-5 mr-3 text-[#C8A27C]" />
          <motion.p
            key={quoteIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="text-center text-[16px] md:text-[18px] text-[#2D2A26]/80"
            style={{ fontFamily: 'Inter, ui-sans-serif' }}
          >
            {quotes[quoteIndex]}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
