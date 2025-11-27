import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const fullText = 'CODE BY KARL';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const scrambleText = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        fullText
          .split('')
          .map((letter, index) => {
            if (index < iteration) return fullText[index];
            if (letter === ' ') return ' ';
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
      iteration += 0.4;
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    let mounted = true;
    let cleanup;

    const runCounter = async () => {
      for (let i = 0; i <= 100; i++) {
        if (!mounted) return;
        setCount(i);
        await new Promise((r) => setTimeout(r, 18));
      }
      if (mounted) {
        cleanup = scrambleText();
      }
    };

    runCounter();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [scrambleText]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center px-4">
        <div className="text-[clamp(3rem,12vw,10rem)] font-bold tracking-tighter font-mono">
          {count < 100 ? count.toString().padStart(3, '0') : text}
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
