"use client";

import { useMemo, useState } from "react";

// Manager-specific Device Moderation page
// Matches the provided manager mock with: KPI cards, devices table with actions, and pending requests.
// Differences from Admin can be enforced later via props/permissions.

type Device = {
  id: number;
  user: string;
  deviceName: string;
  lastSync: string;
};

export default function ManagerDeviceModeration() {
  const stats = {
    totalDevices: 87,
    activeDevices: 65,
    suspended: 3,
    topOs: "40% Windows, 30% Android",
  };

  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const devices: Device[] = useMemo(
    () => [
      { id: 1, user: "John Doe", deviceName: "HP EliteBook 850", lastSync: "2 hours ago" },
      { id: 2, user: "John Doe", deviceName: "HP EliteBook 850", lastSync: "2 hours ago" },
      { id: 3, user: "John Doe", deviceName: "iPhone 14 Pro", lastSync: "2 May, 2025" },
      { id: 4, user: "John Doe", deviceName: "iPhone 14 Pro", lastSync: "2 hours ago" },
      { id: 5, user: "John Doe", deviceName: "HP EliteBook 850", lastSync: "2 May, 2025" },
      { id: 6, user: "John Doe", deviceName: "HP EliteBook 850", lastSync: "2 May, 2025" },
    ],
    []
  );

  const pending = useMemo(
    () => [1, 2, 3, 4].map((i) => ({ id: i, name: "John Doe", meta: "Windows 11 pro v14" })),
    []
  );

  return (
    <div className="min-h-screen p-6">
      <h1
        className="mb-4"
        style={{ color: "#98C1A9", fontWeight: 700, fontSize: 32, lineHeight: "34px", letterSpacing: "0.02em" }}
      >
        Device Moderation
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
        <div className="flex flex-col">
          {/* KPI cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {[{
              title: "Total Devices",
              sub: `${stats.totalDevices} devices connected`,
              iconPath: "M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z M8 20h8"
            }, {
              title: "Active Devices",
              sub: `${stats.activeDevices} currently syncing`,
              iconPath: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            }, {
              title: "Suspended Devices",
              sub: `${stats.suspended} blocked by admin`,
              iconPath: "M6 18L18 6M8 6h8a2 2 0 012 2v8"
            }, {
              title: "Top OS",
              sub: stats.topOs,
              iconPath: "M12 8v8m-4-4h8 M4 12a8 8 0 1016 0A8 8 0 004 12z"
            }].map((c, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E8F5F0] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#98C1A9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.iconPath} />
                  </svg>
                </div>
                <div>
                  <div className="text-[#868C88]" style={{ fontSize: 16, lineHeight: "18px", letterSpacing: "0.02em" }}>{c.title}</div>
                  <div className="text-xs text-[#9AA19B] mt-1">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Devices table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-[0px_0px_7.22px_0px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="p-4 border-b" style={{ borderColor: "#98C1A9" }}>
              <h2 className="text-base font-semibold" style={{ color: "#98C1A9" }}>Devices</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[#6B7A72] bg-[#F8FBFA]">
                    <th className="px-6 py-3 text-sm font-medium">Sno</th>
                    <th className="px-6 py-3 text-sm font-medium">User Name</th>
                    <th className="px-6 py-3 text-sm font-medium">Device Name</th>
                    <th className="px-6 py-3 text-sm font-medium">Last Sync Time</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {devices.map((d, i) => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs">JD</div>
                          <span className="text-sm text-gray-800">{d.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{d.deviceName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{d.lastSync}</td>
                      <td className="px-4 py-4 text-right relative">
                        <button
                          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
                          onClick={() => setMenuOpenId(menuOpenId === d.id ? null : d.id)}
                          aria-label="Row actions"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
                        </button>

                        {menuOpenId === d.id && (
                          <div className="absolute right-8 top-10 z-10 w-48 bg-white border border-gray-200 rounded-xl shadow-md">
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                              <svg className="w-4 h-4 text-[#98C1A9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                              Force Logout
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6" /></svg>
                              Remove Device
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 py-4 border-t border-gray-100">
              <span className="text-gray-400">&lt;</span>
              {[1, 2, 3, 4].map((n) => (
                <button key={n} className={`w-7 h-7 rounded border text-sm ${n === 2 ? "bg-[#98C1A9] text-white border-[#98C1A9]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{n}</button>
              ))}
              <span className="text-gray-400">&gt;</span>
            </div>
          </div>
        </div>

        {/* Pending requests */}
        <aside className="bg-white rounded-2xl border border-gray-200 shadow-[0px_0px_7.22px_0px_rgba(0,0,0,0.15)] p-4 h-fit">
          <div className="pb-3 mb-2 border-b border-gray-200">
            <h3 className="text-base font-semibold" style={{ color: "#98C1A9" }}>Pending Device Requests</h3>
          </div>
          <div className="space-y-3">
            {pending.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#98C1A9]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white text-xs flex items-center justify-center">JD</div>
                  <div>
                    <div className="text-sm text-gray-800 font-medium">{r.name}</div>
                    <div className="text-[11px] text-gray-500">{r.meta}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{ background: '#98C1A9' }}>Approve</button>
                  <button className="px-3 py-1.5 rounded-full text-xs font-medium text-white bg-[#F26C6C]">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
