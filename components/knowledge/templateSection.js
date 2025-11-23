"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import TemplateCardSlider from "./TemplateSlider";

export default function TemplateSection() {
  const [activeTab, setActiveTab] = useState("Enterprise");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Expand");
  const options = ["Collapse", "Expand"];
  const cardData = [
    {
      id: 1,
      type: "Enterprise",
      title: "File Retention Policy",
      btnText: "Download PDF →",
    },
    {
      id: 2,
      type: "Enterprise",
      title: "Security Audit Checklist",
      btnText: "Download PDF  →",
    },
    {
      id: 3,
      type: "Enterprise",
      title: "Team Training Slides",
      btnText: "Open in Slides  →",
    },
    {
      id: 4,
      type: "Individual",
      title: "Security Audit Checklist",
      btnText: "Download PDF  →",
    },
    {
      id: 5,
      type: "Individual",
      title: "File Retention Policy",
      btnText: "Download PDF →",
    },

    {
      id: 6,
      type: "Individual",
      title: "Team Training Slides",
      btnText: "Open in Slides  →",
    },
  ];
  const filteredCards = cardData.filter((card) => card.type === activeTab);
  return (
    <>
      {/* header section */}
      <div className="w-full flex flex-col mt-[50px]">
        <div className="w-full flex flex-row items-center gap-4 lg:gap-0 justify-between">
          <span className="font-aptos  text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
            Templates & Downloads
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
        <div className="w-full min-h-[180px] lg:min-h-[200px] flex flex-col justify-between mt-[40px]">
          <div className="w-full flex justify-center lg:justify-start">
            <div className="lg:max-w-[392px] w-full h-[48px] flex gap-4 p-[4px] rounded-[14px] border border-[#1C825E]">
              {["Enterprise", "Individual"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`lg:w-[184px] w-full rounded-[14px] leading-[100%] font-belanosima text-[14px] font-[400] capitalize  ${
                    activeTab === tab
                      ? "border border-[#43E1A9] text-[#FDFDFD] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[58.63px]  shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A]"
                      : "text-[#FDFDFD]/70 hover:text-[#FDFDFD]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <TemplateCardSlider cardData={filteredCards} />
        </div>
      </div>
    </>
  );
}
