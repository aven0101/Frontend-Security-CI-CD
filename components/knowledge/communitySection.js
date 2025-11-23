"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CommunitySection() {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState("Expand");

  const options = ["Collapse", "Expand"];
  const leftItems = [
    { id: 1, title: "Release notes" },
    { id: 2, title: "New feature spotlights" },
    { id: 3, title: "What's coming soon for teams" },
  ];
  const rightItems = [
    { id: 1, title: "Submit feedback" },
    { id: 2, title: "User spotlight" },
  ];
  const itemClass =
    "border-[#FFFFFF66] py-4 lg:py-0 min-h-[70px] px-[20px] flex items-center justify-start";

  return (
    <>
      {/* header section */}
      <div className="w-full flex flex-col mt-[50px]">
        <div className="w-full flex flex-row items-center gap-4 lg:gap-0 justify-between">
          <span className="font-aptos  text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
            Product Updates & Community
          </span>
          <div className="relative w-[117px] lg:max-w-[117px] rounded-[16px]">
            {/* Selected Box */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full cursor-pointer opacity-[95%] h-[48px] border rounded-[16px] px-4 py-5  text-[14px] font-[400]
             capitalize text-[#FDFDFD] border-[#43E1A9] 
             bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] flex justify-between items-center"
            >
              {selected}
              <ChevronDown
                className={`transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                color="#FFFFFF"
              />
            </button>

            {/* Dropdown Options */}
            {isOpen && (
              <div className="absolute w-full border border-[#43E1A9] bg-[#002715] backdrop-blur-[30px] z-10">
                {options.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setSelected(opt);
                      setIsOpen(false);
                    }}
                    className="px-5 py-3 text-[18px] text-white font-medium hover:bg-[#43E1A9] hover:text-[#002715] cursor-pointer transition-all"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Divider */}
        <div className="w-full h-[2px] bg-[#FFFFFF] opacity-100 mx-auto lg:mt-[35px] mt-[15px]" />
      </div>
      {/* main div */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          selected === "Collapse"
            ? "max-h-0 opacity-0"
            : "max-h-[5000px] opacity-100"
        }`}
      >
        <div className="w-full  min-h-[280px] flex flex-col ">
          <div className="w-full flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 lg:pr-5 pr-0 py-10  border border-r-0 lg:border-r-1 border-[#FFFFFF] border-t-0 border-l-0 border-b-0">
              <div className="w-full flex  flex-col border border-[#FFFFFF66] rounded-[16px]  ">
                {leftItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${itemClass} ${
                      index !== leftItems.length - 1
                        ? "border border-t-0 border-l-0 border-r-0"
                        : ""
                    }`}
                  >
                    <span className="font-aptos text-[16px] md:text-[18px] lg:text-[20px] font-[600] leading-[120%] text-[#FFFFFF]">
                      <span className="text-[#43E1A9]">•</span> {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:py-10 py-0 lg:px-5 px-0">
              <div className="w-full flex flex-col border border-[#FFFFFF66] rounded-[16px] ">
                {rightItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${itemClass} ${
                      index !== rightItems.length - 1
                        ? "border border-t-0 border-l-0 border-r-0"
                        : ""
                    }`}
                  >
                    <span className="font-aptos text-[16px] md:text-[18px] lg:text-[20px] font-[600] leading-[120%] text-[#FFFFFF]">
                      <span className="text-[#43E1A9]">•</span> {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
