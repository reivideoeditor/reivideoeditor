"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  { id: 1, title: "Thumbnails", description: "High-converting YouTube thumbnails designed to maximize CTR.", icon: "🖼️" },
  { id: 2, title: "Video Editing", description: "Cinematic edits optimized for pacing, retention, and storytelling.", icon: "🎬" },
  { id: 3, title: "Audio Design", description: "Clean dialogue, sound effects, and professional audio balance.", icon: "🎧" },
  { id: 4, title: "Content & Social Media Management", description: "End-to-end content planning, posting, analytics, and growth.", icon: "📈" },
  { id: 5, title: "Motion Graphics", description: "Lower thirds, transitions, animations, and visual effects.", icon: "✨" },
  { id: 6, title: "3D Animated Videos", description: "High-quality 3D animations for branding and explainers.", icon: "🧊" },
];

export default function CreatorServicesCarousel() {
  const scrollRef = useRef(null);
  const speedRef = useRef(0.35);
  const isManualScrollRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  /* 🔁 Auto infinite parallax */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId;

    const animate = () => {
      if (!isManualScrollRef.current) {
        el.scrollLeft += speedRef.current;

        // Infinite reset
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* 👉 Button-controlled movement */
  const scrollByCard = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = 320;

    // Pause auto-scroll
    isManualScrollRef.current = true;
    speedRef.current = 0;

    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });

    // Resume auto-scroll after interaction
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
      speedRef.current = 0.35;
    }, 600);
  };

  return (
    <section className="collaborations" id="services">
      <h2 className="section-title">SERVICES</h2>

      <div className="collaboration-carousel-wrapper">
        <button
          className="carousel-btn left"
          onClick={() => scrollByCard("left")}
        >
          ‹
        </button>

        <div
          className="collaboration-carousel infinite"
          ref={scrollRef}
          onMouseEnter={() => (speedRef.current = 0)}
          onMouseLeave={() => (speedRef.current = 0.35)}
        >
          {[...SERVICES, ...SERVICES].map((service, index) => (
            <div key={`${service.id}-${index}`} className="collaboration-card">
              <div className="creator-header">
                <div className="info-icon">{service.icon}</div>
                <div className="creator-meta">
                  <h3 className="collab-name">{service.title}</h3>
                </div>
              </div>

              <p className="collab-description">
                {service.description}
              </p>

              <div className="collab-services">
                <span className="collab-service-chip">
                  {service.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-btn right"
          onClick={() => scrollByCard("right")}
        >
          ›
        </button>
      </div>
    </section>
  );
}
