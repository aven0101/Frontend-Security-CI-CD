"use client";
import { useState } from "react";
import { CheckIcon } from "lucide-react";

const plans = [
  {
    title: "Free",
    price: "$0",
    features: [
      "5 GB Storage",
      "250 MB File Size Limit",
      "Basic Sharing Controls",
    ],
    btnText: "Get Started",
    btnSubText: "Get Started / Instant access / No card",
  },
  {
    title: "Pro",
    price: "$9.99/mo",
    features: [
      "200 GB Storage",
      "5 GB File Size Limit ",
      "Advanced Sharing Controls",
    ],
    btnText: "Upgrade",
    btnSubText: "Upgrade / Best Value",
  },
  {
    title: "Business",
    price: "$29.99/mo",
    features: [
      "1 TB Storage",
      "10 GB File Size Limit ",
      "Team Sharing Controls",
    ],
    btnText: "Start Trials",
    btnSubText: "",
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [],
    btnText: "Contact Sales",
    btnSubText: "",
  },
];

export default function PricingTabs() {
  const [billing, setBilling] = useState("yearly");

  return (
    <div className="max-w-[1308px] xl:mt-15 lg:mt-14 md:mt-10 mt-10 xl:mb-20 lg:mb-20 md:mb-20 mb-13 mx-auto  flex flex-col items-center justify-center gap-10 lg:px-4 px-0 text-white font-aptos">
      {/* Tabs */}
      {/* <div className="flex flex-wrap items-center justify-center gap-4 bg-[#ffffff14] border border-[#43E1A9] rounded-[16px] px-3 py-3 backdrop-blur-[50px]"> */}
      {/* <div className=" flex items-center justify-center gap-4 bg-[#ffffff14] border border-[#43E1A9] rounded-[16px] px-3 py-3 backdrop-blur-[50px]"> */}
      <div className="lg:min-w-[418px] flex items-center justify-center gap-4 bg-[#ffffff14] border border-[#43E1A9] rounded-[16px] px-3 py-3 backdrop-blur-[50px]">
        {/* Monthly */}
        <button
          onClick={() => setBilling("monthly")}
          className={`lg:px-6 px-3 py-3 cursor-pointer rounded-[16px] font-belanosima text-[14px] lg:text-[18px] transition-all duration-300 ${
            billing === "monthly"
              ? "border border-[#43E1A9] bg-[linear-gradient(247.76deg,rgba(255,255,255,0.1)_1.72%,rgba(67,225,169,0.15)_99.27%)] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]"
              : "text-[#FDFDFD]/70 hover:text-white"
          }`}
        >
          Pay Monthly
        </button>

        {/* Yearly */}
        <button
          onClick={() => setBilling("yearly")}
          className={`lg:px-6 px-3 py-3 cursor-pointer rounded-[16px] font-belanosima text-[14px] lg:text-[18px] transition-all duration-300  ${
            billing === "yearly"
              ? "border border-[#43E1A9] bg-[linear-gradient(247.76deg,rgba(255,255,255,0.1)_1.72%,rgba(67,225,169,0.15)_99.27%)] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]"
              : "text-[#FDFDFD]/70 hover:text-white"
          }`}
        >
          Pay Yearly
          <span className="ml-3 border border-white text-white text-[12px] lg:text-[16px] font-belanosima rounded-[8px] px-2 ">
            Save 20%
          </span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-[13px] w-full justify-items-center">
        {plans
          .filter((plan) => {
            if (billing === "yearly") return true;
            return plan.price.includes("/mo");
          })
          .map((plan, index) => (
            <div
              key={index}
              className="h-[450px] lg:max-w-[317px] w-full flex flex-col justify-between rounded-[14px] p-6 border-[1.75px] border-[#43E1A9] bg-[linear-gradient(195.05deg,rgba(43,255,255,0.1)_0%,rgba(43,255,255,0.02)_50%,rgba(43,255,255,0.06)_100%)] backdrop-blur-[35px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(67,225,169,0.3)]"
            >
              {/* Title & Price */}
              <div className="flex flex-col mb-4">
                <span className="text-[#43E1A9] font-[700] text-[40px]">
                  {plan.title}
                </span>
                <span className="text-white font-bold text-[42px] leading-[48px] mb-3">
                  {plan.price}
                </span>
                {/* Divider */}
                <div className="w-full h-[1px] bg-[#FFFFFF3D] my-3"></div>
              </div>

              {/* Description (only show if features exist) */}
              {plan.features.length > 0 && (
                <div className="flex flex-col gap-3 mb-6 flex-grow">
                  <span className="font-bold text-[16px]">
                    What you will get
                  </span>
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-[#FFFFFFCC]"
                    >
                      <CheckIcon
                        size={16}
                        color="#43E1A9CC"
                        className="border border-[#43E1A9CC] rounded-full"
                      />
                      <span className="font-semibold text-[16px]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {/* Button */}
              <div className="flex flex-col gap-[8px]">
                <button className="rounded-[30px] cursor-pointer border border-[#43E1A9] leading-[17px] px-6 py-3 text-[12px] font-[700] capitalize shadow-[inset_1.75px_1.75px_87.42px_#4242421A,inset_-1.75px_-1.75px_87.42px_#FFFFFF1A] hover:scale-105 transition-all duration-300">
                  {plan.btnText}
                </button>

                {/* Footer Note */}
                <span className="text-[#FFFFFFBA] font-[400] text-[14px] text-center h-[14px]">
                  {plan.btnSubText}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
