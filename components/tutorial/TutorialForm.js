"use client";

export default function TutorialForm() {
  return (
    <div className="w-full flex flex-col gap-4 text-white font-aptos lg:px-4 px-0 xl:mt-15 lg:mt-14 md:mt-10 mt-10 ">
      <span className="font-aptos text-left text-[20px] lg:text-[24px] font-bold leading-[100%] text-[#FFFFFF]">
        Can&apos;t find the information you need? Tell us how we can improve.
      </span>
      {/* Two Inputs in One Row */}
      <form className=" border border-[#43E1A9] rounded-[8px]">
        <div className="flex flex-col md:flex-row gap-0">
          <input
            type="text"
            placeholder="Uername or UserId"
            className="w-full focus:outline-none focus:ring-0 opacity-50 md:w-[643px] h-[56px] border px-[24px] text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
          />

          <input
            type="text"
            placeholder="Contact"
            className="w-full focus:outline-none focus:ring-0 opacity-50 md:w-[643px] h-[56px] border px-[24px] text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
          />
        </div>

        {/* Textarea */}
        <textarea
          placeholder="Description"
          className="w-full focus:outline-none focus:ring-0 opacity-50 h-[195px] py-[17px] resize-none border px-[24px] text-[20px] font-bold capitalize placeholder-white text-white border-[#43E1A9] bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px]"
        ></textarea>

        {/* Submit Button */}
        <div className="flex justify-center mt-3">
          <button
            type="submit"
            className="w-[411px] mb-6 cursor-pointer h-[56px] border-[#43E1A9] rounded-[30px] text-[18px] font-bold capitalize text-[#FDFDFD] border bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] backdrop-blur-[50px] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A] hover:scale-105 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
