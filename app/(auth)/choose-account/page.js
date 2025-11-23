"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChooseAccount() {
  const router = useRouter();
  const [selected, setSelected] = useState("business");

  const handleNext = () => {
    if (selected === "personal") {
      router.push("/signup");
    } else {
      router.push("/register");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center lg:py-0 py-10">
      <div className="max-w-[999px] w-full flex flex-col items-center justify-center mx-auto gap-[68px]">
        {/* Heading */}
        <div className="flex flex-col gap-2 lg:gap-0">
          <h1 className=" text-center font-[600] text-[35px] sm:text-[48px] md:text-[55px] lg:text-[60px] xl:text-[64px] capitalize text-[#98C1A9] leading-[100%]">
            Choose Your Account Type
          </h1>
          <span className=" block text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] text-center font-normal text-[#98C1A9] capitalize leading-[100%]">
            Select how you want to use our platform
          </span>
        </div>

        {/* Cards Container */}
        <div
          className="lg:h-[241px] w-full lg:max-w-[720px] h-auto flex flex-col md:flex-row items-center justify-center gap-[20px]
        border-[2.25px] border-[#98C1A9] rounded-[18px] px-0 lg:px-4
      "
        >
          {/* Business Card */}
          <div
            onClick={() => setSelected("business")}
            className={`relative w-full lg:max-w-[341px] h-[268px] rounded-[16px] p-[20px] 
            flex flex-col items-center justify-center 
            gap-[11px] cursor-pointer  transition duration-300 
              ${selected === "business"
                ? "scale-[1.05] border-[1.13px] backdrop-blur-[56px] border-[#43E1A9] bg-[#98C1A9]"
                : " overflow-hidden"
              }`}
          >
            <Image
              src="/images/auth/business.png"
              alt="Business Icon"
              width={164}
              height={122}
              className="object-contain w-[164px] h-[122px]"
            />

            <span
              className={`text-[31px]  font-400 capitalize ${selected === "business" ? "text-white" : "text-[#848884]"
                }`}
            >
              Business Account
            </span>
          </div>

          {/* Personal Card */}
          <div
            onClick={() => setSelected("personal")}
            className={`relative w-full lg:max-w-[341px] h-[268px] rounded-[16px] p-[20px] flex flex-col items-center justify-center gap-[11px] cursor-pointer 
               transition duration-300 
              ${selected === "personal"
                ? "scale-[1.05] border-[1.13px] border-[#43E1A9] bg-[#98C1A9] backdrop-blur-[56px]"
                : "border border-transparent bg-transparent overflow-hidden"
              }`}
          >
            <Image
              src="/images/auth/Personal-1.png"
              alt="Personal Icon"
              width={164}
              height={122}
              className="object-contain w-[164px] h-[122px]"
            />

            <span
              className={`text-[31px]  font-400 capitalize ${selected === "personal" ? "text-white" : "text-[#848884]"
                }`}
            >
              Personal Account
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex px-2 lg:px-0  justify-center w-full flex-col sm:flex-row lg:gap-[40px] gap-[10px]">
          {/* Back Button */}
          <Link
            href="/"
            className=" flex items-center justify-center gap-2 w-full lg:max-w-[244px] h-[44px] 
          rounded-[30px]
          border border-[#98C1A9]
           text-[18px] text-[#848884] backdrop-blur-[50px]
          shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]
          hover:bg-[#39FF14] hover:text-white transition duration-300"
          >
            {/* <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M217.9 127.9c-9.4-9.4-24.6-9.4-33.9 0l-144 144c-9.4 9.4-9.4 24.6 0 33.9l144 144c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L122.6 312H472c13.3 0 24-10.7 24-24s-10.7-24-24-24H122.6l95.3-95.3c9.4-9.4 9.4-24.6 0-33.9z" />
            </svg> */}
            <ArrowLeft size={20} />
            <span> BACK TO HOME </span>
          </Link>

          {/* Next Button */}
          <button
            onClick={handleNext}
            type="button"
            className="w-full lg:max-w-[193px] h-[44px] px-4 rounded-[30px]  text-[18px] text-[#FDFDFD]
          bg-[#98C1A9] cursor-pointer
          bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)]
          shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]
          backdrop-blur-[50px]
          hover:bg-[#39FF14]  transition duration-300"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
