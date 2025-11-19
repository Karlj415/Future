Project Architecture: "Aether" - Immersive Creative Portfolio

Design Philosophy

"The Interface is the Art." The goal is to break the standard DOM grid structure. Elements should feel like they are floating in a zero-gravity void. Interactions should be physics-based (magnetic, fluid, inertial) rather than linear transitions.

1. Tech Stack Requirements

To achieve the "Advanced" look, the CLI must utilize these specific libraries:

Framework: React (Vite based structure preferred for speed).

Styling: Tailwind CSS (for layout scaffolding only).

3D/WebGL: react-three-fiber (R3F) + @react-three/drei. This is non-negotiable for the "Wow" factor.

Animation: framer-motion (for DOM elements) + maath (for efficient math helpers in 3D).

Smooth Scroll: lenis (essential for that premium "heavy" scroll feel).

2. Visual Language & Color Palette

Theme: "Deep Void" Dark Mode.

Background: Not a solid color. A deep #050505 with a subtle, computationally generated Perlin Noise shader running at 5% opacity to remove "digital banding" and give it a filmic grain.

Accent: "Holographic Silver." Gradients that look like liquid chrome (Silver -> White -> Iridescent Blue).

Typography:

Headers: Massive, oversized sans-serif (e.g., 'Inter' or 'Syne') tightly tracked (negative letter-spacing).

Kinetic Type: Headers should skew (skewX) based on scroll velocity.

3. detailed Component Breakdown

A. The "Preloader" (The First Impression)

Concept: "Digital Decryption."

Behavior: A blank black screen. A counter counts up from 000 to 100. As it counts, ASCII characters flicker rapidly in the center before resolving into the brand name.

Transition: The text explodes outward (Z-axis zoom), revealing the Hero scene.

B. Hero Section: "The Liquid Core"

Visual: Instead of an image, use a React Three Fiber Canvas.

Object: A central "Distorted Sphere" (MeshPhysicalMaterial).

Shader Logic: Use MeshTransmissionMaterial to make it look like glass.

Interaction: As the mouse moves, light sources rotate around the glass sphere. Clicking the sphere causes a "shockwave" distortion ripple through the mesh vertices.

Overlay: Large text "DESIGN / FUTURE" overlaid on top of the 3D object using mix-blend-mode: difference. This makes the text invert colors based on the 3D background.

C. The Navigation: "Magnetic Island"

Position: Floating pill at the bottom center (mobile-style on desktop).

Interaction: Magnetic Buttons. When the cursor gets close to a link (Work, About, Contact), the button physically moves towards the cursor before snapping back (spring physics).

D. The "Work" Gallery: "Skew Scrolling"

Layout: A single column of large, high-quality project images.

The "Advanced" Twist:

Velocity Distortion: As the user scrolls, the images should skew vertically based on scroll speed (clamp(velocity, -10, 10)).

WebGL Transition: Hovering an image shouldn't just fade it. It should apply a "displacement map" effect (liquid warp) using a custom GLSL shader.

Parallax: Text descriptions move at a different speed than the images.

E. The "Playground" Section

Concept: "Interactive Chaos."

Behavior: A section filled with physics-based 2D geometric shapes (Matter.js or R3F physics).

Interaction: The user's mouse acts as a gravity well or a repulsor. Moving the mouse through the shapes sends them scattering and colliding realistically.

4. Micro-Interaction Logic (The Polish)

Custom Cursor: Hide the default cursor. Replace it with a small ring. When hovering interactable elements, the ring creates a "glitch" effect or snaps to the shape of the element.

Smooth Scrolling: Implement Lenis. The page shouldn't stop instantly when the wheel stops; it should carry momentum.

Text Reveal: Text shouldn't just appear. It should mask in from the bottom (y: 100% to y: 0%) with a staggered delay for each line.

5. Implementation Prompts for CLI (Copy/Paste these)

Prompt 1 (Setup):
"Initialize a React project. Install three, @types/three, @react-three/fiber, @react-three/drei, framer-motion, lenis, and lucide-react. Configure Tailwind CSS."

Prompt 2 (The Shader Background):
"Create a component called NoiseBackground. It should be a full-screen WebGL plane using React Three Fiber. Write a custom GLSL fragment shader that generates slow-moving animated film grain/fog. Use uniform uTime to animate it."

Prompt 3 (The Liquid Hero):
"Build a Hero component. It needs a <Canvas> from R3F. Inside, place a Sphere geometry with MeshTransmissionMaterial (thick glass effect). Add a useFrame loop to distort the sphere geometry using sinusoidal waves based on mouse position."

Prompt 4 (Kinetic Typography):
"Create a KineticText component. It takes a text string. Use Framer Motion's useScroll and useVelocity hooks. Map the scroll velocity to the skewX of the text. When I scroll fast, the text should lean forward."