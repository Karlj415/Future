import { useEffect, useState, useRef, useCallback } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

const CustomCursor = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rafId = useRef(null);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsEnabled(hasFinePointer && !prefersReducedMotion && !isTouchDevice);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (rafId.current) return;
    
    rafId.current = requestAnimationFrame(() => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      rafId.current = null;
    });
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!isEnabled) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isEnabled, handleMouseMove]);

  if (!isEnabled) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          body, a, button { cursor: none !important; }
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: 12, translateY: 12 }}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
