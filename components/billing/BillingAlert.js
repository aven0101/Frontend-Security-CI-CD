"use client";

import Image from "next/image";
import { useState } from "react";

export default function BillingAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative w-full lg:max-w-[1298px] h-auto lg:h-[103px] py-2 lg:py-0 mx-auto mt-[100px] bg-[#39FF14] rounded-[16px] flex items-center justify-center lg:justify-start px-2 lg:px-6 transition-all duration-300">
      {/* Icon */}
      <div className="flex lg:flex-row flex-col items-center justify-center  lg:justify-start gap-4">
        <div className="w-[57px] h-[57px] rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/images/features/billing-ticket.png"
            alt="Billing Icon"
            width={57}
            height={57}
            className="object-contain"
          />
        </div>

        {/* Text + Badge */}
        <div className="flex flex-col">
          <div className="flex lg:flex-row flex-col items-center justify-center  lg:justify-start lg:gap-3 gap-1">
            <span className="font-aptos font-extrabold text-[20px] lg:text-[28px] leading-[120%] text-white">
              SYSTEM STATUS:
            </span>
            <div className="flex items-center justify-center px-1 lg:px-3 py-1 rounded-[13px] bg-white shadow-sm text-[#39FF14] text-[15px] font-aptos font-extrabold uppercase">
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>

          <span className="mt-1 text-center lg:text-left capitalize font-aptos text-[14px] lg:text-[16px] font-[800] leading-[120%] text-white">
            No reported issues. Everything is running smoothly.
          </span>
        </div>
      </div>

      {/* Close (Cross) Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute -top-[8px] -right-[8px] cursor-pointer"
      >
        <Image
          src="/images/features/cross.png"
          alt="Close"
          width={26}
          height={26}
        />
      </button>
    </div>
  );
}
