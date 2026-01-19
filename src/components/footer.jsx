import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";
import { SOCIAL_LINKS } from "../constants";

export default function Footer() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [constraints, setConstraints] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- MATTER.JS SETUP ---
    const engine = Matter.Engine.create();
    const world = engine.world;
    engine.gravity.y = 1; // Slightly reduced gravity for floatier feel

    const renderContainer = sceneRef.current;
    if (!renderContainer) return;

    const width = renderContainer.clientWidth;
    const height = renderContainer.clientHeight;

    // Tech Stack Data
    const techStack = [
      "REACT", "NEXT.JS", "GSAP", "TYPESCRIPT", "TAILWIND", "NODE.JS", "PYTHON", "THREE.JS", "MONGODB", "FIGMA"
    ];

    // Create Stack of Bodies (The Jenga Tower)
    // Position: Right side of screen
    const stackX = width * 0.8;
    const blockHeight = 50;
    const blockWidth = 200;

    const bodies = techStack.map((tech, i) => {
      return Matter.Bodies.rectangle(stackX, height - 100 - (i * 60), blockWidth, blockHeight, {
        restitution: 0.7, // Bouncy but controlled
        friction: 0.05,    // Slippery
        frictionAir: 0.02, // Some drag
        angle: (Math.random() - 0.5) * 0.1,
        label: tech,
        render: { width: blockWidth, height: blockHeight }
      });
    });

    // Boundaries
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true, restitution: 0.7 });
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true, restitution: 0.7 });
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true, restitution: 0.7 });

    Matter.World.add(world, [...bodies, ground, leftWall, rightWall]);

    // Mouse Control (Drag & Throw)
    const mouse = Matter.Mouse.create(renderContainer);

    // Fix: Allow scrolling by removing Matter.js wheel capture
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Fix: Matter.js defaults touch-action to 'none', enabling it back to 'auto' to allow scrolling
    mouse.element.style.touchAction = "auto";

    // --- CUSTOM TOUCH HANDLING ---
    // Remove Matter.js key listeners to avoid issues
    mouse.element.removeEventListener("touchstart", mouse.mousedown);
    mouse.element.removeEventListener("touchmove", mouse.mousemove);
    mouse.element.removeEventListener("touchend", mouse.mouseup);

    mouse.element.addEventListener("touchstart", (e) => {
      // Check if touching a specific tech stack body
      const isTechBody = e.target.id && e.target.id.startsWith("tech-");

      if (isTechBody) {
        // If touching a body, capture it and block scroll
        e.preventDefault();
        mouse.mousedown(e);
      } else {
        // If touching background, ensure 2-finger scroll works by NOT preventing default.
        // For 1-finger, we also allow default (scrolling) for better UX, 
        // while still updating physics cursor position for repulsion.
        mouse.mousedown(e);
      }
    }, { passive: false });

    mouse.element.addEventListener("touchmove", (e) => {
      const isTechBody = e.target.id && e.target.id.startsWith("tech-");

      if (isTechBody) {
        // Dragging a body -> Block scroll
        e.preventDefault();
        mouse.mousemove(e);
      } else {
        // Moving on background -> Allow scroll (don't prevent default)
        // Check for 2-finger scroll vs 1-finger repulsion
        if (e.touches.length === 1) {
          // Optional: If you strictly want NO scroll on specific 1-finger background moves, 
          // you'd preventDefault here, but that breaks 2-finger detection usually.
          // letting it scroll is safer for "scrolling works".

          // We update physics to allow repulsion while scrolling (if browser permits)
          mouse.mousemove(e);
        } else {
          // 2+ fingers -> Scroll naturally.
          // We generally don't update physics for multi-touch scrolls to save perf/avoid noise
        }
      }
    }, { passive: false });

    mouse.element.addEventListener("touchend", (e) => {
      mouse.mouseup(e);
    });

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Matter.World.add(world, mouseConstraint);

    // Repulsion Logic (Updates every frame)
    Matter.Events.on(engine, 'beforeUpdate', () => {
      const mousePos = mouse.position;

      bodies.forEach(body => {
        const dx = body.position.x - mousePos.x;
        const dy = body.position.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 450) {
          // Stronger repulsion
          const forceMagnitude = 0.15 * (1 - dist / 450);
          const angle = Math.atan2(dy, dx);

          Matter.Body.applyForce(body, body.position, {
            x: Math.cos(angle) * forceMagnitude,
            y: Math.sin(angle) * forceMagnitude
          });
        }
      });
    });

    // Runner
    const runner = Matter.Runner.create();

    // Sync DOM with Bodies
    const domRefs = []; // Array to hold ref callbacks

    const updateDOM = () => {
      bodies.forEach((body, i) => {
        const domEl = document.getElementById(`tech-${i}`);
        if (domEl) {
          const { x, y } = body.position;
          const rotation = body.angle;
          // Translate & Rotate
          domEl.style.transform = `translate(${x - blockWidth / 2}px, ${y - blockHeight / 2}px) rotate(${rotation}rad)`;
        }
      });
    };

    Matter.Events.on(engine, 'afterUpdate', updateDOM);

    // 1. SCROLL TRIGGER FOR PHYSICS ENGINE
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      onEnter: () => {
        Matter.Runner.run(runner, engine);
      },
      onLeaveBack: () => {
        Matter.Runner.stop(runner);

        // Reset bodies to initial positions
        bodies.forEach((body, i) => {
          Matter.Body.setPosition(body, {
            x: stackX,
            y: height - 100 - (i * 60)
          });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
          Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.1);
        });

        // Force one final DOM update to show reset state
        updateDOM();
      }
    });

    // 2. SCROLL TRIGGER FOR TEXT ANIMATIONS (Independent)
    const ctx = gsap.context(() => {
      // Title Reveal
      gsap.from(".footer-title-char", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Links Reveal
      gsap.from(".footer-link", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      ctx.revert();
    };
  }, []);



  const techStack = [
    "REACT", "NEXT.JS", "GSAP", "TYPESCRIPT", "TAILWIND", "NODE.JS", "PYTHON", "THREE.JS", "MONGODB", "FIGMA"
  ];

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden py-20 px-6 md:px-16 text-white z-[2] flex flex-col justify-between">

      {/* Background Physics Layer */}
      <div ref={sceneRef} className="absolute inset-0 pointer-events-auto z-0 overflow-hidden cursor-crosshair">
        {/* DOM Elements Synced to Matter.js Bodies */}
        {techStack.map((tech, i) => (
          <div
            id={`tech-${i}`}
            key={i}
            className="absolute left-0 top-0 w-[200px] h-[50px] flex items-center justify-center border border-white/40 text-white/50 rounded-full font-['Syne'] font-bold uppercase text-xl bg-black/50 backdrop-blur-sm select-none"
            style={{ transform: `translate(-1000px, -1000px)` }} // Start off-screen until physics update
          >
            {tech}
          </div>
        ))}
      </div>

      {/* TOP: Call to Action (Pointer Events None to let interaction pass through empty space, but Auto on Text) */}
      <div className="relative z-10 flex flex-col items-center md:items-start mt-20 md:mt-10 pointer-events-none">
        <div className="flex flex-col items-center md:items-start mb-4 pointer-events-auto">
          {/* Line 1: LET'S WORK */}
          <h2 className="flex flex-wrap justify-center md:justify-start overflow-hidden leading-none">
            {"LET'S WORK".split("").map((char, i) => (
              <span key={`line1-${i}`} className="footer-title-char text-[12vw] md:text-[8vw] font-['Syne'] font-extrabold uppercase tracking-tighter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          {/* Line 2: TOGETHER */}
          <h2 className="flex flex-wrap justify-center md:justify-start overflow-hidden leading-none">
            {"TOGETHER".split("").map((char, i) => (
              <span key={`line2-${i}`} className="footer-title-char text-[12vw] md:text-[8vw] font-['Syne'] font-extrabold uppercase tracking-tighter inline-block">
                {char}
              </span>
            ))}
          </h2>
        </div>
        <p className="text-gray-400 font-['Lucida_Sans'] text-sm md:text-xl max-w-xl text-center md:text-left pointer-events-auto">
          Have a project in mind? Let's build something extraordinary.
        </p>
      </div>

      {/* MIDDLE: Links */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full mt-10 md:mt-0 gap-10 md:gap-0 pointer-events-none">

        {/* Socials */}
        <div className="flex flex-col gap-4 text-center md:text-left pointer-events-auto">
          {SOCIAL_LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link group flex items-center gap-2 text-2xl md:text-4xl font-['Oswald'] font-light uppercase tracking-wide hover:text-gray-300 transition-colors"
            >
              <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm">
                →
              </span>
              {link.label.replace(" Profile", "").replace("Ankit raj", "")}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
