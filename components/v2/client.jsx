"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// 🔹 Local images
import kingsMedia from "@/public/images/3kings_media.jpg";
import kingsKeen from "@/public/images/3keenking.jpg";
import lakes from "@/public/images/lakes_logo.jpg";

const SHEET_URL = `https://opensheet.elk.sh/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/clients`;

const LOCAL_IMAGE_MAP = {
  kingsMedia,
  kingsKeen,
  lakes,
};

export default function OurClients() {
  const [clients, setClients] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    async function fetchClients() {
      const res = await fetch(SHEET_URL);
      const data = await res.json();
      const rows = Array.isArray(data) ? data : [data];

      setClients(
        rows
          .filter((row) => row.id && row.name && row.url)
          .map((row) => ({
            id: Number(row.id),
            name: row.name,
            url: row.url,
            image: row.image,
          }))
      );
    }

    fetchClients();
  }, []);

  if (!clients.length) return null;

  const infiniteClients = [...clients, ...clients];

  return (
    <section className="our-clients" id="clients">
      <h2 className="section-title">
        Our Recent <span className="red">Clients</span>
      </h2>

      <p className="section-subtitle">
        Clients and their previous videos that we worked on.
      </p>

      <div className="clients-carousel-wrapper">
        <div className="clients-carousel-track" ref={trackRef}>
          {infiniteClients.map((client, index) => {
            const localImage = LOCAL_IMAGE_MAP[client.image];

            return (
              <a
                key={`${client.id}-${index}`}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="client-card"
              >
                <div className="client-avatar-wrapper">
                  {localImage ? (
                    <Image
                      src={localImage}
                      alt={client.name}
                      className="client-avatar"
                    />
                  ) : client.image?.startsWith("http") ? (
                    <img
                      src={client.image}
                      alt={client.name}
                      className="client-avatar"
                      loading="lazy"
                    />
                  ) : (
                    <div className="client-avatar-fallback">
                      {client.name.charAt(0)}
                    </div>
                  )}
                </div>

                <p className="client-name">{client.name}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
