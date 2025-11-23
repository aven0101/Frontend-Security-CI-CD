"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Activity {
  id: number;
  text: string;
  time: string;
  icon: string;
}

const RecentActivities: React.FC = () => {
  const [open, setOpen] = useState(true);

  const activities: Activity[] = [
    {
      id: 1,
      text: "Uploaded TeamPhoto.jpg",
      time: "3:42 PM",
      icon: "/user-dashboard/upload.png",
    },
    {
      id: 2,
      text: "Shared Notes.pdf with 2 users",
      time: "2:20 PM",
      icon: "/user-dashboard/share.png",
    },
    {
      id: 3,
      text: "Deleted Backup2024.zip",
      time: "11:17 AM",
      icon: "/user-dashboard/delete.png",
    },
    {
      id: 4,
      text: "Renamed Draft1.docx to FinalDraft.docx",
      time: "5:00 PM",
      icon: "/user-dashboard/edit.png",
    },
  ];

  return (
    <section
      aria-label="Recent activities"
      className="mt-4"
    >
      {/* Header */}
      <button
        type="button"
        className="w-full flex items-center justify-between py-4 bg-white cursor-pointer rounded-2xl px-3 shadow-[0px_0px_6.5px_0px_#00000040] relative z-20"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-[#97C1A9] font-medium text-[17px]">
            Recent Activities
          </h3>
          <span className="inline-flex items-center justify-center min-w-[19px] h-[19px] leading-[22px] px-2 rounded-full bg-[red] text-[white] text-[12px] font-semibold">
            +5
          </span>
        </div>
        <svg
          className={`h-5 w-5 text-[#2A8A64] transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown content */}
      {open && (
        <div className="bg-[#F7F9F8] px-8 py-6 rounded-2xl relative z-10 max-w-[98%] w-full mx-auto">
          {/* Date line with green Today */}
          <div className="text-[13px] text-[#838884] mb-5">
            April 12, 2024 -{" "}
            <span className="text-[#97C1A9] font-medium">Today</span>
          </div>

          <div className="relative">
            {/* Activities */}
            {activities.map((a, index) => (
              <div key={a.id} className="flex items-center mb-1 relative z-10">
                {/* Time */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-right text-[11px] text-gray-500 mt-[4px]">
                    {a.time}
                  </div>

                  {/* Icon + connector */}
                  <div className="relative flex flex-col items-center justify-center gap-1">
                    <Image src={a.icon} alt={a.text} width={500} height={500} className="w-8 object-cover h-auto" />
                    {/* small connector to line */}
                    {index < activities.length - 1 && (
                      <svg
                        width="2"
                        height="16"
                        viewBox="0 0 2 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="1.51435" height="15.9007" fill="#97C1A9" />
                      </svg>
                    )}
                  </div>
                </div>
                {/* Text */}
                <div className="ml-5 mt-[3px] text-[14px] text-[#5B6B62]">
                  {a.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentActivities;
