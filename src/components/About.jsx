import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="w-full py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-tight tracking-tight mb-8"
        >
          THE HUMAN ELEMENT
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-gray-300"
        >
          In an era of generated content, we choose to craft. We believe that true digital experiences are born from human intuition, not just prediction. Every interaction, every motion, and every pixel is placed with intent—creating work that resonates because it was made by a mind, not a model.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
