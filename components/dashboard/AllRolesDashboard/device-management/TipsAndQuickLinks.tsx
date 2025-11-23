"use client";

import React, { FC } from "react";

const TipsAndQuickLinks: FC = () => {
  return (
    <div className="mt-6 rounded-xl border border-[#E8EFEA] bg-white p-4">
      <h3 className="text-[#6B8E79] font-semibold mb-4 text-base">
        Tips and Quick Links
      </h3>

      <div className="flex flex-wrap gap-3">
        <button className="border border-[#97C1A9] text-[#2E3A33] rounded-full px-4 py-2 text-sm hover:bg-[#E6F1EB] transition-colors">
          Reset password
        </button>

        <button className="border border-[#97C1A9] text-[#2E3A33] rounded-full px-4 py-2 text-sm hover:bg-[#E6F1EB] transition-colors">
          Update info
        </button>

        <button className="border border-[#97C1A9] text-[#2E3A33] rounded-full px-4 py-2 text-sm hover:bg-[#E6F1EB] transition-colors">
          Change plan
        </button>
      </div>
    </div>
  );
};

export default TipsAndQuickLinks;
