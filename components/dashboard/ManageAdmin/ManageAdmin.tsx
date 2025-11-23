"use client";

import { useState, useEffect } from 'react';
import { SuperAdminAPI } from "@/utils/api";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: 'Active' | 'Suspended' | 'Removed' | string;
  accountCreationDate: string;
  effectiveStatusDate: string;
  phone?: string | null;
};
import Image from 'next/image';
import CreateAdminModal from './CreateAdminModal';
import toast, { Toaster } from 'react-hot-toast';

const ManageAdmin = () => {
  // Custom confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    action: '', // 'suspend' or 'remove'
    userId: null as null | number | string,
    message: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    id: null as any,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  const sortOptions = [
    { value: 'created_at', label: 'By Date' },
    { value: 'first_name', label: 'By Name' },
    { value: 'status', label: 'By Status' }
  ];

  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // API filter states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orderBy, setOrderBy] = useState<string>('created_at');
  const [order, setOrder] = useState<string>('desc');

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Active': return 'text-emerald-500';
      case 'Suspended': return 'text-blue-500';
      case 'Removed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const handleSuspend = (userId: number | string) => {
    setActiveMenu(null);
    setConfirmModal({
      open: true,
      action: 'suspend',
      userId,
      message: 'You are about to suspend this user.'
    });
  };

  const handleRemove = (userId: number | string) => {
    setActiveMenu(null);
    setConfirmModal({
      open: true,
      action: 'remove',
      userId,
      message: 'This user will be permanently deleted!'
    });
  };

  const handleActivate = (userId: number | string) => {
    setActiveMenu(null);
    setConfirmModal({
      open: true,
      action: 'activate',
      userId,
      message: 'You are about to activate this user.'
    });
  };

  // Confirm modal action
  const handleConfirm = async () => {
    if (!confirmModal.userId) return;
    if (confirmModal.action === 'suspend') {
      const { success, message } = await SuperAdminAPI.suspendAdmin(String(confirmModal.userId));
      if (success) {
        toast.success('User suspended');
        // Refresh user list to get updated data
        fetchUsers();
      } else {
        alert(typeof message === 'string' ? message : 'Failed to suspend user');
      }
    } else if (confirmModal.action === 'activate') {
      const { success, message } = await SuperAdminAPI.activateAdmin(String(confirmModal.userId));
      if (success) {
        toast.success('User activated');
        fetchUsers();
      } else {
        alert(typeof message === 'string' ? message : 'Failed to activate user');
      }
    } else if (confirmModal.action === 'remove') {
      const { success, message } = await SuperAdminAPI.removeAdmin(String(confirmModal.userId));
      if (success) {
        toast.success('User removed');
        // Refresh user list to get updated data
        fetchUsers();
      } else {
        alert(typeof message === 'string' ? message : 'Failed to delete user');
      }
    }
    setConfirmModal({ open: false, action: '', userId: null, message: '' });
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const pageCount = Math.max(1, Math.ceil(totalUsers / pageSize));

  // Fetch users from API - reusable function
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const params = {
      page: currentPage,
      pageSize,
      search: debouncedSearchQuery,
      role: 'admin',
      status: statusFilter,
      orderBy,
      order,
    };

    const { success, message } = await SuperAdminAPI.GetAdmin(params);
    if (success && message) {

      const apiUsers = message.users || [];
      setUsers(apiUsers.map((u: any) => ({
        id: String(u.id),
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        status: u.is_active === 1 ? 'Active' : 'Suspended',
        accountCreationDate: u.created_at ? new Date(u.created_at).toLocaleDateString() : '',
        effectiveStatusDate: u.updated_at ? new Date(u.updated_at).toLocaleDateString() : '',
        phone: u.phone ?? null,
      })));
      setTotalUsers(message.pagination?.totalCount || apiUsers.length);
    } else {
      setUsers([]);
      setTotalUsers(0);
      setError(typeof message === 'string' ? message : 'Failed to fetch users');
    }
    setLoading(false);
  };

  // Fetch users on dependency changes
  // Debounce search input updates
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms debounce
    return () => clearTimeout(handle);
  }, [searchQuery]);

  // Reset to first page on debounced search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // Fetch users when filters/pagination/debounced search change
  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize, debouncedSearchQuery, statusFilter, orderBy, order]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageCount) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" containerClassName="!z-[99999999]" />
      {/* Custom Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          {/* Modal */}
          <div className="relative z-10 max-w-md w-full rounded-2xl bg-white p-8 shadow-xl animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#00281A] mb-3 font-aptos">Are you sure?</h2>
            <p className="mb-8 text-gray-700 font-aptos">{confirmModal.message}</p>
            <div className="flex justify-end gap-3">
              <button
                className="w-[120px] min-h-[45px] rounded-full bg-[#98C1A9] text-white font-bold flex items-center justify-center text-[0.95rem] px-4"
                onClick={() => setConfirmModal({ open: false, action: '', userId: null, message: '' })}
              >
                Cancel
              </button>
              <button
                className="w-[120px] min-h-[45px] rounded-full bg-[#98C1A9] text-white font-bold flex items-center justify-center text-[0.95rem] px-4"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl md:text-4xl font-semibold text-[#97C1A9]">Manage Admin Users</h1>
          <button
            onClick={() => (
              setIsCreateModalOpen(true),
              setEditUser({
                id: null,
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
              })
            )}
            className="bg-[#98C1A9] hover:bg-[#98C1A9]/90 cursor-pointer text-white px-5 py-4 rounded-2xl flex items-center gap-3 transition-colors"
          >
            <Image src="/dashboard/add-icon.png" alt="add" width={500} height={500} className="w-4 object-contain" />
            <span>Create Admin</span>
          </button>

          <CreateAdminModal user={editUser} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={fetchUsers} />
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            {/* Custom Dropdown */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white border border-[#98C1A9] text-[#848884] rounded-full px-6 py-2 text-sm cursor-pointer flex items-center justify-center min-w-[120px] gap-4"
            >
              <span>
                {sortOptions.find(option => option.value === orderBy)?.label || 'By Date'}
                
              </span>
              <div className="">
                <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.0361114 3.46092C0.000580941 3.37527 -0.00875284 3.28102 0.00929062 3.19007C0.0273341 3.09912 0.071944 3.01557 0.137478 2.94998L2.94998 0.137478C2.99351 0.0938954 3.04521 0.0593208 3.10212 0.0357313C3.15902 0.0121418 3.22002 0 3.28162 0C3.34322 0 3.40422 0.0121418 3.46112 0.0357313C3.51803 0.0593208 3.56973 0.0938954 3.61326 0.137478L6.42576 2.94998C6.49139 3.01554 6.53609 3.09909 6.55421 3.19007C6.57233 3.28105 6.56304 3.37535 6.52754 3.46105C6.49203 3.54675 6.43189 3.61999 6.35474 3.67149C6.27758 3.72299 6.18688 3.75044 6.09412 3.75037H0.469119C0.37641 3.75035 0.285788 3.72284 0.208713 3.67132C0.131639 3.6198 0.0715727 3.54657 0.0361114 3.46092ZM6.09412 8.43787H0.469119C0.376356 8.4378 0.285656 8.46525 0.208503 8.51675C0.131349 8.56825 0.0712113 8.64149 0.0357023 8.72719C0.000193357 8.81288 -0.00909006 8.90719 0.00902731 8.99817C0.0271447 9.08915 0.071848 9.1727 0.137478 9.23826L2.94998 12.0508C2.99351 12.0943 3.04521 12.1289 3.10212 12.1525C3.15902 12.1761 3.22002 12.1882 3.28162 12.1882C3.34322 12.1882 3.40422 12.1761 3.46112 12.1525C3.51803 12.1289 3.56973 12.0943 3.61326 12.0508L6.42576 9.23826C6.49139 9.1727 6.53609 9.08915 6.55421 8.99817C6.57233 8.90719 6.56304 8.81288 6.52754 8.72719C6.49203 8.64149 6.43189 8.56825 6.35474 8.51675C6.27758 8.46525 6.18688 8.4378 6.09412 8.43787Z" fill="#848884" />
                </svg>
              </div>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#98C1A9] rounded-lg shadow-lg z-20">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        if (orderBy === option.value) {
                          setOrder(order === 'asc' ? 'desc' : 'asc');
                        } else {
                          setOrderBy(option.value);
                          setOrder('asc');
                        }
                        setIsDropdownOpen(false);
                      }}
                      className={`px-6 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${orderBy === option.value ? 'bg-[#98C1A9]/10 text-[#98C1A9]' : 'text-[#848884]'
                        }`}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative w-[374px] h-[48px] min-h-[48px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full bg-white border border-gray-300 rounded-[123px] pt-[12px] pr-[23px] pb-[12px] pl-[23px] text-sm focus:outline-none focus:ring-emerald-400"
            />
            <svg
              className="absolute right-[23px] top-1/2 -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        {/* Table wrapper with shadow (shadow lives on outer so it isn't clipped) */}
        <div className="min-h-[864px] w-full rounded-3xl" style={{ boxShadow: '0px 6px 18px rgba(0,0,0,0.12)', border: '1px solid #E2E8F0' }}>
          <div className="py-3 px-6">
            <h2 className="text-3xl font-semibold text-[#98C1A9]">Users</h2>
          </div>
          {/* thin green rule aligned with content */}
          <div className="">
            <div className="h-px bg-[#98C1A9]" />
          </div>

          <table className="w-full table-fixed">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-6 text-left text-base font-semibold text-[#97C1A9] w-20">S.no</th>
                <th className="px-6 py-6 text-left text-base font-semibold text-[#97C1A9] w-48">Name</th>
                <th className="px-6 py-6 text-left text-base font-semibold text-[#97C1A9] w-60">Email</th>
                <th className="px-6 py-6 text-left text-base font-semibold text-[#97C1A9] w-28">Status</th>
                <th className="px-6 py-6 text-left text-base font-semibold text-[#97C1A9] w-44">Account Creation Date</th>
                <th className="px-6 py-6 text-left text-base font-semibold text-[#97C1A9] w-44">Effective Status Date</th>
                <th className="px-6 py-6 text-left text-base font-semibold text-[#97C1A9] w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-4 text-center text-gray-500">Loading users...</td></tr>
              ) : error ? (
                <tr><td colSpan={7} className="px-6 py-4 text-center text-red-500">{error}</td></tr>
              ) : users.length > 0 && users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700 w-20 truncate">{(currentPage - 1) * pageSize + index + 1}</td>
                  <td className="px-6 py-4 w-48">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-white shadow-md overflow-hidden flex-shrink-0">
                        <Image
                          src={'/dashboard/user-avatar.png'}
                          alt={`${user.first_name} ${user.last_name}'s profile`}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <span className="text-sm text-gray-700 truncate">{user.first_name} {user.last_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 w-60 truncate" title={user.email}>{user.email}</td>
                  <td className="px-6 py-4 w-28">
                    <span className={`text-sm font-medium ${getStatusColor(user.status)} truncate block`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 w-44 truncate">{user.accountCreationDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 w-44 truncate">{user.effectiveStatusDate}</td>
                  <td className="px-6 py-4 w-16">
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                        className="text-gray-400 transition-colors cursor-pointer"
                      >
                        <Image src="/dashboard/3-dots-admin.png" alt="actions" width={14} height={14} className="object-contain" />
                      </button>

                      {activeMenu === user.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                          <div className="absolute right-0 top-8 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                            <button
                              onClick={() => (
                                setIsCreateModalOpen(true),
                                setEditUser({
                                  id: user.id,
                                  first_name: user.first_name,
                                  last_name: user.last_name,
                                  email: user.email,
                                  phone: (user as any).phone || '',
                                })
                              )}
                              className="hover:bg-black/5 w-full px-4 py-2 text-left text-md cursor-pointer text-gray-700 flex items-center gap-3"
                            >
                              <Image src="/dashboard/edit-admin.png" alt="edit" width={18} height={18} className="object-contain" />
                              <span className="aptos-action-label">Edit</span>
                            </button>
                            <button
                              onClick={() => user.status === 'Active' ? handleSuspend(user.id) : handleActivate(user.id)}
                              className="hover:bg-black/5 w-full px-4 py-2 text-left text-md cursor-pointer text-gray-700 flex items-center gap-3"
                            >
                              <Image src={user.status === 'Active' ? '/dashboard/suspend-icon.png' : '/dashboard/activate-icon.png'} alt={user.status === 'Active' ? 'suspend' : 'activate'} width={18} height={18} className="object-contain" />
                              <span className="aptos-action-label">{user.status === 'Active' ? 'Suspend' : 'Activate'}</span>
                            </button>
                            <button
                              onClick={() => handleRemove(user.id)}
                              className="hover:bg-black/5 w-full px-4 py-2 text-left text-md cursor-pointer text-gray-700 flex items-center gap-3"
                            >
                              <Image src="/dashboard/delete-admin.png" alt="remove" width={18} height={18} className="object-contain" />
                              <span className="aptos-action-label">Remove</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {(!loading && !error && users.length === 0) && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (below table) */}
        {pageCount > 1 &&
          <div className="py-6 ">
            <div className="">
              <div className="flex items-center justify-center gap-6">
                <div className="flex-1 h-px px-6" style={{ backgroundColor: '#97C1A9', opacity: 0.3 }} />

                <div className="flex items-center gap-3">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="disabled:opacity-50 cursor-pointer" aria-label="Previous page">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="#838884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className="inline-flex items-center gap-2">
                    {Array.from({ length: pageCount }).map((_, idx) => {
                      const page = idx + 1;
                      const isActive = page === currentPage;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-9 h-9  cursor-pointer flex items-center justify-center text-sm border rounded-md`}
                          style={isActive ? { backgroundColor: '#97C1A9', color: 'white', borderColor: '#97C1A9', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' } : { backgroundColor: '#ffffff', color: '#838884', borderColor: '#e6e6e6' }}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount} className="disabled:opacity-50  cursor-pointer" aria-label="Next page">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke="#838884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 h-px px-6" style={{ backgroundColor: '#97C1A9', opacity: 0.3 }} />
              </div>
            </div>
          </div>
        }
      </div>
    </div >
  );
};

export default ManageAdmin;