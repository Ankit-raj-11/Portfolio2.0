import React, { useState } from "react";
import { WORK_PROJECTS } from "../constants";

const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-black w-full h-full flex flex-col items-center justify-center px-10 md:px-24 pt-48 pb-6 overflow-hidden">

      {/* Container: Vertical on Mobile, Horizontal on Desktop */}
      <div
        className="w-full h-full flex flex-col md:flex-row gap-0"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {WORK_PROJECTS.map((project, index) => {
          // Clean title
          const title = project.title.replace("Project: ", "");
          const isHovered = hoveredIndex === index;
          // If something is hovered, all non-hovered items get dimmed/small.
          // If nothing is hovered, everyone is equal.
          const isDimmed = hoveredIndex !== null && !isHovered;

          return (
            <article
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`
                relative
                group
                cursor-pointer
                overflow-hidden
                transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isHovered ? "flex-[10]" : "flex-[1]"}
                ${isDimmed ? "brightness-50 grayscale" : "brightness-[0.4] grayscale"}
                hover:brightness-100 hover:grayscale-0
                border-b md:border-b-0 md:border-r border-white/10
              `}
            >
              {/* Image Background */}
              <img
                src={project.img}
                alt={title}
                className={`
                  absolute inset-0 w-full h-full object-cover object-center
                  transition-transform duration-1000 ease-out
                  ${isHovered ? "scale-105" : "scale-125"}
                `}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

              {/* Number (Absolute Top-Left) */}
              <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 transition-all duration-500">
                <span className="text-white/50 font-['Oswald'] text-xl tracking-widest">0{index + 1}</span>
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-20">

                {/* Collapsed State: Vertical Text (Desktop Only) */}
                <div
                  className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    hidden md:flex items-center justify-center
                    transition-opacity duration-300
                    ${isHovered ? "opacity-0 pointer-events-none" : "opacity-100 delay-300"}
                  `}
                >
                  <h2
                    className="text-4xl text-transparent font-['Syne'] font-bold -rotate-90 whitespace-nowrap uppercase tracking-widest"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}
                  >
                    {title}
                  </h2>
                </div>

                {/* Expanded State: Full Content */}
                <div
                  className={`
                    flex flex-col gap-2 transform transition-all duration-500
                    ${isHovered ? "translate-y-0 opacity-100 delay-100" : "translate-y-10 opacity-0"}
                  `}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs font-['Oswald'] bg-white text-black px-2 py-1 uppercase tracking-widest">2024</span>
                    <span className="text-xs font-['Oswald'] text-white border border-white/30 px-2 py-1 uppercase tracking-widest">Case Study</span>
                  </div>

                  <h2 className="text-4xl md:text-7xl text-white font-['Syne'] font-extrabold uppercase leading-[0.9]">
                    {title}
                  </h2>

                  <div className="h-[2px] w-0 group-hover:w-20 bg-white transition-all duration-700 ease-out mt-4" />
                </div>
              </div>

            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Work;
