"use client";

import Image from "next/image";

export default function FeatureStepSection() {
  return (
    <>
      {/* <section className="w-full lg:max-w-[1306px] mx-auto flex xl:flex-row lg:flex-row md:flex-col flex-col mt-[100px]"> */}
      <section className="w-full max-w-[1306px] gap-2 lg:gap-0 xl:gap-0 mx-auto xl:mt-15 lg:mt-14 md:mt-10 mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {/* step 1*/}
        <div
          className=" flex flex-col 
        border border-[#43E1A9] rounded-t-[15.91px] 
        lg:border-b-0 border-b-1  w-full 
       h-[393px] px-[9px] py-[13px]"
        >
          <div className=" w-full min-h-[355px] flex flex-col justify-between  gap-2">
            <div className=" w-full min-h-[249px] px-[13px] py-[11.14px] flex flex-col rounded-[19px] border border-[#43E1A9] bg-gradient-to-tr from-[#434343DB] to-transparent backdrop-blur-[15.16px] ">
              {/* Icon + Text */}
              <div className="flex items-center gap-2 lg:gap-2 min-h-[32px] pb-[13px]">
                <Image
                  src="/images/contact/step2.png"
                  alt="Step 1"
                  width={42}
                  height={31}
                />
                <span className="font-aptos font-normal text-[20px] lg:text-[24px] leading-[100%] text-white capitalize">
                  Upload a File
                </span>
              </div>
              {/* Square Box */}
              <div className=" w-full h-[178px] px-[9px] rounded-[6px] border border-[#43E1A9] bg-transparent shadow-[inset_0.7px_0.7px_35.05px_#4242421A,inset_-0.7px_-0.7px_35.05px_#FFFFFF1A] flex items-center justify-center">
                <div className="w-full h-[162px] bg-white rounded-[7px] " />
              </div>
            </div>
            <span className="font-aptos text-center font-black text-[40px] lg:text-[60px] text-[#43E1A9] leading-[100%] capitalize">
              Step 01
            </span>
          </div>
        </div>
        {/* step 2 */}

        <div
          className=" flex flex-col 
        border border-[#43E1A9] rounded-b-[15.91px] 
        lg:border-t-0 lg:border-l-0 lg:border-r-0   w-full 
        h-[406px] md:h-[393px] lg:h-[406px] px-[9px] justify-end align-bottom"
        >
          <div className=" w-full min-h-[355px] flex flex-col justify-between mb-[11.14px]  gap-2">
            <span className="font-aptos text-center font-black text-[40px] lg:text-[60px] text-[#43E1A9] leading-[100%] capitalize">
              Step 02
            </span>

            <div className=" w-full min-h-[249px] px-[13px] py-[11.14px] flex flex-col rounded-[19px] border border-[#43E1A9] bg-gradient-to-tr from-[#434343DB] to-transparent backdrop-blur-[15.16px] ">
              {/* Icon + Text */}
              <div className="flex items-center gap-2 md:gap-2 lg:gap-2 min-h-[32px] pb-[13px]">
                <Image
                  src="/images/contact/step1.png"
                  alt="Step 1"
                  width={42}
                  height={31}
                />
                <span className="font-aptos font-normal text-[20px] lg:text-[24px] leading-[100%] text-white capitalize">
                  Verifying Encrypted Transfer
                </span>
              </div>
              {/* Square Box */}
              <div className=" w-full h-[178px] px-[9px] py-[31.9px] rounded-[6px] border border-[#43E1A9] bg-transparent shadow-[inset_0.7px_0.7px_35.05px_#4242421A,inset_-0.7px_-0.7px_35.05px_#FFFFFF1A] flex items-center justify-center">
                <div className="w-full h-[162px] bg-white rounded-[7px] " />
              </div>
            </div>
          </div>
        </div>

        {/* step 3*/}
        <div
          className=" flex flex-col mt-4 md:mt-0 lg:mt-0
        border border-[#43E1A9] rounded-t-[15.91px] 
        lg:border-b-0 border-b-1  w-full 
         h-[393px] px-[9px] py-[13px]"
        >
          <div className=" w-full min-h-[355px] flex flex-col justify-between  gap-2">
            <div className=" w-full min-h-[249px] px-[13px] py-[11.14px] flex flex-col rounded-[19px] border border-[#43E1A9] bg-gradient-to-tr from-[#434343DB] to-transparent backdrop-blur-[15.16px] ">
              {/* Icon + Text */}
              <div className="flex items-center gap-2 lg:gap-2 min-h-[32px] pb-[13px]">
                <Image
                  src="/images/contact/step3.png"
                  alt="Step 1"
                  width={42}
                  height={31}
                />
                <span className="font-aptos font-normal text-[20px] lg:text-[24px] leading-[100%] text-white capitalize">
                  Setting Shared File Access Permission
                </span>
              </div>
              {/* Square Box */}
              <div className=" w-full h-[178px] px-[9px] py-[31.9px] rounded-[6px] border border-[#43E1A9] bg-transparent shadow-[inset_0.7px_0.7px_35.05px_#4242421A,inset_-0.7px_-0.7px_35.05px_#FFFFFF1A] flex items-center justify-center">
                <div className="w-full h-[162px] bg-white rounded-[7px] " />
              </div>
            </div>
            <span className="font-aptos text-center font-black text-[40px] lg:text-[60px] text-[#43E1A9] leading-[100%] capitalize">
              Step 03
            </span>
          </div>
        </div>

        {/* step 4 */}

        <div
          className=" flex flex-col 
        border border-[#43E1A9] rounded-b-[15.91px] 
         lg:border-t-0 lg:border-l-0   w-full 
      md:h-[393px] h-[406px] lg:h-[406px] px-[9px] justify-end align-bottom"
        >
          <div className=" w-full min-h-[355px] flex flex-col justify-between mb-[11.14px] gap-2">
            <span className="font-aptos text-center font-black text-[40px] lg:text-[60px] text-[#43E1A9] leading-[100%] capitalize">
              Step 04
            </span>

            <div className=" w-full min-h-[249px] px-[13px] py-[11.14px] flex flex-col rounded-[19px] border border-[#43E1A9] bg-gradient-to-tr from-[#434343DB] to-transparent backdrop-blur-[15.16px] ">
              {/* Icon + Text */}
              <div className="flex items-center gap-2 lg:gap-2 min-h-[32px] pb-[13px]">
                <Image
                  src="/images/contact/step4.png"
                  alt="Step 1"
                  width={42}
                  height={31}
                />
                <span className="font-aptos font-normal text-[20px] lg:text-[24px] leading-[100%] text-white capitalize">
                  Choosing a Specific Device for Sync
                </span>
              </div>
              {/* Square Box */}
              <div className=" w-full h-[178px] px-[9px] py-[31.9px] rounded-[6px] border border-[#43E1A9] bg-transparent shadow-[inset_0.7px_0.7px_35.05px_#4242421A,inset_-0.7px_-0.7px_35.05px_#FFFFFF1A] flex items-center justify-center">
                <div className="w-full h-[162px] bg-white rounded-[7px] " />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
