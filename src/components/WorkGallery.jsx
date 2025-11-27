import { useRef, useState, useEffect } from 'react';
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
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-12deg', '12deg']);

  // Dynamic Spotlight
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.12), transparent 80%)`;

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseXFromCenter = e.clientX - rect.left - rect.width / 2;
    const mouseYFromCenter = e.clientY - rect.top - rect.height / 2;
    x.set(mouseXFromCenter / rect.width);
    y.set(mouseYFromCenter / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), {
    stiffness: 100,
    damping: 20,
  });

  const baseDelay = index * 0.1;

  return (
    <motion.article
      ref={ref}
      className="relative w-full mb-20 md:mb-32 flex items-center justify-center"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full md:w-[85%] aspect-[4/3] md:aspect-[16/10] group"
        style={!isMobile ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
      >
        {/* Glow */}
        <div
          className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-50 -z-10"
          style={{ background: color }}
        />

        {/* Card */}
        <motion.div
          className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: `url(${image})` }}
          initial={{ scale: 1.05 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Spotlight overlay */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
              style={{ background: spotlight }}
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        style={!isMobile ? { y: parallaxY } : undefined}
        className="absolute z-20 pointer-events-none text-center mix-blend-difference"
      >
        <h3
          className="text-[clamp(2rem,8vw,6rem)] font-black leading-none tracking-tight"
          style={{ textShadow: `0 0 30px ${color}` }}
        >
          {title}
        </h3>
        <p className="text-sm md:text-lg font-light tracking-[0.3em] uppercase mt-3 text-white/80">
          {category}
        </p>
      </motion.div>
    </motion.article>
  );
};

const WorkGallery = () => {
  const projects = [
    {
      title: 'NEBULA',
      category: 'Immersive Experience',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=60&w=1200&auto=format&fit=crop',
      color: '#8b5cf6',
    },
    {
      title: 'VOID',
      category: 'Digital Product',
      image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=60&w=1200&auto=format&fit=crop',
      color: '#3b82f6',
    },
    {
      title: 'ECHO',
      category: 'Sound Design',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=60&w=1200&auto=format&fit=crop',
      color: '#10b981',
    },
    {
      title: 'FLUX',
      category: 'Motion Graphics',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=60&w=1200&auto=format&fit=crop',
      color: '#f43f5e',
    },
  ];

  return (
    <section id="work" className="w-full py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="sr-only">Our Work</h2>
        {projects.map((project, index) => (
          <ProjectItem key={project.title} {...project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WorkGallery;
