"use client";

import AuthHeading from "@/components/common-ui/AuthCommonHeading";
import PasswordInput from "@/components/common-ui/PasswordInput";

import Link from "next/link";

export default function PersonalAccount() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center lg:py-0 py-10">
        <div className="lg:max-w-[1200px] w-full flex lg:flex-row flex-col justify-between mx-auto lg:gap-[68px] gap-[40px]">
          {/* heading section */}
          <AuthHeading
            title={"Welcome"}
            subTitle={"Start your journey now with our management system!"}
          />
          {/* form Container */}
          <div className="w-full lg:max-w-[428px] flex flex-col gap-[18px]">
  
          <div className="w-full border border-[#848884] rounded-[8px] flex flex-col gap-[18px]">
            <span className="mt-[20px] text-center  lg:text-[32px] text-[26px] font-[400] text-[#98C1A9] leading-[100%]">
              Personal Account
            </span>

            <form>
              <div className="flex flex-col md:flex-row gap-0">
                {/* first Name Input */}
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full focus:outline-none focus:ring-0 opacity-50  
                  h-[50px] border px-3 font-[400]  text-[14.5px] border-b-0 border-l-0 
                   placeholder-[#848884] text-[#848884] border-[#848884] backdrop-blur-[50px]"
                />

                {/* last Name Input */}
                <input
                  type="text"
                  placeholder="Last Name (Optional)"
                  className="w-full focus:outline-none focus:ring-0 opacity-50  
                  h-[50px] border px-[24px] font-[400]  text-[14.5px] border-b-0 border-r-0 border-l-0
                   placeholder-[#848884] text-[#848884] border-[#848884] backdrop-blur-[50px]"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                className="w-full focus:outline-none focus:ring-0 opacity-50  
                  h-[50px] border px-[24px] font-[400]  text-[14.5px] border-b-0 border-l-0 border-r-0
                   placeholder-[#848884] text-[#848884] border-[#848884] backdrop-blur-[50px]"
              />
              {/* Password Input */}
              <PasswordInput
                placeholder="Password"
                classNameInput={" border-l-0 border-r-0 border-b-0"}
              />
              {/* Confirm Password Input */}
              <PasswordInput
                placeholder="Confirm Password"
                classNameInput={" border-l-0 border-r-0"}
              />

              <div
                className="flex flex-col gap-[9px] opacity-100 p-4"
                style={{ transform: "rotate(0deg)" }}
              >
                {/* First checkbox */}
                <label className="flex items-center gap-2 text-[14px]  font-[400] leading-[111%] text-[#98C1A9]">
                  <input
                    type="checkbox"
                    className="w-[15px] h-[15px] accent-[#848884]"
                  />
                  18+ years old
                </label>

                {/* Second checkbox */}
                <label className="flex items-center gap-2 text-[14px]  font-[400] leading-[111%] text-[#98C1A9]">
                  <input
                    type="checkbox"
                    className="w-[15px] h-[15px] accent-[#848884]"
                  />
                  I agree to terms & conditions
                </label>
              </div>

              {/* login Button */}
              <div className="flex flex-col lg:flex-row justify-center w-full py-4 px-4 lg:px-0">
                <button
                  type="button"
                  className="w-full lg:max-w-[279px] h-[50px] px-4 rounded-[32px]  text-[18px] text-[#FFFFFF]
          bg-[#98C1A9] cursor-pointer
          bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)]
          shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]
          backdrop-blur-[50px]
          hover:bg-[#39FF14]  transition duration-300"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>

        {/* link */}
        <div className=" w-full lg:max-w-[1200px] flex flex-col gap-2 lg:gap-0">
          <span className="text-right  text-[16px] font-[400] text-[#848884] leading-[111%]">
            Already have an account?{"  "}
            <Link href={"/login"} className="text-[#39FF14] underline ml-1">
              Login
            </Link>{" "}
          </span>
        </div>
        </div>

        </div>
      </div>
    </>
  );
}
