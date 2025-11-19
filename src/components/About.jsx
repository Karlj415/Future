import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id='about' className='w-full py-32 px-4 flex items-center justify-center min-h-[50vh]'>
      <div className='max-w-4xl mx-auto text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-[5vw] font-bold uppercase leading-none tracking-tighter mb-12'
        >
          HUMAN SIGNAL // AGAINST THE MACHINE
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='text-xl md:text-2xl font-light leading-relaxed text-gray-300'
        >
          We build with our own fingerprints still on the keyboard. Every shader, every line, every
          unexpected glitch is a reminder that human intent still outruns automation. We prototype
          louder than the algorithms predict, using WebGL, physics, typography, and stubborn
          intuition to craft experiences that feel alive—and unmistakably authored by people.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
