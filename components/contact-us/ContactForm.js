"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ContactForm() {
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Technical");

  const options = ["Technical", "General"];
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const removeFile = () => setFileName("");
  return (
    <div className="max-w-[1299px] w-full mx-auto xl:mt-15 lg:mt-14 md:mt-10 mt-10  flex flex-col gap-4 text-white font-aptos lg:px-4 px-0">
      {/* Two Inputs in One Row */}
      <form className=" border border-[#43E1A9] rounded-[8px]">
        <div className="flex flex-col md:flex-row gap-0">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            className="w-full focus:outline-none focus:ring-0 opacity-50 md:w-[643px] h-[56px] border px-[24px] text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full focus:outline-none focus:ring-0 opacity-50 md:w-[643px] h-[56px] border px-[24px] text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
          />
        </div>

        {/* Select + File Upload */}
        <div className="flex flex-col md:flex-row gap-0">
          <div className="relative w-full md:w-1/2">
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

          {/* File Upload */}
          <div className="w-full md:w-1/2 h-[56px] opacity-50 flex items-center gap-3 border border-[#43E1A9]  backdrop-blur-[50px] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] px-4">
            {/* Hidden File Input */}
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Upload Button */}
            <label
              htmlFor="file-upload"
              className="border cursor-pointer max-w-[122px] border-[#43E1A9] rounded-[17px] px-[11px] py-[3px] text-[16px] font-bold capitalize text-[#FDFDFD] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] hover:scale-105 transition-all duration-300"
            >
              Upload File
            </label>

            {/* File Display */}
            {fileName && (
              <span className="flex items-center gap-2 border border-[#43E1A9] rounded-[17px] px-[11px] py-[3px] text-[16px] font-bold capitalize">
                {fileName}
                <Image
                  src="/images/contact/cross-icon.png"
                  alt="remove"
                  width={14}
                  height={14}
                  className="object-contain cursor-pointer"
                  onClick={removeFile}
                />
              </span>
            )}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          placeholder="Message"
          className="w-full focus:outline-none focus:ring-0 opacity-50 h-[195px] py-[17px] resize-none border px-[24px] text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
        ></textarea>

        {/* Submit Button */}
        <div className="flex justify-center mt-3 mb-6">
          <button
            type="submit"
            className="w-[411px] cursor-pointer h-[56px] border-[#43E1A9] rounded-[30px] text-[18px] font-bold capitalize text-[#FDFDFD] border bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A] hover:scale-105 transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
