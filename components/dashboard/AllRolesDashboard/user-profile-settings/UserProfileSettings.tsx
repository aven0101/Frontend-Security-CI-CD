"use client";

import { useEffect, useState } from "react";
import ProfileInfoTab from "./tabs/ProfileInfoTab";
import SecurityTab from "./tabs/SecurityTab";
import SubscriptionManagementTab from "./tabs/SubscriptionManagementTab";
import SettingsTab from "./tabs/SettingsTab";

type TabKey = "profile" | "security" | "subscription" | "settings";

export default function UserProfileSettings({ role }: { role?: string }) {
    const [active, setActive] = useState<TabKey>("profile");

    // Normalize role to admin|manager
    const normalizedRole: "admin" | "manager" = (role || "").toLowerCase().includes("manager")
        ? "manager"
        : "admin";

    const allTabs: { key: TabKey; label: string }[] = [
        { key: "profile", label: "Profile Info" },
        { key: "security", label: "Security" },
        { key: "subscription", label: "Subscription Management" },
        { key: "settings", label: "Setting" },
    ];

    const tabs = normalizedRole === "manager"
        ? allTabs.filter(t => t.key !== "subscription" && t.key !== "settings")
        : allTabs;

    // If current active tab is not visible for the role, reset to first available tab
    useEffect(() => {
        if (!tabs.find(t => t.key === active)) {
            setActive(tabs[0].key);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [normalizedRole]);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="pt-6">
                    <h1 className="text-[28px] font-semibold text-[#97C1A9]">User Profile</h1>
                </div>

                {/* Vertical Tabs Layout */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
                    {/* Sidebar */}
                    <aside className="bg-[#F5F5F5] rounded-xl py-5 px-4 border border-[#E5E7EB]">
                        <nav aria-label="Profile tabs" className="sticky top-6">
                            <ul className="space-y-2">
                                {tabs.map((t) => {
                                    const isActive = active === t.key;
                                    return (
                                        <li key={t.key}>
                                            <button
                                                role="tab"
                                                aria-selected={isActive}
                                                onClick={() => setActive(t.key)}
                                                className={`block w-full text-left rounded-[12px] py-3 px-5 transition-colors ${
                                                    isActive
                                                    ? "bg-[#97C1A9] text-white font-medium shadow-sm"
                                                    : "text-[#6B7280] hover:bg-[#EAF3EF] hover:text-[#2E3A33]"
                                                }`}
                                            >
                                                {t.label}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </aside>

                    {/* Active Panel */}
                    <section>
                        {active === "profile" && (
                            <div role="tabpanel">
                                <ProfileInfoTab />
                            </div>
                        )}

                        {active === "security" && (
                            <div role="tabpanel">
                                <SecurityTab />
                            </div>
                        )}

                        {active === "subscription" && normalizedRole !== "manager" && (
                            <div role="tabpanel">
                                <SubscriptionManagementTab />
                            </div>
                        )}

                        {active === "settings" && normalizedRole !== "manager" && (
                            <div role="tabpanel">
                                <SettingsTab />
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
 