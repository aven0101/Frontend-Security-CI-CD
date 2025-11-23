"use client";

import Image from "next/image";

export default function FeatureContactSection() {
  return (
    <>
      <section className="xl:mb-20 lg:mb-20 md:mb-20 mb-13 xl:mt-15 lg:mt-14 md:mt-10 mt-10  relative w-full lg:max-w-[1301px] mx-auto h-[331px] lg:px-4 px-0 flex items-center justify-center">
        {/* BACKGROUND BLOCK */}
        <div className="absolute w-full lg:max-w-[1282px] h-[289px] bg-[#45E1AA] rounded-[15.78px] top-[42px] left-1/2 -translate-x-1/2" />

        {/* OVERLAY GLASS CARD */}
        <div className=" bg-[url(/images/header-bg.png)] bg-contain relative w-full lg:max-w-[1286px] h-[317px] rounded-[15.78px] backdrop-blur-[57.76px] top-[-5px] left-1/2 -translate-x-1/2  bg-[linear-gradient(136.71deg,rgba(67,67,67,0.86)_-24.05%,rgba(0,0,0,0)_115.5%)] flex flex-col items-center justify-center text-center">
          <Image
            src="/images/features/Data_security1.png"
            alt="data"
            width={243}
            height={263}
            className="object-contain absolute top-0 left-0 w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[243px] lg:h-[263px]  opacity-40 sm:opacity-40 md:opacity-40 lg:opacity-40 xl:opacity-100"
          />
          <Image
            src="/images/features/Data_security2.png"
            alt="data"
            width={243}
            height={263}
            className="object-contain absolute right-0 bottom-0 w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[243px] lg:h-[263px]  opacity-40 sm:opacity-40 md:opacity-40 lg:opacity-40 xl:opacity-100"
          />

          {/* Heading */}

          <h2 className="font-aptos font-extrabold text-[30px] sm:text-[36px] md:text-[44px] lg:text-[64px] leading-[100%] lg:leading-[64px] text-[#FDFFFF] mb-2 lg:mb-3">
            Ready to take control?
          </h2>

          {/* Subheading */}
          <p className="font-aptos font-normal text-[18px] md:text-[20px] lg:text-[30px] leading-[100%] text-white mb-5 lg:mb-10">
            Your files. Your rules.
          </p>

          {/* Button */}
          <button
            className="w-[242px] h-[46px] lg:h-[66px] rounded-[35.18px] border-[1.17px] backdrop-blur-[58.62px] cursor-pointer
          bg-gradient-to-br  via-[#43E1A9] transition-all duration-300 hover:scale-[1.02] hover:opacity-100  border-gradient-to-br to-[#43E1A9] text-white 
          text-[20px] font-semibold shadow-[2.35px_2.35px_117.25px_0px_#4242421A_inset,-2.35px_-2.35px_117.25px_0px_#FFFFFF1A_inset]"
          >
            Try it Free
          </button>
        </div>
      </section>
    </>
  );
}
