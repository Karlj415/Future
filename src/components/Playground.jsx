import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const getReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const Playground = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const [prefersReducedMotion] = useState(getReducedMotion);

  useEffect(() => {
    if (!sceneRef.current || prefersReducedMotion) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;
    const isMobile = window.innerWidth < 768;
    const bodyCount = isMobile ? 8 : 15;

    const engine = Engine.create({ gravity: { y: 0 } });
    engineRef.current = engine;

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    });

    const colors = ['#ffffff', '#cccccc', '#999999'];
    const shapes = [];

    for (let i = 0; i < bodyCount; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 25 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];

      shapes.push(
        Bodies.polygon(x, y, Math.floor(Math.random() * 4) + 3, size, {
          render: { fillStyle: 'transparent', strokeStyle: color, lineWidth: 1 },
          restitution: 0.9,
          frictionAir: 0.02,
        })
      );
    }

    const wallOpts = { isStatic: true, render: { visible: false } };
    const walls = [
      Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, wallOpts),
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOpts),
      Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOpts),
      Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOpts),
    ];

    Composite.add(engine.world, [...shapes, ...walls]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Events.on(engine, 'beforeUpdate', () => {
      const { x: mx, y: my } = mouse.position;
      shapes.forEach((body) => {
        const dx = body.position.x - mx;
        const dy = body.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) * 0.00003;
          Body.applyForce(body, body.position, { x: dx * force, y: dy * force });
        }
      });
    });

    const runner = Runner.create();
    let running = false;

    const start = () => {
      if (!running) {
        Runner.run(runner, engine);
        Render.run(render);
        running = true;
      }
    };

    const stop = () => {
      if (running) {
        Runner.stop(runner);
        Render.stop(render);
        running = false;
      }
    };

    start();

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.1 }
    );
    observer.observe(sceneRef.current);

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Body.setPosition(walls[0], { x: window.innerWidth / 2, y: -50 });
      Body.setPosition(walls[1], { x: window.innerWidth / 2, y: window.innerHeight + 50 });
      Body.setPosition(walls[2], { x: window.innerWidth + 50, y: window.innerHeight / 2 });
      Body.setPosition(walls[3], { x: -50, y: window.innerHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      stop();
      window.removeEventListener('resize', handleResize);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas?.remove();
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative w-full h-[100svh] min-h-[400px] overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
        <h2 className="text-[clamp(1.5rem,5vw,4rem)] font-bold text-white mix-blend-difference text-center">
          INTERACTIVE CHAOS
        </h2>
      </div>
      {!prefersReducedMotion && <div ref={sceneRef} className="absolute inset-0" />}
      {prefersReducedMotion && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black" />
      )}
    </section>
  );
};

export default Playground;
