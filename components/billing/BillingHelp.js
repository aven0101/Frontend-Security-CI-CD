"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ContactCards from "../contact-us/ConactCards";

export default function BillingHelp() {
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Payment");

  const options = ["Payment", "Option1", "Option 2"];
  return (
    <>
      <section className="w-full lg:max-w-[1308px] h-auto lg:h-[132px] mx-auto xl:mt-15 lg:mt-14 md:mt-10 mt-10 rounded-[18.24px] border-[1.14px] border-[#43E1A9] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-6 lg:py-0">
        {/* Left Text */}
        <div className="text-white font-aptos font-[700] text-[36px] lg:text-[48px] leading-[70px]">
          None of these help?
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row lg:gap-[40px] gap-[20px]">
          <button
            onClick={() => setShowForm(!showForm)}
            className=" cursor-pointer capitalize  w-full lg:w-[242px] h-[66px] rounded-[35.18px] opacity-95 font-aptos font-[700] text-[20px] leading-[100%] text-[#FDFDFD] flex items-center justify-center border-[1.17px] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] border-[#43E1A9] backdrop-blur-[58.63px] shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] transition-all duration-300 hover:scale-[1.02] hover:opacity-100 "
          >
            {" "}
            Submit a Billing Ticket{" "}
          </button>{" "}
          <Link
            href={"/contact"}
            className=" cursor-pointer  w-full lg:w-[242px] h-[66px] rounded-[35.18px] opacity-95 font-aptos font-[700] text-[20px] leading-[100%] text-[#FDFDFD] flex items-center justify-center border-[1.17px] [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] border-[#43E1A9] backdrop-blur-[58.63px] shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] transition-all duration-300 hover:scale-[1.02] hover:opacity-100 "
          >
            {" "}
            Contact Us{" "}
          </Link>
        </div>
      </section>

      {/* billing ticket form */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          showForm
            ? "max-h-[1000px] opacity-100 xl:mt-15 lg:mt-14 md:mt-10 mt-10"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="lg:max-w-[1300px] w-full mx-auto flex flex-col gap-[40px] text-white font-aptos lg:px-4 px-0">
          <span className="font-aptos capitalize  text-center text-[50px] md:text-[64px] lg:text-[64px] font-[800] leading-[120%] text-[#43E1A9]">
            Billing Support Ticket
          </span>

          <form className=" border border-[#43E1A9] rounded-[8px]">
            <input
              type="text"
              placeholder="HSK-823749"
              className="w-full focus:outline-none focus:ring-0 opacity-50  h-[56px] border px-[24px] text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
            />
            <div className="relative w-full ">
              {/* Selected Box */}
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full cursor-pointer opacity-50 h-[56px] border px-[24px] text-[20px] font-bold
             capitalize text-white border-[#43E1A9] 
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
              {open && (
                <div className="absolute w-full border border-[#43E1A9] bg-[#002715] backdrop-blur-[30px] z-10">
                  {options.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setSelected(opt);
                        setOpen(false);
                      }}
                      className="px-5 py-3 text-[18px] text-white font-medium hover:bg-[#43E1A9] hover:text-[#002715] cursor-pointer transition-all"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Textarea */}
            <textarea
              placeholder="user filled issue description"
              className="w-full focus:outline-none focus:ring-0 opacity-50 h-[195px] py-[17px] resize-none border px-[24px] text-[18px] font-bold placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
            ></textarea>
            <div className="flex justify-start mt-3 ml-2">
              <span
                className="text-[#43E1A9] px-4 py-2
   h-[36px] 
  opacity-95 
  rounded-[16px] 
  bg-[linear-gradient(247.52deg,rgba(255,255,255,0.066)_3.99%,rgba(67,225,169,0.066)_56.27%,rgba(255,255,255,0)_96.99%)] 
  backdrop-blur-[50px]
  shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A] 
  font-aptos font-[400] text-[18px] leading-[120%] capitalize"
              >
                You&apos;ll hear back within 2-4 hours.
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="w-[241px] mb-6 cursor-pointer h-[56px] border-[#43E1A9] rounded-[30px] text-[18px] font-bold capitalize text-[#FDFDFD] border bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A] hover:scale-105 transition-all duration-300"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* contact us */}
      <section className="xl:mt-15 lg:mt-14 md:mt-10 mt-10  xl:mb-20 lg:mb-20 md:mb-20 mb-13 w-full lg:max-w-[1108px]  mx-auto flex flex-col  gap-[20px] ">
        <span className="font-aptos capitalize  text-center text-[50px] md:text-[64px] lg:text-[64px] font-[400] leading-[64px] text-[#FFFFFF]">
          Contact Us
        </span>
        <ContactCards id={showForm ? "billing" : "contact"} />
      </section>
    </>
  );
}
