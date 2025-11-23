"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Overview", href: "/business/device-management/over-view" },
  { name: "Activity", href: "/business/device-management/activity" },
  { name: "Security", href: "/business/device-management/security" },
  { name: "Settings", href: "/business/device-management/settings" },
];

export default function DeviceManagementSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#F5F5F5] rounded-xl py-4 px-3 w-[220px] flex flex-col">
      <nav aria-label="Device Navigation">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block w-full text-left rounded-[16px] py-2.5 px-4 text-[18px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#97C1A9] text-white"
                      : "text-[#6B7280] hover:bg-[#97C1A9] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
