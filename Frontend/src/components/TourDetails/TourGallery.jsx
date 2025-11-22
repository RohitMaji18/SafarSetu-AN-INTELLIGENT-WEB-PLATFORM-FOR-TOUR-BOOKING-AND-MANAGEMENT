import React, { useState } from "react";

export default function TourGallery({ images = [] }) {
  const [mainIndex, setMainIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3">
        <img
          className="w-full h-[420px] object-cover rounded-lg shadow-md"
          src={images[mainIndex]}
          alt={`img-${mainIndex}`}
        />
      </div>

      <div className="flex flex-col gap-3">
        {images.slice(0, 5).map((src, i) => (
          <button
            key={i}
            onClick={() => setMainIndex(i)}
            className={`w-full h-24 rounded-md overflow-hidden border ${
              mainIndex === i ? "border-foreground" : "border-transparent"
            }`}
          >
            <img
              src={src}
              alt={`thumb-${i}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
