import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Text.css";

function Text2() {
  const animatedTextRef = useRef(null);
  const lastScrollYRef = useRef(window.scrollY); // useRef instead of useState

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
    <section className="carousel-container">
      <h1
        ref={animatedTextRef}
        className="animated-text"
        style={{ whiteSpace: "nowrap" }}
      >
        PROJECT PORJECT PROJECT PORJECT PROJECT PROJECT PORJECT PROJECT PORJECT
        PROJECT PORJECT PROJECT PORJECT PROJECT PORJECT PROJECT PORJECT PROJECT
      </h1>
      
    </section>
  );
}

export default Text2;
