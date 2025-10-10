import React, { useEffect, useRef } from "react";
import "./FlipReveal.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BoxAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const boxes = gsap.utils.toArray(".anim-box");

    gsap.set(boxes, { opacity: 0, scale: 0, transformOrigin: "center" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });

    tl.to(boxes, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.1,
    });
  }, []);

  return (
    <section className="box-section" ref={containerRef}>
      <div className="grid-layout">
        <div className="origin-point"></div>

        <div className="anim-box box-a"></div>
        <div className="anim-box box-b"></div>
        <div className="anim-box box-c"></div>
        <div className="anim-box box-d"></div>
      </div>
    </section>
  );
};

export default BoxAnimation;
