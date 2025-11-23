"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TemplateCardSlider({ cardData }) {
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

  const total = cardData.length;

  const nextSlide = () => {
    // only move 1 card forward
    if (current < total - visibleCards) setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    // only move 1 card backward
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  return (
    <div className="relative w-full  flex items-center justify-center gap-4 px-0">
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
        <ChevronLeft size={30} className="text-white hover:text-[#39FF14]" />
      </button>
      {/* Slider Container */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(current * 100) / total}%)`,
            width: `${(total * 100) / visibleCards}%`,
          }}
        >
          {cardData.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 px-1"
              style={{ width: `${100 / total}%` }}
            >
              <div
                className="h-full w-full rounded-[15px] 
              border border-[#1C825E]   bg-gradient-to-br from-[#1C825E]/10 to-[#43E1A9]/10  
              hover:shadow-[#43E1A9]/30 transition hover:-translate-y-1 p-2 flex flex-col justify-between text-white"
              >
                {/* Top: Icon + Title */}
                <div className="flex flex-row  gap-2">
                  <h3 className="font-extrabold font-aptos leading-[120%] text-[18px] lg:text-[23px] text-white">
                    {card.title}
                  </h3>
                </div>

                {/* Button */}
                <button
                  className="mt-6 self-start 
                cursor-pointer 
    relative w-full lg:max-w-[177px] h-[30px] 
    rounded-[30px] opacity-95  
    font-aptos font-[400] text-[14px] leading-[100%] text-[#FDFDFD] 
    flex items-center justify-center 
    border-[1.17px] 
    [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] 
    border-[#43E1A9]
    backdrop-blur-[58.63px] 
    shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] 
    transition-all duration-300 hover:scale-[1.02] hover:opacity-100
  
             "
                >
                  {card.btnText}
                </button>
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
        <ChevronRight size={30} className="text-white hover:text-[#39FF14]" />
      </button>
    </div>
  );
}
