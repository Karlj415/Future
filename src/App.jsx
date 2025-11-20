import { useState } from 'react';
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

function App() {
  // DEBUG: Set to false to test main content isolation
  const [loading, setLoading] = useState(true);

  return (
    <ErrorBoundary>
      <CustomCursor />
      {loading && (
        <Preloader
          onComplete={() => {
            setLoading(false);
          }}
        />
      )}

      {!loading && (
        <SmoothScroll>
          <main className='relative w-full min-h-screen bg-[#050505] text-white'>
            <Navigation />
            <Hero />
            <KineticText text='CODE BY KARL → DEFY AI → ' />
            <WorkGallery />
            <KineticText text='WE WRITE THE CODE → NOT THE MACHINES → ' />
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
