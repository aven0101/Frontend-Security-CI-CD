"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [open, setOpen] = useState([]);

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
      question: "How do I update my payment methods?",
      answer:
        "No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charge.",
    },
    {
      key: "faq2",
      question: "How can I cancel my subscription?",
      answer:
        "No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charge.",
    },
    {
      key: "faq3",
      question: "How do refunds work?",
      answer:
        "No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charge.",
    },
    {
      key: "faq4",
      question: "What is a Payment Gateway?",
      answer:
        "No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charge.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[14px]">
      {faqs.map((faq) => (
        <div key={faq.key}>
          {/* Main container with border */}
          <div className="relative w-full border border-[#43E1A9] rounded-[16px] transition-all duration-500 overflow-hidden">
            <div
              onClick={() => toggleDropdown(faq.key)}
              className="cursor-pointer flex justify-between items-center w-full focus:outline-none h-[71px] lg:px-6 px-3 font-belanosima text-[20px] text-[#848884] transition-all duration-300"
            >
              <span className="flex flex-row items-center gap-[16px] text-[#FFFFFF]">
                <div className="w-[24px] h-[24px] bg-[#43E1A9] rounded-full"></div>
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
            <div className="text-[#FFFFFF] font-belanosima font-[400] text-[18px] leading-[24px] px-6 pb-4">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
