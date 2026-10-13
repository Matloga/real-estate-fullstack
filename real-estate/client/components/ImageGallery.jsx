import React, { useState } from "react";

export default function ImageGallery({ images = [] }) {
  const [active, setActive] = useState(images[0] || "");
  return (
    <div>
      {active && <img src={active} alt="Property" style={{ width: "100%", borderRadius: 8 }} />}
      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            onClick={() => setActive(img)}
            style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4, cursor: "pointer", border: active === img ? "2px solid #333" : "1px solid #ddd" }}
          />
        ))}
      </div>
    </div>
  );
}
