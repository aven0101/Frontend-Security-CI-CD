import UserProfileSettings from "@/components/dashboard/AllRolesDashboard/user-profile-settings/UserProfileSettings";
import { cookies } from "next/headers";

export default async function UserProfileSettingsDashboard() {
    const cookieStore = await cookies();
    const active_role = cookieStore.get("authRole")?.value || "";

    return <UserProfileSettings role={active_role as "admin" | "manager"} />;
    
}