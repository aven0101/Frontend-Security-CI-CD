import { CalendarClock, Headphones, MapPin } from "lucide-react";

export default function ContactSupport() {
  return (
    <section className="xl:mb-20 lg:mb-20 
      md:mb-20 mb-13 xl:mt-15 lg:mt-14 md:mt-10 mt-10  w-full max-w-[1298px] mx-auto
       border border-[#1C825E] rounded-[16px] p-6 md:p-10 bg-gradient-to-br
        from-[#1C825E]/20 to-transparent text-white font-aptos">
      {/* Section Heading */}
      <h2 className="text-[#FFFFFF99] font-extrabold text-[14px] md:text-[16px] mb-6 md:mb-8">
        Support Hours
      </h2>

      {/* Support List */}
      <div className="flex flex-col gap-5 md:gap-6">
        {/* Technical Support */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="bg-[#1C825E]/30 p-2.5 sm:p-3 rounded-full shrink-0">
            <Headphones className="text-[#43E1A9]" size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-[16px] sm:text-[18px]">
              Technical
            </h3>
            <p className="text-[#43E1A9] font-semibold text-[14px] sm:text-[16px]">
              24 Hours
            </p>
          </div>
        </div>

        {/* General Support */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="bg-[#1C825E]/30 p-2.5 sm:p-3 rounded-full shrink-0">
            <CalendarClock className="text-[#43E1A9]" size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-[16px] sm:text-[18px]">
              General Support
            </h3>
            <p className="text-[#43E1A9] font-semibold text-[14px] sm:text-[16px]">
              Mon-Fri, 9am-6pm (UTC +9)
            </p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-8 md:mt-10">
        <h2 className="text-[#FFFFFF99] font-extrabold text-[14px] md:text-[16px] mb-3 md:mb-4">
          Location
        </h2>
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="bg-[#1C825E]/30 p-2.5 sm:p-3 rounded-full shrink-0">
            <MapPin className="text-[#43E1A9]" size={24} />
          </div>
          <p className="font-extrabold text-[16px] sm:text-[18px]">
            Kobe, Japan
          </p>
        </div>
      </div>
    </section>
  );
}
