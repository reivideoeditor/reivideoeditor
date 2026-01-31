"use client";

import { useEffect, useState } from "react";

const SHEET_URL = `https://opensheet.elk.sh/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/thumbnails`;
const ITEMS_PER_LOAD = 6;

export default function OurGraphics() {
  const [thumbnails, setThumbnails] = useState([]);
  const [carousel1, setCarousel1] = useState([]);
  const [carousel2, setCarousel2] = useState([]);
  const [activeTab, setActiveTab] = useState("carousels");
  const [visibleThumbCount, setVisibleThumbCount] =
    useState(ITEMS_PER_LOAD);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(SHEET_URL);
      const data = await res.json();
      const rows = Array.isArray(data) ? data : [data];

      const thumbs = [];
      const c1 = [];
      const c2 = [];

      rows.forEach((row) => {
        // 🔹 Thumbnails (YouTube IDs)
        if (row.section_key === "thumbnail" && row.thumbnail_id) {
          thumbs.push({
            id: row.id,
            youtubeId: row.thumbnail_id,
          });
        }

        // 🔹 Carousel 1 (Drive image IDs)
        if (row.section_key === "carousels1" && row.carousel_id) {
          c1.push({
            id: row.id,
            imageId: row.carousel_id,
          });
        }

        // 🔹 Carousel 2 (Drive image IDs)
        if (row.section_key === "carousels2" && row.carousel_id) {
          c2.push({
            id: row.id,
            imageId: row.carousel_id,
          });
        }
      });

      setThumbnails(thumbs);
      setCarousel1(c1);
      setCarousel2(c2);
    }

    fetchData();
  }, []);

  // Reset thumbnails when switching tabs
  useEffect(() => {
    if (activeTab === "thumbnail") {
      setVisibleThumbCount(ITEMS_PER_LOAD);
    }
  }, [activeTab]);

  const visibleThumbnails = thumbnails.slice(0, visibleThumbCount);
  const hasMoreThumbnails = visibleThumbCount < thumbnails.length;

  return (
    <section className="our-graphics" id="graphics">
      <h2 className="section-title">
        Our <span className="red">Graphics</span>
      </h2>

      <p className="section-subtitle">
        Making custom tailored and optimized graphics to increase your
        reach.
      </p>

      {/* 🔘 TOGGLE */}
      <div className="project-tabs-slider">
        <div
          className="slider-indicator"
          style={{
            transform:
              activeTab === "thumbnail"
                ? "translateX(0%)"
                : "translateX(100%)",
          }}
        />

        <button
          className={`slider-tab ${
            activeTab === "thumbnail" ? "active" : ""
          }`}
          onClick={() => setActiveTab("thumbnail")}
        >
          Thumbnails
        </button>

        <button
          className={`slider-tab ${
            activeTab === "carousels" ? "active" : ""
          }`}
          onClick={() => setActiveTab("carousels")}
        >
          Carousels
        </button>
      </div>

      {/* 🔹 THUMBNAILS */}
      {activeTab === "thumbnail" && (
        <>
          <div className="graphics-thumbnails-grid">
            {visibleThumbnails.map((img) => (
              <div key={img.id} className="graphics-card">
                <img
                  src={`https://img.youtube.com/vi/${img.youtubeId}/hqdefault.jpg`}
                  alt=""
                />
              </div>
            ))}
          </div>

          {hasMoreThumbnails && (
            <div className="view-more-wrapper">
              <button
                className="view-more-btn"
                onClick={() =>
                  setVisibleThumbCount(
                    (prev) => prev + ITEMS_PER_LOAD
                  )
                }
              >
                View More
              </button>
            </div>
          )}
        </>
      )}

      {/* 🔁 CAROUSELS */}
      {activeTab === "carousels" && (
        <>
          {/* 🔁 CAROUSEL 1 → RIGHT TO LEFT */}
          <div className="graphics-carousel-wrapper">
            <div className="graphics-carousel-track right-to-left">
              {[...carousel1, ...carousel1].map((item, index) => (
                <div
                  key={`c1-${item.id}-${index}`}
                  className="graphics-card"
                >
                  <img
                    src={`https://drive.google.com/thumbnail?id=${item.imageId}&sz=w600`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 🔁 CAROUSEL 2 → LEFT TO RIGHT */}
          <div className="graphics-carousel-wrapper">
            <div className="graphics-carousel-track left-to-right">
              {[...carousel2, ...carousel2].map((item, index) => (
                <div
                  key={`c2-${item.id}-${index}`}
                  className="graphics-card"
                >
                  <img
                    src={`https://drive.google.com/thumbnail?id=${item.imageId}&sz=w600`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
