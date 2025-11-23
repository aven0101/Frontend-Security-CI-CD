"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FolderPlusIcon,
  ArrowUpTrayIcon,
  FolderIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type SidebarProps = {
  onUpload?: (files: File[]) => void;
  onCreateFolder?: (name: string) => void;
  active?:
    | "my-files"
    | "shared"
    | "synced"
    | "starred"
    | "archived"
    | "devices"
    | "people"
    | "trash";
};

export default function FileManagementSidebar({ onUpload, onCreateFolder, active = "archived" }: SidebarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dirInputRef = useRef<HTMLInputElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const triggerUpload = () => {
    setMenuOpen((v) => !v);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length && onUpload) onUpload(files);
    if (e.target) e.target.value = ""; // reset
  };

  const handleDir = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length && onUpload) onUpload(files);
    if (e.target) e.target.value = "";
  };

  const createFolder = async () => {
    const name = typeof window !== "undefined" ? window.prompt("Folder name") : "New Folder";
    if (!name) return;
    if (onCreateFolder) onCreateFolder(name);
    // For now, simply log. Integration can hook into API later.
    console.log("Create folder:", name);
    setMenuOpen(false);
  };

  // Close on Escape when menu is open
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Keyboard shortcuts: Alt + C then (F: New Folder, U: File upload, I: Folder upload)
  useEffect(() => {
    let awaitingSecond = false;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "c" || e.key === "C")) {
        awaitingSecond = true;
        // small timeout window
        setTimeout(() => (awaitingSecond = false), 1200);
        return;
      }
      if (!awaitingSecond) return;
      const k = e.key.toLowerCase();
      if (k === "f") {
        e.preventDefault();
        createFolder();
        awaitingSecond = false;
      } else if (k === "u") {
        e.preventDefault();
        setMenuOpen(false);
        inputRef.current?.click();
        awaitingSecond = false;
      } else if (k === "i") {
        e.preventDefault();
        setMenuOpen(false);
        dirInputRef.current?.click();
        awaitingSecond = false;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const getHref = (id: SidebarProps["active"]) => {
    const pathMap: Record<NonNullable<SidebarProps["active"]>, string> = {
      "my-files": "/business/file-management/my-files",
      "shared": "/business/file-management/shared",
      "synced": "/business/file-management/synced",
      "starred": "/business/file-management/starred",
      "archived": "/business/file-management/archived",
      "devices": "/business/file-management/devices",
      "people": "/business/file-management/people",
      "trash": "/business/file-management/trash",
    };
    return pathMap[id] || "#";
  };

  const Item = ({ id, label }: { id: SidebarProps["active"]; label: string }) => {
  const pathname = usePathname();
  const href = getHref(id);
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`block w-full text-left rounded-[12px] py-3 px-5 transition-colors ${
          isActive
            ? "bg-[#97C1A9] text-white"
            : "text-[#6B7280] hover:bg-[#97C1A9] hover:text-white"
        }`}
      >
        {label}
      </Link>
    </li>
  );
};


  return (
    <aside className="bg-[#F5F5F5] rounded-xl py-4 px-4 flex flex-col gap-6">
      {/* New button */}
      <div className="relative">
        <button
          onClick={triggerUpload}
          className="w-full rounded-full border border-[#97C1A9] text-[#2E3A33] px-4 py-2 flex items-center justify-center gap-2 hover:bg-[#F7FBF9]"
        >
          <Image src="/file-management/icon/programming-cloud-upload.png" alt="new" width={14} height={14} />
          <span className="text-[#97C1A9] text-[18px]">New</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
        <input
          ref={dirInputRef}
          type="file"
          // @ts-ignore - non-standard but supported in Chromium
          webkitdirectory="true"
          directory="true"
          className="hidden"
          onChange={handleDir}
        />

        {menuOpen && (
          <>
          {/* click-away overlay */}
          <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
          {/* floating upload box at bottom-right like the mock */}
          <div role="dialog" aria-label="New menu" className="fixed bottom-6 right-6 z-40 w-[360px] pt-6 rounded-xl border border-[#97C1A9] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
            <div className="relative">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute right-2 top-[-20px] rounded p-1 text-[#6B7280] hover:bg-gray-100"
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <ul className="p-2">
                <li>
                  <button
                    onClick={createFolder}
                    className="flex w-full items-center justify-between gap-3 rounded-lg bg-[#97C1A9] text-white px-3 py-3"
                  >
                    <span className="flex items-center gap-3">
                      <FolderPlusIcon className="h-5 w-5" />
                      <span>New Folder</span>
                    </span>
                    <span className="text-xs opacity-90">Alt + C then F</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      inputRef.current?.click();
                    }}
                    className="mt-2 flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-[#2E3A33] hover:bg-[#F7FBF9]"
                  >
                    <span className="flex items-center gap-3">
                      <ArrowUpTrayIcon className="h-5 w-5 text-[#97C1A9]" />
                      <span>File Upload</span>
                    </span>
                    <span className="text-xs text-[#838884]">Alt + C then U</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      dirInputRef.current?.click();
                    }}
                    className="mt-2 flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-[#2E3A33] hover:bg-[#F7FBF9]"
                  >
                    <span className="flex items-center gap-3">
                      <FolderIcon className="h-5 w-5 text-[#97C1A9]" />
                      <span>Folder Upload</span>
                    </span>
                    <span className="text-xs text-[#838884]">Alt + C then I</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav aria-label="File Nav" className="flex-1">
        <ul className="space-y-2">
          <Item id="my-files" label="My Files" />
          <Item id="shared" label="Shared" />
          <Item id="synced" label="Synced" />
          <Item id="starred" label="Starred" />
          <Item id="archived" label="Archived" />
          <Item id="devices" label="Devices" />
          <Item id="people" label="People" />
          <Item id="trash" label="Trash" />
        </ul>
      </nav>

      {/* Storage card */}
      <div className="rounded-xl bg-white p-3 border border-[#E5E7EB]">
        <div className="flex items-center justify-between text-[11px] text-[#97A19C]">
          <span>0</span>
          <span>5GB</span>
        </div>
        <div className="mt-1 h-2 w-full rounded-full bg-[#E6F1EB] overflow-hidden">
          <div className="h-full w-1/3 rounded-full bg-[#E46B6B]" />
        </div>
        <button className="mt-3 w-full rounded-full bg-[#97C1A9] text-white text-sm py-2 flex items-center justify-center gap-2">
          <span>Buy More Space</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
