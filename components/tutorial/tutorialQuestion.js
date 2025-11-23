"use client";

import Link from "next/link";

export default function TutorialQuestion() {
  return (
    <div className="xl:mb-20 lg:mb-20 
      md:mb-20 mb-13 xl:mt-15 lg:mt-14 md:mt-10 mt-10  relative w-full lg:max-w-[960px] mx-auto 
    h-[480px] flex flex-col items-center justify-center text-white overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none "
        style={{
          backgroundImage: "url('/images/features/circle-bg.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "960px",
          height: "480px",
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-[30px] text-center px-4">
        <span className="font-belanosima text-[36px] sm:text-[42px] lg:text-[64px] font-[600] leading-[120%]">
          Having Question?
        </span>

        <Link
          href={"/contact"}
          className="cursor-pointer
          relative w-full max-w-[242px] h-[66px]
          rounded-[35.18px] opacity-95
          font-aptos font-[700] text-[20px] leading-[100%] capitalize text-[#FDFDFD]
          flex items-center justify-center
          border-[1.17px]
          border-[#43E1A9]
          [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)]
          backdrop-blur-[58.63px]
          shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A]
          transition-all duration-300 hover:scale-[1.02] hover:opacity-100"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
