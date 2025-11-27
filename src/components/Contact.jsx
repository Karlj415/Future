import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Contact = () => {
  return (
    <section id="contact" className="w-full py-16 md:py-24 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-tight tracking-tight mb-6"
        >
          HUMANS STILL ANSWER
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-gray-400 tracking-wide uppercase mb-10"
        >
          Human coders. Real keyboards. Reach out and let's push back together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <MagneticButton>
            <a
              href="https://instagram.com/karl__jung"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 border border-white/20 rounded-full bg-transparent hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base font-medium uppercase tracking-widest"
            >
              @KARL__JUNG
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </MagneticButton>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-xs md:text-sm text-gray-500 uppercase tracking-widest"
        >
          © 2024 HUMAN CODE COLLECTIVE
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
