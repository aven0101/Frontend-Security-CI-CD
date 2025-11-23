"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SortPills, { type SortKey } from "../common/SortPills";
import { archivedFiles, type FileItem } from "../archived/data";
import { Dialog, Menu, Transition } from "@headlessui/react";

import {
  EllipsisVerticalIcon,
  LinkIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  StarIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  InformationCircleIcon,
  ArchiveBoxArrowDownIcon,
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

export default function DevicesTableView() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [shareFile, setShareFile] = useState<FileItem | null>(null);
  const [copied, setCopied] = useState(false);
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

      {/* Selection toolbar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-4 rounded-xl border border-[#97C1A9] bg-white px-3 py-2 text-[#2E3A33]">
          <button
            onClick={() => setSelected(new Set())}
            className="rounded-md p-1 text-[#6B7A73] hover:bg-[#EDF7F2]"
            aria-label="Clear selection"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium">{selected.size} Selected</span>
          <span className="mx-1 h-5 w-px bg-[#97C1A9]/40" />
          <button
            className="rounded-md p-1 text-[#6B7A73] hover:bg-[#EDF7F2]"
            aria-label="Get link"
          >
            <LinkIcon className="h-5 w-5" />
          </button>
          <button
            className="rounded-md p-1 text-[#6B7A73] hover:bg-[#EDF7F2]"
            aria-label="Share"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
          <button
            className="rounded-md p-1 text-[#6B7A73] hover:bg-[#EDF7F2]"
            aria-label="Download"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
          </button>
          <Menu as="div" className="relative ml-auto inline-block text-left">
            <Menu.Button
              className="rounded-md p-1 text-[#6B7A73] hover:bg-[#EDF7F2]"
              aria-label="More"
            >
              <EllipsisVerticalIcon className="h-5 w-5" />
            </Menu.Button>
            <CommonMenuItems />
          </Menu>
        </div>
      )}

      {/* Table container */}
      {/* Keep overflow hidden to respect rounded container; menus for bottom rows will drop upward to stay inside */}
      <div className="overflow-hidden rounded-2xl border border-[#97C1A9] bg-white">
        {/* Header */}
        <div className="flex items-center bg-[#6FAE90] text-white">
          <div className="w-12 flex items-center justify-center py-3">
            <input
              ref={selectAllRef}
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
              className="h-4 w-4 rounded-full border-white text-[#2E3A33] focus:ring-0"
            />
          </div>
          <HeaderCell
            label="File Name"
            active={sortKey === "name"}
            order={sortOrder}
            onClick={() => onHeaderSort("name")}
            className="flex-1"
          />
          {/* Star column header (empty for alignment) */}
          <div className="w-12 px-3 py-3" />
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
          <div className="w-40 px-3 py-3 text-sm font-medium">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#E6F0EA]">
          {pageItems.map((file) => (
            <Row
              key={file.id}
              file={file}
              checked={selected.has(file.id)}
              onToggle={() => toggleRow(file.id)}
              onGetLink={() => setShareFile(file)}
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
      {/* Share Link Dialog */}
      <ShareLinkDialog
        open={!!shareFile}
        file={shareFile}
        link={
          shareFile ? `https://yourapp.com/shared/file/${shareFile.id}` : ""
        }
        copied={copied}
        onCopy={() => {
          if (!shareFile) return;
          const text = `https://yourapp.com/shared/file/${shareFile.id}`;
          navigator.clipboard?.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          });
        }}
        onClose={() => setShareFile(null)}
      />
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
  onGetLink,
}: {
  file: FileItem;
  checked: boolean;
  onToggle: () => void;
  onGetLink: () => void;
}) {
  return (
    <div className="flex items-center">
      <div className="w-12 flex items-center justify-center py-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="h-4 w-4 rounded-full text-[#2E3A33] focus:ring-0"
        />
      </div>
      <div className="flex-1 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md border border-[#97C1A9]/60 flex items-center justify-center bg-[#F7FBF9]">
            {getFileIcon(file.type)}
          </div>
          <div className="max-w-[50%] min-w-[50%]">
            <p className="truncate text-sm text-[#2E3A33]">{file.name}.jpg</p>
            <p className="text-xs text-[#8A9992]">{file.type}</p>
          </div>
          {/* Star column - separate from filename */}
          <div className="w-12 px-3 py-3 flex items-center justify-center">
            {file.starred && <StarIcon className="h-5 w-5 text-[#97C1A9]" />}
          </div>
        </div>
      </div>

      <div className="w-40 px-3 py-3 text-sm text-[#2E3A33]">
        {formatSize(file.sizeKB)}
      </div>
      <div className="w-48 px-3 py-3 text-sm text-[#2E3A33]">
        {file.modified.replace(/\//g, "/")}
      </div>
      <div className="w-40 px-3 py-3">
        <div className="relative flex items-center gap-2 text-[#6B7A73]">
          <button
            onClick={onGetLink}
            className="rounded-md p-1 hover:bg-[#EDF7F2]"
            aria-label="Get link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <button
            className="rounded-md p-1 hover:bg-[#EDF7F2]"
            aria-label="Share"
          >
            <ShareIcon className="h-4 w-4" />
          </button>
          <button
            className="rounded-md p-1 hover:bg-[#EDF7F2]"
            aria-label="Download"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
          </button>
          <Menu as="div" className="inline-block text-left">
            <Menu.Button
              className="rounded-md p-1 hover:bg-[#EDF7F2]"
              aria-label="More"
            >
              <EllipsisVerticalIcon className="h-5 w-5" />
            </Menu.Button>
            {/* Center menu inside the Actions cell */}
            <CommonMenuItems className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 origin-center" />
          </Menu>
        </div>
      </div>
    </div>
  );
}

function CommonMenuItems({
  className = "absolute right-0 mt-2 w-44 origin-top-right",
}: {
  className?: string;
}) {
  const items = [
    { label: "Rename", icon: PencilSquareIcon },
    { label: "Organize", icon: Squares2X2Icon },
    { label: "Move", icon: ArrowDownTrayIcon },
    { label: "Copy", icon: ArrowDownTrayIcon },
    { label: "Star", icon: StarIcon },
    { label: "Shortcut", icon: LinkIcon },
    { label: "Details", icon: InformationCircleIcon },
    { label: "Archive", icon: ArchiveBoxArrowDownIcon },
  ];
  return (
    <Menu.Items
      className={`${className} z-50 rounded-xl border border-[#97C1A9] bg-white p-1 shadow-lg focus:outline-none max-h-[70vh] overflow-auto`}
    >
      {items.map(({ label, icon: Icon }) => (
        <Menu.Item key={label}>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-[#F1FBF6]" : ""
              } flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#2E3A33]`}
            >
              <Icon className="h-4 w-4 text-[#97C1A9]" />
              {label}
            </button>
          )}
        </Menu.Item>
      ))}
      <div className="my-1 h-px bg-[#E2E8F0]" />
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-red-50" : ""
            } flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600`}
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </button>
        )}
      </Menu.Item>
    </Menu.Items>
  );
}

type ShareLinkDialogProps = {
  open: boolean;
  file: FileItem | null;
  link: string;
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
};

function ShareLinkDialog({
  open,
  file,
  link,
  copied,
  onCopy,
  onClose,
}: ShareLinkDialogProps) {
  return (
    <Transition appear show={open}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          enter="transition-opacity ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#00160E]/60" />
        </Transition.Child>

        {/* Centered panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            enter="transition-all ease-out duration-200"
            enterFrom="opacity-0 translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition-all ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-2 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl rounded-xl border border-[#97C1A9] bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between gap-4 border-b border-[#E6F0EA] px-4 py-3">
                <Dialog.Title className="text-sm text-[#2E3A33]">
                  <span className="font-medium">Share File</span>
                  {file && (
                    <>
                      <span className="mx-1 text-[#8AA097]">[</span>
                      <span className="text-[#6FAE90]">
                        File: {file.name}.jpg
                      </span>
                      <span className="ml-1 text-[#8AA097]">]</span>
                    </>
                  )}
                </Dialog.Title>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-md p-1 text-[#6B7A73] hover:bg-[#EDF7F2]"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-lg border border-[#97C1A9] px-3 py-2 text-sm text-[#2E3A33] bg-white">
                    <input
                      readOnly
                      value={link}
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                  <button
                    onClick={onCopy}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#E2F4EC] px-4 py-2 text-sm font-medium text-[#2E3A33] hover:brightness-95"
                  >
                    {copied ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-4 w-4"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-4 w-4 text-[#6FAE90]" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
