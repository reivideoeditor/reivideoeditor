"use client";

import { useEffect, useState } from "react";

const SHEET_URL = `https://opensheet.elk.sh/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/thumbnails`;

export default function ImageGallery() {
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(SHEET_URL);
      const data = await res.json();

      // 🔒 Normalize response (IMPORTANT)
      const rows = Array.isArray(data) ? data : [data];

      const grouped = {};

      rows.forEach((row) => {
        if (!row.section_key || !row.thumbnail_id) return;

        if (!grouped[row.section_key]) {
          grouped[row.section_key] = {
            key: row.section_key,
            label: row.section_label,
            images: [],
          };
        }

        const videoId = row.thumbnail_id.trim();

        grouped[row.section_key].images.push({
          id: Number(row.image_id),
          title: row.title,
          thumbnail: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
          hd: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        });
      });

      const finalSections = Object.values(grouped);

      setSections(finalSections);
      setActiveTab(finalSections[0]?.key);
    }

    fetchImages();
  }, []);

  if (!sections.length) {
    return <p style={{ textAlign: "center" }}>Loading gallery...</p>;
  }

  const activeSectionIndex = sections.findIndex((s) => s.key === activeTab);
  const activeSection = sections[activeSectionIndex];
  const modalSection = sections[currentSectionIndex];
  const currentImage = modalSection?.images[currentImageIndex];

  const openModal = (sectionIndex, imageIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const showNext = () => {
    setDirection("next");
    const section = sections[currentSectionIndex];

    if (currentImageIndex < section.images.length - 1) {
      setCurrentImageIndex((i) => i + 1);
    } else {
      const nextSection = (currentSectionIndex + 1) % sections.length;
      setCurrentSectionIndex(nextSection);
      setCurrentImageIndex(0);
    }
  };

  const showPrev = () => {
    setDirection("prev");
    const section = sections[currentSectionIndex];

    if (currentImageIndex > 0) {
      setCurrentImageIndex((i) => i - 1);
    } else {
      const prevSection =
        (currentSectionIndex - 1 + sections.length) % sections.length;
      const lastIndex = sections[prevSection].images.length - 1;
      setCurrentSectionIndex(prevSection);
      setCurrentImageIndex(lastIndex);
    }
  };

  return (
    <section className="features" id="gallery">
      <h2 className="section-title">IMAGE GALLERY</h2>

      <div className="features-container">
        {/* Tabs */}
        <div className="modal-labels-row">
          {sections.map((section) => (
            <button
              key={section.key}
              className={`modal-label-chip ${
                activeTab === section.key ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab(section.key);
                setCurrentSectionIndex(
                  sections.findIndex((s) => s.key === section.key)
                );
                setCurrentImageIndex(0);
              }}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="feature-content">
          <h3>{activeSection.label}</h3>

          <div className="video-grid">
            {activeSection.images.map((img, index) => (
              <div
                key={img.id}
                className="video-thumbnail-wrapper"
                onClick={() => openModal(activeSectionIndex, index)}
              >
                <img
                  src={img.thumbnail}
                  alt={img.title}
                  className="video-thumbnail"
                />
                <p className="video-title">{img.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && currentImage && (
        <div className="video-modal-backdrop" onClick={closeModal}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>

            <div className="video-modal-content">
              <button className="modal-nav-btn" onClick={showPrev}>
                ‹
              </button>

              <div className={`video-iframe-wrapper slide-${direction}`}>
                <img
                  src={currentImage.hd}
                  alt={currentImage.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <p className="modal-video-title">{currentImage.title}</p>
              </div>

              <button className="modal-nav-btn" onClick={showNext}>
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
