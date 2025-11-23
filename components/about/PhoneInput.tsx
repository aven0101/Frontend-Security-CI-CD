"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AsYouType } from "libphonenumber-js";
import { ChevronDown } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hideLabel?: boolean;
  label?: string;
}

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const countries: Country[] = [
  { code: "US", name: "United States", flag: ":us:", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", flag: ":gb:", dialCode: "+44" },
  { code: "PK", name: "Pakistan", flag: ":flag-pk:", dialCode: "+92" },
  { code: "IN", name: "India", flag: ":flag-in:", dialCode: "+91" },
  { code: "CA", name: "Canada", flag: ":flag-ca:", dialCode: "+1" },
  { code: "AU", name: "Australia", flag: ":flag-au:", dialCode: "+61" },
  { code: "DE", name: "Germany", flag: ":de:", dialCode: "+49" },
  { code: "FR", name: "France", flag: ":fr:", dialCode: "+33" },
  { code: "IT", name: "Italy", flag: ":it:", dialCode: "+39" },
  { code: "ES", name: "Spain", flag: ":es:", dialCode: "+34" },
  { code: "NL", name: "Netherlands", flag: ":flag-nl:", dialCode: "+31" },
  { code: "BE", name: "Belgium", flag: ":flag-be:", dialCode: "+32" },
  { code: "CH", name: "Switzerland", flag: ":flag-ch:", dialCode: "+41" },
  { code: "AT", name: "Austria", flag: ":flag-at:", dialCode: "+43" },
  { code: "SE", name: "Sweden", flag: ":flag-se:", dialCode: "+46" },
  { code: "NO", name: "Norway", flag: ":flag-no:", dialCode: "+47" },
  { code: "DK", name: "Denmark", flag: ":flag-dk:", dialCode: "+45" },
  { code: "FI", name: "Finland", flag: ":flag-fi:", dialCode: "+358" },
  { code: "PL", name: "Poland", flag: ":flag-pl:", dialCode: "+48" },
  { code: "GR", name: "Greece", flag: ":flag-gr:", dialCode: "+30" },
  { code: "PT", name: "Portugal", flag: ":flag-pt:", dialCode: "+351" },
  { code: "IE", name: "Ireland", flag: ":flag-ie:", dialCode: "+353" },
  { code: "NZ", name: "New Zealand", flag: ":flag-nz:", dialCode: "+64" },
  { code: "SG", name: "Singapore", flag: ":flag-sg:", dialCode: "+65" },
  { code: "MY", name: "Malaysia", flag: ":flag-my:", dialCode: "+60" },
  { code: "TH", name: "Thailand", flag: ":flag-th:", dialCode: "+66" },
  { code: "PH", name: "Philippines", flag: ":flag-ph:", dialCode: "+63" },
  { code: "ID", name: "Indonesia", flag: ":flag-id:", dialCode: "+62" },
  { code: "VN", name: "Vietnam", flag: ":flag-vn:", dialCode: "+84" },
  { code: "BD", name: "Bangladesh", flag: ":flag-bd:", dialCode: "+880" },
  { code: "LK", name: "Sri Lanka", flag: ":flag-lk:", dialCode: "+94" },
  { code: "AE", name: "UAE", flag: ":flag-ae:", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", flag: ":flag-sa:", dialCode: "+966" },
  { code: "QA", name: "Qatar", flag: ":flag-qa:", dialCode: "+974" },
  { code: "KW", name: "Kuwait", flag: ":flag-kw:", dialCode: "+965" },
  { code: "OM", name: "Oman", flag: ":flag-om:", dialCode: "+968" },
  { code: "BH", name: "Bahrain", flag: ":flag-bh:", dialCode: "+973" },
  { code: "TR", name: "Turkey", flag: ":flag-tr:", dialCode: "+90" },
  { code: "EG", name: "Egypt", flag: ":flag-eg:", dialCode: "+20" },
  { code: "ZA", name: "South Africa", flag: ":flag-za:", dialCode: "+27" },
  { code: "NG", name: "Nigeria", flag: ":flag-ng:", dialCode: "+234" },
  { code: "KE", name: "Kenya", flag: ":flag-ke:", dialCode: "+254" },
  { code: "JP", name: "Japan", flag: ":jp:", dialCode: "+81" },
  { code: "KR", name: "South Korea", flag: ":kr:", dialCode: "+82" },
  { code: "CN", name: "China", flag: ":cn:", dialCode: "+86" },
  { code: "BR", name: "Brazil", flag: ":flag-br:", dialCode: "+55" },
  { code: "MX", name: "Mexico", flag: ":flag-mx:", dialCode: "+52" },
  { code: "AR", name: "Argentina", flag: ":flag-ar:", dialCode: "+54" },
  { code: "CL", name: "Chile", flag: ":flag-cl:", dialCode: "+56" },
  { code: "CO", name: "Colombia", flag: ":flag-co:", dialCode: "+57" },
  { code: "RU", name: "Russia", flag: ":ru:", dialCode: "+7" },
  { code: "UA", name: "Ukraine", flag: ":flag-ua:", dialCode: "+380" },
];

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  hideLabel = false,
  label = "Phone number",
}) => {
  const [countryCode, setCountryCode] = useState("+44");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInitialized = useRef(false);
  const [formatted, setFormatted] = useState("");

  const selectedCountry = useMemo(
    () => countries.find((c) => c.dialCode === countryCode) || countries[1],
    [countryCode]
  );

  // Initialize from external value
  useEffect(() => {
    if (!isInitialized.current && value) {
      const matched = countries.find((c) => value.startsWith(c.dialCode));
      let digits = "";
      if (matched) {
        setCountryCode(matched.dialCode);
        digits = value.replace(matched.dialCode, "").replace(/\D/g, "").slice(0, 15);
      } else {
        digits = value.replace(/\D/g, "").slice(0, 15);
      }
      setPhoneNumber(digits);
      setFormatted(new AsYouType(selectedCountry.code as any).input(digits));
      isInitialized.current = true;
    }
  }, [value, selectedCountry.code]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const emitChange = (code: string, number: string) => {
    const combined = `${code}${number}`;
    onChange({
      target: { name: "phone", value: combined },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCountrySelect = (dialCode: string) => {
    setCountryCode(dialCode);
    const region = (countries.find((c) => c.dialCode === dialCode)?.code ||
      selectedCountry.code) as any;
    setFormatted(new AsYouType(region).input(phoneNumber));
    emitChange(dialCode, phoneNumber);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/\D/g, "").slice(0, 15);
    setPhoneNumber(newNumber);
    setFormatted(new AsYouType(selectedCountry.code as any).input(newNumber));
    emitChange(countryCode, newNumber);
  };

  const handleFocus = () => containerRef.current?.classList.add("ring-1", "ring-[#98C1A9]");
  const handleBlur = () => containerRef.current?.classList.remove("ring-1", "ring-[#98C1A9]");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-[8.85px] w-full">
      <div className="relative" ref={dropdownRef}>
        <div
          ref={containerRef}
          className="flex !ring-0 items-center w-full focus:outline-none h-[50px] border px-3 text-[14.5px] placeholder-[#848884]/50 border-l-0 border-r-0 border-b-0 border-[#848884]"
        >
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="flex items-center gap-2 bg-transparent p-2 outline-none text-[#666664] text-sm h-full cursor-pointer rounded-lg transition-colors"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className="font-medium text-xl placeholder-[#848884]/50 text-[#848884]">{selectedCountry.dialCode}</span>
            <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          <div className="w-[1px] h-[24px] md:h-[30px] bg-[#D9D9D9] mx-2" />

          <input
            type="tel"
            name="phone"
            value={formatted}
            onChange={handlePhoneChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            className="flex-1 h-full text-xl placeholder-[#848884]/50 text-[#848884] bg-transparent outline-none"
            required
            maxLength={20}
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full bg-white border border-[#C2C2C1] shadow-lg max-h-[300px] overflow-hidden">
            <div className="border-b border-[#C2C2C1]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country..."
                className="w-full px-3 py-2 text-xl placeholder-[#848884]/50 text-[#848884] outline-none"
              />
            </div>

            <div className="overflow-y-auto max-h-[240px]">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country.dialCode)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${country.dialCode === countryCode ? "bg-[#98C1A9]/10" : ""
                      }`}
                    role="option"
                    aria-selected={country.dialCode === countryCode}
                  >
                    <span className="text-sm placeholder-[#848884]/50 text-[#848884] font-bold">{country.code}</span>
                    <span className="flex-1 text-lg placeholder-[#848884]/50 text-[#848884]">{country.name}</span>
                    <span className="text-lg placeholder-[#848884]/50 text-[#848884] font-medium">{country.dialCode}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-sm text-[#666664] opacity-60">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;