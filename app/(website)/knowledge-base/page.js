"use client";

import AdminSection from "@/components/knowledge/Admin";
import BestPracticeSection from "@/components/knowledge/bestPracticeSection";
import CommunitySection from "@/components/knowledge/communitySection";
import EnterpriseSection from "@/components/knowledge/EnterpriseSection";
import KnowledgeHeading from "@/components/knowledge/knowledgeHeading";
import PrivacySection from "@/components/knowledge/privacySection";
import TemplateSection from "@/components/knowledge/templateSection";
import IndividualUserSection from "@/components/knowledge/userSection";
import { ChevronDown, ChevronUp } from "lucide-react";
// import Image from "next/image";
import { useRef, useState } from "react";

export default function KnowledgeBase() {
  const [activeTabs, setActiveTabs] = useState(["Enterprise Setup"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const tabs = [
    "Enterprise Setup",
    "Admin & Governance",
    // "Enterprise Security Settings",
    "Compliance & Privacy",
    "Best Practices",
    "Individual User Tips",
    "Templates & Downloads",
    "Product Updates & Community",
  ];

  // Refs for each section
  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);
  const tab4Ref = useRef(null);
  const tab5Ref = useRef(null);
  const tab6Ref = useRef(null);
  const tab7Ref = useRef(null);
  const tab8Ref = useRef(null);

  const toggleTab = (tab) => {
    setActiveTabs((prev) =>
      prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
    );
    setDropdownOpen(false);

    // Scroll behavior with offset
    setTimeout(() => {
      const headerOffset = 120; // adjust this value to match your navbar height
      let elementTop = 0;

      if (tab === "Enterprise Setup") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (tab === "Admin & Governance" && tab2Ref.current) {
        elementTop =
          tab2Ref.current.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;
      }
      //  else if (tab === "Enterprise Security Settings" && tab3Ref.current) {
      //   elementTop =
      //     tab3Ref.current.getBoundingClientRect().top +
      //     window.scrollY -
      //     headerOffset;
      // }
      else if (tab === "Compliance & Privacy" && tab4Ref.current) {
        elementTop =
          tab4Ref.current.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;
      } else if (tab === "Best Practices" && tab5Ref.current) {
        elementTop =
          tab5Ref.current.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;
      } else if (tab === "Individual User Tips" && tab6Ref.current) {
        elementTop =
          tab6Ref.current.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;
      } else if (tab === "Templates & Downloads" && tab7Ref.current) {
        elementTop =
          tab7Ref.current.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;
      } else if (tab === "Product Updates & Community" && tab8Ref.current) {
        elementTop =
          tab8Ref.current.getBoundingClientRect().top +
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
      <KnowledgeHeading />
      {/* tabs view*/}
      <section
        className="w-full xl:max-w-[1298px] xl:mb-20 lg:mb-20 
      md:mb-20 mb-13 xl:mt-15 lg:mt-14 md:mt-10 mt-10 
      flex flex-col xl:flex-row  gap-4 text-white "
      >
        {/* Left Tabs */}

        <aside
          className="hidden xl:flex w-full px-4 lg:w-[500px] h-auto lg:h-[527px] rounded-[18.24px]
          border-[#43E1A9] border-1 bg-[url(/images/header-bg.png)] bg-contain
          flex-col items-center sticky top-[120px] z-30 py-4 gap-4 "
        >
          {/* <div className="absolute w-[569px] h-[569px] top-50 -left-90 rounded-full opacity-100 rotate-180">
            <div className="absolute inset-0  backdrop-blur-[605.4px] rounded-full mix-blend-soft-light" />

            <Image
              src="/images/technical/knowledge-bg-1.png"
              alt="Technical background"
              width={569}
              height={569}
              className="w-full h-full object-contain"
              priority
            />
          </div>{" "} */}
          {tabs.map((tab) => {
            const isActive = activeTabs.includes(tab);
            return (
              <button
                key={tab}
                onClick={() => toggleTab(tab)}
                className={`w-full cursor-pointer lg:w-[320px] h-[56px] rounded-[30px] font-aptos font-bold text-[18px] capitalize 
                      backdrop-blur-[50px] text-left px-8 transition-all duration-300 
                      ${
                        isActive
                          ? "bg-gradient-to-tr from-white/20 via-[#43E1A9]/20 to-transparent border border-[#43E1A954] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]"
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
          {" "}
          {/* Enterprise Setup Section */}
          <div ref={tab1Ref}>
            <EnterpriseSection />
          </div>
          {/* Admin & Governance Section */}
          <div ref={tab2Ref}>
            <AdminSection />
          </div>
          {/*Compliance & Privacy Section */}
          <div ref={tab4Ref}>
            <PrivacySection />
          </div>
          {/*Best Practices Section */}
          <div ref={tab5Ref}>
            <BestPracticeSection />
          </div>
          {/*Individual User Tips Section */}
          <div ref={tab6Ref}>
            <IndividualUserSection />
          </div>
          {/*Templates & Downloads Section */}
          <div ref={tab7Ref}>
            <TemplateSection />
          </div>
          {/*Product Updates & Community Section */}
          <div ref={tab8Ref}>
            <CommunitySection />
          </div>
          <div className="w-full flex justify-end mt-[100px]">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setActiveTabs(["Enterprise Setup"]);
              }}
              className="cursor-pointer relative w-full lg:max-w-[241px] h-[56px] 
              rounded-[30px] opacity-95 font-aptos font-[700] text-[18px] leading-[100%] text-[#FDFDFD] 
              flex items-center justify-center border-[1.17px] 
              [background:linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] 
              border-[#43E1A9] backdrop-blur-[58.63px] 
              shadow-[inset_2.35px_2.35px_117.25px_#4242421A,inset_-2.35px_-2.35px_117.25px_#FFFFFF1A] 
              transition-all duration-300 hover:scale-[1.02] hover:opacity-100"
            >
              ↑ Back to Top
            </button>
          </div>
        </section>
      </section>
    </>
  );
}
