"use client";
import Image from "next/image";
import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export type FilterOption = { id: string; label: string };

interface Props {
  className?: string;
  filterTitle?: string;
  options: FilterOption[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onClear: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  searchPlaceholder?: string;
}

export default function FilterSearchBar({
  className,
  filterTitle = "Filter",
  options,
  selected,
  onToggle,
  onClear,
  query,
  onQueryChange,
  searchPlaceholder = "Search...",
}: Props) {
  return (
    <div className={`flex items-center justify-between gap-4 ${className ?? ""}`}>
      {/* Filter */}
      <Popover className="relative">
        <PopoverButton className="flex items-center gap-2 h-9 rounded-2xl border border-[#97C1A9] px-10 py-2 text-[14px] text-[#838884]">
          {filterTitle}
          {/* Chevron up/down indicator to match Figma */}
          <svg
            xmlns="http://www.w3.org/2000/svg       "
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-[#97C1A9]"
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.135l3.71-2.904a.75.75 0 0 1 1.04 1.08l-4.23 3.315a.75.75 0 0 1-.94 0L5.25 8.31a.75.75 0 0 1-.02-1.1Z" />
            <path d="M14.77 12.79a.75.75 0 0 1-1.06-.02L10 9.865l-3.71 2.904a.75.75 0 0 1-1.04-1.08l4.23-3.315a.75.75 0 0 1 .94 0l4.36 3.314a.75.75 0 0 1-.01 1.102Z" />
          </svg>
          {selected.size > 0 && (
            <span className="rounded-full bg-[#97C1A9] px-2 py-0.5 text-white text-xs">{selected.size}</span>
          )}
        </PopoverButton>
        <PopoverPanel anchor="bottom start" className="absolute z-20 mt-2 w-56 rounded-xl border border-[#E8EFEA] bg-white p-3 shadow-lg">
          <p className="mb-2 text-xs font-medium text-gray-500">Status</p>
          {options.map((opt) => (
            <label key={opt.id} className="mb-1 flex items-center gap-2 text-sm text-[#2E3A33]">
              <input
                type="checkbox"
                checked={selected.has(opt.id)}
                onChange={() => onToggle(opt.id)}
                className="accent-[#97C1A9]"
              />
              {opt.label}
            </label>
          ))}
          <div className="mt-2 flex justify-end gap-2">
            <button onClick={onClear} className="text-xs text-gray-500 hover:underline">Clear</button>
          </div>
        </PopoverPanel>
      </Popover>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-9 w-[268px] rounded-full border border-[#CBD5E1]/30 pl-5 pr-3 text-[12px] focus:outline-none"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#97C1A9]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        </span>
      </div>
    </div>
  );
}