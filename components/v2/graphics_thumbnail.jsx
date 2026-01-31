"use client";

import { useEffect, useState } from "react";

const SHEET_URL = `https://opensheet.elk.sh/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/thumbnails`;
const ITEMS_PER_LOAD = 6;

export default function GraphicsThumbnails() {
  const [thumbnails, setThumbnails] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  useEffect(() => {
    async function fetchThumbnails() {
      const res = await fetch(SHEET_URL);
      const data = await res.json();
      const rows = Array.isArray(data) ? data : [data];

      const parsed = rows
        .filter(
          (row) => row.section_key === "thumbnail" && row.thumbnail_id
        )
        .map((row) => ({
          id: row.id,
          youtubeId: row.thumbnail_id,
        }));

      setThumbnails(parsed);
    }

    fetchThumbnails();
  }, []);

  const visibleThumbnails = thumbnails.slice(0, visibleCount);
  const hasMore = visibleCount < thumbnails.length;

  return (
    <section className="our-graphics" id="graphics-thumbnails">
      <h2 className="section-title">
        Thumbnail <span className="red">Designs</span>
      </h2>

      <p className="section-subtitle">
        High-converting YouTube thumbnails crafted for clicks.
      </p>

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

      {hasMore && (
        <div className="view-more-wrapper">
          <button
            className="view-more-btn"
            onClick={() => setVisibleCount((v) => v + ITEMS_PER_LOAD)}
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
}
