import { ReactNode } from "react";
import DashboardHeader from "@/components/global/DashboardHeader";

export const metadata = {
    title: "Dashboard - Aerialink",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="dashboard">
            <DashboardHeader />
            <div className="max-w-7xl md:px-6 px-4 xl:px-0 m-auto xl:mt-35 lg:mt-32 mt-27">
                {children}
            </div>
            <footer className="py-5"></footer>
        </div>
    );
}
