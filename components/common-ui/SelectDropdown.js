"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";


export default function SelectDropdown({
  label = "Select Option",
  options = [],
  value = "",
  onChange = () => {},
  placeholder = "Please Select",
  optional = false,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const handleSelect = (opt) => {
    setSelected(opt);
    onChange(opt);
    setOpen(false);
  };

  return (
    <div className="relative w-full flex flex-col gap-2">
   

      {/* Selected Box */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex justify-between items-center
          w-full focus:outline-none focus:ring-0 opacity-50 h-[56px] border px-[24px]
          text-[20px] font-normal capitalize placeholder-[#39FF14] text-[#39FF14]
          border-[#39FF14]
          backdrop-blur-[50px]"
      >
        {selected || placeholder}
        <ChevronDown
          className={`transition-transform text-[#39FF14] ${
            open ? "rotate-180" : "rotate-0"
          }`}
          size={22}
        />
      </button>

      {/* Dropdown Options */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full border border-[#43E1A9] bg-[#002715] backdrop-blur-[30px] z-10 rounded-md overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className="px-5 py-3 text-[18px] text-white font-medium hover:bg-[#43E1A9] hover:text-[#002715] cursor-pointer transition-all"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
