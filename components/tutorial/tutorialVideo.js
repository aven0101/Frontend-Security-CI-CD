"use client";

import { ChevronDown, PlayIcon, Search } from "lucide-react";
import { useState } from "react";
import VideoSlider from "./videoSlider";
import TutorialForm from "./TutorialForm";

export default function TutorialVideo() {
  const [selected, setSelected] = useState("Getting Started");
  const [open, setOpen] = useState(false);
  const options = ["Option 1", "Option 2"];
  return (
    <>
      <section className="w-full lg:max-w-[1308px] flex flex-col gap-[40px] xl:mt-15 lg:mt-14 md:mt-10 mt-10 ">
        {/* filters setion */}
        <div className="w-full lg:max-w-[1308px] flex lg:flex-row flex-col gap-3 justify-between">
          <div className="relative w-full lg:max-w-[157px] rounded-[24px]">
            {/* Selected Box */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="w-full cursor-pointer opacity-[95%] h-[30px] border rounded-[24px] px-4 py-5  text-[14px] font-[400]
             capitalize text-[#FDFDFD] border-[#43E1A9] 
             bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] flex justify-between items-center"
            >
              {selected}
              <ChevronDown
                className={`transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
                color="#FFFFFF"
              />
            </button>

            {/* Dropdown Options */}
            {open && (
              <div className="absolute w-full border border-[#43E1A9] bg-[#002715] backdrop-blur-[30px] z-10">
                {options.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setSelected(opt);
                      setOpen(false);
                    }}
                    className="px-5 py-3 text-[18px] text-white font-medium hover:bg-[#43E1A9] hover:text-[#002715] cursor-pointer transition-all"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-full md:w-[417px]">
            <input
              type="text"
              placeholder="Search topic"
              className="w-full focus:outline-none focus:ring-0 opacity-50 rounded-[16px] h-[48px] border px-[17px] pr-[45px] font-belanosima text-[18px] font-[400] capitalize placeholder-[#FDFDFD66] text-[#FDFDFD66] border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
            />
            <Search
              size={20}
              className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#FDFDFD66]"
            />
          </div>
        </div>
        {/*  videos slider */}

        <VideoSlider />
        <TutorialForm />
      </section>
    </>
  );
}
