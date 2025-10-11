import React, { useState } from "react";
import img1 from "../src/assets/p1.png";
import img2 from "../src/assets/p2.png";
import img3 from "../src/assets/p3.png";
import img4 from "../src/assets/p4.png";

import "./work.css";

// Use placeholders for images
const images = [
  {
    id: 1,
    title: "Project: Apna-college",
    img: img1, // Correct property name
  },
  {
    id: 2,
    title: "Project: Memory game",
    img: img2, // Correct property name
  },
  {
    id: 3,
    title: "Project: Pandu (e-commerce)",
    img: img3, // Correct property name
  },
  {
    id: 4,
    title: "Project: Trace (typing-game)",
    img: img4, // Correct property name
  },
];

const Work = () => {
  // State to track which image is currently being hovered over
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Function to determine the correct CSS class for each item
  const getItemClassName = (index) => {
    let className = "work-item";

    if (hoveredIndex !== null) {
      if (hoveredIndex === index) {
        // This is the item currently being hovered
        className += " is-expanded";
      } else {
        // This is a sibling item, and one item is being hovered
        className += " is-shrunk";
      }
    }
    // If hoveredIndex is null, all items retain the default "work-item" class (flex: 1)
    return className;
  };

  return (
    <div className="bg-gray-950 p-8 min-h-screen">

      <div
        className="work-gallery-container"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className={getItemClassName(index)}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            {/* 💡 FIX APPLIED HERE: Changed src={image.url} to src={image.img} */}
            <img src={image.img} alt={image.title} />

            {/* Overlay Content */}
            <div className="work-overlay">
              <h2 className="work-title">{image.title}</h2>
              <p className="text-sm text-gray-300">Expanding view...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
