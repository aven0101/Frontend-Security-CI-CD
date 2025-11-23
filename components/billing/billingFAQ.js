"use client";

import FAQSection from "./FQASection";

export default function BillingFAQ() {
  return (
    <div className="w-full lg:max-w-[1111px] mx-auto xl:mt-15 lg:mt-14 md:mt-10 mt-10 flex flex-col gap-[40px]">
      <div className="w-full lg:max-w-[858px] mx-auto flex flex-col gap-[40px]">
        <span className="font-aptos  text-center text-[50px] md:text-[64px] lg:text-[64px] font-[700] leading-[64px] text-[#FFFFFF]">
          FAQS
        </span>

        <div className="w-full lg:max-w-[715px] flex flex-col lg:flex-row lg:gap-2 gap-3 mx-auto">
          <input
            type="text"
            placeholder="filtered by topic or keyword"
            className="w-full lg:max-w-[555px] focus:outline-none focus:ring-0 opacity-50 rounded-[16px] h-[56px] border px-[17px] pr-[45px] font-belanosima text-[18px] font-[400] capitalize placeholder-[#FDFDFD66] text-[#FDFDFD66] border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
          />

          <button
            className=" cursor-pointer 
    relative w-full lg:max-w-[146px] h-[56px] 
    rounded-[16px] opacity-95 
    font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] 
    flex items-center justify-center 
    border-[1.17px] 
    [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] 
    border-[#43E1A9]
    backdrop-blur-[58.63px] 
    shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] 
    transition-all duration-300 hover:scale-[1.02] hover:opacity-100
  "
          >
            Search
          </button>
        </div>
      </div>

      <FAQSection />

      <button
        className="mx-auto cursor-pointer 
    relative w-full lg:max-w-[241px] h-[56px] 
    rounded-[30px] opacity-95 
    font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] 
    flex items-center justify-center 
    border-[1.17px] 
    [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] 
    border-[#43E1A9]
    backdrop-blur-[58.63px] 
    shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] 
    transition-all duration-300 hover:scale-[1.02] hover:opacity-100
  "
      >
        Show More
      </button>
    </div>
  );
}
