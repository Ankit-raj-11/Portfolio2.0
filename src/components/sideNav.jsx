import { SOCIAL_LINKS } from "../constants";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function SideNav() {
    const [time, setTime] = useState(new Date());
    const containerRef = useRef(null);

    useEffect(() => {
        // Timer for clock
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Entry Animation
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
            );
        });

        return () => {
            clearInterval(timer);
            ctx.revert();
        };
    }, []);

    // Format Date: "Monday, Jan 19"
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    };

    // Format Time: "12:30 PM"
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <>
            <aside className="fixed top-1/2 right-0 -translate-y-1/2 mr-5 z-[100] max-md:mr-[10px] mix-blend-difference" aria-label="Social Media">
                <ul className="flex flex-col gap-5 max-md:gap-[10px] list-none p-0 m-0">
                    {SOCIAL_LINKS.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.label}
                                className="text-inherit no-underline bg-none block transition-transform duration-300 hover:scale-110"
                            >
                                <item.Icon size={38} className="bg-transparent rounded-full border-2 border-white/80 p-[8px] text-[38px] text-white cursor-pointer max-md:text-[28px] max-md:p-[5px] hover:border-white hover:bg-white/10 transition-colors" />
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Time & Date Widget */}
            <div
                ref={containerRef}
                className="absolute right-5 top-[90vh] z-[999] bg-black border border-white/20 shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center gap-1 select-none pointer-events-none max-md:right-5 max-md:top-[90vh] max-md:p-4"
            >
                <div className="text-white font-['Century_Gothic'] text-3xl font-light tracking-widest max-md:text-xl">
                    {formatTime(time)}
                </div>
                <div className="text-white/60 font-['Century_Gothic'] text-sm tracking-[2px] uppercase max-md:text-xs">
                    {formatDate(time)}
                </div>
            </div>
        </>
    );
}

export default SideNav;
