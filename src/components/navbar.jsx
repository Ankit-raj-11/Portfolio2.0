import { useState, useEffect, useRef } from "react";
import { NAV_ITEMS } from "../constants";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY.current) {
      // if scroll down hide the navbar
      setShow(false);
    } else {
      // if scroll up show the navbar
      setShow(true);
    }
    // remember current page location to use in the next move
    lastScrollY.current = window.scrollY;
  };

  useEffect(() => {
    // Delay adding the event listener to ignore the initial scroll restoration jump
    const timer = setTimeout(() => {
      lastScrollY.current = window.scrollY;
      window.addEventListener("scroll", controlNavbar);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <>
      {/* 
        NAVBAR CONTAINER
        Mobile: Fixed top, Full width, Right aligned (justify-end), Padding side
        Desktop: Fixed top, Centered (left-1/2 transform), Auto width 
      */}
      <nav
        className={`fixed top-[3%] z-[100] w-full flex justify-end px-5 md:justify-center md:w-max md:left-1/2 md:-translate-x-1/2 md:px-0 mix-blend-difference pointer-events-none transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-[200%]'}`}
      >

        {/* DESKTOP MENU: Hidden on mobile */}
        <ul className="hidden md:flex items-center gap-[100px] list-none p-0 m-0 pointer-events-auto">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                className="font-['Squada_One'] text-white mix-blend-difference text-3xl
                  transition-transform duration-300 ease-out
                  hover:scale-110 block"
                style={{ color: "white" }}
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* MOBILE HAMBURGER: Visible only on mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 mix-blend-difference cursor-pointer focus:outline-none pointer-events-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {/* Top Line: Rotates around Left edge to form top of < */}
          <span
            className={`block w-8 h-[2px] bg-white transition-all duration-300 ease-out origin-left ${isOpen ? "rotate-[42deg]" : ""
              }`}
          />
          {/* Middle Line: Fades out */}
          <span
            className={`block w-8 h-[2px] bg-white transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100"
              }`}
          />
          {/* Bottom Line: Rotates around Left edge to form bottom of < */}
          <span
            className={`block w-8 h-[2px] bg-white transition-all duration-300 ease-out origin-left ${isOpen ? "-rotate-[42deg]" : ""
              }`}
          />
        </button>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <ul className="flex flex-col items-center gap-10 list-none p-0 m-0">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                className="font-['Squada_One'] text-white text-5xl tracking-widest hover:text-gray-500 transition-colors"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
