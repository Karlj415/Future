import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id='about' className='w-full py-32 px-4 flex items-center justify-center min-h-[50vh]'>
      <div className='max-w-4xl mx-auto text-center'>
        <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className='text-[5vw] font-bold uppercase leading-none tracking-tighter mb-12'>
          THE HUMAN ELEMENT
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className='text-xl md:text-2xl font-light leading-relaxed text-gray-300'>
          In an era of generated content, we choose to craft. We believe that true digital experiences are born from human intuition, not just prediction. Every interaction, every motion, and every pixel is placed with intent—creating work that resonates because it was made by a mind, not a model.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
