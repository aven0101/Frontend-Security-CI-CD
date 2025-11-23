"use client";

import Image from "next/image";

export default function FeatureHeroSection() {
  return (
    <>
      <section className="w-full h-auto relative lg:mt-[201px] mt-[100px]">
        <Image
          src="/images/features/feature1.gif"
          alt="Feature Image"
          width={600}
          height={350}
          unoptimized
          className="object-contain absolute right-0 top-0 hidden lg:block  opacity-40 sm:opacity-40 md:opacity-40 lg:opacity-40 xl:opacity-100"
        />
        {/* Hero container */}
        <div className="max-w-[1200px] flex flex-col lg:flex-row lg:items-center lg:justify-between px-0 lg:px-0 gap-10">
          {/* Left Section */}
          <div className="w-full lg:max-w-[800px] flex flex-col">
            <h1
              className="font-[800] text-[38px] lg:text-[72px] leading-none capitalize text-white"
              style={{ fontFamily: "Aptos" }}
            >
              Built for Privacy.
              <br />
              Total Control. Complete
              <br />
              Peace of Mind.
            </h1>

            <p
              className="text-[16px] md:text-[20px] lg:text-[30px] mt-[20px] font-[700] leading-normal text-white"
              style={{ fontFamily: "Aptos" }}
            >
              Choose where your files go, who sees them, and how they are stored
              — all in a secure, private environment.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap lg:gap-[80px] gap-4 mt-4">
              {/* Start for Free */}
              {/* <button
                className="text-[18px] w-full lg:max-w-[241px] h-[56px] flex justify-center items-center font-bold text-[#FDFDFD] px-4 py-4 rounded-[30px] border border-[#43E1A9]
                  bg-[url('/images/button-bg.png')] bg-cover bg-no-repeat cursor-pointer  hover:scale-105 transition-all duration-30"
                style={{
                  opacity: 0.95,
                  background:
                    "linear-gradient(247.52deg, rgba(255,255,255,0.165) 3.99%, rgba(67,225,169,0.165) 56.27%, rgba(255,255,255,0) 96.99%)",
                  backdropFilter: "blur(50px)",
                  boxShadow:
                    "2px 2px 100px 0px #4242421A inset, -2px -2px 100px 0px #FFFFFF1A inset",
                  fontFamily: "Aptos",
                }}
              >
                Start for Free
              </button> */}
              <button className=" cursor-pointer capitalize  w-full lg:max-w-[241px] h-[56px]  rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] flex items-center justify-center border-[1.17px] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] border-[#43E1A9] backdrop-blur-[58.63px] shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] transition-all duration-300 hover:scale-[1.02] hover:opacity-100 ">
                Start for Free
              </button>{" "}
              {/* Upgrade to Premium */}
              <button className=" cursor-pointer capitalize  w-full lg:max-w-[241px] h-[56px]  rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] flex items-center justify-center border-[1.17px] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] border-[#43E1A9] backdrop-blur-[58.63px] shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] transition-all duration-300 hover:scale-[1.02] hover:opacity-100 ">
                Upgrade to Premium
              </button>{" "}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
