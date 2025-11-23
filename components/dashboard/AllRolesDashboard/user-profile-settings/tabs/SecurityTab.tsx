"use client";

import { useState } from "react";

export default function SecurityTab() {
  const [passwordLastChange] = useState("02/02/2025");
  const [primaryEmail, setPrimaryEmail] = useState("Phoebebuffay@gmail.com");
  const [recoveryEmail, setRecoveryEmail] = useState("Phoebebuffay@gmail.com");

  const [authenticator, setAuthenticator] = useState(true);
  const [passkeys, setPasskeys] = useState(false);
  const [oneTimeCode, setOneTimeCode] = useState(true);
  const [securityQuestion, setSecurityQuestion] = useState(false);

  const devices = [
    { id: 1, time: "02/02/2025 - 20:25AM", location: "New York, USA", agent: "Windows - Chrome", status: "blockable" as const },
    { id: 2, time: "02/02/2025 - 20:25AM", location: "New York, USA", agent: "Windows - Chrome", status: "unlockable" as const },
    { id: 3, time: "02/02/2025 - 20:25AM", location: "New York, USA", agent: "Windows - Chrome", status: "blockable" as const },
  ];

  return (
    <div className="space-y-8">
      {/* Password */}
      <div className="w-full rounded-xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#7FAF99] font-semibold">Password:</h3>
            <div className="text-sm text-[#8A8A8A]">{passwordLastChange} <span className="ml-2">Last Change</span></div>
          </div>
          <div className="flex items-center gap-4">
            <input disabled value="********" className="flex-1 h-[44px] rounded-[6px] border border-[#D1D5DB] px-3 text-sm bg-white" />
            <button className="bg-[#97C1A9] hover:bg-[#97C1A9]/90 text-white px-6 py-2 rounded-full text-sm">Change</button>
          </div>
        </div>
      </div>

      {/* Emails */}
      <div className="w-full rounded-xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-xl p-6 md:p-8 space-y-4">
          <div>
            <h3 className="text-[#7FAF99] font-semibold mb-2">Primary Email:</h3>
            <input value={primaryEmail} onChange={(e) => setPrimaryEmail(e.target.value)} className="w-full h-[44px] rounded-[6px] border border-[#D1D5DB] px-3 text-sm" />
          </div>
          <div>
            <h3 className="text-[#7FAF99] font-semibold mb-2">Recovery Email:</h3>
            <input value={recoveryEmail} onChange={(e) => setRecoveryEmail(e.target.value)} className="w-full h-[44px] rounded-[6px] border border-[#D1D5DB] px-3 text-sm" />
          </div>
          <div className="pt-2">
            <button className="bg-[#97C1A9] hover:bg-[#97C1A9]/90 text-white px-6 py-2 rounded-full text-sm">Update</button>
          </div>
        </div>
      </div>

      {/* 2FA */}
      <div className="w-full rounded-xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-xl p-0 overflow-hidden">
          <div className="px-6 md:px-8 py-5">
            <h3 className="text-[#7FAF99] font-semibold">2-Factor Authentication</h3>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {[{ label: 'Authenticator', state: authenticator, set: setAuthenticator }, { label: 'Passkeys', state: passkeys, set: setPasskeys }, { label: 'One-time code', state: oneTimeCode, set: setOneTimeCode }, { label: 'Security question', state: securityQuestion, set: setSecurityQuestion }].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-6 md:px-8 py-4">
                <span className="text-[#6B7280]">{row.label}</span>
                <button
                  role="switch"
                  aria-checked={row.state}
                  onClick={() => row.set(!row.state)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${row.state ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${row.state ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logged-in Devices */}
      <div className="w-full rounded-xl" style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}>
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="px-6 md:px-8 py-5">
            <h3 className="text-[#7FAF99] font-semibold">Logged-in Devices</h3>
          </div>
          <div>
            {devices.map(d => (
              <div key={d.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center px-6 md:px-8 py-3 border-t border-[#E5E7EB] first:border-t-0">
                <div className="text-[#6B7280] flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#ECF5F0] text-[#7FAF99]">🖥️</span>
                  <span className="hidden md:inline">Device</span>
                </div>
                <div className="text-[#6B7280]">{d.time}</div>
                <div className="text-[#6B7280]">{d.location}</div>
                <div className="text-[#6B7280]">{d.agent}</div>
                <div className="text-right">
                  {d.status === 'unlockable' ? (
                    <button className="bg-[#C8BDF3] text-white px-5 py-2 rounded-full text-sm">Unblock</button>
                  ) : (
                    <button className="bg-[#97C1A9] text-white px-5 py-2 rounded-full text-sm">Block</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
