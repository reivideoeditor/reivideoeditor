"use client";

import { useEffect, useState } from "react";

const SHEET_URL = `https://opensheet.elk.sh/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/Videos`;

export default function Features() {
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  /* ----------------------------------------
     Fetch videos from Google Sheet
  ---------------------------------------- */
  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch(SHEET_URL);
      const data = await res.json();

      // 🔒 Normalize response
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

        const youtubeId = row.youtube_id.trim();

        grouped[row.section_key].videos.push({
          id: Number(row.video_id),
          title: row.title,
          thumbnail_link: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
          video_link: `https://www.youtube.com/embed/${youtubeId}`,
        });
      });

      const finalSections = Object.values(grouped);

      setSections(finalSections);
      setActiveTab(finalSections[0]?.key);
    }

    fetchVideos();
  }, []);

  if (!sections.length) {
    return <p style={{ textAlign: "center" }}>Loading videos...</p>;
  }

  /* ----------------------------------------
     Derived state
  ---------------------------------------- */
  const activeSectionIndex = sections.findIndex((sec) => sec.key === activeTab);

  const activeSection = sections[activeSectionIndex];
  const modalSection = sections[currentSectionIndex];
  const currentVideo = modalSection?.videos[currentVideoIndex];

  /* ----------------------------------------
     Modal handlers
  ---------------------------------------- */
  const openModal = (sectionIndex, videoIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentVideoIndex(videoIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const showNextVideo = () => {
    setDirection("next");
    const section = sections[currentSectionIndex];

    if (currentVideoIndex < section.videos.length - 1) {
      setCurrentVideoIndex((i) => i + 1);
    } else {
      const nextSection = (currentSectionIndex + 1) % sections.length;
      setCurrentSectionIndex(nextSection);
      setCurrentVideoIndex(0);
    }
  };

  const showPrevVideo = () => {
    setDirection("prev");
    const section = sections[currentSectionIndex];

    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((i) => i - 1);
    } else {
      const prevSection =
        (currentSectionIndex - 1 + sections.length) % sections.length;
      const lastIndex = sections[prevSection].videos.length - 1;

      setCurrentSectionIndex(prevSection);
      setCurrentVideoIndex(lastIndex);
    }
  };

  /* ----------------------------------------
     Render
  ---------------------------------------- */
  return (
    <section className="features" id="features">
      <h2 className="section-title">EDITED TO PERFECTION</h2>

      <div className="features-container">
        {/* Tabs */}
        <div className="modal-labels-row">
          {sections.map((section) => (
            <div
              key={section.key}
              className={`modal-label-chip ${
                activeTab === section.key ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab(section.key);
                setCurrentSectionIndex(
                  sections.findIndex((s) => s.key === section.key)
                );
                setCurrentVideoIndex(0);
              }}
            >
              <span className="tab-icon">{section.label}</span>
            </div>
          ))}
        </div>

        {/* Thumbnails */}
        <div className="feature-content">
          <div className="content-panel active">
            <h3>{activeSection.label}</h3>

            <div className="video-grid">
              {activeSection.videos.map((video, index) => (
                <div
                  key={video.id}
                  className="video-thumbnail-wrapper"
                  onClick={() => openModal(activeSectionIndex, index)}
                >
                  <div className="thumbnail-overlay">
                    <img
                      src={video.thumbnail_link}
                      alt={video.title}
                      className="video-thumbnail"
                    />
                    <div className="play-button-overlay">
                      <span className="play-icon">▶</span>
                    </div>
                  </div>
                  <p className="video-title">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && currentVideo && (
        <div className="video-modal-backdrop" onClick={closeModal}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>

            {/* Section chips */}
            <div className="modal-labels-row">
              {sections.map((sec, idx) => (
                <button
                  key={sec.key}
                  className={`modal-label-chip ${
                    idx === currentSectionIndex ? "active" : ""
                  }`}
                  onClick={() => {
                    setCurrentSectionIndex(idx);
                    setCurrentVideoIndex(0);
                  }}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <div className="video-modal-content">
              <button
                className="modal-nav-btn modal-prev-btn"
                onClick={showPrevVideo}
              >
                ‹
              </button>

              <div
                key={`${currentSectionIndex}-${currentVideoIndex}`}
                className={`video-iframe-wrapper slide-${direction}`}
              >
                <iframe
                  src={currentVideo.video_link}
                  title={currentVideo.title}
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
