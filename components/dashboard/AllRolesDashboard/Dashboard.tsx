"use client";

import { useState } from "react";
import BusinessAdminDashboard from "./dashboards/BusinessAdminDashboard";
import BusinessManagerDashboard from "./dashboards/BusinessManagerDashboard";

type Role = "admin" | "manager";

export default function DashboardComponent({ initialRole = "admin" as Role }: { initialRole?: Role }) {
  const [role, setRole] = useState<Role>(initialRole);
  return (
    <div>
      {role == "admin" && <BusinessAdminDashboard />}
      {role == "manager" && <BusinessManagerDashboard />}
    </div>
  );
}