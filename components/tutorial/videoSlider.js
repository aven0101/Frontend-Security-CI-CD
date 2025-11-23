"use client";

import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

export default function VideoSlider() {
  const videos = [
    { id: 1, title: "Video 1" },
    { id: 2, title: "Video 2" },
    { id: 3, title: "Video 3" },
    { id: 4, title: "Video 4" },
    { id: 5, title: "Video 5" },
    { id: 6, title: "Video 6" },
  ];

  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = videos.length;

  const nextSlide = () => {
    // only move 1 card forward
    if (current < total - visibleCards) setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    // only move 1 card backward
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  return (
    <div className="relative w-full mx-auto flex items-center justify-center gap-4 lg:px-4 px-0">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        disabled={current === 0}
        className={`lg:p-3 p-1 rounded-full transition shadow-md ${
          current === 0
            ? "text-gray-300 cursor-not-allowed"
            : " hover:scale-105 cursor-pointer "
        }`}
      >
        <ChevronLeft size={40} className="text-white hover:text-[#39FF14]" />
      </button>

      {/* Slider */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(current * 100) / total}%)`,
            width: `${(total * 100) / visibleCards}%`,
          }}
        >
          {videos.map((v) => (
            <div
              key={v.id}
              className="flex-shrink-0 lg:px-2 p-2"
              style={{ width: `${100 / total}%` }}
            >
              <div className="relative w-full h-[205px] bg-white rounded-[13.19px] flex items-center justify-center shadow-[0px_17.57px_46.86px_-17.57px_#0000001A]">
                <div className="w-[70px] h-[70px] flex items-center justify-center rounded-full bg-[#43E1A9] shadow-[0px_5.86px_5.86px_#0000001A,0px_8.79px_17.57px_#FFFFFF0A_inset,0px_1.46px_1.46px_#FFFFFF33_inset] cursor-pointer hover:scale-105 transition-transform">
                  <Play size={28} color="white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        disabled={current >= total - visibleCards}
        className={`lg:p-3 p-1 rounded-full transition shadow-md ${
          current >= total - visibleCards
            ? "text-gray-300 cursor-not-allowed"
            : " hover:scale-105 cursor-pointer "
        }`}
      >
        <ChevronRight size={40} className="text-white hover:text-[#39FF14]" />
      </button>
    </div>
  );
}
