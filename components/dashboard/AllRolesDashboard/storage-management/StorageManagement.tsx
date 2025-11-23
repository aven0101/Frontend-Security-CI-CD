"use client";

import { useState } from "react";
import StorageTab from "./tabs/StorageTab";
import DevicesTab from "./tabs/DevicesTab";
import SecurityTab from "./tabs/SecurityTab";
import RetentionTab from "./tabs/RetentionTab";

type SidebarKey = "storage" | "devices" | "security" | "retention";

export default function StorageManagement() {
    const [active, setActive] = useState<SidebarKey>("storage");

    const sidebar: { key: SidebarKey; label: string }[] = [
        { key: "storage", label: "Storage" },
        { key: "devices", label: "Devices" },
        { key: "security", label: "Security" },
        { key: "retention", label: "Retention" },
    ];

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="pt-6">
                    <h1 className="text-[28px] font-semibold text-[#97C1A9]">Storage</h1>
                </div>

                {/* Layout: sidebar + content */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
                    {/* Sidebar */}
                    <aside className="bg-[#F5F5F5] rounded-xl py-5 px-4 border border-[#E5E7EB]">
                        <nav aria-label="Storage nav" className="sticky top-6">
                            <ul className="space-y-2">
                                {sidebar.map((s) => {
                                    const isActive = active === s.key;
                                    return (
                                        <li key={s.key}>
                                            <button
                                                onClick={() => setActive(s.key)}
                                                className={`block w-full text-left rounded-[12px] py-3 px-5 transition-colors ${
                                                    isActive
                                                        ? "bg-[#97C1A9] text-white font-medium shadow-sm"
                                                        : "text-[#6B7280] hover:bg-[#97C1A9] hover:text-[#FFFFFF]"
                                                }`}
                                            >
                                                {s.label}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </aside>

                    {/* Content */}
                                <section>
                                    {active === "storage" && <StorageTab />}
                                    {active === "devices" && <DevicesTab />}
                                    {active === "security" && <SecurityTab />}
                                    {active === "retention" && <RetentionTab />}
                                </section>
                </div>
            </div>
        </div>
    );
}
