import React, { useState } from "react";
import { ImageIcon, Maximize2 } from "lucide-react";

export default function TourGallery({ images = [] }) {
  const [mainIndex, setMainIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-4">
      
      {/* 1. MAIN DISPLAY: Big Clear Image */}
      <div className="relative flex-1 group overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-xl">
        
        {/* Top-Right Badge: Clean & Minimal */}
        <div className="absolute top-6 right-6 z-10 px-4 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-border shadow-sm">
          <p className="text-[10px] font-black text-foreground uppercase tracking-widest flex items-center gap-2">
            <ImageIcon size={12} className="text-secondary" />
            Image {mainIndex + 1} / {images.length}
          </p>
        </div>

        <img
          className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
          src={images[mainIndex]}
          alt="Tour View"
        />

        {/* Subtle Bottom Shade - Only for text visibility if any */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        
        {/* Expand Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 text-white">
              <Maximize2 size={24} />
           </div>
        </div>
      </div>

      {/* 2. THUMBNAILS: Side Selection */}
      <div className="flex lg:flex-col gap-4 h-auto lg:h-[600px] overflow-x-auto lg:overflow-y-auto no-scrollbar scroll-smooth py-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setMainIndex(i)}
            className={`relative shrink-0 w-24 h-24 lg:w-44 lg:h-[110px] rounded-[1.5rem] overflow-hidden transition-all duration-300 border-2 group ${
              mainIndex === i 
                ? "border-secondary shadow-lg scale-105 lg:scale-100" 
                : "border-transparent opacity-60 hover:opacity-100 hover:border-border"
            }`}
          >
            <img
              src={src}
              alt={`Thumbnail ${i}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            
            {/* Active Indicator Overlay */}
            {mainIndex === i && (
              <div className="absolute inset-0 bg-secondary/10 pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}