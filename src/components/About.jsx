import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="w-full py-32 px-4 flex items-center justify-center min-h-[50vh]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[5vw] font-bold uppercase leading-none tracking-tighter mb-12"
        >
          About The Void
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-light leading-relaxed text-gray-300"
        >
          Aether is an exploration of digital space and interaction. 
          We believe that the web should be more than just information; 
          it should be an experience. Through the fusion of WebGL, 
          physics simulations, and fluid typography, we create 
          immersive environments that defy the conventional grid.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
