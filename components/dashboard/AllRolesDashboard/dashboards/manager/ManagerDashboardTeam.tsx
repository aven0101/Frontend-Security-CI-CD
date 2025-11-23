"use client";

export default function ManagerDashboardTeam() {
  // Mocked data matching the manager mock
  const stats = {
    teamUsers: 220,
    storageUsed: 5.95, // GB used
    storageTotal: 15, // GB total
    devicesConnected: 25,
    activeSharesFiles: 220,
    activeSharesUsed: 5.95,
    activeSharesTotal: 15,
  };

  const syncedDevices = [
    {
      id: 1,
      os: "Windows 11 Pro",
      device: "HP Desktop-XXXXX",
      lastSync: "yesterday at 7:45 AM",
      files: 14,
      directories: 2,
      used: 5.59,
      total: 10,
    },
    {
      id: 2,
      os: "Windows 11 Pro",
      device: "HP Desktop-XXXX",
      lastSync: "yesterday at 7:45 AM",
      files: 22,
      directories: 3,
      used: 1,
      total: 10,
    },
    {
      id: 3,
      os: "Windows 11 Pro",
      device: "HP Desktop-XXXX",
      lastSync: "yesterday at 7:45 AM",
      files: 22,
      directories: 3,
      used: 2,
      total: 10,
    },
  ];

  const linkedDevices = [
    { id: 1, name: "Windows - Chrome" },
    { id: 2, name: "iPhone - Safari" },
    { id: 3, name: "Windows - Chrome" },
    { id: 4, name: "Windows - Chrome" },
  ];

  const userActivities = [
    { id: 1, adminName: "John Doe", action: "Created user", dateTime: "12-02-2025, 09:00AM" },
    { id: 2, adminName: "John Doe", action: "Edited policy", dateTime: "12-02-2025, 09:00AM" },
    { id: 3, adminName: "John Doe", action: "Removed device", dateTime: "12-02-2025, 09:00AM" },
    { id: 4, adminName: "John Doe", action: "Created user", dateTime: "12-02-2025, 09:00AM" },
    { id: 5, adminName: "John Doe", action: "Edited policy", dateTime: "12-02-2025, 09:00AM" },
    { id: 6, adminName: "John Doe", action: "Removed device", dateTime: "12-02-2025, 09:00AM" },
  ];

  const storagePercent = Math.min((stats.storageUsed / stats.storageTotal) * 100, 100);
  const sharesPercent = Math.min((stats.activeSharesUsed / stats.activeSharesTotal) * 100, 100);

  return (
    <div className="min-h-screen p-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[13px] mb-6 max-w-[1300px]">
        {/* Team Users */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between" style={{ height: "134px" }}>
          <div className="w-12 h-12 bg-[#E8F5F0] rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-[#9AC4B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-[#838884] font-normal mb-1" style={{ fontSize: "20px", lineHeight: "20px", letterSpacing: "0.02em" }}>Team Users</h3>
            <p className="text-[#838884] font-normal" style={{ fontSize: "12px", lineHeight: "18px", letterSpacing: "0.02em" }}>{stats.teamUsers} users</p>
          </div>
        </div>

        {/* Storage Used with bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between" style={{ height: "134px" }}>
          <div className="w-12 h-12 bg-[#E8F5F0] rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-[#9AC4B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-[#838884] font-normal mb-2" style={{ fontSize: "20px", lineHeight: "20px", letterSpacing: "0.02em" }}>Storage Used</h3>
            <div className="w-full">
              <div className="w-full bg-gray-200 rounded-full h-[6px] mb-1">
                <div className="bg-[#97C1A9] h-[6px] rounded-full" style={{ width: `${storagePercent}%` }} />
              </div>
              <div className="flex justify-between text-[12px] text-[#838884]"><span>Used: {stats.storageUsed} GB</span><span>Total: {stats.storageTotal} GB</span></div>
            </div>
          </div>
        </div>

        {/* Devices Connected */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between" style={{ height: "134px" }}>
          <div className="w-12 h-12 bg-[#E8F5F0] rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-[#9AC4B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-[#838884] font-normal mb-1" style={{ fontSize: "20px", lineHeight: "20px", letterSpacing: "0.02em" }}>Devices Connected</h3>
            <p className="text-[#838884] font-normal" style={{ fontSize: "12px", lineHeight: "18px", letterSpacing: "0.02em" }}>{stats.devicesConnected} Devices</p>
          </div>
        </div>

        {/* Active Shares with red bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between" style={{ height: "134px" }}>
          <div className="w-12 h-12 bg-[#FFECEC] rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-[#E57373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div>
            <h3 className="text-[#838884] font-normal mb-2" style={{ fontSize: "20px", lineHeight: "20px", letterSpacing: "0.02em" }}>Active Shares</h3>
            <div className="w-full">
              <div className="w-full bg-gray-200 rounded-full h-[6px] mb-1">
                <div className="bg-[#FF6B6B] h-[6px] rounded-full" style={{ width: `${sharesPercent}%` }} />
              </div>
              <div className="flex justify-between text-[12px] text-[#838884]"><span>{stats.activeSharesFiles} Files</span><span>Used: {stats.activeSharesUsed} GB • Total: {stats.activeSharesTotal} GB</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-[15px] mb-6 max-w-[1300px]">
        {/* Synced Devices */}
        <div className="flex-1 lg:max-w-[914px]">
          <div className="bg-white rounded-[18px] p-5 border border-gray-100 shadow-[0px_0px_7.22px_0px_rgba(0,0,0,0.25)]" style={{ height: "276px" }}>
            <h2 className="text-lg font-semibold text-[#9AC4B5] mb-4">Synced Devices</h2>
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ maxHeight: "210px" }}>
              {syncedDevices.map((device) => {
                const percentage = Math.min((device.used / device.total) * 100, 100);
                return (
                  <div key={device.id} className="border border-gray-200 rounded-xl p-3 hover:border-[#9AC4B5] transition-colors flex-shrink-0" style={{ minWidth: "280px" }}>
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 bg-[#E8F5F0] rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-[#9AC4B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-center font-semibold text-gray-900 text-sm mb-0.5">{device.os}</h3>
                    <p className="text-center text-xs text-gray-500 mb-2">{device.device}</p>
                    <p className="text-center text-xs text-[#9AC4B5] mb-3">Last Sync {device.lastSync}</p>
                    <div className="flex items-center justify-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                        {device.files} files
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                        {device.directories} directories
                      </span>
                    </div>
                    <div className="w-full mt-3">
                      <div className="text-[#5B6B62] text-xs mb-1 text-center">Used: {device.used}GB / {device.total}GB</div>
                      <div className="w-full bg-gray-200 rounded-full h-[6px]">
                        <div className="bg-[#97C1A9] h-[6px] rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Linked Devices */}
        <div className="lg:w-[371px]">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0px_0px_7.22px_0px_rgba(0,0,0,0.25)]" style={{ height: "276px" }}>
            <h2 className="text-lg font-semibold text-[#9AC4B5] mb-4">Linked Devices</h2>
            <div className="space-y-2.5 overflow-y-auto pr-2" style={{ maxHeight: "210px" }}>
              {linkedDevices.map((device) => (
                <div key={device.id} className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 hover:border-[#9AC4B5] transition-colors">
                  <div className="w-10 h-10 bg-[#E8F5F0] rounded-lg flex items-center justify-center flex-shrink-0">
                    {device.name.includes("iPhone") ? (
                      <svg className="w-5 h-5 text-[#9AC4B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-[#9AC4B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 text-sm font-medium">{device.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Activity Overview */}
      <div className="max-w-[1300px]">
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0px_0px_7.22px_0px_rgba(0,0,0,0.25)] h-[550px] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#9AC4B5]">User Activity Overview</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Sno</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Admin Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action Taken</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date/Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userActivities.map((activity, index) => (
                  <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{activity.adminName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{activity.action}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{activity.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
