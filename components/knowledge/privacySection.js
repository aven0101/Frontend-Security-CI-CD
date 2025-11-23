"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import TechnicalCardSlider from "../technical/technicalCardSlider";

export default function PrivacySection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Expand");
  const options = ["Collapse", "Expand"];
  const cardData = [
    {
      id: 1,
      icon: "/images/technical/tab3-1.png",
      title: "Privacy Policy",
      content: "Full policy outlining what data we collect and how it's used.",
      btnText: "Read Full Policy →",
    },

    {
      id: 2,
      icon: "/images/technical/tab3-2.png",
      title: "Your Data Controls",
      content:
        "Manage your privacy settings, sharing history, and file permissions.",
      btnText: "Open Privacy Dashboard  →",
    },

    {
      id: 3,
      icon: "/images/technical/tab3-3.png",
      title: "Compliance & Certifications",
      content: "View our GDPR, SOC 2, and HIPAA compliance documentation.",
      btnText: "View Certificates →",
    },

    {
      id: 4,
      icon: "/images/technical/tab3-4.png",
      title: "Data Requests",
      content:
        "Request a copy of your data, or ask for it to be deleted or corrected.",
      btnText: "Submit Request →",
    },
  ];
  return (
    <>
      {/* header section */}
      <div className="w-full flex flex-col mt-[50px]">
        <div className="w-full flex flex-row items-center gap-4 lg:gap-0 justify-between">
          <span className="font-aptos  text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
            Privacy & Data Transparency
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
        {/* title section */}
        <div className="w-full mt-[10px] lg:mt-[40px] flex flex-row items-center gap-[13px]">
          <span className="font-aptos  text-[18px] md:text-[20px] lg:text-[32px] font-[800] leading-[120%] text-[#FFFFFF]">
            <span className="text-[#43E1A9]">•</span> We believe privacy is a
            right, not a feature. Explore how we protect your data — and how you
            control it.
          </span>
        </div>
        {/* Divider */}
        <div className="w-full h-[2px] bg-[#43E1A9] opacity-100 mx-auto my-6" />
      </div>
      {/* main div */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          selected === "Collapse"
            ? "max-h-0 opacity-0"
            : "max-h-[5000px] opacity-100"
        }`}
      >
        <div className="w-full min-h-0 lg:min-h-[280px] flex flex-col justify-between gap-[20px] mt-[40px] ">
          <div className="w-full">
            <TechnicalCardSlider cardData={cardData} />
          </div>
        </div>
      </div>
    </>
  );
}
