
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ... (imports remain the same)

export default function Abouttext() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Split text into individual letters
    const text = document.querySelector(".text");
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
        trigger: ".text-container",
        start: "top 95%",
        end: "top 50%",
        scrub: 0.5,
        markers: false,
      },
    });

    // Animate each letter individually
    const spans = gsap.utils.toArray(".text span");

    // Calculate middle index
    // The -1 is often used to slightly favor the left side in an even-length string, 
    // but you can just use Math.floor(spans.length / 2) for a more central point.
    const mid = Math.floor(spans.length / 2 - 1); // Keep as is for current effect

    // --- MODIFICATIONS FOR SHARPER V AND MORE DELAY ---

    // Increased base starting height for a more dramatic drop.
    const baseStartHeight = -200;

    // Increased multiplier for the offset to make the V shape *sharper*.
    const offsetMultiplier = 100;

    // Define a duration for each letter's animation.
    const letterDuration = 2;

    spans.forEach((span, i) => {
      // Distance from center (creates V shape)
      const offset = Math.abs(i - mid);

      // Calculate delay: farther letters (higher offset) start *earlier* // in the overall timeline to give the appearance of a delay for the center ones.
      // This is the key to creating a *sequence* within the scrubbed timeline.
      const delay = offset * 0.2; // Adjust 0.2 to control the time spread

      // Add letter animation to timeline
      tl.fromTo(
        span,
        { y: baseStartHeight - offset * offsetMultiplier }, // Sharper V start
        { y: 0, ease: "none", duration: letterDuration },
        delay // Position the tween in the timeline based on its distance from the center
      );
    });
  }, []);

  return (
    <div className="text-container relative w-full h-[22vw] md:h-[16vw] overflow-hidden bg-none z-[1]">
      <div
        className="
      text absolute top-[-10%] left-1/2 -translate-x-1/2
      flex text-black text-[12vw] md:text-[10vw]
      font-extrabold font-['Syne']
      tracking-tighter
      z-[2]
      [&>span]:scale-y-125 [&>span]:bg-transparent
      w-full justify-center
    "
      >
        ABOUT&nbsp;ME
      </div>
    </div>

  );
}