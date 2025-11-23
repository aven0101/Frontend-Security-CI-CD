"use client";

import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export type UploadStatus = "uploading" | "success" | "error";

export type UploadItem = {
  id: string;
  name: string;
  sizeLabel: string; // e.g., "523MB"
  status: UploadStatus;
};

export type UploadingFilesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: UploadItem[];
  title?: string;
  defaultCollapsed?: boolean;
};

function DocIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="28" height="28" rx="6" fill="#ECFFF6" stroke="#97C1A9" />
      <rect x="7" y="9" width="16" height="2" rx="1" fill="#97C1A9" />
      <rect x="7" y="14" width="20" height="2" rx="1" fill="#97C1A9" />
      <rect x="7" y="19" width="12" height="2" rx="1" fill="#97C1A9" />
      <rect x="23" y="25" width="6" height="4" rx="2" fill="#97C1A9" />
      <text x="26" y="28" textAnchor="middle" fontSize="7" fontWeight="700" fill="white">DOC</text>
    </svg>
  );
}

function StatusIcon({ status }: { status: UploadStatus }) {
  if (status === "success") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#97C1A9] bg-white">
        <svg className="h-5 w-5 text-[#7ED2AD]" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-300 bg-white">
        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 7l6 6m0-6L7 13" clipRule="evenodd" />
        </svg>
      </span>
    );
  }
  // uploading spinner
  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full">
      <span className="absolute inset-0 rounded-full border-2 border-[#97C1A9]/30"></span>
      <span className="absolute inset-0 rounded-full border-2 border-[#97C1A9] border-t-transparent animate-spin"></span>
      <span className="relative inline-block h-3 w-3 rounded-full bg-[#97C1A9]/70" />
    </span>
  );
}

export default function UploadingFilesModal({ isOpen, onClose, items, title = "Uploading Files", defaultCollapsed = false }: UploadingFilesModalProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4 pt-10">
      <div className="w-full max-w-[560px] rounded-[14px] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <h3 className="text-[20px] font-semibold text-[#2E3A33]">{title}</h3>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={collapsed ? "Expand" : "Collapse"}
              onClick={() => setCollapsed((v) => !v)}
              className="text-[#97C1A9] hover:text-[#2A8A64]"
            >
              {collapsed ? (
                <ChevronDownIcon className="h-6 w-6" />
              ) : (
                <ChevronUpIcon className="h-6 w-6" />
              )}
            </button>
            <button type="button" aria-label="Close" onClick={onClose} className="text-[#97C1A9] hover:text-[#2A8A64]">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="px-6 pb-6">
            <ul className="divide-y divide-[#E8EFEA]">
              {items.map((f) => (
                <li key={f.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    {/* File icon */}
                    <DocIcon />
                    <div>
                      <div className="text-[14px] font-medium text-[#2E3A33]">{f.name}</div>
                      <div className="text-[13px] text-[#2A8A64]">{f.sizeLabel}</div>
                    </div>
                  </div>
                  <StatusIcon status={f.status} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
