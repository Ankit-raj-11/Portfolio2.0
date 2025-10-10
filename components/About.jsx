import "./About.css";
import img from "../src/assets/img.png";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".black",
        start: "top top",
        end: "+=3000", // scroll distance for full sequence
        scrub: 1,
        pin: true, // fixes section while animation plays
        anticipatePin: 1,
      },
    });

    // --- 1️⃣ Stage 1: quote-container follows scroll (already pinned)
    tl.to(".quote-container", {
      y: 0,
      ease: "none",
      duration: 1,
    });

    // --- 2️⃣ Stage 2: quotes escape upward (mask from bottom)
    tl.to(
      ".quote",
      {
        y: -200,
        opacity: 0,
        stagger: 0.2,
        ease: "none",
        duration: 2,
      },
      "+=0.5"
    );

    // --- 3️⃣ Stage 3: image + intro appear from top
    tl.fromTo(
      ".img-container",
      { y: 0, opacity: 0 },
      { y: 0, opacity: 1, ease: "none", duration: 2 },
      "+=0.5"
    );

    tl.fromTo(
      ".intro",
      { y: 0, opacity: 0 },
      { y: 0, opacity: 1, ease: "none", duration: 2 },
      "+=0.5"
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="black">
      <div className="quote-container">
        <div className="me">FOR ME</div>
        <div className="quote">
          THE <span style={{ color: "grey", background: "none" }}>FUTURE</span>
        </div>
        <div className="quote">
          <span style={{ color: "grey", background: "none" }}>BELONGS TO</span>{" "}
          those
        </div>
        <div className="quote">who believe</div>
        <div className="quote">in the beauty</div>
        <div className="quote">
          of their{" "}
          <span style={{ color: "grey", background: "none" }}>DREAMS</span>
        </div>
      </div>

      <div className="img-container">
        <img src={img} alt="About Me" className="about-img" />
        <div className="intro">
          Hello! <br></br> I’m Ankit Raj
        </div>
      </div>
      <div className="exp-container">
        <div className="first">Hybrid Developer &rarr;</div>

        <div className="second">
          Full-Stack Engineer and UX/UI Practitioner leveraging a Computer
          Science foundation. I build, design, and deploy scalable, end-to-end
          web solutions using MERN and Next.js, ensuring technical excellence
          meets exceptional user experience.
        </div>
      </div>
    </div>
  );
}
