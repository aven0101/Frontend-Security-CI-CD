'use client';

import React, { FC, useMemo, useState } from "react";
import ProfileSidebar from "../DeviceManagementSideBar";
import { PieChart } from "@mui/x-charts/PieChart";
import DeviceDetailsModal, { DeviceDetails } from "./DeviceDetailsModal";
import { Menu } from "@headlessui/react";
import FilterSearchBar from "../FilterSearchBar";
import {
  InformationCircleIcon,
  ArrowLeftOnRectangleIcon,
  KeyIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  LinkIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

type ChartCardProps = {
  title: string;
  total: string;
  onInfo: () => void;
  series: { id: number; value: number; color: string }[];
};

const ChartCard: React.FC<ChartCardProps> = ({ title, total, onInfo, series }) => {
  // Transform into MUI X PieChart series data
  const data = useMemo(() => series.map((s) => ({ id: s.id, value: s.value, color: s.color })), [series]);
  return (
    <div className="relative rounded-xl border border-[#E8EFEA] bg-white p-4 shadow-sm">
      {/* top-right info button */}
      <button
        aria-label="Device details"
        onClick={onInfo}
        className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-[#97C1A9] text-[#97C1A9] hover:bg-[#97C1A9]/10"
      >
        {/* Check mark icon to match Figma */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-[#97C1A9]" />
        <p className="text-sm font-medium text-[#2E3A33]">{title}</p>
      </div>

      <div className="relative">
        <PieChart
          series={[{
            data: data,
            innerRadius: 60,
            outerRadius: 90,
            paddingAngle: 2,
          }]}
          height={220}
          slotProps={{ legend: { hidden: true } } as any}
        />
        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-2xl font-semibold text-[#2E3A33]">{total}</p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
        {data.map((d, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span>Device {idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define the component type using React.FC (or FC for short)
const OverViewMain: FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceDetails | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<Set<string>>(new Set());

  const devices: DeviceDetails[] = [
    {
      deviceName: "Dell-XPS Windows 11 / v4.5.1",
      deviceId: "WIN-11-XPS-001",
      os: "Windows 11",
      ip: "10.0.0.1",
      location: "New York",
      status: "Active",
      lastAccessed: "2025/08/16",
      firstRegistered: "2025/01/05",
    },
    {
      deviceName: "iPhone12 iOS 17 / v4.5.1",
      deviceId: "IOS-17-IPH12-992",
      os: "iOS 17",
      ip: "10.0.0.2",
      location: "Washington",
      status: "Non-Compliant",
      lastAccessed: "2025/08/15",
      firstRegistered: "2025/02/11",
    },
    {
      deviceName: "MacBook macOS Sonoma / v4.5.1",
      deviceId: "MAC-SNM-2023-44",
      os: "macOS Sonoma",
      ip: "10.0.0.3",
      location: "New York",
      status: "Inactive",
      lastAccessed: "2025/08/12",
      firstRegistered: "2024/12/30",
    },
  ];

  const filtered = devices.filter((d) => {
    const q = query.trim().toLowerCase();
    const matchQuery = !q || d.deviceName.toLowerCase().includes(q);
    const matchStatus = statusFilters.size === 0 || statusFilters.has(d.status);
    return matchQuery && matchStatus;
  });

  const toggleStatus = (s: string) => {
    setStatusFilters((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
  };

  return (
    <div className="flex gap-6">
      <ProfileSidebar />

      <main className="flex-1">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#98C1A9] mb-4">Overview</h1>
        {/* Filter + Search as separate global component */}
        <FilterSearchBar
          className="mb-4"
          options={[
            { id: "Active", label: "Active" },
            { id: "Non-Compliant", label: "Non-Compliant" },
            { id: "Inactive", label: "Inactive" },
          ]}
          selected={statusFilters}
          onToggle={toggleStatus}
          onClear={() => setStatusFilters(new Set())}
          query={query}
          onQueryChange={setQuery}
        />

        {/* Devices table (simplified) */}
        <div className="overflow-hidden rounded-3xl border border-[#E8EFEA] bg-white">
          {/* Header bar */}
          <div className="grid grid-cols-5 bg-[#97C1A9] px-4 py-3 text-left text-[14px] font-medium text-white">
            <div>Device Name</div>
            <div className="ml-6">Status</div>
            <div>Location</div>
            <div>Date</div>
            <div className="text-right pr-2">Actions</div>
          </div>
          {filtered.map((row, idx) => {
            const Icon = (/iphone|android|ios/i.test(row.deviceName) || /iOS|Android/i.test(row.os))
              ? DevicePhoneMobileIcon
              : ComputerDesktopIcon;
            const parts = row.deviceName.split("/");
            const baseName = parts[0]?.trim() || row.deviceName;
            const version = parts[1]?.trim() || "";
            return (
            <div key={idx} className="grid grid-cols-5 items-center px-4 py-3 border-t border-[#F1F5F3] text-sm">
              {/* Device name with compliance and device-type icon */}
              <div className="flex items-start gap-3 min-w-0">
                {row.status === 'Non-Compliant' ? (
                  <span className="mt-0.5 inline-block h-5 w-5 rounded-full border-2 border-[#97C1A9] bg-white" />
                ) : (
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 text-[#97C1A9]" />
                )}
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#97C1A9]" />
                <div className="min-w-0">
                  <div className="truncate text-[#2E3A33]">{baseName}</div>
                  {version && <div className="text-xs text-gray-500 truncate">{version}</div>}
                </div>
              </div>

              {/* Status with icon */}
              <div className="flex items-center gap-2">
                {row.status === 'Non-Compliant' ? (
                  <ShieldExclamationIcon className="h-5 w-5 text-[#97C1A9]" />
                ) : (
                  <LinkIcon className="h-5 w-5 text-[#97C1A9]" />
                )}
                <span className={row.status === 'Active' ? 'text-[#2E7D32]' : row.status === 'Inactive' ? 'text-[#9E9E9E]' : 'text-[#CA8A04]'}>{row.status}</span>
              </div>
              <div>{row.location}</div>
              <div>{row.lastAccessed}</div>
              <div className="text-right">
                <Menu as="div" className="relative inline-block text-left">
                 <Menu.Button className="p-1.5 mr-4 text-[#838884]">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    
  >
    <circle cx="12" cy="4" r="2.5" />
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="12" cy="20" r="2.5" />
  </svg>
</Menu.Button>

                  <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right  rounded-xl border border-[#E8EFEA] bg-white p-1 shadow-lg focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => { setSelectedDevice(row); setShowDetails(true); }}
                          className={(active ? 'bg-[#97C1A9]/10' : '') + ' flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#2E3A33]'}
                        >
                          <InformationCircleIcon className="h-4 w-4 text-[#97C1A9]" />
                          Device details
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={(active ? 'bg-[#97C1A9]/10' : '') + ' flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#2E3A33]'}>
                          <ArrowLeftOnRectangleIcon className="h-4 w-4 text-[#97C1A9]" />
                          Force Logout
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={(active ? 'bg-[#97C1A9]/10' : '') + ' flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#2E3A33]'}>
                          <KeyIcon className="h-4 w-4 text-[#97C1A9]" />
                          Revoke Access
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={(active ? 'bg-[#97C1A9]/10' : '') + ' flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#2E3A33]'}>
                          <ArrowPathIcon className="h-4 w-4 text-[#97C1A9]" />
                          Remote Wipe
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={(active ? 'bg-[#97C1A9]/10' : '') + ' flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#2E3A33]'}>
                          <ExclamationTriangleIcon className="h-4 w-4 text-[#97C1A9]" />
                          Report
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          )})}
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <ChartCard
            title="Total Files"
            total="3k"
            onInfo={() => { setSelectedDevice(devices[0]); setShowDetails(true); }}
            series={[
              { id: 0, value: 500, color: "#58C693" },
              { id: 1, value: 300, color: "#1F6B50" },
              { id: 2, value: 200, color: "#F2C94C" },
            ]}
          />
          <ChartCard
            title="Total Share"
            total="3k"
            onInfo={() => { setSelectedDevice(devices[1]); setShowDetails(true); }}
            series={[
              { id: 0, value: 450, color: "#58C693" },
              { id: 1, value: 350, color: "#1F6B50" },
              { id: 2, value: 200, color: "#F2C94C" },
            ]}
          />
          <ChartCard
            title="Total Downloads"
            total="3k"
            onInfo={() => { setSelectedDevice(devices[2]); setShowDetails(true); }}
            series={[
              { id: 0, value: 400, color: "#58C693" },
              { id: 1, value: 400, color: "#1F6B50" },
              { id: 2, value: 200, color: "#F2C94C" },
            ]}
          />
        </div>

        <DeviceDetailsModal open={showDetails} onClose={() => setShowDetails(false)} device={selectedDevice || devices[0]} />
      </main>
    </div>
  );
};

export default OverViewMain;
