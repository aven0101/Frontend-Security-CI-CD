import ManageUsers from "@/components/dashboard/AllRolesDashboard/manage-users/ManageUsers";
import { cookies } from "next/headers";

export default async function ManageUsersDashboard() {
    const cookieStore = await cookies();
    const active_role = cookieStore.get("authRole")?.value || "";

    return <ManageUsers role={active_role as "admin" | "manager"} />;
}