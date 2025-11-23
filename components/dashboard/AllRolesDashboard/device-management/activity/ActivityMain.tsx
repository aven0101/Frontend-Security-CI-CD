"use client";

import React, { useMemo, useState } from "react";
import ProfileSidebar from "../DeviceManagementSideBar";
import FilterSearchBar from "../FilterSearchBar";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import TipsAndQuickLinks from "../TipsAndQuickLinks";

type ActivityCard = {
  id: string;
  os: string;
  device: string;
  lastLogin: string;
  location: string;
  totals: {
    uploads: number;
    downloads: number;
    shares: number;
    syncs: number;
  };
};

const sampleCards: ActivityCard[] = [
  {
    id: "1",
    os: "Windows 11 Pro",
    device: "HP Desktop-XXXXX",
    lastLogin: "yesterday at 7:45 AM",
    location: "New York, USA",
    totals: { uploads: 102, downloads: 102, shares: 102, syncs: 102 },
  },
  {
    id: "2",
    os: "Windows 11 Pro",
    device: "HP Desktop-XXXXX",
    lastLogin: "yesterday at 7:45 AM",
    location: "New York, USA",
    totals: { uploads: 102, downloads: 102, shares: 102, syncs: 102 },
  },
  {
    id: "3",
    os: "Windows 11 Pro",
    device: "HP Desktop-XXXXX",
    lastLogin: "yesterday at 7:45 AM",
    location: "New York, USA",
    totals: { uploads: 102, downloads: 102, shares: 102, syncs: 102 },
  },
];

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-full border border-[#E8EFEA] px-3 py-2 text-xs text-[#2E3A33] bg-white">
      <span className="text-[#6B7280]">{label}</span>
      <span className="ml-4 rounded-full bg-[#F7FBF9] px-2 py-0.5 text-[#2E3A33]">
        {value}
      </span>
    </div>
  );
}

export default function ActivityMain() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Set<string>>(new Set());

  const cards = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleCards.filter(
      (c) =>
        !q ||
        c.os.toLowerCase().includes(q) ||
        c.device.toLowerCase().includes(q)
    );
  }, [query]);

  const toggleFilter = (id: string) => {
    setFilters((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex gap-6">
      <ProfileSidebar />

      <main className="flex-1">
        {/* Heading */}
        <h1 className="mb-4 text-3xl font-semibold text-[#98C1A9]">Activity</h1>

        {/* Controls row */}
        <FilterSearchBar
          className="mb-4"
          filterTitle="Filter"
          options={[
            { id: "Windows", label: "Windows" },
            { id: "Mac", label: "Mac" },
            { id: "Mobile", label: "Mobile" },
          ]}
          selected={filters}
          onToggle={toggleFilter}
          onClear={() => setFilters(new Set())}
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder="Search..."
        />

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-[#E8EFEA] bg-white p-4 shadow-sm"
            >
              <div className="mb-2 grid place-items-center">
                <ComputerDesktopIcon className="h-10 w-10 text-[#97C1A9]" />
              </div>
              <div className="mb-1 text-center text-[13px] font-semibold text-[#2E3A33]">
                {c.os}
              </div>
              <div className="mb-2 text-center text-xs text-[#6B7280]">
                {c.device}
              </div>
              <div className="mb-4 text-center text-[11px] text-[#6B7280]">
                Last Login {c.lastLogin}
                <br />
                {c.location}
              </div>

              <div className="space-y-2">
                <StatPill
                  label="Total upload"
                  value={`${c.totals.uploads} files`}
                />
                <StatPill
                  label="Total download"
                  value={`${c.totals.downloads} files`}
                />
                <StatPill
                  label="Total share"
                  value={`${c.totals.shares} files`}
                />
                <StatPill
                  label="Sync of last login"
                  value={`${c.totals.syncs} files`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tips and Quick Links */}
        <section>
          <TipsAndQuickLinks />
        </section>
      </main>
    </div>
  );
}
