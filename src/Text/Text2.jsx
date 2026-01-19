import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Text2() {
  const animatedTextRef = useRef(null);
  const lastScrollYRef = useRef(window.scrollY);

  useEffect(() => {
    const animatedText = animatedTextRef.current;
    const originalText = animatedText.textContent.trim();

    // Duplicate text for seamless loop
    animatedText.innerHTML = `${originalText} ${originalText}`;

    // GSAP animation (slow)
    const tween = gsap.to(animatedText, {
      x: "-50%",
      ease: "linear",
      duration: 20,
      repeat: -1,
    });

    // Scroll listener to change direction
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Compare current scroll with last scroll
      if (currentScroll > lastScrollYRef.current) {
        tween.timeScale(1); // scrolling down → forward
      } else if (currentScroll < lastScrollYRef.current) {
        tween.timeScale(-1); // scrolling up → backward
      }

      lastScrollYRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-screen overflow-hidden flex items-center justify-center h-[120px] max-h-[20vh] -rotate-[10deg] origin-center backface-visible preserve-3d bg-orange-500 shadow-[0_15px_40px_rgba(0,0,0,0.3)] rounded-none mt-[50%] transition-[transform,box-shadow] duration-300 z-[3] hover:-rotate-[8deg] hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
      <h1
        ref={animatedTextRef}
        className="inline-block"
        style={{ whiteSpace: "nowrap" }}
      >
        PROJECT PORJECT PROJECT PORJECT PROJECT PROJECT PORJECT PROJECT PORJECT
        PROJECT PORJECT PROJECT PORJECT PROJECT PORJECT PROJECT PORJECT PROJECT
      </h1>

    </section>
  );
}

export default Text2;
