import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';

const KineticText = ({ text }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2.5], {
    clamp: false,
  });

  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-30, 30]);

  // Infinite scroll logic
  // We repeat the text 8 times. 100% / 8 = 12.5%
  const x = useTransform(baseX, (v) => `${v % 12.5}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = -1 * (delta / 1000); // Base speed moving left

    // Add scroll velocity effect
    const velocity = velocityFactor.get();
    if (velocity !== 0) {
      moveBy += -Math.abs(velocity) * (delta / 1000);
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className='w-full overflow-hidden py-32'>
      <motion.div style={{ x, skewX }} className='whitespace-nowrap flex w-max will-change-transform'>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.h2 key={i} initial={{ y: '100%' }} whileInView={{ y: 0 }} transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} viewport={{ once: true }} className='text-[clamp(4rem,15vw,20rem)] font-bold uppercase leading-none tracking-tighter mr-12'>
            {text}
          </motion.h2>
        ))}
      </motion.div>
    </div>
  );
};

export default KineticText;
