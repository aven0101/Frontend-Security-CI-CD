"use client";

import Image from "next/image";

export default function FeatureChooseSection() {
  const platforms = [
    { src: "/images/features/window1.png", alt: "Windows" },
    { src: "/images/features/apple1.png", alt: "Apple" },
    { src: "/images/features/andriod1.png", alt: "Android" },
    { src: "/images/features/ios1.png", alt: "iOS" },
    { src: "/images/features/linux1.png", alt: "Linux" },
  ];
  return (
    <>
      <section className="w-full lg:max-w-[1300px] mx-auto justify-center items-center flex flex-col gap-[40px] xl:mt-15 lg:mt-14 md:mt-10 mt-10">
        <span className="font-aptos text-[20px] text-center md:text-[30px] text-[#FFFFFF] lg:text-[40px] font-[800] leading-[100%]">
          Sync only what you choose, where you choose.
        </span>

        <div
          className="
    w-full 
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-5 
    xl:grid-cols-5 
    gap-6 
    place-items-center
  "
        >
          {platforms.map((item, index) => (
            <div
              key={index}
              className="
        relative 
        flex 
        flex-col 
        items-center 
        justify-center 
        h-[176.85px] 
        w-full bg-[url(/images/home-page/get-started-bg.png)] bg-cover bg-no-repeat z-10
        rounded-[19.4px] 
        p-4 
        bg-gradient-to-tr from-[#43E1A9]/10 to-transparent 
        border border-[#43E1A9] 
        shadow-md 
        hover:shadow-lg 
        transition
      "
            >
              <div className="relative w-[80px] h-[80px] mb-2">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain rounded-[19.4px]"
                />
              </div>
              <span
                className="
          text-[#E6EDF5] 
          text-[24px] 
          font-[400] 
          capitalize 
          text-center 
          font-aptos
        "
              >
                {item.alt}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
