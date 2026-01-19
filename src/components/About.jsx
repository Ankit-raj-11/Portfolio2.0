import { useEffect, useRef } from "react";
import img from "@assets/img.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {


      // 0. WATER FILL ENTRY EFFECT
      gsap.fromTo(".about-quote-section",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: ".about-quote-section",
            start: "top 40%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 1. QUOTES SEQUENCE (Masked Reveal)
      const tlQuotes = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-quote-section",
          start: "center center",
          end: "+=" + window.innerHeight * 1.5,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial States
      gsap.set(".quote-line", { y: "100%" }); // Hidden below
      gsap.set(".about-label-text", { y: "100%" });

      // Step A: Reveal "FOR ME"
      tlQuotes.to(".about-label-text", {
        y: "0%",
        duration: 1,
        ease: "power3.out"
      });

      // Step B: Reveal Quotes (Staggered Slide Up)
      tlQuotes.to(".quote-line", {
        y: "0%",
        stagger: 0.15,
        duration: 1.5,
        ease: "power3.out",
      }, "-=0.5");

      // Step C: Hold
      tlQuotes.to({}, { duration: 0.5 });


      // 2. IMAGE SEQUENCE (Side Wipe & Asymmetric)
      const tlImage = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-image-section",
          start: "top top",
          end: "+=" + window.innerHeight * 1.5,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial States
      gsap.set(".img-reveal-mask", { clipPath: "inset(0% 100% 0% 0%)" }); // Hidden to right
      gsap.set(".img-caption-line", { y: "100%", opacity: 0 });

      // Reveal Image (Wipe Left to Right)
      tlImage.to(".img-reveal-mask", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 2,
        ease: "power4.out",
      });

      // Reveal Caption
      tlImage.to(".img-caption-line", {
        y: "0%",
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out"
      }, "-=1.5");

      // Hold
      tlImage.to({}, { duration: 0.5 });

      // 3. EXPERIENCE SEQUENCE (Simple Slide Up)
      // No pin, just trigger on view
      const expItems = gsap.utils.toArray(".exp-item");
      expItems.forEach((item, i) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-exp-section",
              start: "top 70%",
              toggleActions: "play reverse play reverse"
            },
            delay: i * 0.1
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full text-white uppercase relative" id="about-section">



      {/* --- SECTION 1: QUOTES --- */}
      <section className="about-quote-section h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-5 md:px-10 z-[0] bg-black -mt-[22vw] md:-mt-[16vw]">
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center h-full">
          {/* Label with Mask */}
          <div className="overflow-hidden mb-8 md:mb-12">
            <div className="about-label-text text-white/50 font-['Lucida_Sans'] text-2xl tracking-[0.2em]">FOR ME</div>
          </div>

          <div className="flex flex-col gap-0 items-center md:items-start text-center md:text-left">
            {/* Masked Quote Lines */}
            <div className="overflow-hidden">
              <div className="quote-line text-3xl md:text-7xl lg:text-8xl text-white leading-[0.9] font-['Oswald'] font-light">
                THE <span className="font-bold text-gray-500">FUTURE</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="quote-line text-3xl md:text-7xl lg:text-8xl text-white leading-[0.9] font-['Oswald'] font-light">
                BELONGS TO <span className="italic font-serif">THOSE</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="quote-line text-3xl md:text-7xl lg:text-8xl text-white leading-[0.9] font-['Oswald'] font-light">
                WHO BELIEVE IN
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="quote-line text-3xl md:text-7xl lg:text-8xl text-white leading-[0.9] font-['Oswald'] font-light">
                THE BEAUTY OF
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="quote-line text-3xl md:text-7xl lg:text-8xl text-white leading-[0.9] font-['Oswald'] font-light">
                THEIR <span className="text-gray-500 font-bold">DREAMS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: IMAGE (Asymmetric) --- */}
      <section className="about-image-section h-screen w-full flex items-center justify-center relative overflow-hidden z-2 bg-black px-5 md:px-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full">

          {/* Text Side (Left) */}
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center order-2 md:order-1 mt-10 md:mt-0">
            <div className="overflow-hidden">
              <div className="img-caption-line text-5xl md:text-8xl text-white font-['Squada_One'] leading-none">
                HELLO.
              </div>
            </div>
            <div className="overflow-hidden mt-4">
              <div className="img-caption-line text-xl md:text-3xl text-gray-400 font-['Lucida_Sans']">
                I'M ANKIT RAJ.
              </div>
            </div>
          </div>

          {/* Image Side (Right) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2 h-[50vh] md:h-auto">
            <div className="img-reveal-mask w-[90vw] md:w-[30vw] h-[50vh] md:h-[60vh] overflow-hidden grayscale relative">
              <img src={img} alt="About Ankit Raj" className="w-full h-full object-cover object-top" />
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: EXPERIENCE (Grid) --- */}
      <section className="about-exp-section min-h-screen w-full flex items-center justify-center py-20 px-5 md:px-10 z-2 bg-black text-white">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">

          {/* Header */}
          <div className="exp-item flex flex-col justify-start border-t border-white/20 pt-8">
            <h3 className="text-sm tracking-[0.2em] text-gray-500 mb-4">PROFILE</h3>
            <h2 className="text-4xl md:text-7xl font-['Squada_One']">HYBRID<br />ENGINEER</h2>
          </div>

          {/* Details */}
          <article className="exp-item flex flex-col justify-between border-t border-white/20 pt-8">
            <p className="text-lg md:text-2xl leading-relaxed text-gray-300 font-['Lucida_Sans'] max-w-prose">
              Hybrid Engineer mastering the complete MERN ecosystem and pioneering decentralized solutions on EVM and Move-based chains.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm tracking-widest text-gray-500 mb-2">BUILD</h4>
                <p className="text-xl font-['Oswald']">MERN Stack (Advanced)</p>
                <p className="text-xl font-['Oswald']">Blockchain (Solidity, Sui, Move)</p>
              </div>
              <div>
                <h4 className="text-sm tracking-widest text-gray-500 mb-2">DESIGN</h4>
                <p className="text-xl font-['Oswald']">Figma</p>
                <p className="text-xl font-['Oswald']">Motion/GSAP</p>
              </div>
            </div>
          </article>
        </div>
      </section>

    </div>
  );
}
