"use client";

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export default function TechnicalFAQS() {
  const [open, setOpen] = useState([]);
  const [selected, setSelected] = useState("Expand");
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Collapse", "Expand"];
  const toggleDropdown = (key) => {
    if (open.includes(key)) {
      setOpen(open.filter((item) => item !== key));
    } else {
      setOpen([...open, key]);
    }
  };
  const faqs = [
    {
      key: "faq1",
      question: "How to set expiration time for a file?",
      answer:
        "No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charge.",
    },
    {
      key: "faq2",
      question: "How to sync a file with my phone? ",
      answer:
        "No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charge.",
    },
    {
      key: "faq3",
      question: "How many devices can I sync?",
      answer:
        "No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charge.",
    },
  ];
  return (
    <>
      <div
        className={`w-full flex flex-col justify-between gap-[35px] 
        
        ${
          selected === "Collapse"
            ? "max-h-0 opacity-0 -translate-y-10 pointer-events-none"
            : "lg:min-h-[450px] opacity-100 translate-y-0"
        }
        `}
      >
        {/* heading section - faqs */}
        {/* <div className="w-full flex flex-col gap-[35px] border border-red-500"> */}
        <div
          className={`w-full flex flex-col justify-between gap-[35px] transform transition-all duration-700 ease-in-out origin-top ${
            selected === "Collapse"
              ? "max-h-0 opacity-0 -translate-y-10 pointer-events-none"
              : "max-h-[1200px] opacity-100 translate-y-0"
          }`}
        >
          <div className="w-full flex flex-col md:flex-row lg:flex-row lg:items-center md:items-center md:justify-between gap-4 lg:gap-0 lg:justify-between justify-start">
            <span className="font-aptos text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
              FAQS
            </span>

            <div className="relative w-full md:w-[417px]">
              <input
                type="text"
                placeholder="filtered by topic or keyword"
                className="w-full focus:outline-none focus:ring-0 opacity-50 rounded-[16px] h-[48px] border px-[17px] pr-[45px] font-belanosima text-[18px] font-[400] capitalize placeholder-[#FDFDFD66] text-[#FDFDFD66] border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
              />
              <Search
                size={20}
                className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#FDFDFD66]"
              />
            </div>
          </div>
          {/* faqs questions */}
          <div className=" w-full flex flex-col">
            {faqs.map((faq) => (
              <div key={faq.key}>
                {/* Main container with border */}
                <div className="relative w-full border border-[#43E1A9]  transition-all duration-500 overflow-hidden">
                  <div
                    onClick={() => toggleDropdown(faq.key)}
                    className="cursor-pointer flex justify-between items-center w-full focus:outline-none h-[71px] lg:px-6 px-3  text-[#848884] transition-all duration-300"
                  >
                    <span className="flex flex-row items-center gap-[8px] lg:gap-[16px] text-[#FFFFFF] text-[16.7px] font-aptos">
                      <div className="lg:w-[20px] lg:h-[20px] w-[18px] h-[18px] bg-[#43E1A9] rounded-full"></div>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`transition-transform text-[#43E1A9] ${
                        open.includes(faq.key) ? "rotate-180" : "rotate-0"
                      }`}
                      size={24}
                    />
                  </div>
                </div>

                {/* Expandable Content OUTSIDE border div */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    open.includes(faq.key)
                      ? "max-h-[300px] mt-3 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="text-[#FFFFFF] font-aptos font-[400] text-[15.03px] leading-[20.04px] px-3 lg:px-6 pb-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="w-full  flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between"> */}
      </div>
      <div
        className={`w-full flex flex-row gap-4 lg:gap-0  transition-all duration-700 ease-in-out ${
          selected === "Collapse" ? " justify-end" : "justify-between mt-5"
        }`}
      >
        {selected === "Expand" && (
          <button
            className=" cursor-pointer 
    relative w-[120px] lg:w-[240px] lg:h-[56px] h-[46px] 
    rounded-[30px] opacity-95 
    font-aptos font-[700] text-[15px] lg:text-[18px] leading-[100%] text-[#FDFDFD] 
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
        )}
        <div className="relative w-[117px] lg:max-w-[117px] rounded-[16px]">
          {/* Selected Box */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full cursor-pointer opacity-[95%] h-[48px]  border rounded-[16px] px-4 py-5  text-[14px] font-[400]
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
      </div>
    </>
  );
}
