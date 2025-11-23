"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SortPills, { type SortKey } from "../common/SortPills";
import { archivedFiles, type FileItem } from "../archived/data";

import {
  TrashIcon,
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

const pageSize = 8;

function formatSize(kb: number) {
  if (kb >= 1024 * 1024) return `${(kb / (1024 * 1024)).toFixed(2)} TB`;
  if (kb >= (1024 * 1024) / 1024)
    return `${(kb / ((1024 * 1024) / 1024)).toFixed(2)} GB`;
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  if (kb >= 1) return `${kb} KB`;
  return `${Math.round(kb * 1024)} B`;
}

// Helper function to get file icon based on type
function getFileIcon(type: string) {
  const iconClass = "h-5 w-5 text-[#6FAE90]";
  switch (type.toLowerCase()) {
    case "image":
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <PhotoIcon className={iconClass} />;
    case "video":
    case "mp4":
    case "avi":
    case "mov":
      return <VideoCameraIcon className={iconClass} />;
    case "audio":
    case "mp3":
    case "wav":
      return <MusicalNoteIcon className={iconClass} />;
    case "document":
    case "doc":
    case "docx":
    case "txt":
      return <DocumentTextIcon className={iconClass} />;
    default:
      return <DocumentIcon className={iconClass} />;
  }
}

export default function TrashTableView() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const selectAllRef = useRef<HTMLInputElement>(null);

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

  const allIdsOnPage = pageItems.map((f) => f.id);
  const isAllSelected =
    allIdsOnPage.length > 0 && allIdsOnPage.every((id) => selected.has(id));
  const isSomeSelected =
    !isAllSelected && allIdsOnPage.some((id) => selected.has(id));

  useEffect(() => {
    if (selectAllRef.current)
      selectAllRef.current.indeterminate = isSomeSelected;
  }, [isSomeSelected]);

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [pageCount, currentPage]);

  const toggleAll = () => {
    const next = new Set(selected);
    if (isAllSelected) {
      allIdsOnPage.forEach((id) => next.delete(id));
    } else {
      allIdsOnPage.forEach((id) => next.add(id));
    }
    setSelected(next);
  };

  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const onHeaderSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      {/* Sort/Search pills */}
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

      {/* Table container */}
      <div className="overflow-hidden rounded-2xl border border-[#97C1A9] bg-white">
        {/* Header */}
        <div className="flex items-center bg-[#6FAE90] text-white">
          <div className="w-12 flex items-center justify-center py-3">
            <input
              ref={selectAllRef}
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
              className="h-4 w-4 rounded border-white text-[#6FAE90] focus:ring-0 focus:ring-offset-0"
            />
          </div>
          <HeaderCell
            label="File Name"
            active={sortKey === "name"}
            order={sortOrder}
            onClick={() => onHeaderSort("name")}
            className="flex-1"
          />
          <HeaderCell
            label="File Size"
            active={sortKey === "sizeKB"}
            order={sortOrder}
            onClick={() => onHeaderSort("sizeKB")}
            className="w-40"
          />
          <HeaderCell
            label="Last Modified"
            active={sortKey === "modified"}
            order={sortOrder}
            onClick={() => onHeaderSort("modified")}
            className="w-48"
          />
          <div className="w-52 px-3 py-3 text-sm font-medium">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#E6F0EA]">
          {pageItems.map((file) => (
            <Row
              key={file.id}
              file={file}
              checked={selected.has(file.id)}
              onToggle={() => toggleRow(file.id)}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {filtered.length > pageSize && (
        <div className="px-2">
          <div className="flex items-center justify-center gap-6">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#97C1A9", opacity: 0.3 }}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
                      onClick={() => setCurrentPage(page)}
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(pageCount, p + 1))
                }
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

function HeaderCell({
  label,
  active,
  order,
  onClick,
  className = "",
}: {
  label: string;
  active?: boolean;
  order?: "asc" | "desc";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-3 text-left text-sm font-medium flex items-center gap-2 ${className}`}
    >
      <span>{label}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${active ? "opacity-100" : "opacity-60"}`}
      >
        <path
          d="M12 5L7 10H17L12 5Z"
          fill="currentColor"
          opacity={order === "asc" ? 1 : 0.35}
        />
        <path
          d="M12 19L17 14H7L12 19Z"
          fill="currentColor"
          opacity={order === "desc" ? 1 : 0.35}
        />
      </svg>
    </button>
  );
}

function Row({
  file,
  checked,
  onToggle,
}: {
  file: FileItem;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center hover:bg-[#F7FBF9] transition-colors">
      <div className="w-12 flex items-center justify-center py-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="h-4 w-4 rounded border-[#97C1A9] text-[#6FAE90] focus:ring-0 focus:ring-offset-0"
        />
      </div>
      <div className="flex-1 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md border border-[#97C1A9]/60 flex items-center justify-center bg-[#F7FBF9]">
            {getFileIcon(file.type)}
          </div>
          <div>
            <p className="text-sm text-[#2E3A33]">{file.name}</p>
          </div>
        </div>
      </div>

      <div className="w-40 px-3 py-3 text-sm text-[#2E3A33]">
        {formatSize(file.sizeKB)}
      </div>
      <div className="w-48 px-3 py-3 text-sm text-[#2E3A33]">
        {file.modified.replace(/\//g, "/")}
      </div>
      <div className="w-52 px-3 py-3">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg bg-[#97C1A9] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#85CFA0] transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 14L4 9M4 9L9 4M4 9H14.5C17.5376 9 20 11.4624 20 14.5C20 17.5376 17.5376 20 14.5 20H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Restore
          </button>
          <button className="rounded-md p-2 text-red-500 hover:bg-red-50 transition-colors" aria-label="Delete permanently">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
