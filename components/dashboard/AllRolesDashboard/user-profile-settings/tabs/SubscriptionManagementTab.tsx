"use client";

export default function SubscriptionManagementTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-[28px] font-semibold text-[#97C1A9]">Subscription management</h2>

      {/* Current Plan Overview */}
      <div
        className="w-full rounded-xl"
        style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}
      >
        <div className="bg-white rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#7FAF99] font-semibold">Current Plan Overview</h3>
            <button className="bg-[#97C1A9] text-white px-5 py-2 rounded-full text-sm">Upgrade Plan</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Plan Name", value: "Pro" },
              { title: "Status", value: "Active" },
              { title: "Renewal Date", value: "May 28, 2025" },
              { title: "Storage Limit", value: "1TB shared space" },
            ].map((box) => (
              <div
                key={box.title}
                className="rounded-[12px] border border-[#E5E7EB] bg-[#FBFBFB] p-5"
              >
                <div className="text-[#7FAF99] font-medium mb-2">{box.title}</div>
                <div className="text-[#2E3A33] text-lg">{box.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div
        className="w-full rounded-xl"
        style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}
      >
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="px-6 md:px-8 py-5">
            <h3 className="text-[#7FAF99] font-semibold">Invoice History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[#7FAF99] text-sm border-t border-b border-[#E5E7EB]">
                  {["S.no", "Invoice No.", "Date", "Amount", "Status", "Action"].map((h) => (
                    <th key={h} className="py-3 px-6 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[#6B7280]">
                {[
                  { sn: 1, inv: "#INV-2025-0423", date: "2 May, 2025", amt: "$199.00", status: "Paid" },
                  { sn: 2, inv: "#INV-2025-0423", date: "2 May, 2025", amt: "$199.00", status: "Pending" },
                  { sn: 3, inv: "#INV-2025-0423", date: "2 May, 2025", amt: "$199.00", status: "Paid" },
                  { sn: 4, inv: "#INV-2025-0423", date: "2 May, 2025", amt: "$199.00", status: "Pending" },
                  { sn: 5, inv: "#INV-2025-0423", date: "2 May, 2025", amt: "$199.00", status: "Paid" },
                  { sn: 6, inv: "#INV-2025-0423", date: "2 May, 2025", amt: "$199.00", status: "Pending" },
                ].map((r) => (
                  <tr key={r.sn} className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-6">{r.sn}</td>
                    <td className="py-3 px-6">{r.inv}</td>
                    <td className="py-3 px-6">{r.date}</td>
                    <td className="py-3 px-6">{r.amt}</td>
                    <td className="py-3 px-6">
                      <span className={r.status === "Paid" ? "text-emerald-600" : "text-indigo-500"}>{r.status}</span>
                    </td>
                    <td className="py-3 px-6">
                      <button className="text-[#2E3A33] hover:text-[#97C1A9]">Download ⬇</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
