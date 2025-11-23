"use client";
export default function ContactCards({ id = "contact" }) {
  const cards = [
    {
      title: "Contact Email",
      buttonText: "Email us",
      image: "/images/contact/contact1.png",
      width: 79,
      height: 58,
    },
    {
      title: "Contact Number",
      buttonText: "Schedule a Call",
      image: "/images/contact/contact2.png",
      width: 62,
      height: 62,
    },
    {
      title: "Live Chat",
      buttonText: "Coming Soon",
      image: "/images/contact/contact3.png",
      width: 80,
      height: 59,
    },
  ];
  return (
    <div
      className={`
    ${
      id === "support"
        ? "lg:max-w-[928px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[14px]"
        : "max-w-[1108px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
    }
    
    w-full  `}
    >
      {cards.map((card, index) => {
        const showTimings = id === "billing" && index === 1;

        return (
          <div
            key={index}
            className={`
      ${id === "support" ? "w-full lg:max-w-[300px] px-4" : "px-6"}
              group flex items-center justify-between rounded-2xl border border-[#43E1A9] bg-transparent  py-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(67,225,169,0.4)] hover:border-[#5ff0c1] hover:-translate-y-2 cursor-pointer`}
          >
            <div>
              <span className="block font-belanosima text-2xl font-normal capitalize mb-3">
                {card.title}
              </span>
              {showTimings ? (
                <>
                  <span className="block font-belanosima text-[16px] font-normal capitalize text-[#43E1A9]">
                    Mon - Fri (9am to 5pm)
                  </span>
                  <span className="block font-belanosima text-[16px] font-normal capitalize text-[#43E1A9]">
                    Sat - Sun (Closed)
                  </span>
                </>
              ) : (
                <button className="rounded-xl border border-white px-4 py-1.5 text-sm font-belanosima capitalize cursor-pointer transition-all duration-300">
                  {id === "support" && card.buttonText === "Schedule a Call"
                    ? "Schedule a Call Back"
                    : card.buttonText}
                </button>
              )}
            </div>
            <div>
              <img
                src={card.image}
                alt={card.title}
                width={card.width}
                height={card.height}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
