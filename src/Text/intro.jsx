import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function Intro() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // 1. Setup Context for cleanup
    const ctx = gsap.context(() => {

      // 2. Split Text
      const split = new SplitType(textRef.current, { types: "chars" });

      const tl = gsap.timeline({ delay: 0.1 });

      // 3. Animate Text Reveal
      tl.from(split.chars, {
        opacity: 0,
        duration: 0.05,
        stagger: 0.05,
        ease: "power1.out",
      });

      // 4. Cursor Blink (Starts after text)
      tl.fromTo(cursorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 }
      );

      tl.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "steps(1)",
      });

    }, containerRef);

    // 5. Cleanup
    return () => {
      ctx.revert();
      // Ensure SplitType changes are reverted to keep DOM clean
      if (textRef.current) {
        // Re-initializing just to revert is a safe pattern if reference persists
        // or we can store the instance. But simpler:
        // Standard split-type revert might be needed if ctx.revert() doesn't catch DOM mods (it usually doesn't for external libs)
        // Check documentation: SplitType modifies DOM directly. We should revert it.
        try {
          new SplitType(textRef.current).revert();
        } catch (e) {
          // Ignore
        }
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute bottom-5 left-[1rem] md:left-[0] w-full max-w-[90%] md:max-w-[710px] z-[20] pointer-events-none">
  <div className="text-base md:text-lg mb-5 leading-relaxed font-['Syne'] text-black font-semibold tracking-wide pb-2 break-words">
    <span ref={textRef} className="inline relative">
      Hi, I’m [ANKIT] &ndash; a Full-Stack Developer expanding into Blockchain.
      I build modern web applications while exploring decentralized technologies.
    </span>
    <span ref={cursorRef} className="inline-block ml-1 text-black font-bold text-xl translate-y-[2px]">
      |
    </span>
  </div>
</div>
  );
}
