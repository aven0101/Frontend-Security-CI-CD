"use client";

import { useState } from "react";

type UserRow = { id: number; name: string; role: "Manager" | "Standard"; devices: number };

export default function DevicesTab() {
  const [defaultPerUser, setDefaultPerUser] = useState<number>(3);
  const [defaultPerManager, setDefaultPerManager] = useState<number>(10);

  const [requireApproval, setRequireApproval] = useState<boolean>(false);
  const [forceLogoutDays, setForceLogoutDays] = useState<number>(30);
  const [blockUnverified, setBlockUnverified] = useState<boolean>(false);
  const [emailAlertNewLocation, setEmailAlertNewLocation] = useState<boolean>(false);

  const [users, setUsers] = useState<UserRow[]>([
    { id: 1, name: "John Doe", role: "Manager", devices: 2 },
    { id: 2, name: "John Doe", role: "Standard", devices: 1 },
    { id: 3, name: "John Doe", role: "Manager", devices: 4 },
  ]);

  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number>(2);

  const saveEdit = () => {
    if (editId == null) return;
    setUsers((prev) => prev.map((u) => (u.id === editId ? { ...u, devices: editValue } : u)));
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      {/* Default Card */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className=" font-bold text-[20px] md:text-[22px] tracking-[0.02em] text-[#97C1A9]">Default</h2>
          </div>
          <div className="border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Default Max Devices per User</span>
              <select className="h-9 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[90px]" value={defaultPerUser} onChange={(e) => setDefaultPerUser(parseInt(e.target.value, 10))}>
                {[1, 2, 3, 5, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px]">
              <span className="text-[#2E3A33]">Default Max Devices per Manger</span>
              <select className="h-9 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[90px]" value={defaultPerManager} onChange={(e) => setDefaultPerManager(parseInt(e.target.value, 10))}>
                {[1, 2, 3, 5, 10, 15].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className=" font-bold text-[20px] md:text-[22px] tracking-[0.02em] text-[#97C1A9]">Policies</h2>
          </div>
          <div className="border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Require Approval for New Devices</span>
              <input type="checkbox" className="toggle-green" checked={requireApproval} onChange={(e) => setRequireApproval(e.target.checked)} />
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Force Logout after Inactivity of</span>
              <select className="h-9 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[120px]" value={forceLogoutDays} onChange={(e) => setForceLogoutDays(parseInt(e.target.value, 10))}>
                {[7, 15, 30, 60, 90].map((d) => (
                  <option key={d} value={d}>
                    {d} days
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px] border-b border-[#E5E7EB]">
              <span className="text-[#2E3A33]">Block login from unverified devices</span>
              <input type="checkbox" className="toggle-green" checked={blockUnverified} onChange={(e) => setBlockUnverified(e.target.checked)} />
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 h-[56px]">
              <span className="text-[#2E3A33]">Email alert on login from new location</span>
              <input type="checkbox" className="toggle-green" checked={emailAlertNewLocation} onChange={(e) => setEmailAlertNewLocation(e.target.checked)} />
            </div>
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="w-full rounded-2xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-4 border-b border-[#E5E7EB]">
            <h3 className=" font-bold text-[18px] md:text-[20px] tracking-[0.02em] text-[#97C1A9]">Devices</h3>
          </div>
          <div className="hidden md:grid grid-cols-[60px_1fr_200px_160px] px-6 md:px-8 py-3 text-[#6B7280] border-b border-[#E5E7EB]">
            <div>#</div>
            <div>User</div>
            <div>Role</div>
            <div className="text-right">Devices</div>
          </div>
          <ul className="divide-y divide-[#E5E7EB]">
            {users.map((u) => (
              <li key={u.id} className="grid grid-cols-1 md:grid-cols-[60px_1fr_200px_160px] items-center px-6 md:px-8 py-3">
                <div className="text-[#6B7280] mb-1 md:mb-0">{u.id}</div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3EF] text-[#2E3A33]">J</span>
                  <span className="text-[#2E3A33]">{u.name}</span>
                </div>
                <div className="text-[#2E3A33] mt-1 md:mt-0">{u.role}</div>
                <div className="flex items-center justify-end gap-3 mt-1 md:mt-0">
                  <span className="text-[#2E3A33]">{u.devices}</span>
                  <button className="text-[#97C1A9] hover:opacity-80" onClick={() => { setEditId(u.id); setEditValue(u.devices); }}>
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

      {/* Edit Device Limit Modal */}
      {editId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-[420px] rounded-xl border border-[#97C1A9] shadow-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#97C1A9] font-semibold">Edit Device Limit</h4>
              <button className="text-[#97C1A9]" onClick={() => setEditId(null)} aria-label="Close">×</button>
            </div>
            <input type="number" value={editValue} onChange={(e) => setEditValue(parseInt(e.target.value || "0", 10))} className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
            <div className="mt-5 flex justify-center">
              <button onClick={saveEdit} className="bg-[#97C1A9] text-white px-8 py-2 rounded-full min-w-[220px]">SAVE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
