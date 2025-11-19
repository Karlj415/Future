import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ProjectItem = ({ title, category, image, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for text
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={ref} className='relative w-full h-[80vh] mb-32 flex items-center justify-center'>
      <div className='relative w-[80%] h-full overflow-hidden group'>
        <motion.div className='w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105' style={{ backgroundImage: `url(${image})` }} />
        <div className='absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500' />
      </div>

      <motion.div style={{ y }} className='absolute z-10 pointer-events-none mix-blend-difference text-white text-center'>
        <h3 className='text-[8vw] font-bold leading-none tracking-tighter'>{title}</h3>
        <p className='text-xl font-light tracking-widest uppercase mt-4'>{category}</p>
      </motion.div>
    </div>
  );
};

const WorkGallery = () => {
  const projects = [
    { title: 'NEBULA', category: 'Immersive Experience', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=60&w=1200&auto=format&fit=crop' },
    { title: 'VOID', category: 'Digital Product', image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=60&w=1200&auto=format&fit=crop' },
    { title: 'ECHO', category: 'Sound Design', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=60&w=1200&auto=format&fit=crop' },
    { title: 'FLUX', category: 'Motion Graphics', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=60&w=1200&auto=format&fit=crop' },
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
