"use client";

import { useEffect, useState } from "react";

const WORDS = ["Business", "YouTube", "Instagram", "Socials"];
const TYPING_SPEED = 120;
const DELETING_SPEED = 70;
const HOLD_TIME = 2800;

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    let timeout;

    if (!isDeleting && text.length < currentWord.length) {
      timeout = setTimeout(
        () => setText(currentWord.slice(0, text.length + 1)),
        TYPING_SPEED,
      );
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(currentWord.slice(0, text.length - 1)),
        DELETING_SPEED,
      );
    } else if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), HOLD_TIME);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);
  return (
    <section className="hero" id="hero">
      <h1 className="hero-title">
        <span className="hero-line" data-text="Turn your vision to reality">
          Turn your <span className="red-hero">vision to reality</span>
        </span>

        <br />

        <span
          className="hero-line"
          data-text={`with our help to scale your ${text}`}
        >
          with our help to scale your{" "}
          <span className="red-hero typewriter">
            {text}
            <span className="cursor">|</span>
          </span>
        </span>
      </h1>

      <p className="hero-subtitle">
        We help creators and brands create content,
        <br />
        and their social media presence with clean and strategic editing.
      </p>

      <div className="hero-buttons">
        <a href="#recent-projects" className="view-more-btn">
          Portfolio
        </a>
        <a href="#clients" className="view-more-btn">
          Clients
        </a>
      </div>
    </section>
  );
}
