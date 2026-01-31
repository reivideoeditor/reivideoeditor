// components/Hero.jsx
"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const rotatorRef = useRef(null);

  useEffect(() => {
    // Text rotator logic converted from your original script
    const root = rotatorRef.current;
    if (!root) return;

    const textSets = Array.from(root.querySelectorAll(".text-set"));
    let currentIndex = 0;
    let isAnimating = false;

    function wrapTextInSpans(element) {
      const text = element.textContent;
      element.innerHTML = text.split("").map((char, i) =>
        `<span class="char" style="animation-delay: ${i * 0.05}s">${char === " " ? "&nbsp;" : char}</span>`
      ).join("");
    }

    function animateTextIn(textSet) {
      const glitchText = textSet.querySelector(".glitch-text");
      const subtitle = textSet.querySelector(".subtitle");
      wrapTextInSpans(glitchText);
      glitchText.setAttribute("data-text", glitchText.textContent);
      setTimeout(() => subtitle.classList.add("visible"), 800);
    }

    function animateTextOut(textSet) {
      const chars = textSet.querySelectorAll(".char");
      const subtitle = textSet.querySelector(".subtitle");
      chars.forEach((char, i) => {
        char.style.animationDelay = `${i * 0.02}s`;
        char.classList.add("out");
      });
      subtitle.classList.remove("visible");
    }

    function rotateText() {
      if (isAnimating) return;
      isAnimating = true;
      const currentSet = textSets[currentIndex];
      const nextIndex = (currentIndex + 1) % textSets.length;
      const nextSet = textSets[nextIndex];

      animateTextOut(currentSet);

      setTimeout(() => {
        currentSet.classList.remove("active");
        nextSet.classList.add("active");
        animateTextIn(nextSet);

        currentIndex = nextIndex;
        isAnimating = false;
      }, 600);
    }

    // Initialize
    textSets.forEach((s) => s.classList.remove("active"));
    if (textSets.length > 0) {
      textSets[0].classList.add("active");
      animateTextIn(textSets[0]);
    }

    const rotInterval = setTimeout(() => {
      const iv = setInterval(rotateText, 5000);
      // store to clear later
      (root._iv = iv);
    }, 4000);

    // Random glitch (keeps original behaviour)
    const glitchInterval = setInterval(() => {
      const glitchTexts = root.querySelectorAll(".glitch-text");
      glitchTexts.forEach(text => {
        if (Math.random() > 0.95) {
          text.style.animation = "none";
          setTimeout(() => { text.style.animation = ""; }, 200);
        }
      });
    }, 3000);

    return () => {
      clearTimeout(rotInterval);
      clearInterval(root._iv);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-content" ref={rotatorRef}>
        <div className="text-rotator">
          <div className="text-set active">
            <h1 className="glitch-text" data-text="FUTURE IS NOW">FUTURE IS NOW</h1>
            <p className="subtitle">Enter the next dimension of content creation</p>
          </div>
          <div className="text-set">
            <h1 className="glitch-text" data-text="BEYOND LIMITS">BEYOND LIMITS</h1>
            <p className="subtitle">Where creativity meets infinite possibilities</p>
          </div>
          <div className="text-set">
            <h1 className="glitch-text" data-text="ELECTRIC DREAMS">REI VIDEO EDITOR</h1>
            <p className="subtitle">Powering tomorrow's digital revolution today</p>
          </div>
        </div>
      </div>

      <div className="cta-container">
        <a href="#features" className="cta-button cta-primary">Get Started</a>
        <a href="#about" className="cta-button cta-secondary">Learn More</a>
      </div>
    </section>
  );
}
