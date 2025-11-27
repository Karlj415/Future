import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';
import NoiseBackground from './NoiseBackground';

const Sphere = () => {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.15;
    mesh.current.rotation.y += delta * 0.15;
    const { x, y } = state.pointer;
    easing.damp3(mesh.current.position, [x * 0.3, y * 0.3, 0], 0.25, delta);
  });

  const materialConfig = useMemo(() => ({
    backside: true,
    backsideThickness: 0.3,
    thickness: 1.5,
    chromaticAberration: 0.3,
    anisotropy: 0.1,
    distortion: 0.3,
    distortionScale: 0.3,
    temporalDistortion: 0.1,
    iridescence: 0.3,
    iridescenceIOR: 1,
    iridescenceThicknessRange: [0, 1400],
    resolution: 64,
    samples: 1,
  }), []);

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <MeshTransmissionMaterial {...materialConfig} />
    </mesh>
  );
};

// Check reduced motion preference synchronously
const getInitialMotionPref = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const Hero = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialMotionPref);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full h-[100svh] min-h-[500px] bg-[#050505]">
      {!prefersReducedMotion && (
        <Canvas
          frameloop={isInView ? 'always' : 'never'}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: false, antialias: false, stencil: false, depth: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={['#050505']} />
          <NoiseBackground />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Sphere />
        </Canvas>
      )}
      
      {prefersReducedMotion && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
        <h1 className="text-[clamp(2.5rem,12vw,16rem)] font-bold text-white mix-blend-difference leading-[0.9] tracking-tighter text-center">
          HUMAN CODE /<br />
          NOT AI
        </h1>
      </div>
    </section>
  );
};

export default Hero;
