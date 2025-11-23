"use client";

export default function AuthHeading({ title, subTitle }) {
  return (
    <>
      <div className="w-full lg:max-w-[614px] flex flex-col justify-center gap-2 lg:gap-1">
        <h1 className="font-belanosima text-center lg:text-left font-[600] text-[50px] sm:text-[60px] md:text-[70px] lg:text-[80px] xl:text-[90.01px] text-[#98C1A9] leading-[100%]">
          {title}{" "}
          <span className="block text-[20px] sm:text-[25px] md:text-[35px] lg:text-[45px] xl:text-[45px] text-center lg:text-left font-[400] text-[#848884] leading-[120%]">
            {subTitle}
          </span>
        </h1>
      </div>
    </>
  );
}
