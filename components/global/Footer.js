import {
  footerPaymentIcons,
  footerQuickLinks,
  footerSocialIcons,
  footerUseFullLinks,
} from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const footerContent = {
    footer_text1: "Welcome to your private, secure cloud space.",
    footer_text2:
      "Upload, manage, and access your files with full control and end-to-end protection.",
    quick_links_text: "Quick links",
    usefullInfoText: "Useful Information",
    StayTuned: "Stay tuned!",
    stay_tuned_text: "Fresh updates and news—right where you need them",
    email_placeholder: "Email address",
    emailButton: "Subscribe",
    copyright: "© 2025 Ai All Rights Reserved.",
  };
  return (
    <div className="footerWrapper mx-auto max-w-7xl items-center justify-between mt-5 mb-5 md:px-6 px-4 lg:px-4 xl:px-0">
      <div className="border-1 border-[#43E1A9] footerInnerWrap grid grid-cols-12 gap-3 bg-[url(/images/footer-bg.png)] bg-cover bg-no-repeat rounded-2xl xl:p-8 lg:p-8 md:p-8 p-3">
        <div className="xl:col-span-4 lg:col-span-4 col-span-12 xl:pr-12 lg:pr-12 md:col-span-12 pr-0 pt-4">
          <Link
            href="#"
            className="mt-12 text-white font-bold bg-[#43E1A9] rounded-2xl xl:text-3xl lg:text-lg xl:py-4 xl:px-13 lg:py-4 lg:px-7 md:py-4 md:px-4 py-4 px-4"
          >
            Logo
          </Link>
          <p className="mt-12 text-white text-lg">
            {footerContent.footer_text1}
            <br />
            <br className="" />
            {footerContent.footer_text2}
          </p>
          <div className="socialIcons flex gap-5 items-center xl:mt-7 lg:mt-5 md:mt-5 mt-5">
            {footerSocialIcons.map((item) => (
              <Link href={item.link} key={item.name}>
                <Image
                  src={item.icon}
                  width={500}
                  height={500}
                  className="w-8"
                  alt={item.name}
                />
              </Link>
            ))}
          </div>
          <div className="socialIcons flex gap-2 items-center xl:mt-7 lg:mt-5 md:mt-5 mt-5">
            {footerPaymentIcons.map((item) => (
              <div key={item.name} className="">
                <Image
                  src={item.icon}
                  width={500}
                  height={500}
                  className="w-17 h-17 object-contain"
                  alt={item.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6 xl:col-span-2 lg:col-span-2 xl:text-center lg:text-center md:text-left text-center xl:mt-0 lg:mt-0 md:mt-5">
          <p className="text-[#43E1A9] xl:text-lg text-lg lg:text-[1rem]">
            {footerContent.quick_links_text}
          </p>
          <div className="footerLinks flex flex-col xl:items-center lg:items-center md:items-start items-center gap-3 mt-8">
            {footerQuickLinks.map((link) => (
              <Link
                href={link.link}
                key={link.name}
                className="text-center rounded-full border-1 border-[#43E1A9] max-w-[130px] min-w-[130px] text-white py-2 xl:text-[1rem] lg:text-[0.900rem] md:text-[0.800rem] text-[0.750rem]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-6 xl:col-span-2 lg:col-span-2 xl:text-center lg:text-center md:text-left text-center xl:mt-0 lg:mt-0 md:mt-5">
          <p className="text-[#43E1A9] xl:text-lg text-lg lg:text-[1rem]">
            {footerContent.usefullInfoText}
          </p>
          <div className="footerLinks flex flex-col xl:items-center lg:items-center md:items-start items-center gap-3 mt-8">
            {footerUseFullLinks.map((link) => (
              <Link
                href={link.link}
                key={link.name}
                className="text-center rounded-full border-1 border-[#43E1A9] max-w-[130px] min-w-[130px] text-white py-2 xl:text-[1rem] lg:text-[0.900rem] md:text-[0.800rem] text-[0.750rem]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full col-span-12 lg:col-span-4 xl:col-span-4 xl:pl-5 lg:pl-5">
          <h4 className="text-[#FDFDFD] xl:text-[1.25rem] lg:text-[1.25rem] md:text-[1.25rem] text-[1.25rem] xl:mt-0 lg:mt-0 mt-5">
            {footerContent.StayTuned}
          </h4>
          <p className="text-[#FDFDFD] xl:text-lg lg:text-lg xl:w-[60%] lg:w-[80%] xl:mt-5 lg:mt-5 md:mt-5 mt-5">
            {footerContent.stay_tuned_text}
          </p>
          <div className="inputField relative xl:mt-8 lg:mt-8 mt-8 xl:w-[80%] lg:w-[80%] md:w-[60%] w-[100%]">
            <input
              type="email"
              placeholder={footerContent.email_placeholder}
              className="w-full outline-0 rounded-full p-3 pr-[8rem] border border-[#43E1A9] text-white/30 xl:text-[1rem] lg:text-[1rem] md:text-[1rem] bg-transparent"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer bg-[url(/images/global/btn-bg.png)] bg-cover bg-no-repeat rounded-full px-6 py-2 text-[#FDFDFD] xl:text-[1rem] lg:text-[1rem] text-[1rem] border border-[#43E1A9] backdrop-blur-[20px]">
              {footerContent.emailButton}
            </button>
          </div>

          {/* <div className="inputField  xl:mt-8 lg:mt-8 mt-8">
            <input
              type="email"
              placeholder={footerContent.email_placeholder}
              className=" outline-0 rounded-full p-3 border-1 border-[#43E1A9] text-white/30 xl:text-[1rem] lg:text-[1rem] md:text-[1rem] xl:w-[75%] lg:w-[80%] md:w-[60%] w-[88%]"
            />
            <span className=" cursor-pointer bg-[url(/images/global/btn-bg.png)] bg-cover bg-no-repeat rounded-full xl:p-[3.8%] lg:p-[4.8%] md:p-[2.2%] p-[4.7%] text-[#FDFDFD] xl:ml-[-20%] lg:ml-[-20%] md:ml-[-10%] ml-[-20%] xl:text-[1rem] lg:text-[1rem] text-[1rem] border-1 border-[#43E1A9] backdrop-blur-[20px]">
              {footerContent.emailButton}
            </span>
          </div> */}
          <span className="copyRight text-[#39FF14] xl:text-sm xl:w-[82%] lg:w-[95%] w-[98%] text-right block xl:mt-10 lg:mt-10 mt-10">
            {footerContent.copyright}
          </span>
        </div>
      </div>
    </div>
  );
}
