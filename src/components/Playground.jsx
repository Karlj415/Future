import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const Playground = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Module aliases
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    // Create engine
    const engine = Engine.create();
    engine.gravity.y = 0; // Zero gravity for floating effect
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: 1, // Force 1 for performance
      },
    });

    // Create bodies
    const shapes = [];
    const colors = ['#ffffff', '#cccccc', '#999999', '#666666'];

    // Reduced body count for performance
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 30 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const body = Bodies.polygon(x, y, Math.floor(Math.random() * 5) + 3, size, {
        render: {
          fillStyle: 'transparent',
          strokeStyle: color,
          lineWidth: 1,
        },
        restitution: 0.9,
        frictionAir: 0.01,
      });

      shapes.push(body);
    }

    // Add walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, wallOptions), Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOptions), Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOptions), Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOptions)];

    Composite.add(engine.world, [...shapes, ...walls]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Add repulsion on mouse move
    Events.on(engine, 'beforeUpdate', () => {
      const mousePosition = mouse.position;
      shapes.forEach((body) => {
        const dx = body.position.x - mousePosition.x;
        const dy = body.position.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const forceMagnitude = (200 - distance) * 0.00005;
          Matter.Body.applyForce(body, body.position, {
            x: dx * forceMagnitude,
            y: dy * forceMagnitude,
          });
        }
      });
    });

    // Create runner
    const runner = Runner.create();

    // Track running state to prevent multiple loops
    let isRunning = false;

    const start = () => {
      if (!isRunning) {
        Runner.run(runner, engine);
        Render.run(render);
        isRunning = true;
      }
    };

    const stop = () => {
      if (isRunning) {
        Runner.stop(runner);
        Render.stop(render);
        isRunning = false;
      }
    };

    // Start initially
    start();

    // Intersection Observer to pause physics when not in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
          } else {
            stop();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    // Handle resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;

      // Update walls
      Matter.Body.setPosition(walls[0], { x: window.innerWidth / 2, y: -50 });
      Matter.Body.setPosition(walls[1], { x: window.innerWidth / 2, y: window.innerHeight + 50 });
      Matter.Body.setPosition(walls[2], { x: window.innerWidth + 50, y: window.innerHeight / 2 });
      Matter.Body.setPosition(walls[3], { x: -50, y: window.innerHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      stop();
      window.removeEventListener('resize', handleResize);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, []);

  return (
    <div className='relative w-full h-screen overflow-hidden bg-[#050505]'>
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-10'>
        <h2 className='text-[5vw] font-bold text-white mix-blend-difference'>INTERACTIVE CHAOS</h2>
      </div>
      <div ref={sceneRef} className='absolute inset-0' />
    </div>
  );
};

export default Playground;
