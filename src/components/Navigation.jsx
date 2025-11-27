import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { useLenis } from 'lenis/react';

const Navigation = () => {
  const lenis = useLenis();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    if (lenis) {
      lenis.scrollTo(href);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 items-center gap-1 px-2 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
        {links.map((link) => (
          <MagneticButton key={link.name}>
            <a
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="block px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-white/80 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          </MagneticButton>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 rounded-full"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <motion.span
              className="block h-0.5 bg-white origin-center"
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 bg-white"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 bg-white origin-center"
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-lg flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl font-bold uppercase tracking-widest text-white"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
