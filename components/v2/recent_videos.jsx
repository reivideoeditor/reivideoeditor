"use client";

import { useEffect, useState } from "react";
import AutoCarousel from "./auto_caraousal";

const SHEET_URL = `https://opensheet.elk.sh/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/Videos`;
const ITEMS_PER_LOAD = 6;

export default function RecentProjects() {
  const [shortForm, setShortForm] = useState([]);
  const [longForm, setLongForm] = useState([]);
  const [activeTab, setActiveTab] = useState("long");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // 🔹 MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch(SHEET_URL);
      const data = await res.json();
      const rows = Array.isArray(data) ? data : [data];

      const short = [];
      const long = [];

      rows.forEach((row) => {
        if (!row.youtube_id) return;

        const video = {
          id: Number(row.video_id),
          title: row.title,
          youtubeId: row.youtube_id.trim(),
          video_link: `https://www.youtube.com/embed/${row.youtube_id}?autoplay=1&rel=0`,
        };

        if (row.section_key === "performance") {
          short.push(video);
        } else {
          long.push(video);
        }
      });

      setShortForm(short);
      setLongForm(long);
    }

    fetchProjects();
  }, []);

  // Reset visible count when tab changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [activeTab]);

  const videos = activeTab === "short" ? shortForm : longForm;
  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

  const currentVideo = videos[currentVideoIndex];

  // 🔹 MODAL HELPERS
  const openModal = (index) => {
    setCurrentVideoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const showNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const showPrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  if (!videos.length) {
    return <p style={{ textAlign: "center" }}>Loading projects…</p>;
  }

  return (
    <section className="recent-projects" id="recent-projects">
      <h2 className="section-title">
        Recent <span className="red">Project</span>
      </h2>

      <p className="section-subtitle">
        Collection of our video projects, to show our expertise in both
        long-form and short-form content.
      </p>

      {/* Slider Tabs */}
      <div className="project-tabs-slider">
        <div
          className={`slider-indicator ${
            activeTab === "long" ? "right" : "left"
          }`}
        />

        <button
          className={`slider-tab ${activeTab === "short" ? "active" : ""}`}
          onClick={() => setActiveTab("short")}
        >
          ⚡ Short-Form
        </button>

        <button
          className={`slider-tab ${activeTab === "long" ? "active" : ""}`}
          onClick={() => setActiveTab("long")}
        >
          🎬 Long-Form
        </button>
      </div>

      {/* Grid */}
      {/* SHORT FORM → AUTO CAROUSEL */}
      {activeTab === "short" && (
        <AutoCarousel videos={shortForm} onItemClick={openModal} />
      )}

      {/* LONG FORM → GRID */}
      {activeTab === "long" && (
        <div className="project-grid long-form">
          {visibleVideos.map((video, index) => (
            <div
              key={video.id}
              className="project-card"
              onClick={() => openModal(index)}
            >
              <div className="project-thumb">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                />
                <div className="play-overlay">▶</div>
              </div>

              <div className="project-content">
                <h3>{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View More */}
      {hasMore && activeTab === "long" && (
        <div className="view-more-wrapper">
          <button
            className="view-more-btn"
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
          >
            View More
          </button>
        </div>
      )}

      {/* 🔹 VIDEO MODAL */}
      {isModalOpen && currentVideo && (
        <div className="video-modal-backdrop" onClick={closeModal}>
          <div
            className={`video-modal ${
              activeTab === "short" ? "short-form-modal" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>

            <div className="video-modal-content">
              <button
                className="modal-nav-btn modal-prev-btn"
                onClick={showPrevVideo}
              >
                ‹
              </button>

              <div className="video-iframe-wrapper">
                <iframe
                  src={currentVideo.video_link}
                  title={currentVideo.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
                <p className="modal-video-title">{currentVideo.title}</p>
              </div>

              <button
                className="modal-nav-btn modal-next-btn"
                onClick={showNextVideo}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
