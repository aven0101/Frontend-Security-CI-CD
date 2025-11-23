import Image from "next/image";

export default function GetStartedCards({ heading, text, icon }) {
    return (
        <>
            <div className="z-10 relative border-1 rounded-2xl xl:p-4 lg:p-2 p-3 border-[#43E1A9] text-[#fdfdfd] bg-[url(/images/home-page/get-started-bg.png)] bg-cover bg-no-repeat h-full flex flex-col justify-between overflow-hidden">
                <div className="flex items-start lg:flex-row md:flex-col-reverse">
                    <div className="contentWrap flex flex-col gap-2 xl:w-[65%] lg:w-[66%] md:w-[100%] w-[70%]">
                        <span className="font-bold xl:text-[1.25rem] lg:text-[1rem]">{heading}</span>
                        <span className="xl:text-[0.938rem] lg:text-[0.900rem] md:text-[0.800rem]">{text}</span>
                    </div>
                    <div className="iconWrap xl:w-[35%] lg:w-[30%] w-[30%] md:w-[50%]">
                        <Image src={icon} width={500} height={500} className="w-3xl scale-160" alt="Icon" />
                    </div>
                </div>
            </div>
        </>
    );
}