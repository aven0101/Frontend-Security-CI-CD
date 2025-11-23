"use client";

import { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import { SuperAdminAPI } from "@/utils/api";
import toast from "react-hot-toast";

type UIUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Suspended";
    assignTo: string;
};

type ApiUsersResponse = {
    users: Array<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        role: string;
        is_active: boolean;
        assigned_to?: any;
    }>;
    pagination: {
        page: number;
        pageSize: number;
        totalCount: number;
        totalPages: number;
    };
};

export default function ManageUsers({ role = "admin" as "admin" | "manager" }: { role?: "admin" | "manager" }) {

    const isAdmin = role === "admin";
    const [users, setUsers] = useState<UIUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddOpen, setAddOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isEditOpen, setEditOpen] = useState(false);

    // Pagination (server-side)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(10);

    const pageUsers = users; // users already reflect server page
    const pageCount = Math.max(1, Math.ceil( pageUsers.length / pageSize));
    // Fetch users
    useEffect(() => {
        let cancelled = false;
        const fetchUsers = async () => {
            setIsLoading(true);
            // Map UI sort option to API orderBy
            const orderBy = sortBy === "name" ? "first_name" : "created_at"; // fallback
            // Build query params. For admin viewer, don't pass role so we can display both manager and standard_user.
            const params: any = {
                page: String(currentPage),
                pageSize: String(pageSize),
                orderBy,
                order: sortOrder,
            };
            if (!isAdmin) params.role = role; // non-admin viewers can still be filtered by their specific role
            if (searchQuery.trim()) params.search = searchQuery.trim();
            const { success, message } = await SuperAdminAPI.GetAdmin(params);
            if (cancelled) return;
            if (!success) {
                const err = typeof message === "string" ? message : message?.message || "Failed to load users";
                toast.error(err);
                setIsLoading(false);
                return;
            }
            const payload: ApiUsersResponse = (message as any)?.data || (message as any);
            const items = payload?.users || [];
            const mapped: UIUser[] = items.map((u) => ({
                id: String(u.id),
                name: `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() || u.email,
                email: u.email,
                role: u.role,
                status: u.is_active ? "Active" : "Suspended",
                assignTo: typeof u.assigned_to === "string" ? u.assigned_to : (u.assigned_to?.name ?? ""),
            }));
            // If current viewer is admin, only show manager and standard_user roles
            const filteredByViewer = isAdmin ? mapped.filter(u => u.role === 'manager' || u.role === 'standard_user') : mapped;
            setUsers(filteredByViewer);
            const pg = payload?.pagination;
            setTotalPages(Math.max(1, pg?.totalPages || 1));
            setIsLoading(false);
        };
        fetchUsers();
        return () => {
            cancelled = true;
        };
        }, [currentPage, pageSize, role, searchQuery, sortBy, sortOrder, refreshKey]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const suspend = (id: string) => {
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: "Suspended" } : u)));
        setActiveMenu(null);
    };
    const remove = (id: string) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        setActiveMenu(null);
    };
    const [editUser, setEditUser] = useState<UIUser | null>(null);
    const openEdit = (u: UIUser) => {
        setEditUser(u);
        setEditOpen(true);
        setActiveMenu(null);
    };

    return (
        <div className="min-h-screen">
            <div className="px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-4xl font-semibold text-[#97C1A9]">Manage Users</h1>
                    <button onClick={() => setAddOpen(true)} className="bg-[#97C1A9] hover:bg-[#97C1A9]/90 text-white px-5 py-2 rounded-full text-sm font-medium">+ Add New User</button>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="appearance-none bg-white border border-[#98C1A9] text-[#98C1A9] rounded-full px-6 py-2 pr-10 text-sm">
                            <option value="date">Sort by</option>
                            <option value="name">Name</option>
                            <option value="status">Status</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-[#98C1A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                        </div>
                    </div>
                    <div className="relative w-[300px]">
                        <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search by name or email" className="w-full h-[40px] rounded-full border border-gray-300 px-4 text-sm"/>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    </div>
                </div>

                {/* Table card */}
                <div className="rounded-xl border border-[#E2E8F0] shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
                    <div className="bg-white rounded-xl overflow-hidden">
                        <div className="px-6 pt-6 pb-3 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-[#97C1A9]">Users</h2>
                        </div>
                        <div className="px-6"><div className="h-px bg-[#97C1A9] opacity-30"/></div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-[#97C1A9] text-sm">
                                        <th className="px-6 py-4 text-left font-semibold">ID</th>
                                        <th className="px-6 py-4 text-left font-semibold">Name</th>
                                        <th className="px-6 py-4 text-left font-semibold">Email</th>
                                        <th className="px-6 py-4 text-left font-semibold">Role</th>
                                        <th className="px-6 py-4 text-left font-semibold">Status</th>
                                        <th className="px-6 py-4" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {pageUsers.map((u, i) => (
                                        <tr key={u.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-700">{(currentPage - 1) * pageSize + i + 1}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white text-xs flex items-center justify-center">{(u.name||"?").split(" ").map(s=>s[0]).slice(0,2).join("").toUpperCase()}</div>
                                                    <span className="text-sm text-gray-800">{u.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{u.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{u.role}</td>
                                            <td className="px-6 py-4 text-sm"><span className={u.status === 'Active' ? 'text-[#98C1A9]' : 'text-[#F26C6C]'}>{u.status}</span></td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="relative inline-block">
                                                    <button onClick={()=>setActiveMenu(activeMenu===u.id?null:u.id)} className="text-gray-400">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>
                                                    </button>
                                                    {activeMenu===u.id && (
                                                        <>
                                                            <div className="fixed inset-0 z-10" onClick={()=>setActiveMenu(null)} />
                                                            <div className="absolute right-0 top-6 z-20 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                                                <button onClick={()=>openEdit(u)} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                                    <svg className="w-4 h-4 text-[#98C1A9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                                                                    Edit
                                                                </button>
                                                                <button onClick={()=>suspend(u.id)} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                                    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M4 6h16M4 18h16"/></svg>
                                                                    Suspend
                                                                </button>
                                                                <button onClick={()=>remove(u.id)} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                                    <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6"/><path d="M10 7h4m-7 0h10l-1 0"/></svg>
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                <div className="px-6 py-6 bg-white">
                    <div className="max-w-[1300px] mx-auto px-6">
                        <div className="flex items-center justify-center gap-6">
                            <div className="flex-1 h-px px-6 bg-[#97C1A9]/30" />
                            <div className="flex items-center gap-3">
                                <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage===1} className="disabled:opacity-50" aria-label="Previous page">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 18L9 12L15 6" stroke="#838884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <div className="inline-flex items-center gap-2">
                                                                        {Array.from({ length: totalPages }).map((_, idx) => {
                                        const page = idx + 1;
                                        const isActive = page === currentPage;
                                        return (
                                                                                        <button
                                                                                            key={page}
                                                                                            onClick={()=>handlePageChange(page)}
                                                                                            className={`w-9 h-9 flex items-center justify-center text-sm border rounded-md ${isActive ? 'bg-[#97C1A9] text-[#565656] border-[#97C1A9] shadow-[0_2px_6px_rgba(0,0,0,0.12)]' : 'bg-white text-[#838884] border-[#e6e6e6]'}`}
                                                                                        >
                                                                                            {page}
                                                                                        </button>
                                        );
                                    })}
                                </div>
                                <button onClick={()=>handlePageChange(currentPage+1)} disabled={currentPage===totalPages} className="disabled:opacity-50" aria-label="Next page">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 6L15 12L9 18" stroke="#838884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-1 h-px px-6 bg-[#97C1A9]/30" />
                        </div>
                    </div>
                </div>
                 )}
            </div>
        

            {/* Modals */}
            <AddUserModal
                open={isAddOpen}
                onClose={() => setAddOpen(false)}
                isAdmin={isAdmin}
                mode="create"
                onCreate={() => {
                    // Trigger server refetch after successful creation
                    setRefreshKey((k) => k + 1);
                }}
            />
            <AddUserModal
                open={isEditOpen}
                onClose={() => setEditOpen(false)}
                isAdmin={isAdmin}
                mode="edit"
                initial={editUser ? { id: editUser.id, username: editUser.name, email: editUser.email, role: editUser.role, assignTo: editUser.assignTo } : null}
                onCreate={() => {
                    // After successful edit, refresh the list from server to reflect authoritative data
                    setRefreshKey((k) => k + 1);
                }}
            />
        </div>
    );
}