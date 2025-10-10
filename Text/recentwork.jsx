import "./recentwork.css";
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
      const offset = Math.abs(i - mid-1);
      
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
    <div className="tex-container">
      <div className="tex">RECENT&nbsp;WORK</div>
    </div>
  );
}