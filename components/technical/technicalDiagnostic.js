"use client";

import { Search } from "lucide-react";
import TechnicalCardSlider from "./technicalCardSlider";
import TroubleshootStep from "./troubleshootSteps";

export default function TechnicalAssistant() {
  const cardData = [
    {
      id: 1,
      icon: "/images/technical/tech-icon1.png",
      title: "Can't Upload Files?",
      content: "Try clearing your cache and reloading.",
      btnText: "Show More →",
    },

    {
      id: 2,
      icon: "/images/technical/tech-icon2.png",
      title: "Syncing Not Working?",
      content: "Check your internet and device time.",
      btnText: "Show More →",
    },

    {
      id: 3,
      icon: "/images/technical/tech-icon3.png",
      title: "Trouble Logging In? ",
      content: "Reset password or check account status. ",
      btnText: "Show More →",
    },

    {
      id: 4,
      icon: "/images/technical/tech-icon3.png",
      title: "Can't Upload Files?",
      content: "Try clearing your cache and reloading.",
      btnText: "Show More →",
    },

    {
      id: 5,
      icon: "/images/technical/tech-icon3.png",
      title: "Can't Upload Files?",
      content: "Try clearing your cache and reloading.",
      btnText: "Show More →",
    },

    {
      id: 6,
      icon: "/images/technical/tech-icon3.png",
      title: "Can't Upload Files?",
      content: "Try clearing your cache and reloading.",
      btnText: "Show More →",
    },
  ];

  return (
    <>
      <div className="w-full min-h-[466px] mt-[40px] flex flex-col  gap-[35px]">
        {/* heading section */}

        <div className="w-full flex flex-col gap-4 lg:gap-0 md:flex-row lg:flex-row lg:items-center md:items-center md:justify-between lg:justify-between justify-start">
          <span className="font-aptos  text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
            Diagnostic Assistant
          </span>

          <div className="relative w-full md:w-[417px]">
            <input
              type="text"
              placeholder="Search Diagnostic Assistant "
              className="w-full focus:outline-none focus:ring-0 opacity-50 rounded-[16px] h-[48px] border px-[17px] pr-[45px] font-belanosima text-[18px] font-[400] capitalize placeholder-[#FDFDFD66] text-[#FDFDFD66] border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
            />
            <Search
              size={20}
              className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#FDFDFD66]"
            />
          </div>
        </div>
        {/* <div className="w-full "> */}
          <TechnicalCardSlider cardData={cardData} />
        {/* </div> */}
        {/* help section */}
        <TroubleshootStep />
      </div>
    </>
  );
}
