import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const KineticText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  // Mouse tracking for spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for the glow
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (text[index] === '\n') return '\n'; // Preserve newlines
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    if (isInView) {
      scramble();
    }
  }, [isInView, text]);

  const parentVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
    }
  };

  const childVariants = {
    initial: { marginRight: '0em' },
    hover: { 
      marginRight: '0.1em',
      transition: { duration: 1.5, ease: 'easeOut' }
    }
  };

  return (
    <div className='w-full py-32 flex items-center justify-center overflow-hidden'>
      <motion.div 
        ref={ref}
        className='relative group cursor-default w-full max-w-6xl mx-auto px-4'
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onMouseMove={handleMouseMove}
      >
        <motion.h2 
          className='text-[clamp(2rem,5.5vw,8rem)] font-black text-center tracking-tighter text-white whitespace-pre-line relative z-10'
          variants={parentVariants}
          initial="initial"
          whileHover="hover"
        >
          {displayText.split('\n').map((line, lineIndex) => (
            <div key={lineIndex} className="block whitespace-nowrap">
              {line.split('').map((char, charIndex) => (
                <motion.span key={`${lineIndex}-${charIndex}`} variants={childVariants} className="inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.h2>
        
        {/* Mouse-following Spotlight Glow */}
        <motion.div 
          className='absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen'
          style={{ x: glowX, y: glowY }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileHover={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

export default KineticText;
