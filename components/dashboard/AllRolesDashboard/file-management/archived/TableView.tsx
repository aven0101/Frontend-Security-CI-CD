"use client";

import { Menu } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import {
  EllipsisVerticalIcon,
  InformationCircleIcon,
  ArchiveBoxXMarkIcon,
  TrashIcon,
  FolderIcon,
  ChevronUpDownIcon,
  LinkIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MinusSmallIcon, CheckIcon } from "@heroicons/react/20/solid";
import { archivedFiles } from "./data";
import SortPills, { type SortKey } from "../common/SortPills";

type TSortKey = SortKey;

const formatSize = (kb: number) => {
  const units = ["KB", "MB", "GB", "TB"]; // input is KB
  let size = kb;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size % 1 === 0 ? size : size.toFixed(1)} ${units[i]}`;
};

export default function ArchivedTableView() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<TSortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const pageSize = 8;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = archivedFiles.filter((f) => f.name.toLowerCase().includes(q));
    arr = arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "type":
          cmp = a.type.localeCompare(b.type);
          break;
        case "modified":
          cmp = new Date(a.modified).getTime() - new Date(b.modified).getTime();
          break;
        case "sizeKB":
          cmp = a.sizeKB - b.sizeKB;
          break;
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [search, sortKey, sortOrder]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [pageCount, currentPage]);

  const handlePageChange = (p: number) => {
    if (p < 1 || p > pageCount) return;
    setCurrentPage(p);
  };

  const toggleAll = (checked: boolean) => {
    const next: Record<string, boolean> = {};
    pageItems.forEach((f) => (next[f.id] = checked));
    setSelected(next);
  };

  const selectedCount = pageItems.filter((f) => selected[f.id]).length;
  const isAllSelected =
    pageItems.length > 0 && selectedCount === pageItems.length;
  const isSomeSelected = selectedCount > 0 && !isAllSelected;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      {/* Filter pills + search */}
      <SortPills
        onSortChange={(k, o) => {
          setSortKey(k);
          setSortOrder(o);
          setCurrentPage(1);
        }}
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
      />

      {selectedCount > 0 && (
        <div className="flex items-center gap-4 rounded-full border border-[#E3EDE8] bg-[#F7F9F8] px-4 py-2 text-sm text-[#2E3A33] shadow-sm">
          <button onClick={() => setSelected({})} className="text-[#97A19C] hover:text-[#2E3A33]" aria-label="Clear selection">
            <XMarkIcon className="h-4 w-4" />
          </button>
          <span className="text-[#6B7A73]">{selectedCount} Selected</span>
          <span className="mx-1 h-4 w-px bg-[#E3EDE8]" />
          <button className="text-[#6B7A73] hover:text-[#2E3A33]" aria-label="Get link"><LinkIcon className="h-4 w-4" /></button>
          <button className="text-[#6B7A73] hover:text-[#2E3A33]" aria-label="Share"><ShareIcon className="h-4 w-4" /></button>
          <button className="text-[#6B7A73] hover:text-[#2E3A33]" aria-label="Download"><ArrowDownTrayIcon className="h-4 w-4" /></button>
          <div className="ml-auto">
            <button className="text-[#6B7A73] hover:text-[#2E3A33]" aria-label="More actions"><EllipsisVerticalIcon className="h-5 w-5" /></button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="rounded-2xl border border-[#97C1A9] bg-white shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#97C1A9] text-white text-sm">
                <th className="px-4 py-3">
                  <div className="flex items-center gap-2 select-none">
                    <button
                      type="button"
                      onClick={() => toggleAll(!isAllSelected)}
                      aria-label="Toggle select all on page"
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#97C1A9] shadow-sm"
                    >
                      {isAllSelected ? (
                        <CheckIcon className="h-3.5 w-3.5" />
                      ) : isSomeSelected ? (
                        <MinusSmallIcon className="h-3.5 w-3.5" />
                      ) : (
                        <span className="block h-3 w-3 rounded-full border border-[#97C1A9]" />
                      )}
                    </button>
                    <button
                      className="inline-flex items-center gap-1"
                      onClick={() => {
                        if (sortKey === "name")
                          setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
                        else setSortKey("name");
                      }}
                    >
                      <span>File Name</span>
                      <ChevronUpDownIcon className="h-3 w-3 opacity-90" />
                    </button>
                  </div>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => {
                      if (sortKey === "sizeKB")
                        setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
                      else setSortKey("sizeKB");
                    }}
                  >
                    <span>File Size</span>
                    <ChevronUpDownIcon className="h-3 w-3 opacity-90" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => {
                      if (sortKey === "modified")
                        setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
                      else setSortKey("modified");
                    }}
                  >
                    <span>Last Modified</span>
                    <ChevronUpDownIcon className="h-3 w-3 opacity-90" />
                  </button>
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
  {pageItems.map((f) => (
    <tr
      key={f.id}
      className="hover:bg-gray-50 min-h-[72px]" // ✅ ensures row height
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-full border-[#97C1A9] text-[#97C1A9] accent-[#97C1A9]"
            checked={!!selected[f.id]}
            onChange={(e) =>
              setSelected({ ...selected, [f.id]: e.target.checked })
            }
          />
          <FolderIcon className="h-5 w-5 text-[#97C1A9]" />
          <span className="text-[#2E3A33] text-sm font-medium">
            {f.name}
          </span>
        </div>
      </td>

      {/* File Size */}
      <td className="px-8 py-3 text-sm text-[#69756F] text-right whitespace-nowrap">
        {formatSize(f.sizeKB)}
      </td>

      {/* Last Modified */}
      <td className="px-8 py-3 text-sm text-[#69756F] text-right whitespace-nowrap">
        {f.modified}
      </td>

      <td className="px-4 py-3 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="rounded-full p-1 text-[#69756F] hover:bg-[#EDF7F2]">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </Menu.Button>
          {/* ...menu items remain the same... */}
        </Menu>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>

      {filtered.length > pageSize && (
        <div className="px-2">
          <div className="flex items-center justify-center gap-6">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#97C1A9", opacity: 0.3 }}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="disabled:opacity-50"
                aria-label="Previous page"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#838884"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="inline-flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, idx) => {
                  const page = idx + 1;
                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className="w-9 h-9 flex items-center justify-center text-sm border rounded-md"
                      style={
                        isActive
                          ? {
                              backgroundColor: "#97C1A9",
                              color: "#565656",
                              borderColor: "#97C1A9",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                            }
                          : {
                              backgroundColor: "#ffffff",
                              color: "#838884",
                              borderColor: "#e6e6e6",
                            }
                      }
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="disabled:opacity-50"
                aria-label="Next page"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="#838884"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#97C1A9", opacity: 0.3 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
