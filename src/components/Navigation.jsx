import MagneticButton from './MagneticButton';
import { useLenis } from 'lenis/react';

const Navigation = () => {
  const lenis = useLenis();

  const links = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href);
    }
  };

  return (
    <div className='fixed bottom-10 left-1/2 -translate-x-1/2 z-50'>
      <nav className='flex items-center gap-2 px-2 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full shadow-lg'>
        {links.map((link) => (
          <MagneticButton key={link.name}>
            <a href={link.href} onClick={(e) => handleClick(e, link.href)} className='block px-6 py-3 text-sm font-medium uppercase tracking-widest hover:text-white/80 transition-colors'>
              {link.name}
            </a>
          </MagneticButton>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
