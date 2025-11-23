"use client";

import { useMemo, useState } from "react";

type UserRow = { id: number; name: string; role: "Manager" | "Standard"; storageGb: number };

export default function StorageTab() {
  // Default storage settings
  const [defaultNewUserGb, setDefaultNewUserGb] = useState<number>(50);
  const [defaultManagerGb, setDefaultManagerGb] = useState<number>(20);

  // Filters / search
  const [roleFilter, setRoleFilter] = useState<"all" | "Manager" | "Standard">("all");
  const [storageFilter, setStorageFilter] = useState<"all" | 10 | 20 | 50 | 100>("all");
  const [query, setQuery] = useState("");

  // Data
  const [users, setUsers] = useState<UserRow[]>([
    { id: 1, name: "John Doe", role: "Manager", storageGb: 10 },
    { id: 2, name: "John Doe", role: "Standard", storageGb: 10 },
    { id: 3, name: "John Doe", role: "Manager", storageGb: 10 },
    { id: 4, name: "John Doe", role: "Standard", storageGb: 10 },
    { id: 5, name: "John Doe", role: "Manager", storageGb: 10 },
    { id: 6, name: "John Doe", role: "Standard", storageGb: 10 },
  ]);

  // Modal state
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number>(10);

  const list = useMemo(() => {
    return users
      .filter((u) => (roleFilter === "all" ? true : u.role === roleFilter))
      .filter((u) => (storageFilter === "all" ? true : u.storageGb === storageFilter))
      .filter((u) => (query.trim() ? u.name.toLowerCase().includes(query.toLowerCase()) : true));
  }, [users, roleFilter, storageFilter, query]);

  const openEdit = (row: UserRow) => {
    setEditId(row.id);
    setEditValue(row.storageGb);
  };
  const saveEdit = () => {
    if (editId == null) return;
    setUsers((prev) => prev.map((u) => (u.id === editId ? { ...u, storageGb: editValue } : u)));
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      {/* Default Storage Settings Card */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className=" font-bold text-[20px] md:text-[22px] tracking-[0.02em] text-[#97C1A9]">Default Storage Settings</h2>
          </div>
          <div className="border-t border-[#E5E7EB]">
            {/* Row 1 */}
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Default Storage for New User</span>
              <select className="h-9 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[120px]" value={defaultNewUserGb} onChange={(e) => setDefaultNewUserGb(parseInt(e.target.value, 10))}>
                {[10, 20, 50, 100, 200].map((n) => (
                  <option key={n} value={n}>
                    {n}GB
                  </option>
                ))}
              </select>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px]">
              <span className="text-[#2E3A33]">Default Storage for Manager User</span>
              <select className="h-9 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[120px]" value={defaultManagerGb} onChange={(e) => setDefaultManagerGb(parseInt(e.target.value, 10))}>
                {[10, 20, 50, 100, 200].map((n) => (
                  <option key={n} value={n}>
                    {n}GB
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 h-9 px-3 rounded-full border border-[#97C1A9] text-[#2E3A33] bg-white"
            onClick={() => setRoleFilter((r) => (r === "all" ? "Manager" : r === "Manager" ? "Standard" : "all"))}
          >
            <span className="text-sm">By role</span>
            <span className="text-xs text-[#6B7280]">{roleFilter}</span>
          </button>
          <button
            className="flex items-center gap-2 h-9 px-3 rounded-full border border-[#97C1A9] text-[#2E3A33] bg-white"
            onClick={() => setStorageFilter((s) => (s === "all" ? 10 : s === 10 ? 20 : s === 20 ? 50 : s === 50 ? 100 : "all"))}
          >
            <span className="text-sm">By Storage</span>
            <span className="text-xs text-[#6B7280]">{String(storageFilter)}</span>
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

      {/* User Storage table */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-4 border-b border-[#E5E7EB]">
            <h3 className=" font-bold text-[18px] md:text-[20px] tracking-[0.02em] text-[#97C1A9]">User Storage</h3>
          </div>

          {/* Table head */}
          <div className="hidden md:grid grid-cols-[60px_1fr_200px_160px_40px] px-6 md:px-8 py-3 text-[#6B7280] border-b border-[#E5E7EB]">
            <div>#</div>
            <div>User</div>
            <div>Role</div>
            <div>Storage used</div>
            <div></div>
          </div>

          {/* Rows */}
          <ul className="divide-y divide-[#E5E7EB]">
            {list.map((u) => (
              <li key={u.id} className="grid grid-cols-1 md:grid-cols-[60px_1fr_200px_160px_40px] items-center px-6 md:px-8 py-3">
                <div className="text-[#6B7280] mb-1 md:mb-0">{u.id}</div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3EF] text-[#2E3A33]">J</span>
                  <span className="text-[#2E3A33]">{u.name}</span>
                </div>
                <div className="text-[#2E3A33] mt-1 md:mt-0">{u.role}</div>
                <div className="text-[#2E3A33] mt-1 md:mt-0">{u.storageGb}GB</div>
                <div className="flex justify-end mt-2 md:mt-0">
                  <button className="text-[#97C1A9] hover:opacity-80" title="Edit" onClick={() => openEdit(u)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit Allocation Modal */}
      {editId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-[420px] rounded-xl border border-[#97C1A9] shadow-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#97C1A9] font-semibold">Edit Allocation</h4>
              <button className="text-[#97C1A9]" onClick={() => setEditId(null)} aria-label="Close">
                ×
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" value={editValue} onChange={(e) => setEditValue(parseInt(e.target.value || "0", 10))} className="flex-1 h-10 rounded-lg border border-[#E5E7EB] px-3" />
              <select className="h-10 w-[74px] rounded-lg border border-[#97C1A9] px-2 text-sm">
                <option>GB</option>
              </select>
            </div>
            <div className="mt-5 flex justify-center">
              <button onClick={saveEdit} className="bg-[#97C1A9] text-white px-8 py-2 rounded-full min-w-[220px]">
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
