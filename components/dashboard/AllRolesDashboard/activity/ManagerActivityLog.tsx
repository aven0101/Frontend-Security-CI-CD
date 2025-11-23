'use client';

import { useEffect, useMemo, useState } from 'react';

export default function ManagerActivityLog() {
  const [query, setQuery] = useState('');
  const [dateFilterOpen] = useState(false); // placeholder for future popover
  const [typeFilterOpen] = useState(false);

  const rows = useMemo(
    () => [
      { id: 1, name: 'John Doe', action: 'File.pdf downloaded', at: '12-02-2025, 09:00AM' },
      { id: 2, name: 'John Doe', action: 'file.jpeg shared', at: '12-02-2025, 09:00AM' },
      { id: 3, name: 'John Doe', action: 'Shared Notes.pdf with 2 users', at: '12-02-2025, 09:00AM' },
      { id: 4, name: 'John Doe', action: 'file.jpeg shared', at: '12-02-2025, 09:00AM' },
      { id: 5, name: 'John Doe', action: 'File.pdf downloaded', at: '12-02-2025, 09:00AM' },
      { id: 1, name: 'John Doe', action: 'File.pdf downloaded', at: '12-02-2025, 09:00AM' },
      { id: 2, name: 'John Doe', action: 'file.jpeg shared', at: '12-02-2025, 09:00AM' },
      { id: 3, name: 'John Doe', action: 'Shared Notes.pdf with 2 users', at: '12-02-2025, 09:00AM' },
      { id: 4, name: 'John Doe', action: 'file.jpeg shared', at: '12-02-2025, 09:00AM' },
      { id: 5, name: 'John Doe', action: 'File.pdf downloaded', at: '12-02-2025, 09:00AM' },
      { id: 1, name: 'John Doe', action: 'File.pdf downloaded', at: '12-02-2025, 09:00AM' },
      { id: 2, name: 'John Doe', action: 'file.jpeg shared', at: '12-02-2025, 09:00AM' },
      { id: 3, name: 'John Doe', action: 'Shared Notes.pdf with 2 users', at: '12-02-2025, 09:00AM' },
      { id: 4, name: 'John Doe', action: 'file.jpeg shared', at: '12-02-2025, 09:00AM' },
      { id: 5, name: 'John Doe', action: 'File.pdf downloaded', at: '12-02-2025, 09:00AM' },
      { id: 6, name: 'John Doe', action: 'Shared Notes.pdf with 2 users', at: '12-02-2025, 09:00AM' },
    ],
    []
  );

  const filtered = rows.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.action.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination: show 10 per page
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [pageCount, currentPage]);

  const pageRows = useMemo(
    () => filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filtered, currentPage]
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageCount) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[28px] md:text-[32px] font-semibold" style={{ color: '#98C1A9' }}>Activity Log</h1>
        <div className="relative w-[280px]">
          <input
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full h-[40px] rounded-full border border-gray-300 px-4 pr-10 text-sm"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <button className="inline-flex items-center gap-2 border border-gray-300 text-[#98C1A9] rounded-full px-4 py-2 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          By Date
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M5 7l5 5 5-5H5z"/></svg>
        </button>
        <button className="inline-flex items-center gap-2 border border-gray-300 text-[#98C1A9] rounded-full px-4 py-2 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M6 10h12M8 14h8M10 18h4"/></svg>
          Activity Type
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M5 7l5 5 5-5H5z"/></svg>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0px 0px 7.22px rgba(0,0,0,0.15)' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: '#98C1A9' }}>
          <h2 className="text-base font-semibold" style={{ color: '#98C1A9' }}>User Activity</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#6B7A72] bg-[#F8FBFA]">
                <th className="px-6 py-3 text-sm font-medium">Sno</th>
                <th className="px-6 py-3 text-sm font-medium">Admin Name</th>
                <th className="px-6 py-3 text-sm font-medium">Action Taken</th>
                <th className="px-6 py-3 text-sm font-medium">Date/Time</th>
                <th className="px-6 py-3 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pageRows.map((r, idx) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white text-xs flex items-center justify-center">JD</div>
                      <span className="text-sm text-gray-800">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{r.action}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{r.at}</td>
                  <td className="px-6 py-4 text-sm text-[#98C1A9]">
                    <button className="inline-flex items-center gap-2 text-[#98C1A9] hover:underline">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 19h14"/></svg>
                      Export team logs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Pagination - match ManageUsers style */}
      <div className="px-6 py-6 bg-white">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="flex items-center justify-center gap-6">
            <div className="flex-1 h-px px-6" style={{ backgroundColor: '#97C1A9', opacity: 0.3 }} />
            <div className="flex items-center gap-3">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="disabled:opacity-50" aria-label="Previous page">
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
                      className={`w-9 h-9 flex items-center justify-center text-sm border rounded-md`}
                      style={isActive ? { backgroundColor: '#97C1A9', color: '#565656', borderColor: '#97C1A9', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' } : { backgroundColor: '#ffffff', color: '#838884', borderColor: '#e6e6e6' }}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount} className="disabled:opacity-50" aria-label="Next page">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="#838884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-px px-6" style={{ backgroundColor: '#97C1A9', opacity: 0.3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
