"use client";

import { useState } from "react";
import GeneralDashboard from "./GeneralDashboard";
import AdminDashboardTeam from "./admin/AdminDashboardTeam";

export default function BusinessAdminDashboard() {
  const [selectedDashboard, setSelectedDashboard] = useState("general");

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[#97C1A9] text-4xl">Welcome UserName Admin</h1>
        <div className="border-1 border-[#97C1A9] rounded-full py-0 flex">
          <span onClick={() => setSelectedDashboard("team")} className={`${selectedDashboard == 'team' ? 'bg-[#97C1A9] text-white' : 'text-[#838884]'} px-3 py-2 rounded-full min-w-[130px] w-full block text-center cursor-pointer`}>Team-Based</span>
          <span onClick={() => setSelectedDashboard("general")} className={`${selectedDashboard == 'general' ? 'bg-[#97C1A9] text-white' : 'text-[#838884]'} px-3 py-2 rounded-full min-w-[130px] w-full block text-center cursor-pointer`}>General</span>
        </div>
      </div>
      {selectedDashboard === "general" && <GeneralDashboard />}
      {selectedDashboard === "team" && <AdminDashboardTeam />}
    </>
  );
}
