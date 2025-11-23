"use client";
import Image from "next/image";

export default function TryPricing() {
  return (
    <>
      <div className="max-w-[1298px] mx-auto  xl:mt-15 lg:mt-14 md:mt-10 mt-10  rounded-[16px] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 px-6 py-6 md:px-10 md:py-8 bg-[#43E1A9] shadow-[0px_4px_8px_3px_#00000026] text-white">
        {/* Left Section: Image + Text */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 text-center md:text-left">
          <Image
            src="/images/Pricing/Pricing-1.png"
            alt="Discount Icon"
            width={45}
            height={45}
            className="object-contain w-[40px] sm:w-[45px]"
          />
          <span className="font-aptos font-extrabold text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-[130%] capitalize">
            Get 20% off in your next purchase! use code: Save123 at checkout.
          </span>
        </div>

        {/* Right Section: Button */}
        <button className="w-full lg:max-w-[176px] h-[56px] cursor-pointer rounded-[16px] bg-white text-[#43E1A9] font-aptos font-extrabold text-[20px] md:text-[24px] shadow-[0px_1px_3px_#0000004D,0px_4px_8px_3px_#00000026] transition-all duration-300 hover:scale-105 hover:shadow-[0px_4px_12px_4px_#00000033]">
          Try Now
        </button>
      </div>
    </>
  );
}
