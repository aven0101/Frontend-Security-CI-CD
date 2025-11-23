"use client";

import React from "react";

export type DeviceDetails = {
  deviceName: string;
  deviceId: string;
  os: string;
  ip: string;
  location: string;
  status: string;
  lastAccessed: string; // formatted date
  firstRegistered: string; // formatted date
};

interface Props {
  open: boolean;
  onClose: () => void;
  device: DeviceDetails;
}

export default function DeviceDetailsModal({ open, onClose, device }: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl p-6">
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 h-8 w-8 grid place-items-center rounded-full hover:bg-gray-100 text-gray-500"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Title */}
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-sm border border-[#97C1A9]" />
            <h3 className="text-lg font-semibold text-[#98C1A9]">Device Detail</h3>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <p className="text-gray-500">Device Name</p>
              <p className="font-medium text-gray-800">{device.deviceName}</p>
            </div>
            <div>
              <p className="text-gray-500">Device ID</p>
              <p className="font-medium text-gray-800 break-all">{device.deviceId}</p>
            </div>

            <div>
              <p className="text-gray-500">OS</p>
              <p className="font-medium text-gray-800">{device.os}</p>
            </div>
            <div>
              <p className="text-gray-500">IP Address</p>
              <p className="font-medium text-gray-800">{device.ip}</p>
            </div>

            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium text-gray-800">{device.location}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium text-gray-800">{device.status}</p>
            </div>

            <div>
              <p className="text-gray-500">Last Accessed</p>
              <p className="font-medium text-gray-800">{device.lastAccessed}</p>
            </div>
            <div>
              <p className="text-gray-500">First Registered</p>
              <p className="font-medium text-gray-800">{device.firstRegistered}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
