"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// local images
import kingsMedia from "@/public/images/3kings_media.jpg";
import kingsKeen from "@/public/images/3keenking.jpg";
import lakes from "@/public/images/lakes_logo.jpg";

const SHEET_URL = `https://opensheet.elk.sh/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/creators`;

// map sheet image keys → local assets
const LOCAL_IMAGE_MAP = {
  kingsMedia,
  kingsKeen,
  lakes,
};

export default function Collaborations() {
  const [collaborations, setCollaborations] = useState([]);

  const scrollRef = useRef(null);
  const speedRef = useRef(0.35);
  const isManualScrollRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  /* ----------------------------------------
     Fetch collaborations
  ---------------------------------------- */
  useEffect(() => {
    async function fetchCollaborations() {
      const res = await fetch(SHEET_URL);
      const data = await res.json();

      const rows = Array.isArray(data) ? data : [data];

      const parsed = rows
        .filter((row) => row.id && row.name && row.url)
        .map((row) => ({
          id: Number(row.id),
          name: row.name,
          url: row.url,
          image: row.image,
        }));

      setCollaborations(parsed);
    }

    fetchCollaborations();
  }, []);

  /* ----------------------------------------
     Auto infinite parallax (FIXED)
  ---------------------------------------- */
  useEffect(() => {
    if (!collaborations.length) return;

    const el = scrollRef.current;
    if (!el || el.scrollWidth === 0) return;

    let rafId;

    const animate = () => {
      if (!isManualScrollRef.current) {
        el.scrollLeft += speedRef.current;

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [collaborations]); // ✅ dependency array NEVER changes

  /* ----------------------------------------
     Button scroll
  ---------------------------------------- */
  const scrollByCard = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = 320;

    isManualScrollRef.current = true;
    speedRef.current = 0;

    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });

    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
      speedRef.current = 0.35;
    }, 600);
  };

  if (!collaborations.length) {
    return <p style={{ textAlign: "center" }}>Loading collaborations…</p>;
  }

  const infiniteList = [...collaborations, ...collaborations];

  return (
    <section className="collaborations" id="collaborations">
      <h2 className="section-title">TRUSTED BY CREATORS</h2>

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
          {infiniteList.map((item, index) => {
            const localImage = LOCAL_IMAGE_MAP[item.image];

            return (
              <div key={`${item.id}-${index}`} className="collaboration-card">
                <div className="creator-header">
                  {localImage ? (
                    <Image
                      src={localImage}
                      alt={item.name}
                      className="creator-avatar"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="creator-avatar"
                      loading="lazy"
                    />
                  )}

                  <div className="creator-meta">
                    <h3 className="collab-name">{item.name}</h3>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  Visit Channel →
                </a>
              </div>
            );
          })}
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
