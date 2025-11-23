"use client";

import { useState } from "react";
import GeneralDashboard from "./GeneralDashboard";
import ManagerDashboardTeam from "./manager/ManagerDashboardTeam";

export default function BusinessManagerDashboard() {
    const [selectedDashboard, setSelectedDashboard] = useState("general");

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-[#97C1A9] text-4xl">Welcome UserName Manager</h1>
                    <div className="border-1 border-[#97C1A9] rounded-full py-0 flex">
                        <span
                            onClick={() => setSelectedDashboard("team")}
                            className={`${selectedDashboard == "team" ? "bg-[#97C1A9] text-white" : "text-[#838884]"} px-3 py-2 rounded-full min-w-[130px] w-full block text-center cursor-pointer`}
                        >
                            Team-Based
                        </span>
                        <span
                            onClick={() => setSelectedDashboard("general")}
                            className={`${selectedDashboard == "general" ? "bg-[#97C1A9] text-white" : "text-[#838884]"} px-3 py-2 rounded-full min-w-[130px] w-full block text-center cursor-pointer`}
                        >
                            General
                        </span>
                    </div>
                </div>
                <p className="text-[#838884] text-sm">Here’s a quick look at your private cloud.</p>
            </div>

            {selectedDashboard === "general" && <GeneralDashboard />}
            {selectedDashboard === "team" && <ManagerDashboardTeam />}
        </>
    );
}