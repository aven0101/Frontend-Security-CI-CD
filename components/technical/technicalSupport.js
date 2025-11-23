"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TechnicalSupportSection() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("File Management");
  const removeFile = () => setFileName("");
  const options = ["File Management", "Option1", "Option 2"];
  return (
    <>
      <div className="w-full min-h-[639px] flex flex-col   gap-[35px]">
        <span className="font-aptos  text-[26px] md:text-[30px] lg:text-[32px] font-[800] leading-[120%] text-[#43E1A9]">
          Support Ticket
        </span>
        <form className=" border border-[#43E1A9] rounded-[8px]">
          <input
            type="text"
            placeholder="HSK-823749"
            className="w-full focus:outline-none focus:ring-0 opacity-50  h-[56px] border px-[12px] lg:px-[24px] text-[16px] lg:text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
          />
          <div className="flex flex-col md:flex-row gap-0">
            {/* Name Input */}
            <input
              type="text"
              placeholder="Premium Sync Plan"
              className="w-full md:w-1/2 focus:outline-none focus:ring-0 opacity-50  h-[56px] border px-[12px] lg:px-[24px] text-[16px] lg:text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
            />
            <div className="relative w-full md:w-1/2 ">
              {/* Selected Box */}
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full  cursor-pointer opacity-50 h-[56px] border px-[12px] lg:px-[24px] text-[16px] lg:text-[20px] font-bold
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
          </div>

          <div className="flex flex-col md:flex-row gap-0">
            <input
              type="text"
              placeholder="Windows 11"
              className="w-full md:w-1/2 focus:outline-none focus:ring-0 opacity-50  h-[56px] border px-[12px] lg:px-[24px] text-[16px] lg:text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
            />

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
                className="border truncate  cursor-pointer max-w-[122px] border-[#43E1A9] rounded-[17px] px-[11px] py-[3px]  text-[14px] lg:text-[16px] font-bold capitalize text-[#FDFDFD] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] hover:scale-105 transition-all duration-300"
              >
                Upload File
              </label>

              {/* File Display */}
              {fileName && (
                <span
                  className="flex items-center gap-2 border border-[#43E1A9] rounded-[17px] px-[11px] py-[3px] text-[14px] lg:text-[16px] font-bold 
                capitalize max-w-[154px] overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  <span className="truncate">{fileName}</span>
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
            placeholder="Upload fails: File too large. User tried compressing, still  fails."
            className="w-full focus:outline-none focus:ring-0 opacity-50 h-[195px] py-[17px] resize-none border px-[12px] lg:px-[24px] text-[16px] lg:text-[20px] font-bold placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
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
  font-aptos font-[400] text-[16px] lg:text-[18px] leading-[120%] capitalize"
            >
              You&apos;ll hear back within 2-4 hours.
            </span>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="w-[241px] mb-6 cursor-pointer h-[46px] lg:h-[56px] border-[#43E1A9] rounded-[30px] text-[16px] lg:text-[18px] font-bold capitalize text-[#FDFDFD] border bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A] hover:scale-105 transition-all duration-300"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
