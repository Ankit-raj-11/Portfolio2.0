import "./Discription.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
   
    const split = new SplitType(textRef.current, { types: "chars" });

    gsap.from(split.chars, {
      opacity: 0,
      duration: 0.05,
      stagger: 0.05, 
      ease: "none",
    });


    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.utils
      .toArray(".discriptionf")
      .forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        });
      });
  }, []);

  return (
    <>
      <div className="all">
        <div className="discription">
          <div className="intro" ref={textRef}>
            Hi, I’m [ANKIT] - a Full-Stack Developer passionate about building
            modern web applications that blend design and technology.
            <span ref={cursorRef} className="cursor">
              |
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
