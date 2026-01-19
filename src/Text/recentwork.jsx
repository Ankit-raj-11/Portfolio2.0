
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ... (imports remain the same)

export default function Worktext() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Split text into individual letters
    const text = document.querySelector(".tex");
    const letters = text.textContent.split("");
    text.textContent = ""; // clear
    letters.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      text.appendChild(span);
    });

    // Create a timeline for V-shaped drop
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tex-container",
        start: "top 90%",
        end: "top 50%",
        scrub: 0.5,
        markers: false,
      },
    });

    // Animate each letter individually
    const spans = gsap.utils.toArray(".tex span");
    const mid = Math.floor(spans.length / 2 - 1);

    // --- MODIFICATIONS FOR FLUID RESPONSIVENESS AND V-DROP ---
    const baseStartHeight = -200;
    const offsetMultiplier = 100;
    const letterDuration = 2;

    spans.forEach((span, i) => {
      const offset = Math.abs(i - mid - 1);
      const delay = offset * 0.2;

      tl.fromTo(
        span,
        { y: baseStartHeight - offset * offsetMultiplier },
        { y: 0, ease: "none", duration: letterDuration },
        delay
      );
    });
  }, []);

  return (
    <div className="tex-container relative w-full h-[22vw] md:h-[16vw] overflow-hidden bg-none z-[1]">
      <div className="tex absolute top-[-5%] left-1/2 -translate-x-1/2 flex text-white text-[10vw] md:text-[8vw] font-extrabold font-['Syne'] tracking-tighter z-0 
        [&>span]:scale-y-125 [&>span]:bg-transparent w-full justify-center">
        RECENT&nbsp;WORK
      </div>
    </div>
  );
}