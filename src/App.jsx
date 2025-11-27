import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Hero from './components/Hero';
import SmoothScroll from './components/SmoothScroll';
import KineticText from './components/KineticText';
import WorkGallery from './components/WorkGallery';
import Navigation from './components/Navigation';
import Playground from './components/Playground';
import Preloader from './components/Preloader';
import About from './components/About';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ErrorBoundary>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <main className="relative w-full min-h-screen bg-[#050505] text-white overflow-x-hidden">
            <Navigation />
            <Hero />
            <WorkGallery />
            <KineticText text={`WE WRITE THE CODE\nNOT THE MACHINES`} />
            <Playground />
            <About />
            <Contact />
          </main>
        </SmoothScroll>
      )}
    </ErrorBoundary>
  );
}

export default App;
