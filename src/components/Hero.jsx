import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import NoiseBackground from './NoiseBackground';

const Sphere = () => {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (mesh.current) {
      // Rotate the sphere slowly
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.2;

      // Mouse interaction for distortion
      // We'll use the mouse position to affect the mesh position or scale slightly for now
      // as actual vertex distortion requires a custom shader or more complex geometry manipulation
      // For the "shockwave" effect mentioned, we can use a spring on scale or position

      const { x, y } = state.pointer;
      easing.damp3(mesh.current.position, [x * 0.5, y * 0.5, 0], 0.2, delta);
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.5}
        thickness={2}
        chromaticAberration={0.5}
        anisotropy={0.1}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.2}
        iridescence={0.5}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        resolution={128} // Reduced for stability
        samples={2} // Reduced for stability
      />
    </mesh>
  );
};

const OverlayText = () => {
  return (
    <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-10'>
      <h1 className='text-[clamp(4rem,15vw,20rem)] font-bold text-white mix-blend-difference leading-none tracking-tighter text-center'>
        HUMAN CODE /<br />
        NOT AI
      </h1>
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className='relative w-full h-screen bg-[#050505]'>
      <Canvas 
        frameloop={isInView ? 'always' : 'never'} 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          stencil: false,
          depth: true
        }}
        dpr={1} // Strict limit to 1x pixel ratio for stability
      >
        <color attach='background' args={['#050505']} />
        <NoiseBackground />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Sphere />
      </Canvas>
      <OverlayText />
    </div>
  );
};

export default Hero;
