import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Contact = () => {
  return (
    <section id='contact' className='w-full py-32 px-4 min-h-[50vh] flex flex-col items-center justify-center border-t border-white/10'>
      <div className='max-w-4xl mx-auto text-center'>
        <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className='text-[clamp(3rem,8vw,10rem)] font-bold uppercase leading-none tracking-tighter mb-12'>
          HUMANS STILL ANSWER
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className='text-lg md:text-xl text-gray-400 tracking-widest uppercase mb-12'>
          Human coders. Real keyboards. If you need work forged by people—not predictive text—reach out and let's push back together.
        </motion.p>

        <div className='flex flex-wrap justify-center gap-8'>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <MagneticButton>
              <a href='https://instagram.com/karl__jung' target='_blank' rel='noopener noreferrer' className='group relative flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full overflow-hidden bg-transparent hover:bg-white hover:text-black transition-all duration-300'>
                <span className='relative z-10 text-lg font-medium uppercase tracking-widest'>@KARL__JUNG</span>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1'>
                  <path d='M7 7h10v10' />
                  <path d='M7 17 17 7' />
                </svg>
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }} className='mt-32 text-sm text-gray-500 uppercase tracking-widest'>
          © 2024 HUMAN CODE COLLECTIVE — STILL WRITTEN BY PEOPLE.
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
