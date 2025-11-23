import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const roleAllowedRoutes = {
    super_admin: [
        "/business/manage-admins",
        "/business/billing-info",
        "/business/profile-settings",
        "/business/security",
    ],
    manager: [
        "/business/dashboard",
        "/business/device-moderation",
        "/business/manage-users",
        "/business/activity-log",
        "/business/sharing-policy",
        "/business/user-profile-settings",
    ],
    admin: [
        "/business/dashboard",
        "/business/device-moderation",
        "/business/manage-users",
        "/business/user-profile-settings",
        "/business/file-management/archived",
        "/business/file-management/my-files",
        "/business/file-management/starred",
        "/business/file-management/synced",
        "/business/file-management/shared",
        "/business/file-management/devices",
        "/business/general-settings",
        "/business/storage-management",
        "/business/file-management/people",
        "/business/file-management/trash",
        "/business/device-management/overview",
        "/business/device-management/activity",
        "/business/device-management/security",
        "/business/device-management/settings",
        "/business/sharing-policy",
    ],
    standard_user: ["/business/dashboard"],
};

const restrictedBases = ["/business", "/personal"];

/**
 * Generic access check
 */
function canAccess(pathname, allowedRoutes = [], restrictedBases = []) {
    for (const base of restrictedBases) {
        if (pathname.startsWith(base)) {
            return allowedRoutes.includes(pathname);
        }
    }
    return true;
}

export function middleware(request) {

    const { pathname } = request.nextUrl;
    const token = request.cookies.get("authToken")?.value;
    const role = request.cookies.get("authRole")?.value;
    const authUser = request.cookies.get("authUser")?.value;
    const forgotToken = request.cookies.get("fp_email")?.value;
    const required2FAToken = request.cookies.get("required2FA")?.value;
    const response = NextResponse.next();

    if (request.nextUrl.pathname.startsWith('/null')) {
        // Remove all auth-related cookies
        const redirectResponse = NextResponse.redirect(new URL("/login", request.url));
        redirectResponse.cookies.set("authToken", "", { maxAge: 0, path: "/" });
        redirectResponse.cookies.set("authRole", "", { maxAge: 0, path: "/" });
        redirectResponse.cookies.set("fp_email", "", { maxAge: 0, path: "/" });
        redirectResponse.cookies.set("required2FA", "", { maxAge: 0, path: "/" });
        
        return redirectResponse;
    }

    if (!forgotToken && request.nextUrl.pathname.startsWith('/reset-password')) {
        return NextResponse.redirect(new URL("/forgot-password", request.url));
    }

    if (!required2FAToken && !token && request.nextUrl.pathname.startsWith('/security')) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const rolesDashboardPaths = [
        { path: "/business/manage-admins", role: "super_admin" },
        { path: "/business/dashboard", role: "admin" },
        { path: "/business/dashboard", role: "manager" },
        { path: "/business/dashboard", role: "standard_user" },
    ];

    const getPathByRole = (role) => {
        const found = rolesDashboardPaths.find(item => item.role === role);
        return found ? found.path : null; // return path or null if not found
    };

    // Auth pages to block if user is already logged in
    const authPages = ["/login", "/register", '/forgot-password', '/reset-password'];

    const isAuthPage = authPages.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    // If logged in and trying to access login/register → redirect to dashboard
    if (authUser && token && isAuthPage) {
        return NextResponse.redirect(new URL(getPathByRole(role), request.url));
    }
    // If not logged in and trying to access protected routes → redirect to login
    if (!token && !authUser && (request.nextUrl.pathname.startsWith('/business') || request.nextUrl.pathname.startsWith('/personal'))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Get allowed routes for the role
    const allowedRoutes = roleAllowedRoutes[role] || [];

    // Check access
    if (!canAccess(pathname, allowedRoutes, restrictedBases)) {
        // Redirect to dashboard or unauthorized page
        return NextResponse.redirect(new URL(getPathByRole(role), request.url));
    }

    // Otherwise, continue
    return NextResponse.next();
}