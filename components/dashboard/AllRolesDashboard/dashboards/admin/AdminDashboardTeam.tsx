'use client';

import { useState } from 'react';
import NewAnnouncementModal from './NewAnnouncementModal';
import Image from 'next/image';

export default function AdminDashboardTeam() {

  // Mock data - replace with actual data from API
  const stats = {
    activeUsers: 220,
    devicesConnected: 5,
    sharedLinks: 40,
    storageUsed: 40, // GB
  };

  const syncedDevices = [
    {
      id: 1,
      name: 'Windows 11 Pro',
      device: 'HP Desktop-XXXXX',
      lastSync: 'yesterday at 7:45 AM',
      files: 14,
      directories: 2,
      used: '5.59GB',
    },
    {
      id: 2,
      name: 'Windows 11 Pro',
      device: 'HP Desktop-XXXXX',
      lastSync: 'yesterday at 7:45 AM',
      files: 14,
      directories: 2,
      used: '5.59GB',
    },
    {
      id: 3,
      name: 'Windows 11 Pro',
      device: 'HP Desktop-XXXXX',
      lastSync: 'yesterday at 7:45 AM',
      files: 14,
      directories: 2,
      used: '5.59GB',
    },
  ];

  const linkedDevices = [
    { id: 1, name: 'Windows - Chrome' },
    { id: 2, name: 'iPhone - Safari' },
    { id: 3, name: 'Windows - Chrome' },
    { id: 4, name: 'Windows - Chrome' },
  ];

  const adminActivities = [
    {
      id: 1,
      adminName: 'John Doe',
      role: 'Manager',
      action: 'Created user',
      dateTime: '12-02-2025, 09:00AM',
    },
    {
      id: 2,
      adminName: 'John Doe',
      role: 'Standard',
      action: 'Edited policy',
      dateTime: '12-02-2025, 09:00AM',
    },
    {
      id: 3,
      adminName: 'John Doe',
      role: 'Manager',
      action: 'Removed device',
      dateTime: '12-02-2025, 09:00AM',
    },
    {
      id: 4,
      adminName: 'John Doe',
      role: 'Standard',
      action: 'Created user',
      dateTime: '12-02-2025, 09:00AM',
    },
    {
      id: 5,
      adminName: 'John Doe',
      role: 'Manager',
      action: 'Edited policy',
      dateTime: '12-02-2025, 09:00AM',
    },
    {
      id: 6,
      adminName: 'John Doe',
      role: 'Standard',
      action: 'Removed device',
      dateTime: '12-02-2025, 09:00AM',
    },
  ];

  const [isAnnouncementOpen, setAnnouncementOpen] = useState(false);

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
       <button
          onClick={() => setAnnouncementOpen(true)}
          className="flex items-center justify-center gap-2 rounded-full bg-[#97C1A9] px-5 py-2 text-white text-base font-medium"
        >
          <Image src="/dashboard/add-icon.png" alt="add" width={500} height={500} className="w-4 h-4 object-contain" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

        {/* Active Users Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <Image src="/dashboard/active-users.png" alt="add" width={500} height={500} className="w-12 h-12  object-cover" />
          <div>
            <h3 className="text-[#838884] font-normal text-[20px] mt-2">
              Active Users
            </h3>
            <p className="text-[#838884] font-normal">
              {stats.activeUsers} users
            </p>
          </div>
        </div>

        {/* Devices Connected Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <Image src="/dashboard/devices-connected.png" alt="add" width={500} height={500} className="w-12 h-12  object-cover" />
          <div>
            <h3 className="text-[#838884] font-normal text-[20px] mt-2">
              Devices Connected
            </h3>
            <p className="text-[#838884] font-normal">
              {stats.devicesConnected} devices
            </p>
          </div>
        </div>

        {/* Shared Links Card */}
       <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <Image src="/dashboard/shared-links.png" alt="add" width={500} height={500} className="w-12 h-12  object-cover" />
          <div>
            <h3 className="text-[#838884] font-normal text-[20px] mt-2">
              Shared Links
            </h3>
            <p className="text-[#838884] font-normal">
              {stats.sharedLinks} Links
            </p>
          </div>
        </div>

        {/* Storage Used Card */}
       <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <Image src="/dashboard/storage-used.png" alt="add" width={500} height={500} className="w-12 h-12  object-cover" />
          <div>
            <h3 className="text-[#838884] font-normal text-[20px] mt-2">
              Storage Used
            </h3>
            <p className="text-[#838884] font-normal">
              {stats.storageUsed} GB
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-[15px] mb-6 max-w-[1300px]">
        {/* Synced Devices Section - width: 914px, height: 276px */}
        <div className="flex-1 lg:max-w-[914px]">
          <div className="bg-white rounded-[18px] p-5 border border-gray-100 shadow-[0px_0px_7.22px_0px_rgba(0,0,0,0.25)]" style={{ height: '276px' }}>
            <h2 className="text-lg font-semibold text-[#9AC4B5] mb-4">Synced Devices</h2>
            
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ maxHeight: '210px' }}>
              {syncedDevices.map((device) => (
                <div
                  key={device.id}
                  className="border border-gray-200 rounded-xl p-3 hover:border-[#9AC4B5] transition-colors flex-shrink-0"
                  style={{ minWidth: '280px' }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 bg-[#E8F5F0] rounded-xl flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-[#9AC4B5]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-center font-semibold text-gray-900 text-sm mb-0.5">
                    {device.name}
                  </h3>
                  <p className="text-center text-xs text-gray-500 mb-2">{device.device}</p>
                  
                  <p className="text-center text-xs text-[#9AC4B5] mb-3">
                    Last Sync {device.lastSync}
                  </p>
                  
                  <div className="flex items-center justify-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                        <path
                          fillRule="evenodd"
                          d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {device.files} files
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                      {device.directories} directories
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Linked Devices Section - width: 371px, height: 276px */}
        <div className="lg:w-[371px]">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0px_0px_7.22px_0px_rgba(0,0,0,0.25)]" style={{ height: '276px' }}>
            <h2 className="text-lg font-semibold text-[#9AC4B5] mb-4">Linked Devices</h2>
            
            <div className="space-y-2.5 overflow-y-auto pr-2" style={{ maxHeight: '210px' }}>
              {linkedDevices.map((device) => (
                <div
                  key={device.id}
                  className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 hover:border-[#9AC4B5] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#E8F5F0] rounded-lg flex items-center justify-center flex-shrink-0">
                    {device.name.includes('iPhone') ? (
                      <svg
                        className="w-5 h-5 text-[#9AC4B5]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-[#9AC4B5]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
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

      {/* Admin Activity Overview Section - width: 1300px, height: 550px */}
      <div className="max-w-[1300px]">
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0px_0px_7.22px_0px_rgba(0,0,0,0.25)] h-[550px] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#9AC4B5]">Admin Activity Overview</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Sno</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Admin Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action Taken</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date/Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {adminActivities.map((activity, index) => (
                  <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{activity.adminName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{activity.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{activity.action}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{activity.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Announcement Modal */}
      <NewAnnouncementModal
        isOpen={isAnnouncementOpen}
        onClose={() => setAnnouncementOpen(false)}
        onCreate={(payload) => {
          // Placeholder: hook up to API later
          console.log('Create announcement', payload);
        }}
      />
    </div>
  );
}
