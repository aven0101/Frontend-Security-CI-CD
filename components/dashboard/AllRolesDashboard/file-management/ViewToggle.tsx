"use client";

import {
  Squares2X2Icon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";

type Props = {
  value: "grid" | "table";
  onChange: (v: "grid" | "table") => void;
};

export default function ViewToggle({ value, onChange }: Props) {
  const Btn = ({
    type,
    label,
    Icon,
  }: {
    type: "grid" | "table";
    label: string;
    Icon: any;
  }) => {
    const active = value === type;
    return (
      <button
        onClick={() => onChange(type)}
        aria-label={`Show ${label}`}
        className={`h-9 w-9 inline-flex items-center justify-center rounded-md border ${
          active
            ? "bg-[#97C1A9] border-[#97C1A9] text-white"
            : "bg-white border-[#97C1A9] text-[#97C1A9]"
        }`}
        title={label}
      >
        <Icon className="h-5 w-5" />
      </button>
    );
  };

  return (
    <div className="inline-flex items-center gap-2">
      <Btn type="table" label="Table" Icon={Bars3BottomLeftIcon} />
      <Btn type="grid" label="Detail" Icon={Squares2X2Icon} />
    </div>
  );
}
