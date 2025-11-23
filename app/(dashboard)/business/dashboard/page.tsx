import DashboardComponent from "@/components/dashboard/AllRolesDashboard/Dashboard";
import { cookies } from "next/headers";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const role = cookieStore.get("authRole")?.value as any;
    return (
        <DashboardComponent initialRole={role} />
    );
}