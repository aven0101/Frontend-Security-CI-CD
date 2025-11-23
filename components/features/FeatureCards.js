"use client";

import Image from "next/image";

export default function FeatureCardSection() {
  const features = [
    {
      title: "Easy to Use",
      description:
        "Drag, drop, and done. No learning curve - simple & intuitive.",
      image: "/images/features/Easy to Use.png",
    },
    {
      title: "Full File Control",
      description:
        "Set permissions, restrict access, and manage every file on your terms.",
      image: "/images/features/Full File Control.png",
    },
    {
      title: "Sync to Selected Device",
      description: "Choose which files go where. No forced sync. No surprises.",
      image: "/images/features/Sync to Selected Device.png",
    },
    {
      title: "Security & Privacy",
      description:
        "Zero knowledge architecture, no third-party data access, end-to-end encryption keeps your files safe in transit and at rest.",
      image: "/images/features/Security & Privacy.png",
    },
    {
      title: "Cloud & Local Storage",
      description:
        "Access files anywhere with secure cloud storage - or keep them local for offline availability. You choose where your data live.",
      image: "/images/features/Cloud & Local Storage.png",
    },
    {
      title: "Confidential & Private",
      description:
        "No ads, no tracking. Your data are yours - and stays that way.",
      image: "/images/features/Confidential & Private.png",
    },
  ];
  return (
    <>
      <section className="w-full lg:max-w-[1298px] flex flex-col gap-[40px] xl:mt-15 lg:mt-14 md:mt-10 mt-10">
        {/* Heading */}
        <h1 className="font-aptos text-[#FFFFFF] text-[50px] lg:text-[80px] font-extrabold leading-[100%] text-center">
          Feature Highlights
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[17.59px] place-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex overflow-hidden bg-[url(/images/home-page/get-started-bg.png)] 
              bg-cover bg-no-repeat z-10 items-center justify-between w-full
               lg:max-w-[421px] h-auto 
               md:h-[210px] 
               lg:h-[200px]  xl:h-[171px] px-4 py-4 rounded-[19px] box-border border border-[#43E1A9] bg-transparent"
            >
              {/* Left Text */}
              <div className="flex flex-col justify-center gap-2 w-full lg:max-w-[309px]">
                <h2 className="font-aptos font-bold text-[24px] lg:text-[24px] xl:text-[28px] leading-[100%] text-white ">
                  {feature.title}
                </h2>
                <p className="text-[20px] md:text-[20px] lg:text-[18px] xl:text-[20px] w-full lg:max-w-[242px] font-[400] leading-[100%] text-[#FFFFFFCC]">
                  {feature.description}
                </p>
              </div>

              {/* Right Image */}
              <div className="flex-shrink-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={84}
                  height={61}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:max-w-[804px] flex flex-row flex-wrap justify-start items-center gap-[5px] lg:gap-[10px] text-center lg:text-left">
          <span className="font-aptos text-[30px] sm:text-[40px] md:text-[50px] lg:text-[64px] font-extrabold leading-[1] text-white">
            Like it?
          </span>

          <button
            className="cursor-pointer
    w-[120px] sm:w-[160px] lg:w-[242px] h-[46px] sm:h-[50px] lg:h-[66px]
    rounded-[35px] opacity-95 
    font-aptos font-bold text-[20px] sm:text-[20px] lg:text-[32px] leading-[100%] capitalize text-[#FDFDFD] 
    flex items-center justify-center 
    border border-[#43E1A9]
    [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)]
    backdrop-blur-[58.63px] 
    shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] 
    transition-all duration-300 hover:scale-[1.02] hover:opacity-100"
          >
            Try It
          </button>

          <span className="font-aptos text-[30px] sm:text-[40px] md:text-[50px] lg:text-[64px]  font-extrabold leading-[1] text-[#43E1A9] whitespace-nowrap">
            It&apos;s Free!
          </span>
        </div>
      </section>
    </>
  );
}
