"use client";
import { useState } from "react";
import FileManagementSidebar from "../FileManagementSidebar";
import ArchivedDetailView from "./DetailView";
import ArchivedTableView from "./TableView";
import ViewToggle from "../ViewToggle";

export default function FileManagementArchivedMainPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
            <FileManagementSidebar />
            <div>
              {/* Heading + toggle */}
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-semibold text-[#97C1A9]">Archived</h1>
                <ViewToggle value={view} onChange={setView} />
              </div>
              {view === "grid" ? <ArchivedDetailView /> : <ArchivedTableView />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
