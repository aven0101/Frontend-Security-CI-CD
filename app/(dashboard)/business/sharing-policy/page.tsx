import SharingPolicy from "@/components/dashboard/AllRolesDashboard/sharing-policy/SharingPolicy";
import { cookies } from "next/headers";

export default async function SharingPolicyPage() {
  const cookieStore = await cookies();
  const active_role = cookieStore.get("authRole")?.value || "";
  
  return <SharingPolicy role={active_role as "admin" | "manager"} />;
}
