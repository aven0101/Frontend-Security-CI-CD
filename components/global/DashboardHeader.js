"use client";

import BusinessAdminDashboardHeader from './DashboardHeaders/BusinessAdminDashboard';
import SuperAdminDashboardHeader from './DashboardHeaders/SuperAdminDashboard';
import Cookies from 'js-cookie';

export default function DashboardHeader() {

    const authToken = Cookies.get("authToken");
    const authRole = Cookies.get("authRole");

    console.log("DashboardHeader authRole:", authRole);
    return (
        <>
        {
            authRole === 'super_admin' &&
            <SuperAdminDashboardHeader />
        }
        {
            authRole !== 'super_admin' &&
            <BusinessAdminDashboardHeader />
        }
        </>
    )
}
