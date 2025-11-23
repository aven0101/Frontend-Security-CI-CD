"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TroubleshootStep() {
  const [step, setStep] = useState(0); // 0 = start, 1 = step1, 2 = step2, 3 = step3
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Desktop");
  const options = ["Mobile", "OS", "Option 2"];
  const [selectedStep2, setSelectedStep2] = useState(
    "Which feature is giving you trouble?"
  );
  const options2 = ["Option1", "Option2", "Option 3"];
  const nextStep = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };
  const messages = [
    {
      id: 1,
      sender: "AI",
      text: "Do you see an error message?",
      align: "left",
    },
    {
      id: 2,
      sender: "User",
      text: "Yes",
      align: "right",
    },
    {
      id: 3,
      sender: "AI",
      text: "What does the error say?",
      align: "left",
    },
    {
      id: 4,
      sender: "User",
      text: "Network error",
      align: "right",
    },
    {
      id: 5,
      sender: "AI",
      text: "If “File too large”",
      align: "left",
    },
    {
      id: 6,
      sender: "User",
      text: "Compress the file (link to guide)",
      align: "right",
    },
    {
      id: 7,
      sender: "AI",
      text: "Did that fix the issue?",
      align: "left",
    },
    {
      id: 8,
      sender: "User",
      text: "This didn't help",
      align: "right",
    },
  ];
  return (
    <div className="w-full flex flex-col items-center gap-6 relative">
      {/* Step 0 – Need More Help */}
      {step === 0 && (
        <div
          className="w-full rounded-[18.24px] border border-[#1C825E] h-auto px-4 lg:min-h-[105px]
          bg-gradient-to-br from-[#1C825E]/10 to-[#43E1A9]/10 flex flex-col lg:flex-row justify-between items-center gap-4 lg:py-0 py-4 animate-fadeIn"
        >
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <span className="font-aptos text-[20px] md:text-[24px] lg:text-[28px] font-[800] leading-[120%] text-[#FFFFFF]">
              Need More Help?
            </span>
            <span className="font-aptos text-[14px] md:text-[16px] lg:text-[18px] font-[600] leading-[120%] text-[#43E1A9]">
              Checkout step-by-step guidance
            </span>
          </div>
          <button
            onClick={() => setStep(1)}
            className="cursor-pointer relative w-full lg:max-w-[240px] h-[56px] 
              rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] 
              flex items-center justify-center border-[1.17px] 
              [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] 
              border-[#43E1A9] backdrop-blur-[58.63px] 
              shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] 
              transition-all duration-300 hover:scale-[1.02] hover:opacity-100"
          >
            Click Here
          </button>
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div
         className="w-full rounded-[18.24px] bg-gradient-to-br from-[#1C825E]/10 to-[#43E1A9]/10  border border-[#1C825E]  h-auto px-4 lg:min-h-[105px]
           flex flex-col lg:flex-row justify-between items-center gap-4 lg:py-0 py-4 animate-fadeIn"
        >
          <span className="font-aptos text-[20px] md:text-[24px] lg:text-[28px] font-[800] leading-[120%] text-[#FFFFFF]">
            Are you using:
          </span>
          <div className="relative w-full lg:max-w-[157px] rounded-[16px]">
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
                  open ? "rotate-180" : "rotate-0"
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
          <button
            onClick={nextStep}
            className="cursor-pointer relative w-full lg:max-w-[117px] h-[48px] 
              rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] 
              flex items-center justify-center border-[1.17px] 
              [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] 
              border-[#43E1A9] backdrop-blur-[58.63px] 
              shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] 
              transition-all duration-300 hover:scale-[1.02] hover:opacity-100"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div
          className="w-full rounded-[18.24px]  border border-[#1C825E]  bg-gradient-to-br from-[#1C825E]/10 to-[#43E1A9]/10 h-auto px-4 lg:min-h-[105px]
           flex flex-col justify-center items-center gap-4 lg:py-4 py-4 animate-fadeIn"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
            <div className="relative w-full lg:max-w-[417px] rounded-[16px]">
              {/* Selected Box */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full cursor-pointer opacity-[95%] h-[48px] border rounded-[16px] px-4 py-5  text-[14px] font-[400]
             capitalize text-[#FDFDFD] border-[#43E1A9] 
             bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] flex justify-between items-center"
              >
                {selectedStep2}
                <ChevronDown
                  className={`transition-transform ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                  color="#FFFFFF"
                />
              </button>

              {/* Dropdown Options */}
              {isOpen && (
                <div className="absolute w-full border border-[#43E1A9] bg-[#002715] backdrop-blur-[30px] z-10">
                  {options2.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setSelectedStep2(opt);
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
            <button
              onClick={nextStep}
              className="cursor-pointer relative w-full lg:max-w-[117px] h-[48px] 
              rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] 
              flex items-center justify-center border-[1.17px] 
              [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] 
              border-[#43E1A9] backdrop-blur-[58.63px] 
              shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] 
              transition-all duration-300 hover:scale-[1.02] hover:opacity-100"
            >
              Next
            </button>
          </div>
          <div>
            <span className="font-aptos text-[16px] md:text-[18px] lg:text-[20px] font-[800] leading-[120%] text-[#FFFFFF]">
              If the feature is not listed, submit a{" "}
              <Link href={"#"} className="text-[#43E1A9]">
                support ticket
              </Link>{" "}
              or{" "}
              <Link href={"#"} className="text-[#43E1A9]">
                contact us
              </Link>
              .
            </span>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div
          className="w-full border border-[#1C825E] h-auto lg:min-h-[747px] rounded-[18.24px]
       flex flex-col animate-fadeIn  bg-gradient-to-br from-[#1C825E]/10 to-[#43E1A9]/10 "
        >
          {/* Header */}
          <span className="font-aptos capitalize px-4 py-4 text-[20px] md:text-[24px] lg:text-[28px] font-[800] leading-[120%] text-[#43E1A9]">
            Issue: Unable to Upload File
          </span>

          {/* Divider */}
          <hr className="border-t border-[#43E1A9] opacity-100" />

          {/* Chat Section */}
          <div className="flex flex-col gap-6 px-6 py-8">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.align === "right" ? "self-end" : "self-start"
                }`}
              >
                <div
                  className={`max-w-[375px] px-4 py-3 rounded-[16px] font-aptos leading-[120%] border border-white/60
              ${
                msg.align === "right"
                  ? "text-white font-[600] text-[18px] backdrop-blur-[50px] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.33)_3.99%,rgba(67,225,169,0.33)_56.27%,rgba(255,255,255,0)_96.99%)]"
                  : "capitalize text-white font-[800] text-[18px]"
              }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal Dot Connector */}
      {step > 0 && (
        <div className="flex flex-row items-center justify-center gap-0 my-8 relative">
          {[1, 2, 3].map((dot, index) => (
            <div key={dot} className="flex items-center">
              {/* Dot */}
              <div
                className={`w-6 h-6 rounded-full border-2 transition-all duration-500 ${
                  step >= dot
                    ? "bg-[#43E1A9] border-[#43E1A9]"
                    : "border-[#43E1A9]"
                }`}
              ></div>

              {/* Connector Line (not after the last dot) */}
              {index < 2 && (
                <div
                  className={`h-[2px] w-[80px] md:w-[234px] border-t-2 border-dashed transition-all duration-500 ${
                    step > dot ? "border-[#43E1A9]" : "border-[#43E1A9]/40"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
