"use client";

import { useEffect, useState } from "react";

const SHEET_URL = `https://opensheet.elk.sh/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/before_&_after`;

export default function BeforeAfter() {
  const [sections, setSections] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch(SHEET_URL);
      const data = await res.json();
      const rows = Array.isArray(data) ? data : [data];

      const grouped = {};

      rows.forEach((row) => {
        if (!row.section_key || !row.youtube_id) return;

        if (!grouped[row.section_key]) {
          grouped[row.section_key] = {
            key: row.section_key,
            label: row.section_label,
            videos: [],
          };
        }

        grouped[row.section_key].videos.push({
          id: Number(row.video_id),
          title: row.title,
          youtubeId: row.youtube_id.trim(),
        });
      });

      setSections(Object.values(grouped));
    }

    fetchVideos();
  }, []);

  if (!sections.length) return null;

  const videos = sections[0].videos;

  return (
    <section className="before-after" id="before-after">
      <h2 className="section-title">
        Before & <span className="red">After</span>
      </h2>

      <p className="section-subtitle">
        Your videos with our editing making them optimized for all platforms
      </p>

      <div className="carousel-wrapper">
        <div
          className={`carousel-track ${
            activeVideoId && isHoveringVideo ? "paused" : ""
          }`}
        >
          {[...videos, ...videos].map((video, index) => {
            const isActive = activeVideoId === `${video.id}-${index}`;

            return (
              <div key={`${video.id}-${index}`} className="carousel-item">
                <div
                  className={`carousel-card ${isActive ? "playing" : ""}`}
                  onMouseEnter={() => {
                    if (isActive) setIsHoveringVideo(true);
                  }}
                  onMouseLeave={() => {
                    if (isActive) setIsHoveringVideo(false);
                  }}
                  onClick={() =>
                    setActiveVideoId(isActive ? null : `${video.id}-${index}`)
                  }
                >
                  <div className="carousel-card-overlay">
                  
                  {isActive ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                      />
                      <div className="play-icon">▶</div>
                    </>
                  )}
                  </div>
                {/* Title below card */}
                <p className="carousel-title">{video.title}</p>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
