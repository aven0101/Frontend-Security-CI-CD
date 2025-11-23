"use client";

import { useMemo, useState } from "react";

type RetLog = { id: number; fileOwner: string; filePath: string; status: string; autoDeletion: string };

export default function RetentionTab() {
  const [autoDeleteDays, setAutoDeleteDays] = useState<number>(30);
  const [recoverDays, setRecoverDays] = useState<number>(15);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const [archiveDays, setArchiveDays] = useState<number>(30);
  const [notifyBeforeArchive, setNotifyBeforeArchive] = useState<boolean>(false);

  const [roleFilter, setRoleFilter] = useState<"all" | "Manager" | "Standard">("all");
  const [deviceFilter, setDeviceFilter] = useState<"all" | "has2fa" | "no2fa">("all");
  const [query, setQuery] = useState("");

  const logs: RetLog[] = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    fileOwner: "John Doe",
    filePath: "/Marketing/Budget.pdf",
    status: "Archived on Apr 20",
    autoDeletion: "Scheduled for May 20",
  }));

  const list = useMemo(() => {
    return logs.filter((l) => (query.trim() ? l.fileOwner.toLowerCase().includes(query.toLowerCase()) : true));
  }, [logs, query]);

  return (
    <div className="space-y-6">
      {/* Trash Retention Settings */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className=" font-bold text-[20px] md:text-[22px] tracking-[0.02em] text-[#97C1A9]">Trash Retention Settings</h2>
          </div>
          <div className="border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Auto-delete Trash after</span>
              <select className="h-9 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[120px]" value={autoDeleteDays} onChange={(e) => setAutoDeleteDays(parseInt(e.target.value, 10))}>
                {[7, 15, 30, 60, 90].map((d) => (
                  <option key={d} value={d}>
                    {d} days
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Allow users to recover deleted files within</span>
              <select className="h-9 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[120px]" value={recoverDays} onChange={(e) => setRecoverDays(parseInt(e.target.value, 10))}>
                {[7, 15, 30, 60].map((d) => (
                  <option key={d} value={d}>
                    {d} days
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px]">
              <span className="text-[#2E3A33]">Show warning before deletion</span>
              <input type="checkbox" className="toggle-green" checked={showWarning} onChange={(e) => setShowWarning(e.target.checked)} />
            </div>
          </div>
        </div>
      </div>

      {/* Archive Policy */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className=" font-bold text-[20px] md:text-[22px] tracking-[0.02em] text-[#97C1A9]">Archive Policy</h2>
          </div>
          <div className="border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Archive files in</span>
              <select className="h-9 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[120px]" value={archiveDays} onChange={(e) => setArchiveDays(parseInt(e.target.value, 10))}>
                {[7, 15, 30, 60, 90].map((d) => (
                  <option key={d} value={d}>
                    {d} days
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px]">
              <span className="text-[#2E3A33]">Notify user before auto-archiving</span>
              <input type="checkbox" className="toggle-green" checked={notifyBeforeArchive} onChange={(e) => setNotifyBeforeArchive(e.target.checked)} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Logs */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 h-9 px-3 rounded-full border border-[#97C1A9] text-[#2E3A33] bg-white">
            <span className="text-sm">By role</span>
            <span className="text-xs text-[#6B7280]">{roleFilter}</span>
          </button>
          <button className="flex items-center gap-2 h-9 px-3 rounded-full border border-[#97C1A9] text-[#2E3A33] bg-white">
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

      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-4 border-b border-[#E5E7EB]">
            <h3 className=" font-bold text-[18px] md:text-[20px] tracking-[0.02em] text-[#97C1A9]">Security Logs</h3>
          </div>
          <div className="hidden md:grid grid-cols-[60px_1fr_220px_220px] px-6 md:px-8 py-3 text-[#6B7280] border-b border-[#E5E7EB]">
            <div>#</div>
            <div>File</div>
            <div>Retention Status</div>
            <div>Auto-deletion</div>
          </div>
          <ul className="divide-y divide-[#E5E7EB]">
            {list.map((row) => (
              <li key={row.id} className="grid grid-cols-1 md:grid-cols-[60px_1fr_220px_220px] items-center px-6 md:px-8 py-3">
                <div className="text-[#6B7280] mb-1 md:mb-0">{row.id}</div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3EF] text-[#2E3A33]">J</span>
                  <span className="text-[#2E3A33]">{row.filePath}</span>
                </div>
                <div className="text-[#2E3A33] mt-1 md:mt-0">{row.status}</div>
                <div className="text-[#2E3A33] mt-1 md:mt-0">{row.autoDeletion}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
