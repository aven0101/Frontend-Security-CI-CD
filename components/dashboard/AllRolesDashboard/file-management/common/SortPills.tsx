"use client";

import { Menu } from "@headlessui/react";
import {
  DocumentTextIcon,
  Squares2X2Icon,
  ClockIcon,
  ArrowsUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export type SortKey = "name" | "type" | "modified" | "sizeKB";

function PillButton({ icon: Icon, label, onClick }: { icon: any; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-[#97C1A9] px-4 py-2 text-sm text-[#2E3A33] bg-white hover:bg-[#F7FBF9]"
    >
      <Icon className="h-4 w-4 text-[#97C1A9]" />
      <span>{label}</span>
      <ArrowsUpDownIcon className="h-4 w-4 text-[#97C1A9]" />
    </button>
  );
}

function SortMenu({
  label,
  icon: Icon,
  menuKey,
  onSortChange,
}: {
  label: string;
  icon: any;
  menuKey: SortKey;
  onSortChange: (k: SortKey, o: "asc" | "desc") => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as={PillButton} icon={Icon} label={label} />
      <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-xl border border-[#97C1A9] bg-white p-1 shadow-lg focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active ? "bg-[#F1FBF6]" : ""} flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#2E3A33]`}
              onClick={() => onSortChange(menuKey, "asc")}
            >
              <ArrowsUpDownIcon className="h-4 w-4 rotate-180 text-[#97C1A9]" />
              ASC
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active ? "bg-[#F1FBF6]" : ""} flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#2E3A33]`}
              onClick={() => onSortChange(menuKey, "desc")}
            >
              <ArrowsUpDownIcon className="h-4 w-4 text-[#97C1A9]" />
              DESC
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default function SortPills({
  onSortChange,
  search,
  onSearchChange,
}: {
  onSortChange: (k: SortKey, o: "asc" | "desc") => void;
  search: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SortMenu label="Name" icon={DocumentTextIcon} menuKey="name" onSortChange={onSortChange} />
      <SortMenu label="File Type" icon={Squares2X2Icon} menuKey="type" onSortChange={onSortChange} />
      <SortMenu label="Modified" icon={ClockIcon} menuKey="modified" onSortChange={onSortChange} />
      <SortMenu label="File Size" icon={ArrowsUpDownIcon} menuKey="sizeKB" onSortChange={onSortChange} />

      <div className="ml-auto flex items-center gap-2 rounded-lg border border-[#97C1A9] px-3 py-2 text-[#2E3A33]">
        <MagnifyingGlassIcon className="h-4 w-4 text-[#97C1A9]" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="min-w-[180px] flex-1 bg-transparent text-sm outline-none placeholder:text-[#97A19C]"
        />
      </div>
    </div>
  );
}
