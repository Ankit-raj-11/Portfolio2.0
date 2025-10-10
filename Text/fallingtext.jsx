import React, { useState, useEffect, useRef, useCallback } from "react";

// --- Text Content ---
const TEXT =
  "The future belongs to those who believe in the beauty of their dreams";

// --- Physics Constants ---
const GRAVITY_Y = 0.15;
const DAMPING = 0.92;
const BOUNCE_FACTOR = -0.65;
const ROTATION_DAMPING = 0.96;
const REPULSION_FORCE = 22;
const REPULSION_RADIUS = 180;
const WALL_PADDING = 5;

const WIND_STRENGTH = 0.25; // Subtle side drift
const STAGGER_DELAY = 50; // ms between letters starting to fall

// --- Helper: Initial State for Each Letter ---
const getInitialLetterState = (x, y, char) => ({
  x,
  y,
  vx: 0,
  vy: 0,
  r: (Math.random() - 0.5) * 20,
  vr: (Math.random() - 0.5) * 0.4,
  char,
  active: false,
});

const FallingPhysicsText = () => {
  const [letters, setLetters] = useState([]);
  const [isPhysicsActive, setIsPhysicsActive] = useState(false);
  const containerRef = useRef(null);
  const mousePosRef = useRef({ x: -999, y: -999 });
  const viewportRef = useRef({ width: 0, height: 0, letterSize: 30 });
  const frameRef = useRef();

  // 🧩 Viewport + Initial Setup
  const setupLetters = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const letterSize = width * 0.025;

    viewportRef.current = { width, height, letterSize };

    const textArray = TEXT.split("");
    const totalWidth = textArray.length * letterSize * 0.8;
    const startX = width / 2 - totalWidth / 2;
    const startY = height / 3;

    const initialStates = textArray.map((char, i) =>
      getInitialLetterState(startX + i * letterSize * 0.8, startY, char)
    );

    setLetters(initialStates);
  }, []);

  useEffect(() => {
    setupLetters();
    window.addEventListener("resize", setupLetters);
    return () => window.removeEventListener("resize", setupLetters);
  }, [setupLetters]);

  // 🌀 Scroll Activation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5 && !isPhysicsActive) {
        setIsPhysicsActive(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPhysicsActive]);

  // 🖱️ Mouse Interactivity
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };
  const handleMouseLeave = () => (mousePosRef.current = { x: -999, y: -999 });

  // ⚙️ Physics Loop
  const physicsLoop = useCallback(() => {
    const { width, height, letterSize } = viewportRef.current;
    const { x: mouseX, y: mouseY } = mousePosRef.current;

    setLetters((prev) =>
      prev.map((s, i) => {
        let { x, y, vx, vy, r, vr, active } = s;
        if (!active && isPhysicsActive) {
          // Activate in a staggered pattern
          setTimeout(() => {
            setLetters((old) =>
              old.map((o, idx) => (idx === i ? { ...o, active: true } : o))
            );
          }, i * STAGGER_DELAY);
          return s;
        }

        if (!active) return s;

        // Apply physics
        vy += GRAVITY_Y;
        vx += (Math.random() - 0.5) * WIND_STRENGTH;

        // Mouse Repulsion
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < REPULSION_RADIUS ** 2) {
          const dist = Math.sqrt(distSq);
          const force =
            (REPULSION_FORCE * (1 - dist / REPULSION_RADIUS)) / dist;
          vx += dx * force;
          vy += dy * force;
        }

        // Position + Rotation
        x += vx;
        y += vy;
        r += vr;

        // Boundaries
        const half = letterSize / 2;
        const minX = WALL_PADDING + half;
        const maxX = width - WALL_PADDING - half;
        const maxY = height - WALL_PADDING - half;

        if (x < minX) {
          x = minX;
          vx *= BOUNCE_FACTOR;
          vr *= BOUNCE_FACTOR;
        }
        if (x > maxX) {
          x = maxX;
          vx *= BOUNCE_FACTOR;
          vr *= BOUNCE_FACTOR;
        }
        if (y > maxY) {
          y = maxY;
          vy *= BOUNCE_FACTOR;
          vx *= 0.85;
          vr *= 0.85;
        }

        // Friction/Damping
        vx *= DAMPING;
        vy *= DAMPING;
        vr *= ROTATION_DAMPING;

        return { ...s, x, y, vx, vy, r, vr };
      })
    );

    frameRef.current = requestAnimationFrame(physicsLoop);
  }, [isPhysicsActive]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(physicsLoop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [physicsLoop]);

  // 🖼️ Render
  return (
    <div style={styles.scrollWrapper}>
      <div
        ref={containerRef}
        style={styles.physicsContainer}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        {/* Render Letters */}
        {letters.map((s, i) => (
          <span
            key={i}
            style={{
              ...styles.letter,
              transform: `translate(${s.x}px, ${s.y}px) rotate(${s.r}deg)`,
              opacity: s.active ? 1 : 0.5,
              filter: s.active
                ? "drop-shadow(0 0 12px rgba(255,255,255,0.5))"
                : "none",
              transition: s.active
                ? "opacity 0.3s ease"
                : "opacity 1.2s ease-in-out",
            }}
          >
            {s.char === " " ? "\u00A0" : s.char}
          </span>
        ))}
      </div>
    </div>
  );
};

const styles = {
  scrollWrapper: {
    height: "250vh",
    background: "radial-gradient(circle at center, #000 60%, #050505 100%)",
    overflow: "hidden",
    position: "relative",
  },
  physicsContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    perspective: "900px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 10,
  },
  scrollIndicator: {
    position: "absolute",
    top: "10vh",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#aaa",
    fontSize: "1.2rem",
    letterSpacing: "2px",
    animation: "pulse 1.5s infinite",
    textShadow: "0 0 10px rgba(255,255,255,0.2)",
    transition: "opacity 0.8s",
  },
  letter: {
    position: "absolute",
    fontSize: "clamp(2rem, 5vw, 5rem)",
    fontWeight: 900,
    color: "#fff",
    cursor: "default",
    userSelect: "none",
    transformOrigin: "center",
    textTransform: "uppercase",
    transition: "filter 0.2s",
  },
};

// 💡 Add Pulse Animation Globally
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
}
`;
document.head.appendChild(styleSheet);

export default FallingPhysicsText;
