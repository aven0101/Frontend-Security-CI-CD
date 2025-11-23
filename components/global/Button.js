import Link from "next/link";

export default function Button({ link, text }) {
    return (
        <div className="relative cursor-pointer group w-[100%] xl:min-h-[56px] lg:min-h-[56px] min-h-[45px] md:min-h-[56px] bg-[url(/images/global/btn-bg.png)] bg-cover bg-no-repeat rounded-full">
            <div className="rounded-full absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Link href={link} className="text-[#FDFDFD] relative font-bold border-1 border-[#43E1A9] rounded-full w-[100%] xl:min-h-[56px] lg:min-h-[56px] min-h-[45px] md:min-h-[56px] flex items-center justify-center z-20 xl:text-lg lg:text-lg md:text-[1rem] text-[0.8rem] xl:p-0 lg:p-0 md:p-0 px-4">
                {text}
            </Link>
        </div>
    );
}