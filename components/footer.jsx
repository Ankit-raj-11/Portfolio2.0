import "./Footer.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const techs = gsap.utils.toArray(".tech");
    const footer = document.querySelector(".footer");
    // New: Select the .end div
    const endDiv = document.querySelector(".end");
    const box = footer.getBoundingClientRect();
    const boxHeight = box.height;
    const boxWidth = box.width;

    // --- Physics Constants ---
    const gravity = 0.2;
    const bounce = 0.999;
    const floor = boxHeight / 2 - 30;
    const damping = 0.99;

    // --- Block Dimensions (based on CSS: width: 200px, height: 40px) ---
    const blockWidth = 300;
    const blockHeight = 50;
    const halfBlockWidth = blockWidth / 2;
    const mass = 1;
    const momentOfInertia =
      (mass * (blockWidth * blockWidth + blockHeight * blockHeight)) / 12;

    // --- Repulsion and Tipping Constants ---
    // Increased repulsion for better visual separation
    const divRepulsionRadius = 200;
    const divRepulsionForce = 2.0;
    const tippingForce = 0.05;

    // Mouse repulsion config
    const mouse = { x: 0, y: 0, active: false };
    const repulsionRadius = 200;
    const repulsionForce = 30;
    const rotationalImpulseScale = 0.05; // Tuned for visible rotation on hover

    // spread them out randomly at start
    const states = techs.map(() => ({
      x: gsap.utils.random(-boxWidth / 3, boxWidth / 3),
      y: gsap.utils.random(-boxHeight / 3, boxHeight / 3),
      vx: gsap.utils.random(-1, 1),
      vy: gsap.utils.random(-0.5, 0.5),
      rotation: gsap.utils.random(-10, 10),
      vr: gsap.utils.random(-1, 1),
    }));

    // set initial scattered positions
    gsap.set(techs, (i) => ({
      x: states[i].x,
      y: states[i].y,
      rotation: states[i].rotation,
    }));

    // New: Set initial state of the .end div (hidden and slightly offset)
    gsap.set(endDiv, { autoAlpha: 0, y: 50 });

    let animationFrame;

    const handleMouseMove = (e) => {
      const rect = footer.getBoundingClientRect();
      // Mouse position relative to the center of the footer
      mouse.x = e.clientX - rect.left - rect.width / 2;
      mouse.y = e.clientY - rect.top - rect.height / 2;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    footer.addEventListener("mousemove", handleMouseMove);
    footer.addEventListener("mouseleave", handleMouseLeave);

    const getTippingForce = (rotationRad) => {
      // Calculates horizontal offset of CoM from the pivot point
      const comOffset = halfBlockWidth * Math.sin(rotationRad);
      return -comOffset * tippingForce;
    };

    const animate = () => {
      states.forEach((s, i) => {
        s.vy += gravity;

        // --- Inter-Div Repulsion Logic ---
        states.forEach((otherState, j) => {
          if (i === j) return;

          const dx = s.x - otherState.x;
          const dy = s.y - otherState.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < divRepulsionRadius && dist > 0) {
            const force = (1 - dist / divRepulsionRadius) * divRepulsionForce;
            const angle = Math.atan2(dy, dx);
            s.vx += Math.cos(angle) * force;
            s.vy += Math.sin(angle) * force;
          }
        });
        // ---------------------------------------------

        // --- Mouse Repulsion with Explicit Rotation Control (FIXED) ---
        if (mouse.active) {
          const dx_world = s.x - mouse.x; // Block center X minus mouse X
          const dy_world = s.y - mouse.y;
          const dist = Math.sqrt(dx_world * dx_world + dy_world * dy_world);

          if (dist < repulsionRadius) {
            const magnitude = (1 - dist / repulsionRadius) * repulsionForce;
            const angle = Math.atan2(dy_world, dx_world);

            // 1. Calculate Linear Impulse (Force)
            const forceX = Math.cos(angle) * magnitude;
            const forceY = Math.sin(angle) * magnitude;

            s.vx += forceX / mass;
            s.vy += forceY / mass;

            // 2. Apply Rotational Impulse based on relative horizontal position (dx_world)
            // This ensures: Mouse LEFT of center -> Clockwise spin (s.vr increases)
            // Mouse RIGHT of center -> Anti-Clockwise spin (s.vr decreases)
            let rotationFactor =
              (-dx_world / halfBlockWidth) * rotationalImpulseScale;
            s.vr += rotationFactor;
          }
        }
        // -------------------------------------------------------------------------

        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vr;

        // Floor Collision
        if (s.y > floor) {
          s.y = floor;
          s.vy *= -bounce;
          s.vx *= 0.8;
          s.vr *= 0.6;

          // Center of Mass / Tipping Logic
          const rotationRad = (s.rotation * Math.PI) / 180;
          s.vr += getTippingForce(rotationRad);

          // Extra damping when almost flat
          if (Math.abs(s.rotation) < 5 && Math.abs(s.vr) < 0.2) {
            s.vr *= 0.8;
          }
        }

        // Wall Collision
        const halfW = boxWidth / 2 - 150;
        if (s.x < -halfW || s.x > halfW) {
          s.vx *= -0.7;
          s.x = Math.max(-halfW, Math.min(halfW, s.x));
        }

        // Damping/Friction
        s.vx *= damping;
        s.vy *= damping;
        s.vr *= 0.99;

        gsap.set(techs[i], { x: s.x, y: s.y, rotation: s.rotation });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    // ScrollTrigger setup
    ScrollTrigger.create({
      trigger: ".footer",
      start: "100% bottom",
      end: "bottom bottom",
      markers: false,
      onEnter: () => {
        // SCRAMBLE .tech DIVS
        states.forEach((s) => {
          s.vx = gsap.utils.random(-2, 2);
          s.vy = gsap.utils.random(-8, -15);
          s.vr = gsap.utils.random(-2, 2);
        });
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animate);

        // New: SHOW .end DIV animation
        gsap.to(endDiv, {
          autoAlpha: 1, // Fade in
          y: 0, // Slide up
          duration: 1,
          ease: "power2.out",
          delay: 0.5, // Wait for scramble to start
        });
      },
      onLeaveBack: () => {
        // New: HIDE .end DIV animation
        gsap.to(endDiv, {
          autoAlpha: 0, // Fade out
          y: 50, // Slide down
          duration: 0.5,
        });

        // Return .tech DIVS to normal
        cancelAnimationFrame(animationFrame);
        gsap.to(techs, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      },
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="tech">React</div>
        <div className="tech">TypeScript</div>
        <div className="tech">Express</div>
        <div className="tech">Pandas</div>
        <div className="tech">MongoDB</div>
        <div className="tech">Node.js</div>
        <div className="tech">GSAP</div>
        <div className="tech">Python</div>
        <div className="tech">Firebase</div>
        <div className="tech">Next</div>
        <div className="tech">Numpy</div>
      </div>
      <div className="end">
        Looks like you overflowed my tech stack...
        <br />
         Okay that was lame, but feel free to say hi.
      </div>
    </div>
  );
}
