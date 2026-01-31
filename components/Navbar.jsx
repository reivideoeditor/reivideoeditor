// components/Navbar.jsx
"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active nav calculation
      const sections = Array.from(document.querySelectorAll("section[id]"));
      const scrollPosition = window.pageYOffset + 100;
      for (const section of sections) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveId(section.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler for anchor links
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handler = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuActive(false);
    };
    anchors.forEach((a) => a.addEventListener("click", handler));
    return () =>
      anchors.forEach((a) => a.removeEventListener("click", handler));
  }, []);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-container">
        <a href="#home" className="logo-link">
          <svg
            className="logo-svg"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="logoGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#FF5E00", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#00B2FF", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <polygon
              points="20,2 38,14 38,26 20,38 2,26 2,14"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="2"
            />
            <polygon
              points="20,8 32,16 32,24 20,32 8,24 8,16"
              fill="url(#logoGradient)"
              opacity="0.3"
            />
            <circle cx="20" cy="20" r="3" fill="url(#logoGradient)" />
          </svg>
          <span className="logo-text">REI VIDEO EDITOR</span>
        </a>

        <ul id="navLinks" className={`nav-links ${menuActive ? "active" : ""}`}>
          <li>
            <a
              href="#home"
              className={`nav-link ${activeId === "home" ? "active" : ""}`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className={`nav-link ${activeId === "gallery" ? "active" : ""}`}
            >
              Images
            </a>
          </li>
          <li>
            <a
              href="#features"
              className={`nav-link ${activeId === "features" ? "active" : ""}`}
            >
              Edits
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={`nav-link ${activeId === "services" ? "active" : ""}`}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`nav-link ${activeId === "about" ? "active" : ""}`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#collaborations"
              className={`nav-link ${
                activeId === "collaborations" ? "active" : ""
              }`}
            >
              Collabs
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`nav-link ${activeId === "contact" ? "active" : ""}`}
            >
              Contact
            </a>
          </li>
        </ul>

        <div
          id="menuToggle"
          className={`menu-toggle ${menuActive ? "active" : ""}`}
          onClick={() => setMenuActive(!menuActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
