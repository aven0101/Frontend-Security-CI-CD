"use client";

import { useState } from "react";

export default function SettingsTab() {
  const [language, setLanguage] = useState("English");
  const [expiry, setExpiry] = useState<string[]>(["7d", "30d"]);

  const toggleExpiry = (v: string) =>
    setExpiry((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-[28px] font-semibold text-[#97C1A9]">Settings</h2>

      <div
        className="w-full rounded-xl"
        style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}
      >
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Language */}
          <div className="px-6 md:px-8 py-5 border-b border-[#E5E7EB]">
            <div className="text-[#7FAF99] font-semibold mb-4">Language</div>
            <div className="space-y-3 text-[#2E3A33]">
              {["English", "Japanese", "Chinese"].map((l) => (
                <label key={l} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="language" checked={language === l} onChange={() => setLanguage(l)} />
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Link expiry */}
          <div className="px-6 md:px-8 py-5">
            <div className="text-[#7FAF99] font-semibold mb-4">Set Expiry for Shared Links</div>
            <div className="space-y-3 text-[#2E3A33]">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={expiry.includes("none")} onChange={() => toggleExpiry("none")} />
                <span>No Expiry (default)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={expiry.includes("7d")} onChange={() => toggleExpiry("7d")} />
                <span>7 days</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={expiry.includes("30d")} onChange={() => toggleExpiry("30d")} />
                <span>30 days</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button className="bg-[#97C1A9] text-white px-8 py-2.5 rounded-full">SAVE</button>
      </div>
    </div>
  );
}
