"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function EnterpriseSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Expand");
  const options = ["Collapse", "Expand"];
  const knowledgeItems = [
    { id: 1, title: "Access Control" },
    { id: 2, title: "Device Sync" },
    { id: 3, title: "Retention" },
    { id: 4, title: "Privacy" },
  ];
  const setupGuides = [
    [
      { id: 1, text: "Invite & train new users" },
      { id: 2, text: "Communication email templates for rollouts" },
    ],
    [
      { id: 3, text: "Pre-built onboarding templates (PDF)" },
      { id: 4, text: "Quick permissions matrix" },
    ],
  ];
  // Common button style to avoid duplication
  const buttonClass =
    "cursor-pointer capitalize w-[130px] lg:max-w-[197px] h-[37px] rounded-[30px] opacity-95 font-aptos font-[400] text-[18px] leading-[100%] text-[#FDFDFD] flex items-center justify-center border-[1.17px] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] border-[#43E1A9] backdrop-blur-[58.63px] shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] transition-all duration-300 hover:scale-[1.02] hover:opacity-100";

  const itemClass =
    "border-[#FFFFFF66] py-4 lg:py-0 min-h-[70px] px-[20px] flex flex-row gap-4 justify-between items-center";

  const boxClass =
    "w-full xl:min-w-[418px] lg:max-w-[418px] min-h-[44px] px-3 rounded-[16px] border border-[#43E1A9] flex items-center backdrop-blur-[50px] shadow-[inset_2px_2px_100px_0px_#4242421A,inset_-2px_-2px_100px_0px_#FFFFFF1A]";

  const textClass =
    "font-aptos text-[14px] capitalize md:text-[16px] lg:text-[18px] font-[600] leading-[120%] text-[#FFFFFF]";

  return (
    <>
      {/* header section */}
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row items-center gap-4 lg:gap-0 justify-between">
          <span className="font-aptos  text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
            Enterprise Setup:
          </span>
          <div className="relative w-[117px] lg:max-w-[117px] rounded-[16px]">
            {/* Selected Box */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full cursor-pointer opacity-[95%] h-[48px] border rounded-[16px] px-4 py-5  text-[14px] font-[400]
             capitalize text-[#FDFDFD] border-[#43E1A9] 
             bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] flex justify-between items-center"
            >
              {selected}
              <ChevronDown
                className={`transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                color="#FFFFFF"
              />
            </button>

            {/* Dropdown Options */}
            {isOpen && (
              <div className="absolute w-full border border-[#43E1A9] bg-[#002715] backdrop-blur-[30px] z-10">
                {options.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setSelected(opt);
                      setIsOpen(false);
                    }}
                    className="px-5 py-3 text-[18px] text-white font-medium hover:bg-[#43E1A9] hover:text-[#002715] cursor-pointer transition-all"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* title section */}
        <div className="w-full mt-[10px] lg:mt-[40px] flex flex-row items-center gap-[13px]">
          {/* <div className="w-[10px] h-[10px] bg-[#43E1A9] rounded-full"></div> */}
          <span className="font-aptos  text-[18px] md:text-[20px] lg:text-[32px] font-[800] leading-[120%] text-[#FFFFFF]">
            <span className="text-[#43E1A9]">•</span> Helping your IT team
            deploy and secure ByteVault.
          </span>
        </div>
        {/* Divider */}
        <div className="w-full h-[2px] bg-[#43E1A9] opacity-100 mx-auto my-6" />
      </div>
      {/* main div */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          selected === "Collapse"
            ? "max-h-0 opacity-0"
            : "min-h-[527px] opacity-100"
        }`}
      >
        <div className="w-full   flex flex-col justify-between gap-[40px]">
          {/* onboarding section */}
          <div
            className="w-full max-w-[926px] lg:mx-auto mx-0 xl:mx-0 rounded-[18.24px] border border-[#1C825E] h-auto lg:min-h-[311px]
          bg-gradient-to-br from-[#1C825E]/10 to-[#43E1A9]/10 flex flex-col gap-4 px-4 lg:px-[34px] py-4"
          >
            <div className="flex flex-col gap-1 text-left">
              <span className="font-aptos text-[20px] md:text-[24px] lg:text-[28px] font-[800] leading-[120%] text-[#FFFFFF]">
                Team Onboarding Toolkit
              </span>
              <span className="font-aptos text-[14px] md:text-[16px] lg:text-[18px] font-[600] leading-[120%] text-[#43E1A9]">
                A complete checklist and rollout guide for enterprise deployment
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {setupGuides.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex flex-col lg:flex-row gap-4 w-full"
                >
                  {row.map((item) => (
                    <div key={item.id} className={boxClass}>
                      <span className={textClass}>
                        <span className="text-[#43E1A9]">•</span> {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mx-auto flex-col lg:flex-row justify-between w-full lg:max-w-[561px]">
              <button
                className=" cursor-pointer capitalize  w-full lg:max-w-[241px] h-[56px]  
  rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] flex items-center justify-center border-[1.17px] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] border-[#43E1A9] backdrop-blur-[58.63px] shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] transition-all duration-300 hover:scale-[1.02] hover:opacity-100 "
              >
                Download Toolkit
              </button>{" "}
              <button className=" cursor-pointer capitalize  w-full lg:max-w-[241px] h-[56px]  rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] flex items-center justify-center border-[1.17px] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] border-[#43E1A9] backdrop-blur-[58.63px] shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] transition-all duration-300 hover:scale-[1.02] hover:opacity-100 ">
                See Training Flow
              </button>{" "}
            </div>
          </div>

          {/* video section */}
          <div className="w-full flex flex-col gap-[40px]">
            <span className="font-aptos  text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
              Configuring Teams, Roles and Permissions
            </span>

            <div className="w-full flex flex-col lg:flex-row gap-[20px]">
              {/* Square outer box */}
              <div
                className="w-full lg:max-w-[267.53px] h-[181.14px] border border-transparent 
p-2
    rounded-[5.72px] 
    backdrop-blur-[17.87px] 
    shadow-[inset_0.71px_0.71px_35.74px_#4242421A,inset_-0.71px_-0.71px_35.74px_#FFFFFF1A]"
              >
                {/* Inner white box */}
                <div
                  className="w-full h-full
      rounded-[7.15px] bg-white p-[32.52px_5.96px]"
                ></div>
              </div>

              {/* Text + Button section */}
              <div className="flex flex-col justify-between gap-4">
                <span className="font-aptos text-[18px] md:text-[20px] lg:text-[24px] font-[700] leading-[120%] text-[#FFFFFF]">
                  How to structure teams, assign permissions, and set defaults.
                </span>

                <button
                  className="cursor-pointer capitalize w-full lg:max-w-[208px] h-[48px]  
      rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] 
      text-[#FDFDFD] flex items-center justify-center border-[1.17px]
      [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)]
      border-[#43E1A9] backdrop-blur-[58.63px]
      shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A]
      transition-all duration-300 hover:scale-[1.02] hover:opacity-100"
                >
                  Watch Video
                </button>
              </div>
            </div>
          </div>
          {/* security section */}

          <div className="w-full flex flex-col gap-[40px]">
            <span className="font-aptos  text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
              Recommended Enterprise Security Settings
            </span>

            <div className="w-full flex flex-col border border-[#FFFFFF66] rounded-[16px]">
              {knowledgeItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`${itemClass} ${
                    index !== knowledgeItems.length - 1
                      ? "border border-t-0 border-l-0 border-r-0"
                      : ""
                  }`}
                >
                  <span className="font-aptos text-[16px] md:text-[18px] lg:text-[20px] font-[600] leading-[120%] text-[#FFFFFF]">
                    <span className="text-[#43E1A9]">•</span> {item.title}
                  </span>

                  <button className={buttonClass}>View more →</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
