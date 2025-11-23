'use client'

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import SortPills, { type SortKey } from "../common/SortPills";
import { TrashIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { archivedFiles, type FileItem } from "../archived/data";

const pageSize = 6;

function FileCard({ file }: { file: FileItem }) {
  return (
    <div className="rounded-xl border border-[#97C1A9] bg-white shadow-sm">
      {/* Card header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2 text-[#2E3A33]">
          <DocumentIcon className="h-4 w-4 text-[#97C1A9]" />
          <p className="text-sm font-medium truncate max-w-[180px]" title={file.name}>
            {file.name}
          </p>
        </div>
        <button className="rounded-md p-1.5 text-red-500 hover:bg-red-50" aria-label="Delete permanently">
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Preview image */}
      <div className="px-3 pb-2">
        <div className="overflow-hidden rounded-xl border border-[#E6F0EA]">
          <Image
            src={file.thumbnail}
            alt={file.name}
            width={480}
            height={280}
            className="h-40 w-full object-cover"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 pb-3">
        <span className="text-xs text-[#69756F]">{file.modified}</span>
        <button className="flex items-center gap-1.5 rounded-lg bg-[#97C1A9] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#85CFA0] transition-colors">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 14L4 9M4 9L9 4M4 9H14.5C17.5376 9 20 11.4624 20 14.5C20 17.5376 17.5376 20 14.5 20H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Restore
        </button>
      </div>
    </div>
  );
}

export default function TrashDetailView() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="space-y-6 p-2 lg:p-4">
      {/* Sort + Search */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {pageItems.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>

      {/* Pagination */}
      {filtered.length > pageSize && (
        <div className="px-2">
          <div className="flex items-center justify-center gap-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "#97C1A9", opacity: 0.3 }} />
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="disabled:opacity-50" aria-label="Previous page">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="#838884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="inline-flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, idx) => {
                  const page = idx + 1;
                  const isActive = page === currentPage;
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)} className="w-9 h-9 flex items-center justify-center text-sm border rounded-md" style={isActive ? { backgroundColor: '#97C1A9', color: '#565656', borderColor: '#97C1A9', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' } : { backgroundColor: '#ffffff', color: '#838884', borderColor: '#e6e6e6' }}>
                      {page}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))} disabled={currentPage === pageCount} className="disabled:opacity-50" aria-label="Next page">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18" stroke="#838884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div className="flex-1 h-px" style={{ backgroundColor: "#97C1A9", opacity: 0.3 }} />
          </div>
        </div>
      )}
    </div>
  );
}
