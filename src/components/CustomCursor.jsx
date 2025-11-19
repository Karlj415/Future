import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const rafId = useRef(null);
  const targetPosition = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      setIsVisible(false);
      return undefined;
    }

    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const subscribe = (mediaQuery, handler) => {
      if (typeof mediaQuery?.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
      }
      if (typeof mediaQuery?.addListener === 'function') {
        mediaQuery.addListener(handler);
        return () => mediaQuery.removeListener(handler);
      }
      return () => {};
    };

    const evaluate = () => {
      const shouldEnable = pointerQuery.matches && !motionQuery.matches;
      setIsVisible(shouldEnable);

      if (!shouldEnable) {
        cursorX.set(-100);
        cursorY.set(-100);
      }
    };

    evaluate();

    const pointerCleanup = subscribe(pointerQuery, evaluate);
    const motionCleanup = subscribe(motionQuery, evaluate);

    return () => {
      pointerCleanup();
      motionCleanup();
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!isVisible) return undefined;

    const updateCursor = () => {
      const { x, y } = targetPosition.current;
      cursorX.set(x);
      cursorY.set(y);
      rafId.current = null;
    };

    const moveCursor = e => {
      targetPosition.current = { x: e.clientX - 16, y: e.clientY - 16 };

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateCursor);
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          body, a, button { cursor: none; }
        }
      `}</style>

      {/* Outer Ring (Laggy) */}
      <motion.div
        className='fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference'
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Inner Dot (Instant) */}
      <motion.div
        className='fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference'
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 12,
          translateY: 12,
        }}
      />
    </>
  );
};

export default CustomCursor;
