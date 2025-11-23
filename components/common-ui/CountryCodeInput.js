
"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
// import { countries, currencies, languages, timezones, lookup } from 'country-data-list';
import CountryList from 'country-list-with-dial-code-and-flag';
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg'
import parse from "html-react-parser";

export default function CountryCodeInput({
  placeholder = "Phone Number",
  value = "",
  onChange = () => { },
  selectedCode, // optional externally controlled selected dial code e.g. "+92"
  onCodeChange, // optional callback when code changes
  classNameBtn = "",
  classNameInput = "",
  classNameSpan = "",
}) {

  const allCountries = CountryList.getAll();

  const countries = []; // Use an array, not an object

  allCountries.forEach((country) => {
    countries.push({
      name: country.name,
      flag: CountryFlagSvg[country.code],
      code: country.dial_code,
      uniqueKey: country.code,
    });
  });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(countries[0]);
  // Sync selected country with external selectedCode prop
  useEffect(() => {
    if (!selectedCode) return;
    const found = countries.find((c) => c.code === selectedCode);
    if (found && found.uniqueKey !== selected.uniqueKey) {
      setSelected(found);
    }
  }, [selectedCode]);

  const buttonRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef(null);

  // --- Calculate dropdown position ---
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY + 4, // small gap
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [open]);

  // --- Close dropdown on click outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative flex w-full">
      {/* Country Code Dropdown */}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(!open)}
          className={`min-w-[100px] flex items-center gap-3 focus:outline-none focus:ring-0  
            h-[50px] border border-r-0 px-3 font-[400] font-belanosima text-[14.5px]
            placeholder-[#848884]/50 text-black border-[#848884] backdrop-blur-[50px] ${classNameBtn}`}
        >
          <div className="w-6 h-4 rounded-sm object-cover">
            {parse(selected.flag)}
          </div>
          <span>{selected.code}</span>
        </button>

        {/* Dropdown Menu (Portal) */}
        {open &&
          createPortal(
            <div
              ref={dropdownRef}
              style={dropdownStyle}
              className="border border-[#43E1A9] bg-[#002715] backdrop-blur-[30px]
              rounded-md overflow-hidden shadow-lg max-h-[300px] overflow-y-auto"
            >
              {countries.map((country, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelected(country);
                    if (onCodeChange) onCodeChange(country.code);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-base text-white hover:bg-[#43E1A9] hover:text-[#002715] cursor-pointer transition-all"
                >
                  <div className="w-6 h-4 rounded-sm object-cover">{parse(country.flag)}</div>
                  <span>{country.code}</span>
                </div>
              ))}
            </div>,
            document.body
          )}
      </div>

      {/* Separator */}
      <div
        className={`flex items-center justify-center text-[#848884] border-y border-[#848884] opacity-60 ${classNameSpan}`}
      >
        <span className="px-2 text-[18px]">|</span>
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange({
            countryCode: selected.code,
            phoneNumber: e.target.value,
          })
        }
        className={`flex-1 h-[50px] border border-l-0 border-[#848884] px-3
          text-black placeholder-[#848884]/50 
          backdrop-blur-[50px] focus:outline-none focus:ring-0
          font-[400] font-belanosima text-[14.5px] ${classNameInput}`}
      />
    </div>
  );
}
