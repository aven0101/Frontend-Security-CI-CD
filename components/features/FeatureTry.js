"use client";

export default function FeatureTrySection() {
  return (
    <>
      <section className="w-full  lg:max-w-[785px] xl:mt-15 lg:mt-14 md:mt-10 mt-10 mx-auto justify-center items-center flex flex-col gap-[0px] lg:gap-[12px]">
        <span className="font-aptos text-[30px] md:text-[44px] lg:text-[64px] font-extrabold leading-[70px] text-[#FFFFFF]">
          Like <span className="text-[#43E1A9]">what you see</span>?
        </span>
        <span className="font-aptos text-[16px] md:text-[20px] text-center text-[#FFFFFF] lg:text-[30px] font-[400] leading-[100%]">
          Give it a try - it takes just a few seconds to get started
        </span>

        <button
          className=" cursor-pointer mt-[20px]
    relative w-[242px] lg:h-[66px] h-[46px] 
    rounded-[35.18px] opacity-95 
    font-aptos font-[700] text-[20px] leading-[100%] capitalize text-[#FDFDFD] 
    flex items-center justify-center 
    border-[1.17px] 
    [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] 
    border-[#43E1A9]
    backdrop-blur-[58.63px] 
    shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] 
    transition-all duration-300 hover:scale-[1.02] hover:opacity-100
  "
        >
          Try It Free
        </button>
      </section>
    </>
  );
}
