"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function FeaturePrivacySection() {
  const feedbacks = [
    "We're committed to your security and satisfaction every step of the way.",
    "We're committed to your security and satisfaction every step of the way.",
    "We're committed to your security and satisfaction every step of the way.",
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-change feedback every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % feedbacks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="w-full 
      bg-[url(/images/footer-bg.png)] bg-cover bg-no-repeat backdrop-blur-lg  
      lg:max-w-[1300px] mx-auto xl:mt-15 lg:mt-14 md:mt-10 mt-10 border-[1.14px] border-[#43E1A9] rounded-[18.24px] p-4 lg:p-12 bg-transparent">
        <div className="relative flex flex-col lg:flex-row gap-2 lg:gap-0">
          {/* LEFT SECTION */}
         <div className="flex flex-col gap-8 lg:max-w-[666px] w-full">
             {/* Heading */}
            <h2 className="font-aptos font-extrabold text-[30px] md:text-[64px] lg:leading-[70px] leading-[100%] text-[#FDFFFF]">
              Built for Privacy from the Ground Up
            </h2>
            {/* steps */}
            <div className="relative flex flex-col gap-8 w-full lg:max-w-[550px]">
              {/* Vertical dashed line centered on circles */}
              <div className="absolute left-[12px] top-[20px] bottom-[20px] border-l-2 border-[#43E1A9] border-dashed" />

              {/* Step 1 */}
              <div className="flex flex-row items-center gap-2 lg:gap-4 flex-nowrap">
                <div className="relative z-10 w-6 h-6 min-w-6 min-h-6 bg-[#43E1A9] flex items-center justify-center rounded-full text-white font-semibold text-sm shrink-0">
                  1
                </div>
                <p className="font-aptos font-normal text-[18px] md:text-[24px] leading-[100%] text-white capitalize">
                  Zero Ads, Zero Tracking
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-row items-center gap-2 lg:gap-4 flex-nowrap">
                <div className="relative z-10 w-6 h-6 min-w-6 min-h-6 bg-[#43E1A9] flex items-center justify-center rounded-full text-white font-semibold text-sm shrink-0">
                  2
                </div>
                <p className="font-aptos font-normal text-[18px] md:text-[24px] leading-[100%] text-white capitalize">
                  No Data Mining - Ever
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-row items-center gap-2 lg:gap-4 flex-nowrap">
                <div className="relative z-10 w-6 h-6 min-w-6 min-h-6 bg-[#43E1A9] flex items-center justify-center rounded-full text-white font-semibold text-sm shrink-0">
                  3
                </div>
                <p className="font-aptos font-normal text-[18px] md:text-[24px] leading-[100%] text-white capitalize">
                  Full Transparency on Storage and Access Logs
                </p>
              </div>
            </div>

            {/* Feedback box */}
            <div className="w-full lg:max-w-[474px]">
              <div className="w-full border border-[#1C825E] rounded-[16px] py-3 box-border text-center relative">
                <div className="relative px-4 py-4 w-full lg:max-w-[405px] mx-auto">
                  <Image
                    src="/images/features/quote-left.png"
                    alt="quote left"
                    width={34}
                    height={24}
                    className="object-contain absolute top-0 left-0 w-[24px] h-[24px] lg:w-[34px] lg:h-[24px]"
                  />
                  <Image
                    src="/images/features/quote-right.png"
                    alt="quote right"
                    width={34}
                    height={24}
                    className="object-contain absolute right-0 bottom-0  w-[24px] h-[24px] lg:w-[34px] lg:h-[24px]"
                  />
                  <p className="font-aptos font-bold text-[16px] md:text-[20px] leading-[24px] text-[#FDFDFD] transition-opacity duration-500 ease-in-out opacity-100">
                    {feedbacks[activeIndex]}
                  </p>
                </div>
              </div>

              {/* 3 Dots */}
              <div className="flex items-center gap-3 justify-center mt-2">
                {feedbacks.map((_, i) => (
                  <span
                    key={i}
                    className={`w-[7px] h-[7px] rounded-full transition-colors duration-500 ${
                      i === activeIndex ? "bg-[#43E1A9]" : "bg-[#43E1A9]/40"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div
            className="hidden absolute right-10 top-10 opacity-40 sm:opacity-40 md:opacity-40 lg:opacity-40 xl:opacity-100
           lg:flex xl:flex justify-center lg:justify-end w-full lg:w-[612px]"
          >
            <Image
              src="/images/features/world.png"
              alt="world"
              width={512}
              height={298}
              className="object-contain lg:scale-130 scale-105"
            />
          </div>

          <div className="flex lg:hidden xl:hidden justify-center lg:justify-end w-full lg:w-[612px]">
            {" "}
            <Image
              src="/images/features/world.png"
              alt="world"
              width={512}
              height={298}
              className="object-contain scale-105 md:scale-130"
            />{" "}
          </div>
        </div>
      </section>
    </>
  );
}
