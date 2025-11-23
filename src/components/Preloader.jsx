import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const fullText = 'CODE BY KARL';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  useEffect(() => {
    let mounted = true;

    const runSequence = async () => {
      // 1. Count up to 100
      for (let i = 0; i <= 100; i++) {
        if (!mounted) return;
        setCount(i);
        await new Promise((r) => setTimeout(r, 20));
      }

      // 2. Scramble text reveal
      let iteration = 0;
      while (iteration <= fullText.length) {
        if (!mounted) return;

        setText(
          fullText
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return fullText[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        iteration += 1 / 3;
        await new Promise((r) => setTimeout(r, 30));
      }

      // 3. Wait a bit then complete
      if (mounted) {
        setTimeout(() => {
          if (mounted) onComplete();
        }, 500);
      }
    };

    runSequence();

    return () => {
      mounted = false;
    };
  }, [onComplete]);

  return (
    <motion.div className='fixed inset-0 z-[100] flex items-center justify-center bg-black text-white' initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <div className='text-center'>
        <div className='text-[10vw] font-light tracking-tighter font-sans'>{count < 100 ? count.toString().padStart(3, '0') : text}</div>
      </div>
    </motion.div>
  );
};

export default Preloader;
