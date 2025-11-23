"use client";

import AuthHeading from "@/components/common-ui/AuthCommonHeading";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

export default function VerifyOTP() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center lg:py-0 py-10">
        <div className="lg:max-w-[1200px] w-full flex lg:flex-row flex-col justify-between mx-auto lg:gap-[68px] gap-[40px]">
          {/* heading section */}
          <AuthHeading
            title={"2FA Verification"}
            subTitle={"Verify before updating your password."}
          />

          {/* form Container */}
          <div className="w-full lg:max-w-[428px] flex flex-col gap-[18px]">
            <div className="w-full border border-[#848884] rounded-[8px] flex flex-col gap-[20px]">
              <div className="w-full flex flex-col gap-1">
                <span className="mt-[20px] text-center  lg:text-[32px] text-[26px] font-[400] text-[#98C1A9] leading-[100%]">
                  We&apos;ve sent you a code
                </span>
                <span className="text-center  lg:text-[15px] text-[12px] font-[400] text-[#848884] leading-[100%]">
                  the code was sent to{" "}
                  <span className="text-[#98C1A9]">+44-1684198</span>
                </span>
              </div>
              <span className="text-center cursor-pointer  text-[14px] font-[400] text-[#848884] leading-[111%]">
                Resend code in <span className="text-[#98C1A9]">0:20</span>
              </span>

              <form>
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-[72px] h-[72px] bg-[#EEEEEE] border border-[#848884] 
        rounded-[8px] text-center text-[24px]  text-[#002715]
        focus:outline-none focus:border-[#43E1A9] focus:ring-0 transition-all"
                    />
                  ))}
                </div>
                {/* login Button */}
                <div className="flex flex-col lg:flex-row justify-center w-full px-4 lg:px-0 mt-[20px] mb-[18px]">
                  <Link
                    href={"#"}
                    className="w-full lg:max-w-[279px] h-[50px] px-4 rounded-[32px]  text-[18px] text-[#FFFFFF]
          bg-[#98C1A9] cursor-pointer flex justify-center items-center
          bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)]
          shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]
          backdrop-blur-[50px]
          hover:bg-[#39FF14]  transition duration-300"
                  >
                    Continue
                  </Link>
                </div>
              </form>
            </div>

            <div className=" w-full  flex flex-col gap-2 lg:gap-[5px]">
              <Link
                href={"/security"}
                className="text-center cursor-pointer flex flex-row items-center justify-center  text-[16px] font-[400] text-[#848884] leading-[111%]"
              >
                <ArrowLeft size={20} />
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
