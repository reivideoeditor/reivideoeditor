"use client";

import { useEffect, useState } from "react";

const SHEET_URL = `https://opensheet.elk.sh/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/thumbnails`;

export default function GraphicsCarousels() {
  const [carousel1, setCarousel1] = useState([]);
  const [carousel2, setCarousel2] = useState([]);

  useEffect(() => {
    async function fetchCarousels() {
      const res = await fetch(SHEET_URL);
      const data = await res.json();
      const rows = Array.isArray(data) ? data : [data];

      const c1 = [];
      const c2 = [];

      rows.forEach((row) => {
        if (row.section_key === "carousels1" && row.carousel_id) {
          c1.push({ id: row.id, imageId: row.carousel_id });
        }
        if (row.section_key === "carousels2" && row.carousel_id) {
          c2.push({ id: row.id, imageId: row.carousel_id });
        }
      });

      setCarousel1(c1);
      setCarousel2(c2);
    }

    fetchCarousels();
  }, []);

  if (!carousel1.length && !carousel2.length) return null;

  return (
    <section className="our-graphics" id="graphics-carousels">
      <h2 className="section-title">
        Carousel <span className="red">Designs</span>
      </h2>

      <p className="section-subtitle">
        Scroll-stopping carousel creatives for maximum engagement.
      </p>

      {/* Carousel 1 */}
      <div className="graphics-carousel-wrapper">
        <div className="graphics-carousel-track right-to-left">
          {[...carousel1, ...carousel1].map((item, index) => (
            <div key={`c1-${item.id}-${index}`} className="graphics-card">
              <img
                src={`https://drive.google.com/thumbnail?id=${item.imageId}&sz=w600`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel 2 */}
      <div className="graphics-carousel-wrapper">
        <div className="graphics-carousel-track left-to-right">
          {[...carousel2, ...carousel2].map((item, index) => (
            <div key={`c2-${item.id}-${index}`} className="graphics-card">
              <img
                src={`https://drive.google.com/thumbnail?id=${item.imageId}&sz=w600`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
