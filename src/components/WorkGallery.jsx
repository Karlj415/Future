import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';

const ProjectItem = ({ title, category, image, index, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.45, once: true });

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg']);

  // Dynamic Spotlight
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.15), transparent 80%)`;

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for text
  const parallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
    stiffness: 120,
    damping: 18,
    mass: 0.4,
  });
  const baseDelay = index * 0.08;

  return (
    <motion.div
      ref={ref}
      className='relative w-full h-[80vh] mb-32 flex items-center justify-center perspective-[1200px]'
      initial={{ opacity: 0, scale: 0.9, y: 80 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 60 }}
      transition={{ duration: 0.9, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className='relative w-[80%] h-full group preserve-3d'
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Glow behind */}
        <div
          className='absolute -inset-6 rounded-[36px] opacity-0 blur-3xl transition-all duration-[1200ms] group-hover:opacity-60'
          style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
        />

        <motion.div
          className='relative w-full h-full rounded-[32px] overflow-hidden border border-white/10 bg-cover bg-center shadow-[0_25px_120px_rgba(0,0,0,0.45)]'
          style={{ backgroundImage: `url(${image})` }}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.02, opacity: 0.4 }}
          transition={{ duration: 1.1, delay: baseDelay + 0.1, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Scanlines */}
          <div className='absolute inset-0 bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[2] bg-[length:100%_4px,6px_100%] pointer-events-none' />

          {/* Spotlight */}
          <motion.div
            className='absolute inset-0 z-[3] mix-blend-overlay pointer-events-none'
            style={{ background: spotlight }}
          />

          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-white/5 opacity-80 mix-blend-multiply z-[1]' />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: parallaxY, z: 60 }}
        className='absolute z-20 pointer-events-none mix-blend-difference text-white text-center drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]'
      >
        <motion.h3
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.9, delay: baseDelay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className='text-[8vw] font-black leading-none tracking-tight'
          style={{ textShadow: `0 0 30px ${color}` }}
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: baseDelay + 0.3, ease: [0.16, 1, 0.3, 1] }}
          className='text-xl font-light tracking-[0.4em] uppercase mt-4 text-white/80'
        >
          {category}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const WorkGallery = () => {
  const projects = [
    {
      title: 'NEBULA',
      category: 'Immersive Experience',
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=60&w=1200&auto=format&fit=crop',
      color: '#8b5cf6', // Violet
    },
    {
      title: 'VOID',
      category: 'Digital Product',
      image:
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=60&w=1200&auto=format&fit=crop',
      color: '#3b82f6', // Blue
    },
    {
      title: 'ECHO',
      category: 'Sound Design',
      image:
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=60&w=1200&auto=format&fit=crop',
      color: '#10b981', // Emerald
    },
    {
      title: 'FLUX',
      category: 'Motion Graphics',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=60&w=1200&auto=format&fit=crop',
      color: '#f43f5e', // Rose
    },
  ];

  return (
    <section id='work' className='w-full py-32 px-4'>
      <div className='max-w-7xl mx-auto'>
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WorkGallery;
