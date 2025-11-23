"use client";
export default function KnowledgeHeading() {
  return (
    <div className="w-full lg:max-w-[1122px] min-h-[350px] mx-auto mt-[140px] md:mt-[180px] lg:mt-[201px]  flex flex-col items-center justify-center gap-[40px]  ">
      <div className=" flex flex-col justify-center items-center gap-[20px]">
        <h1
          className="font-aptos text-center w-full lg:max-w-[1088px] font-extrabold text-[32px] 
      leading-[40px] sm:text-[48px] sm:leading-[56px] md:text-[60px] md:leading-[68px] lg:text-[72px] lg:leading-[80px] capitalize text-[#FDFDFD]"
        >
          Empower Your Team. Protect Your Data. Stay in Control
        </h1>

        <span className="w-full lg:max-w-[1122px] text-center  font-aptos font-bold text-[16px] leading-[135%] sm:text-[20px] md:text-[24px] lg:text-[30px] capitalize text-[#FFFFFF]">
          Explore best practices, admin guides, and secure collaboration tips
          designed for organizations - with quick start resources for
          individuals too
        </span>
      </div>
      <div className=" flex gap-4 flex-col lg:flex-row justify-between w-full lg:max-w-[562px]">
        <button
          className=" cursor-pointer capitalize  w-full lg:max-w-[241px] h-[56px]  
  rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] flex items-center justify-center border-[1.17px] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] border-[#43E1A9] backdrop-blur-[58.63px] shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] transition-all duration-300 hover:scale-[1.02] hover:opacity-100 "
        >
          Enterprise Onboard Guide
        </button>{" "}
        <button className=" cursor-pointer capitalize  w-full lg:max-w-[241px] h-[56px]  rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] flex items-center justify-center border-[1.17px] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] border-[#43E1A9] backdrop-blur-[58.63px] shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] transition-all duration-300 hover:scale-[1.02] hover:opacity-100 ">
          Quick Start for Individuals
        </button>{" "}
      </div>
    </div>
  );
}
