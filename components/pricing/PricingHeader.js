export default function PricingHeading() {
  return (
    <div className="max-w-[1027px] mx-auto mt-[140px] md:mt-[180px] lg:mt-[201px] text-center flex flex-col items-center justify-center gap-4 px-4 text-white">
      <h1 className="font-aptos font-[800] text-[32px] leading-[40px] sm:text-[48px] sm:leading-[56px] md:text-[60px] md:leading-[68px] lg:text-[72px] lg:leading-[80px] capitalize">
       Choose a Plan That Fits You
      </h1>

      <span className="font-aptos text-[#43E1A9] font-[700] text-[16px] leading-[100%] sm:text-[20px] md:text-[30px] lg:text-[40px] capitalize max-w-[1027px]">
        Simple pricing for individuals, teams and enterprises
      </span>

       <span className="font-aptos text-[#FFFFFF] font-[700] text-[16px] leading-[100%] sm:text-[18px] md:text-[24px] lg:text-[30px] capitalize max-w-[943px]">
        No credit card info for free plan, No hidden fees, Cancel anytime
      </span>
    </div>
  );
}
