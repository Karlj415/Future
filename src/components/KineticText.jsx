import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const KineticText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (letter === '\n' || letter === ' ') return letter;
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 0.5;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (isInView) {
      const cleanup = scramble();
      return cleanup;
    }
  }, [isInView, scramble]);

  return (
    <section className="w-full py-16 md:py-24 px-4 overflow-hidden">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-[clamp(1.5rem,5vw,5rem)] font-black text-center tracking-tight text-white whitespace-pre-line leading-tight">
          {displayText}
        </h2>
      </motion.div>
    </section>
  );
};

export default KineticText;
