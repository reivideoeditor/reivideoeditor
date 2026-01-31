"use client";

import { useState } from "react";

export default function AutoCarousel({ videos }) {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);

  return (
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
              <p className="carousel-title">{video.title}</p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
