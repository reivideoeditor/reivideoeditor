// components/ParticlesBackground.jsx
"use client";
import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const particlesContainer = containerRef.current;
    if (!particlesContainer) return;

    const particleCount = 30;
    const created = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 15 + "s";
      particle.style.animationDuration = (Math.random() * 10 + 15) + "s";

      // Random color
      if (Math.random() > 0.5) {
        particle.style.background = "#00B2FF";
      } else {
        particle.style.background = "#FF5E00";
      }

      particlesContainer.appendChild(particle);
      created.push(particle);
    }

    return () => {
      created.forEach(p => p.remove());
    };
  }, []);

  return <div id="particles" ref={containerRef} />;
}
