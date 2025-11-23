"use client";

import BillingAlert from "@/components/billing/BillingAlert";
import ContactCards from "@/components/contact-us/ConactCards";
import TechnicalAssistant from "@/components/technical/technicalDiagnostic";
import TechnicalFAQS from "@/components/technical/technicalFaqs";
import TechnicalSupportSection from "@/components/technical/technicalSupport";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";

export default function TechnicalSupport() {
  const [activeTabs, setActiveTabs] = useState(["FAQs"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tabs = ["FAQs", "Diagnostic Assistant", "Support Ticket", "Contact Us"];

  // Refs for each section
  const faqsRef = useRef(null);
  const diagnosticRef = useRef(null);
  const supportRef = useRef(null);
  const contactRef = useRef(null);

  const toggleTab = (tab) => {
    setActiveTabs((prev) =>
      prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
    );
    setDropdownOpen(false);
    // Scroll behavior with offset
    setTimeout(() => {
      const headerOffset = 120; // adjust this value to match your navbar height
      let elementTop = 0;

      if (tab === "FAQs") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (tab === "Diagnostic Assistant" && diagnosticRef.current) {
        elementTop =
          diagnosticRef.current.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;
      } else if (tab === "Support Ticket" && supportRef.current) {
        elementTop =
          supportRef.current.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;
      } else if (tab === "Contact Us" && contactRef.current) {
        elementTop =
          contactRef.current.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;
      }

      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    }, 150);
  };
  const currentTab = activeTabs[0] || "FAQs";
  return (
    <>
      <BillingAlert />

      {/* tabs view*/}
      <section
        className="w-full xl:max-w-[1298px] xl:mb-20 lg:mb-20 
      md:mb-20 mb-13 xl:mt-15 lg:mt-14 md:mt-10 mt-10 
      flex flex-col xl:flex-row  gap-4 text-white "
      >
        {/* Left Tabs */}

        <aside
          className="hidden xl:flex w-full px-4 lg:px-2 lg:w-[500px] h-auto lg:h-[527px] rounded-[18.24px]
          border-[#43E1A9] border-1 bg-[url(/images/header-bg.png)] bg-contain
          flex-col items-center sticky top-[120px] z-30 py-4 gap-4 "
        >
          {tabs.map((tab) => {
            const isActive = activeTabs.includes(tab);
            return (
              <button
                key={tab}
                onClick={() => toggleTab(tab)}
                className={`w-full cursor-pointer px-8 text-left lg:w-[320px] h-[56px]  rounded-[30px] font-aptos font-bold text-[18px] capitalize 
                backdrop-blur-[50px] transition-all duration-300 
                ${
                  isActive
                    ? "bg-gradient-to-tr  from-white/20 via-[#43E1A9]/20 to-transparent border border-[#43E1A954] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]"
                    : "bg-gradient-to-tr from-white/[0.0066] via-[#43E1A9]/[0.0066] to-transparent border border-white/20 shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A] hover:border-[#43E1A9]/60"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </aside>

        {/* Dropdown for md, sm, xs */}
        <div className="xl:hidden w-full">
          <div
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center justify-between bg-gradient-to-tr from-white/[0.05] to-[#43E1A9]/[0.1] border border-[#1C825E]/40 rounded-[16px] px-6 py-3 cursor-pointer"
          >
            <span className="font-semibold text-[16px] capitalize">
              {currentTab}
            </span>
            {dropdownOpen ? (
              <ChevronUp className="w-5 h-5 text-[#43E1A9]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#43E1A9]" />
            )}
          </div>

          {dropdownOpen && (
            <div className="mt-2 bg-gradient-to-br from-[#1C825E]/10 to-[#43E1A9]/10 border border-[#1C825E]/30 rounded-[20px] flex flex-col overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => toggleTab(tab)}
                  className={`text-left px-6 py-3 text-[15px] font-medium transition-all 
                    ${
                      activeTabs.includes(tab)
                        ? "bg-[#1C825E]/20 text-[#43E1A9]"
                        : "hover:bg-[#43E1A9]/10"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Content Section */}
        <section className="w-full xl:max-w-[928px] min-h-[527px]">
          {/* FAQ Section */}
          <div ref={faqsRef}>
            <TechnicalFAQS />
          </div>

          {/* Diagnostic Assistant Section */}

          <div ref={diagnosticRef}>
            <TechnicalAssistant />
          </div>

          {/* Support Ticket Section */}

          <div
            ref={supportRef}
            className="mt-[30px] lg:mt-0 xl:mb-0 lg:mb-0 
      md:mb-0 mb-13"
          >
            <TechnicalSupportSection />
          </div>

          {/* Contact Us Section */}

          <div ref={contactRef}>
            <ContactCards id={"support"} />
          </div>
        </section>
      </section>
    </>
  );
}
