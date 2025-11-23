"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import TechnicalCardSlider from "../technical/technicalCardSlider";

export default function BestPracticeSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selected, setSelected] = useState("Expand");
  const [isFilter, setIsFilter] = useState("All Roles");

  const options = ["Collapse", "Expand"];
  const options2 = ["All Roles", "Option 1", "Option 2"];

  const cardData = [
    {
      id: 1,
      icon: "/images/technical/tab4-1.png",
      title: "Enable Two-Factor Authentication",
      content: "Adds an extra layer of protection to your login process.",
      btnText: "How to Enable →",
    },

    {
      id: 2,
      icon: "/images/technical/tab4-2.png",
      title: "Use Expiring Share Links",
      content:
        "Prevent lingering access by setting expiration dates on shared files.",
      btnText: "Set Default Expiry  →",
    },

    {
      id: 3,
      icon: "/images/technical/tab4-3.png",
      title: "Create Role-Based Folder Access",
      content: "Ensure only the right people have access to the right files.",
      btnText: "Set Roles →",
    },

    {
      id: 4,
      icon: "/images/technical/tab4-4.png",
      title: "Label Confidential Files",
      content: "Tag sensitive files so users know how to handle them.",
      btnText: "See Labeling Guide →",
    },
  ];
  return (
    <>
      {/* header section */}
      <div className="w-full flex flex-col mt-[50px]">
        <div className="w-full flex flex-row items-center gap-4 lg:gap-0 justify-between">
          <span className="font-aptos  text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
            Best Practices
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
      </div>

      {/* main div */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          selected === "Collapse"
            ? "max-h-0 opacity-0"
            : "max-h-[5000px] opacity-100"
        }`}
      >
        <div className="w-full min-h-0 lg:min-h-[340px] flex flex-col justify-between gap-[20px] mt-[10px] lg:mt-[40px]">
          <div className="w-full flex flex-col gap-6">
            <div className="relative w-[197px] lg:max-w-[197px] rounded-[24.07px]">
              {/* Selected Box */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full cursor-pointer opacity-[95%] h-[30px] border rounded-[24.07px] px-4 py-5  text-[14px] font-[400]
             capitalize text-[#FDFDFD] border-[#43E1A9] 
             bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] flex justify-between items-center"
              >
                {isFilter}
                <ChevronDown
                  className={`transition-transform ${
                    isFilterOpen ? "rotate-180" : "rotate-0"
                  }`}
                  color="#FFFFFF"
                />
              </button>

              {/* Dropdown Options */}
              {isFilterOpen && (
                <div className="absolute w-full border border-[#43E1A9] bg-[#002715] backdrop-blur-[30px] z-10">
                  {options2.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setIsFilter(opt);
                        setIsFilterOpen(false);
                      }}
                      className="px-5 py-3 text-[18px] text-white font-medium hover:bg-[#43E1A9] hover:text-[#002715] cursor-pointer transition-all"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <TechnicalCardSlider cardData={cardData} />
          </div>
        </div>
      </div>
    </>
  );
}
