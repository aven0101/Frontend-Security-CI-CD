import Button from "@/components/global/Button";
import GetStartedCards from "@/components/home/GetStartedCards";
import PowerfullFeatures from "@/components/home/PowerfullFeatures";
import HomeReviews from "@/components/home/Reviews";
import Image from "next/image";

export default function Home() {
  const homePageContent = {
    banner_heading: "Your Private Cloud. Secure, Simple, Yours.",
    banner_para1: "Securely upload, share, and manage your files",
    banner_para2: "with",
    banner_para3:
      "no privacy compromise and seamless sync to your preferred device",
    banner_icon1: "/icons/home-page/banner-file.png",
    banner_icon2: "/icons/home-page/banner-lock.png",
    banner_button1: "Start For Free",
    banner_button2: "Explore Premium Features",
    powerfull_feature_heading: "Powerful Features at Your Fingertips.",
    get_started_section_heading: "Get Started in Minutes",
    get_started_section_para:
      "Upload, manage, and access your files instantly—with built-in privacy and effortless control.",
    get_started_card_1_heading: "Upload Your files",
    get_started_card_1_text: "Drag and drop your file with secure encryption",
    get_started_card_1_icon: "/icons/home-page/get-started-1.png",
    get_started_card_2_heading: "Share Securely",
    get_started_card_2_text:
      "Instantly generate a secure link you can copy and send to anyone",
    get_started_card_2_icon: "/icons/home-page/get-started-2.png",
    get_started_card_3_heading: "Control Access",
    get_started_card_3_text: "Set password protection and privacy settings",
    get_started_card_3_icon: "/icons/home-page/get-started-3.png",
    get_started_card_4_heading: "Sync to Your Device",
    get_started_card_4_text:
      "Synced files are automatically updated on your chosen device",
    get_started_card_4_icon: "/icons/home-page/get-started-4.png",
    why_choose_us_heading: "Why Users Choose Us",
    why_choose_us_para:
      "Trusted by users who value privacy, security and simplicity",
    bottom_section_heading1: "Love the free version?",
    bottom_section_para1:
      "You'll love Premium even more. More features. More freedom.",
    bottom_section_cta1: "See What Premium Offers",
    bottom_section_heading2: "Want total control and complete privacy?",
    bottom_section_para2:
      "You're in the right place, we don't sell your personal data.",
    bottom_section_cta2: "Start for Free",
  };

  const homePageReviews = [
    {
      review:
        "OHHHH Thanks god !!!! Finally there is someone making it for  me to use on my projects. Love ya",
      name: "John Williams",
      rating: "4.5",
      avatar: "/icons/home-page/avatar.png",
    },
    {
      review:
        "OHHHH Thanks god !!!! Finally there is someone making it for  me to use on my projects. Love ya",
      name: "John Williams",
      rating: "4",
      avatar: "/icons/home-page/avatar.png",
    },
    {
      review:
        "OHHHH Thanks god !!!! Finally there is someone making it for  me to use on my projects. Love ya",
      name: "John Williams",
      rating: "5",
      avatar: "/icons/home-page/avatar.png",
    },
    {
      review:
        "OHHHH Thanks god !!!! Finally there is someone making it for  me to use on my projects. Love ya",
      name: "John Williams",
      rating: "3.5",
      avatar: "/icons/home-page/avatar.png",
    },
    {
      review:
        "OHHHH Thanks god !!!! Finally there is someone making it for  me to use on my projects. Love ya",
      name: "John Williams",
      rating: "4",
      avatar: "/icons/home-page/avatar.png",
    },
    {
      review:
        "OHHHH Thanks god !!!! Finally there is someone making it for  me to use on my projects. Love ya",
      name: "John Williams",
      rating: "4.7",
      avatar: "/icons/home-page/avatar.png",
    },
  ];

  return (
    <div className="home-page">
      {/* Banner Section Start */}
      <div className="bannerSection relative lg:mt-50 mt-30 lg:mb-25 mb-15 ">
        <Image
          src={"/images/contact/home-icon1.png"}
          alt="icon"
          width={300}
          height={300}
          // className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] xl:w-[300px] xl:h-[300px]  absolute -left-5 lg:-left-30 lg:top-0 -top-5"
          className="
    w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] 
    lg:w-[200px] lg:h-[200px] xl:w-[300px] xl:h-[300px]  
    absolute -left-2 lg:-left-20 lg:1top-5 -top-5
    opacity-40 sm:opacity-40 md:opacity-40 lg:opacity-40 xl:opacity-100
  "
        />
        <Image
          src={"/images/contact/home-icon2.png"}
          alt="icon"
          width={300}
          height={300}
          // className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] xl:w-[300px] xl:h-[300px] absolute right-0 top-40 lg:top-70"
          className="
    w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] 
    lg:w-[200px] lg:h-[200px] xl:w-[300px] xl:h-[300px]  
    absolute right-0 top-40 lg:top-70
    opacity-40 sm:opacity-40 md:opacity-40 lg:opacity-40 xl:opacity-100
  "
        />

        <h1 className="mainHeading text-[#FDFDFD] font-extrabold text-center m-auto xl:max-w-[70%] xl:leading-[5.125rem] lg:leading-[5rem] md:leading-[4rem] leading-[2rem] xl:text-[5.125rem] lg:text-[5.125rem] md:text-[4rem] xs:text-[1rem] text-[2rem]">
          {homePageContent.banner_heading}
        </h1>
        <div className="w-full mt-[20px] text-center relative">
          <h2 className="font-[Aptos] font-bold text-white text-[16px] md:text-[20px] lg:text-[30px] leading-[120%] capitalize flex flex-col items-center justify-center text-center">
            <span className="flex flex-wrap justify-center items-center gap-2">
              Securely Upload, Share, And Manage Your Files{" "}
              <span className="lg:ml-0 xl:ml-20 md:ml-0 sm:ml-0 ml-0">
                With{" "}
              </span>
            </span>
            <Image
              src={homePageContent.banner_icon1}
              alt="icon"
              width={100}
              height={100}
              className=" absolute right-0 -top-20 lg:right-75 lg:-top-10 xl:right-75 xl:-top-10  opacity-40 sm:opacity-40 md:opacity-40 lg:opacity-40 xl:opacity-100"
            />{" "}
          </h2>
        </div>
        <div className="w-full text-center relative">
          <h2 className="font-[Aptos] font-bold text-white text-[16px] md:text-[20px] lg:text-[30px] leading-[120%] capitalize flex flex-col items-center justify-center text-center">
            <Image
              src={homePageContent.banner_icon2}
              alt="icon"
              width={100}
              height={100}
              className="absolute left-0 top-0  lg:left-20 lg:-top-10 xl:left-20 xl:-top-10   opacity-40 sm:opacity-40 md:opacity-40 lg:opacity-40 xl:opacity-100"
            />{" "}
            <span className=" text-white lg:text-[30px] leading-[120%] flex flex-wrap justify-center items-center gap-2 mt-1">
              No Privacy Compromise And Seamless Sync To Your Preferred Device
            </span>
          </h2>
        </div>

        {/* <div className="xl:max-w-[100%] text-center">
          <span className="text-[#FDFDFD] text-center font-bold xl:inline-block lg:inline-block md:inline-block hidden m-auto xl:text-3xl lg:text-[1.750rem] md:text-[1.250rem] text-[1rem]">
            <p className="inline-block align-middle">
              {homePageContent.banner_para1}
              {""}
            </p>
            <Image
              src={homePageContent.banner_icon1}
              width={500}
              height={500}
              alt="icon"
              className="inline-block align-middle xl:w-30 lg:w-30 md:w-25 w-12 mt-[-18px] ml-[-20px]"
            />{" "}
            <p className="inline-block align-middle">
              {homePageContent.banner_para2}
              {""}
            </p>
            <br className="hidden md:block lg:block xl:block" />
            <Image
              src={homePageContent.banner_icon2}
              width={500}
              height={500}
              alt="icon"
              className="inline-block align-middle xl:w-30 lg:w-30 md:w-25 w-12 xl:mt-[-5rem] lg:mt-[-5rem] md:mt-[-5rem]"
            />
            {""}
            <p className="inline-block align-middle xl:mt-[-3.5rem] lg:mt-[-3.5rem] md:mt-[-3.5rem]">
              {homePageContent.banner_para3}
              {""}
            </p>
          </span>
          <span className="text-[#FDFDFD] text-center font-bold text-[1rem] inline-block xl:hidden lg:hidden md:hidden">
            <p className="inline-block align-middle mt-2">
              {homePageContent.banner_para1} {homePageContent.banner_para2}{" "}
              {homePageContent.banner_para3}
            </p>
          </span>
        </div> */}

        <div className="flex items-center justify-center xl:gap-20 lg:gap-15 md:gap-10 gap-5 mt-[40px]">
          <div className="xl:min-w-[240px] xl:max-w-[240px] lg:min-w-[230px] lg:max-w-[230px] md:min-w-[210px] md:max-w-[210px] w-auto flex ">
            <Button link={"#"} text={homePageContent.banner_button1} />
          </div>
          <div className="xl:min-w-[240px] xl:max-w-[240px] lg:min-w-[230px] lg:max-w-[230px] md:min-w-[210px] md:max-w-[210px] w-auto flex">
            <Button link={"#"} text={homePageContent.banner_button2} />
          </div>
        </div>
      </div>
      {/* Banner Section End */}

      {/* Powerfull Features Start */}
      <div className="powerfullFeatures xl:mt-15 lg:mt-14 md:mt-10 mt-10">
        <h2 className="text-[#fdfdfd] font-extrabold text-center m-auto xl:leading-[4.2rem] lg:leading-[4.2rem] md:leading-[3.2rem] leading-[2.2rem] xl:max-w-[45%] lg:max-w-[55%] md:max-w-[55%] max-w-[80%] xl:text-[4rem] lg:text-[4rem] md:text-[3rem] text-[1.9rem]">
          {homePageContent.powerfull_feature_heading}
        </h2>
        <PowerfullFeatures />
      </div>
      {/* Powerfull Features End */}

      {/* Get Started Section Start */}
      {/* <div className="GetStartedSection xl:mt-8 lg:mt-8 md:mt-6 mt-6"> */}

      <div className="GetStartedSection">
        <h2 className="text-[#fdfdfd] font-extrabold text-center xl:text-[4rem] lg:text-[4rem] md:text-[3rem] text-[1.9rem]">
          {homePageContent.get_started_section_heading}
        </h2>
        <p className="text-[#fdfdfd] text-center font-semibold m-auto xl:text-3xl lg:text-3xl md:text-2xl text-[1.1rem] xl:max-w-[70%] lg:max-w-[90%]">
          {homePageContent.get_started_section_para}
        </p>
        <div className="CardsWrapper flex xl:flex-row lg:flex-row md:flex-row flex-col gap-3 items-stretch xl:mt-9 lg:mt-9 md:mt-6 mt-6">
          <div className="card1 card flex-1 flex flex-col">
            <div className="heading text-[#43E1A9] font-extrabold xl:text-8xl lg:text-7xl text-5xl xl:mb-[-1.60rem] lg:mb-[-1rem] mb-[-0.750rem] flex items-center w-full">
              01
              <Image
                src="/images/home-page/get-started-line.png"
                width={500}
                height={500}
                alt="line"
                className="xl:w-[200px] lg:w-[150px] md:w-[116px] object-cover hidden xl:block lg:block md:block"
              />
            </div>
            <GetStartedCards
              heading={homePageContent.get_started_card_1_heading}
              text={homePageContent.get_started_card_1_text}
              icon={homePageContent.get_started_card_1_icon}
            />
          </div>
          <div className="card2 card flex-1 flex flex-col">
            <div className="heading text-[#43E1A9] font-extrabold xl:text-8xl lg:text-7xl text-5xl xl:mb-[-1.60rem] lg:mb-[-1rem] mb-[-0.750rem] flex items-center w-full">
              02
              <Image
                src="/images/home-page/get-started-line.png"
                width={500}
                height={500}
                alt="line"
                className="xl:w-[200px] lg:w-[150px] md:w-[116px] object-cover hidden xl:block lg:block md:block"
              />
            </div>
            <GetStartedCards
              heading={homePageContent.get_started_card_2_heading}
              text={homePageContent.get_started_card_2_text}
              icon={homePageContent.get_started_card_2_icon}
            />
          </div>
          <div className="card3 card flex-1 flex flex-col">
            <div className="heading text-[#43E1A9] font-extrabold xl:text-8xl lg:text-7xl text-5xl xl:mb-[-1.60rem] lg:mb-[-1rem] mb-[-0.750rem] flex items-center w-full">
              03
              <Image
                src="/images/home-page/get-started-line.png"
                width={500}
                height={500}
                alt="line"
                className="xl:w-[200px] lg:w-[150px] md:w-[116px] object-cover hidden xl:block lg:block md:block"
              />
            </div>
            <GetStartedCards
              heading={homePageContent.get_started_card_3_heading}
              text={homePageContent.get_started_card_3_text}
              icon={homePageContent.get_started_card_3_icon}
            />
          </div>
          <div className="card4 card flex-1 flex flex-col">
            <div className="heading text-[#43E1A9] font-extrabold xl:text-8xl lg:text-7xl text-5xl xl:mb-[-1.60rem] lg:mb-[-1rem] mb-[-0.750rem] flex items-center w-full">
              04
            </div>
            <GetStartedCards
              heading={homePageContent.get_started_card_4_heading}
              text={homePageContent.get_started_card_4_text}
              icon={homePageContent.get_started_card_4_icon}
            />
          </div>
        </div>
      </div>
      {/* Get Started Section End */}

      {/* Why Users Choose Us Start */}
      <div className="xl:mt-15 lg:mt-14 md:mt-10 mt-10 xl:mb-20 lg:mb-20 md:mb-20 mb-13">
        <h2 className="text-[#fdfdfd] font-extrabold text-center m-auto xl:leading-[4.2rem] lg:leading-[4.2rem] md:leading-[3.2rem] leading-[2.2rem] xl:text-[4rem] lg:text-[4rem] md:text-[3rem] text-[1.9rem]">
          {homePageContent.why_choose_us_heading}
        </h2>
        <p className="text-[#fdfdfd] text-center font-semibold m-auto xl:text-3xl lg:text-3xl md:text-2xl text-[1.1rem]">
          {homePageContent.why_choose_us_para}
        </p>
        <div className="xl:mt-10 lg:mt-10 md:mt-12 mt-6 relative">
          <Image
            src={"/images/home-page/left-pol.png"}
            width={500}
            height={500}
            alt="polygon"
            className="absolute xl:w-32 lg:w-32 md:w-32 w-16 xl:top-[-3rem] lg:top-[-3rem] md:top-[-3rem] top-[-1.5rem] left-[-1.4rem] xl:left-[-2.8rem] lg:left-[-2.8rem] md:left-[-2.8rem] z-10"
          />
          <div className="z-20 relative">
            <HomeReviews reviews={homePageReviews} />
          </div>
          <Image
            src={"/images/home-page/right-pol.png"}
            width={500}
            height={500}
            alt="polygon"
            className="absolute xl:w-32 lg:w-32 md:w-32 w-16 xl:bottom-[-3rem] lg:bottom-[-3rem] md:bottom-[-3rem] bottom-[-1rem] right-[-0.8rem] xl:right-[-2.8rem] lg:right-[-1.4rem] md:right-[-1rem] z-10"
          />
        </div>
      </div>
      {/* Why Users Choose Us End */}

      {/* Bottom Section Start */}
      <div className="xl:mb-20 lg:mb-20 md:mb-20 mb-13">
        <div className="border-1 border-[#43E1A9] flex xl:flex-row lg:flex-row md:flex-row flex-col items-center rounded-2xl xl:px-8 px-5 xl:py-5 py-5 bg-[url(/images/footer-bg.png)] bg-cover bg-no-repeat backdrop-blur-lg relative overflow-hidden">
          <Image
            src={"/images/home-page/g-left-shadow.png"}
            width={500}
            height={500}
            alt="shadow"
            className="absolute xl:bottom-[6rem] md:bottom-[5rem] bottom-[15rem] left-0 w-[30%] h-[60%] z-10"
          />
          <Image
            src={"/images/home-page/g-bottom-shadow.png"}
            width={500}
            height={500}
            alt="shadow"
            className="absolute bottom-0 right-0 xl:w-[30%] w-[40%] xl:h-[60%] h-[35%] z-10"
          />
          <div className="content w-full xl:max-w-[58%] lg:max-w-[54%] z-20">
            <div className="xl:max-w-[87%]">
              <div className="content1 text-[#FDFDFD] flex flex-col">
                <span className="font-extrabold xl:text-6xl lg:text-5xl text-2xl">
                  {homePageContent.bottom_section_heading1}
                </span>
                <span className="xl:text-[1.375rem] text-[1rem]">
                  {homePageContent.bottom_section_para1}
                </span>
                <div className="xl:mt-5 mt-5 xl:min-w-[240px] xl:max-w-[240px] lg:min-w-[230px] lg:max-w-[230px] md:min-w-[210px] md:max-w-[210px] min-w-[200px] max-w-[200px] flex">
                  <Button
                    link={"#"}
                    text={homePageContent.bottom_section_cta1}
                  />
                </div>
              </div>
              <hr className="border-[#43E1A9] xl:mt-7 mt-5 xl:mb-7 mb-5" />
              <div className="content1 text-[#FDFDFD] flex flex-col">
                <span className="font-extrabold xl:text-6xl lg:text-5xl text-2xl">
                  {homePageContent.bottom_section_heading2}
                </span>
                <span className="xl:text-[1.375rem] text-[1rem]">
                  {homePageContent.bottom_section_para2}
                </span>
                <div className="xl:mt-5 mt-5 xl:min-w-[240px] xl:max-w-[240px] lg:min-w-[230px] lg:max-w-[230px] md:min-w-[210px] md:max-w-[210px] min-w-[200px] max-w-[200px] flex">
                  <Button
                    link={"#"}
                    text={homePageContent.bottom_section_cta2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="Image w-full xl:max-w-[42%] lg:max-w-[46%] z-20 xl:mt-0 lg:mt-0 md:mt-0 mt-5">
            <Image
              src={"/images/home-page/globe.png"}
              width={500}
              height={500}
              className="w-full h-full"
              alt="globe"
            />
          </div>
        </div>
      </div>
      {/* Bottom Section END */}
    </div>
  );
}
