"use client";

import { useMemo, useState } from "react";

type LogRow = { id: number; user: string; role: "Manager" | "Standard"; action: string };

export default function SecurityTab() {
  const [enforceAll, setEnforceAll] = useState<boolean>(false);
  const [enforceManagers, setEnforceManagers] = useState<boolean>(false);

  const [minLength, setMinLength] = useState<number>(8);
  const [requireSymbols, setRequireSymbols] = useState<boolean>(false);

  const [roleFilter, setRoleFilter] = useState<"all" | "Manager" | "Standard">("all");
  const [deviceFilter, setDeviceFilter] = useState<"all" | "has2fa" | "no2fa">("all");
  const [query, setQuery] = useState("");

  const logs: LogRow[] = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    user: "John Doe",
    role: i % 2 === 0 ? "Manager" : "Standard",
    action: i % 3 === 0 ? "Failed login" : i % 3 === 1 ? "2FA changed" : "Password changed",
  }));

  const list = useMemo(() => {
    return logs
      .filter((l) => (roleFilter === "all" ? true : l.role === roleFilter))
      .filter(() => true)
      .filter((l) => (query.trim() ? l.user.toLowerCase().includes(query.toLowerCase()) : true));
  }, [logs, roleFilter, deviceFilter, query]);

  return (
    <div className="space-y-6">
      {/* Default */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className=" font-bold text-[20px] md:text-[22px] tracking-[0.02em] text-[#97C1A9]">Default</h2>
          </div>
          <div className="border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Enforce 2FA for all users</span>
              <input type="checkbox" className="toggle-green" checked={enforceAll} onChange={(e) => setEnforceAll(e.target.checked)} />
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px]">
              <span className="text-[#2E3A33]">Enforce 2FA only for managers</span>
              <input type="checkbox" className="toggle-green" checked={enforceManagers} onChange={(e) => setEnforceManagers(e.target.checked)} />
            </div>
          </div>
        </div>
      </div>

      {/* Password Policies */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className=" font-bold text-[20px] md:text-[22px] tracking-[0.02em] text-[#97C1A9]">Password Policies</h2>
          </div>
          <div className="border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Min Password Length</span>
              <select className="h-9 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[90px]" value={minLength} onChange={(e) => setMinLength(parseInt(e.target.value, 10))}>
                {[8, 10, 12, 14].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px]">
              <span className="text-[#2E3A33]">Require symbols/numbers?</span>
              <input type="checkbox" className="toggle-green" checked={requireSymbols} onChange={(e) => setRequireSymbols(e.target.checked)} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 h-9 px-3 rounded-full border border-[#97C1A9] text-[#2E3A33] bg-white" onClick={() => setRoleFilter((r) => (r === "all" ? "Manager" : r === "Manager" ? "Standard" : "all"))}>
            <span className="text-sm">By role</span>
            <span className="text-xs text-[#6B7280]">{roleFilter}</span>
          </button>
          <button className="flex items-center gap-2 h-9 px-3 rounded-full border border-[#97C1A9] text-[#2E3A33] bg-white" onClick={() => setDeviceFilter((d) => (d === "all" ? "has2fa" : d === "has2fa" ? "no2fa" : "all"))}>
            <span className="text-sm">By devices</span>
            <span className="text-xs text-[#6B7280]">{deviceFilter}</span>
          </button>
        </div>
        <div className="relative w-full md:w-[300px] ml-auto">
          <input type="text" placeholder="Search..." className="w-full h-10 rounded-full border border-[#97C1A9] pl-10 pr-4 text-sm focus:outline-none" value={query} onChange={(e) => setQuery(e.target.value)} />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* Security Logs */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-4 border-b border-[#E5E7EB]">
            <h3 className=" font-bold text-[18px] md:text-[20px] tracking-[0.02em] text-[#97C1A9]">Security Logs</h3>
          </div>
          <div className="hidden md:grid grid-cols-[60px_1fr_200px_200px] px-6 md:px-8 py-3 text-[#6B7280] border-b border-[#E5E7EB]">
            <div>#</div>
            <div>User</div>
            <div>Role</div>
            <div>Action</div>
          </div>
          <ul className="divide-y divide-[#E5E7EB]">
            {list.map((row) => (
              <li key={row.id} className="grid grid-cols-1 md:grid-cols-[60px_1fr_200px_200px] items-center px-6 md:px-8 py-3">
                <div className="text-[#6B7280] mb-1 md:mb-0">{row.id}</div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3EF] text-[#2E3A33]">J</span>
                  <span className="text-[#2E3A33]">{row.user}</span>
                </div>
                <div className="text-[#2E3A33] mt-1 md:mt-0">{row.role}</div>
                <div className="text-[#2E3A33] mt-1 md:mt-0">{row.action}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
