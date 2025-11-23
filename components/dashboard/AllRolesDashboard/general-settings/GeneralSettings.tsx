"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ViewMode = "list" | "grid";
type DownloadDest = "specific" | "ask";

export default function GeneralSettings() {
    // Language & Region
    const [language, setLanguage] = useState("English");
    const [timezone, setTimezone] = useState("GMT+0");
    const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
    const [timeFormat, setTimeFormat] = useState("12-hour (AM/PM)");

    // Default Behavior
    const [downloadDest, setDownloadDest] = useState<DownloadDest>("specific");
    const [downloadFolder, setDownloadFolder] = useState<string>("Not selected");
    const folderInputRef = useRef<HTMLInputElement | null>(null);

    const [previewPdf, setPreviewPdf] = useState(true);
    const [previewImages, setPreviewImages] = useState(true);
    const [previewDocs, setPreviewDocs] = useState(true);

    const [defaultView, setDefaultView] = useState<ViewMode>("grid");

    // Storage
    const [setSpace, setSetSpace] = useState(false);
    const [spaceGb, setSpaceGb] = useState(10);

    const handleChooseFolder = () => {
        folderInputRef.current?.click();
    };
    const onFolderPicked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const path = (file as any).webkitRelativePath || file.name;
            const folder = path.split("/")[0];
            setDownloadFolder(folder || "Selected");
        }
    };

    // Share Preferences
    const [sharePermission, setSharePermission] = useState<"View Only" | "Comment" | "Edit">("View Only");
    const [notifyEdited, setNotifyEdited] = useState(true);
    const [notifyCommented, setNotifyCommented] = useState(true);
    const [notifyRequests, setNotifyRequests] = useState(false);

    // Interface & Accessibility
    const [theme, setTheme] = useState<"Light" | "Dark">("Light");
    const [fontSize, setFontSize] = useState<"Small" | "Normal" | "Large">("Normal");
    const [highContrast, setHighContrast] = useState(false);

    // Language flags for the pill dropdown
    const flags = [
        { code: "en", label: "English", src: "/flags/uk.png" },
        { code: "ja", label: "Japanese", src: "/flags/japan.png" },
        { code: "zh", label: "Chinese", src: "/flags/china.png" },
    ];
    const selectedFlag = flags.find((f) => f.label === language) || flags[0];
    const [openLang, setOpenLang] = useState(false);

    return (
        <div className="min-h-screen">
            <div className="max-w-[1297px] mx-auto px-4">
                {/* Heading */}
                <div className="pt-6">
                    <h1 className=" font-bold text-[36px] leading-[16px] tracking-[0.02em] text-[#97C1A9]">Settings</h1>
                </div>

                {/* Language & Region card */}
                <div
                    className="mt-6 w-full rounded-2xl"
                    style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0", minHeight: 270 }}
                >
                    <div className="bg-white rounded-2xl overflow-hidden">
                        <section className="px-6 md:px-8 py-6">
                            <h2 className=" font-bold text-[28px] leading-[16px] tracking-[0.02em] text-[#97C1A9] mb-5">Language & Region</h2>

                                            <div className="mt-2 rounded-xl border border-[#E5E7EB] overflow-hidden">
                                                {/* Row: Language Selector */}
                                                <div className="flex items-center justify-between px-4 md:px-6 h-[56px] border-b border-[#E5E7EB]">
                                                    <span className="text-[#6B7280]">Language Selector</span>
                                                    <div className="relative">
                                                        <button
                                                            type="button"
                                                            onClick={() => setOpenLang((s) => !s)}
                                                            className="flex items-center gap-2 h-10 px-3 border border-[#97C1A9] rounded-full text-[#2E3A33] bg-white"
                                                        >
                                                            <Image src={selectedFlag.src} alt={selectedFlag.label} width={20} height={14} className="rounded-sm" />
                                                            <span className="text-sm md:text-[13px]">{selectedFlag.label}</span>
                                                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-[#2E3A33]">
                                                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </button>
                                                        {openLang && (
                                                            <div className="absolute right-0 mt-2 w-40 bg-white border border-[#E5E7EB] rounded-xl shadow z-10">
                                                                {flags.map((f) => (
                                                                    <button
                                                                        key={f.code}
                                                                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#EAF3EF] text-left"
                                                                        onClick={() => {
                                                                            setLanguage(f.label);
                                                                            setOpenLang(false);
                                                                        }}
                                                                    >
                                                                        <Image src={f.src} alt={f.label} width={18} height={12} className="rounded-sm" />
                                                                        <span className="text-sm">{f.label}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Row: Time Zone */}
                                                <div className="flex items-center justify-between px-4 md:px-6 h-[56px] border-b border-[#E5E7EB]">
                                                    <span className="text-[#6B7280]">Time Zone</span>
                                                    <select
                                                        className="h-10 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none"
                                                        value={timezone}
                                                        onChange={(e) => setTimezone(e.target.value)}
                                                    >
                                                        {["GMT-8", "GMT-5", "GMT+0", "GMT+1", "GMT+5:30", "GMT+9"].map((tz) => (
                                                            <option key={tz} value={tz}>
                                                                {tz}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Row: Date/Time Format */}
                                                <div className="flex items-center justify-between px-4 md:px-6 h-[72px]">
                                                    <span className="text-[#6B7280]">Date/Time Format</span>
                                                    <div className="flex flex-wrap items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[#9CA3AF] text-sm">Date Format</span>
                                                            <select
                                                                className="h-10 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none"
                                                                value={dateFormat}
                                                                onChange={(e) => setDateFormat(e.target.value)}
                                                            >
                                                                {["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"].map((f) => (
                                                                    <option key={f} value={f}>
                                                                        {f}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[#9CA3AF] text-sm">Time Format</span>
                                                            <select
                                                                className="h-10 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none"
                                                                value={timeFormat}
                                                                onChange={(e) => setTimeFormat(e.target.value)}
                                                            >
                                                                {["12-hour (AM/PM)", "24-hour"].map((f) => (
                                                                    <option key={f} value={f}>
                                                                        {f}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                        </section>
                    </div>
                </div>

                {/* Default Behavior card */}
                <div
                    className="mt-6 w-full rounded-2xl"
                    style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}
                >
                    <div className="bg-white rounded-2xl overflow-hidden">
                                                <section className="px-6 md:px-8 py-6">
                            <h2 className=" font-bold text-[28px] leading-[16px] tracking-[0.02em] text-[#97C1A9] mb-5">Default Behavior</h2>
                                                    {/* Inner bordered rows for Default Behavior */}
                                                    <div className="mt-2 rounded-xl border border-[#E5E7EB] overflow-hidden">
                                                        {/* Row: Download Destination */}
                                                        <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB]">
                                                            <div className="text-[#6B7280] mb-3">Download Destination</div>
                                                            <div className="space-y-3 text-[#2E3A33]">
                                                                {/* Specific Folder (with Choose button inline) */}
                                                                <div className="flex flex-wrap items-center gap-3">
                                                                    <label className="inline-flex items-center gap-2 cursor-pointer">
                                                                        <input type="radio" name="downloadDest" className="radio-square-green" checked={downloadDest === "specific"} onChange={() => setDownloadDest("specific")} />
                                                                        <span>Specific Folder</span>
                                                                    </label>
                                                                    <button
                                                                        onClick={handleChooseFolder}
                                                                        disabled={downloadDest !== "specific"}
                                                                        className={`px-4 h-9 rounded-full text-sm transition-colors ${downloadDest === "specific" ? "bg-[#97C1A9] text-white hover:opacity-90" : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"}`}
                                                                    >
                                                                        Choose Folder
                                                                    </button>
                                                                    <span className="text-xs text-[#6B7280]">{downloadFolder}</span>
                                                                    <input
                                                                        ref={folderInputRef}
                                                                        type="file"
                                                                        onChange={onFolderPicked}
                                                                        // @ts-expect-error non-standard directory picker for Chromium
                                                                        webkitdirectory="true"
                                                                        directory="true"
                                                                        multiple
                                                                        className="hidden"
                                                                    />
                                                                </div>
                                                                {/* Ask every time */}
                                                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                                                    <input type="radio" name="downloadDest" className="radio-square-green" checked={downloadDest === "ask"} onChange={() => setDownloadDest("ask")} />
                                                                    <span>Ask every time where to save</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Row: Inline Preview */}
                                                        <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB]">
                                                            <div className="text-[#6B7280] mb-3">Inline Preview</div>
                                                            <div className="space-y-3 text-[#2E3A33]">
                                                                <label className="flex items-center gap-2 cursor-pointer">
                                                                    <input type="checkbox" className="chk-green" checked={previewPdf} onChange={(e) => setPreviewPdf(e.target.checked)} />
                                                                    <span>Enable preview of PDF</span>
                                                                </label>
                                                                <label className="flex items-center gap-2 cursor-pointer">
                                                                    <input type="checkbox" className="chk-green" checked={previewImages} onChange={(e) => setPreviewImages(e.target.checked)} />
                                                                    <span>Enable preview of Images</span>
                                                                </label>
                                                                <label className="flex items-center gap-2 cursor-pointer">
                                                                    <input type="checkbox" className="chk-green" checked={previewDocs} onChange={(e) => setPreviewDocs(e.target.checked)} />
                                                                    <span>Enable preview of Docs</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Row: Default View Mode */}
                                                        <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB]">
                                                            <div className="text-[#6B7280] mb-3">Default View Mode</div>
                                                            <div className="space-y-3 text-[#2E3A33]">
                                                                <label className="flex items-center gap-2 cursor-pointer">
                                                                    <input type="radio" name="defaultView" className="radio-square-green" checked={defaultView === "list"} onChange={() => setDefaultView("list")} />
                                                                    <span>List View</span>
                                                                </label>
                                                                <label className="flex items-center gap-2 cursor-pointer">
                                                                    <input type="radio" name="defaultView" className="radio-square-green" checked={defaultView === "grid"} onChange={() => setDefaultView("grid")} />
                                                                    <span>Grid View</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Row: Storage Management */}
                                                        <div className="px-4 md:px-6 py-4">
                                                            <div className="text-[#6B7280] mb-3">Storage Management</div>
                                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                                                <label className="inline-flex items-center gap-2 text-[#2E3A33] cursor-pointer">
                                                                    <input type="checkbox" className="chk-green" checked={setSpace} onChange={(e) => setSetSpace(e.target.checked)} />
                                                                    <span>Set Space for my account</span>
                                                                </label>
                                                                <select className="h-10 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[140px]" value={spaceGb} onChange={(e) => setSpaceGb(parseInt(e.target.value, 10))} disabled={!setSpace}>
                                                                    {[5, 10, 20, 50, 100, 200].map((n) => (
                                                                        <option key={n} value={n}>
                                                                            {n}GB
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                        </section>
                    </div>
                </div>

                {/* Share Preferences card */}
                <div
                    className="mt-6 w-full rounded-2xl"
                    style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}
                >
                    <div className="bg-white rounded-2xl overflow-hidden">
                                    <section className="px-6 md:px-8 py-6">
                            <h2 className=" font-bold text-[28px] leading-[16px] tracking-[0.02em] text-[#97C1A9] mb-5">Share Preferences</h2>
                                        {/* Inner bordered rows */}
                                        <div className="mt-2 rounded-xl border border-[#E5E7EB] overflow-hidden">
                                            {/* Row: Default Sharing Permission */}
                                            <div className="flex items-center justify-between px-4 md:px-6 h-[56px] border-b border-[#E5E7EB]">
                                                <span className="text-[#6B7280]">Default Sharing Permission</span>
                                                <select className="h-10 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[160px]" value={sharePermission} onChange={(e) => setSharePermission(e.target.value as any)}>
                                                    {["View Only", "Comment", "Edit"].map((opt) => (
                                                        <option key={opt} value={opt}>
                                                            {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Row: Notify Me When */}
                                            <div className="px-4 md:px-6 py-4">
                                                <div className="text-[#6B7280] mb-3">Notify Me When</div>
                                                <div className="space-y-3 text-[#2E3A33]">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input type="checkbox" className="chk-green" checked={notifyEdited} onChange={(e) => setNotifyEdited(e.target.checked)} />
                                                        <span>Notify me when file is edited</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input type="checkbox" className="chk-green" checked={notifyCommented} onChange={(e) => setNotifyCommented(e.target.checked)} />
                                                        <span>Notify me when file is commented</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input type="checkbox" className="chk-green" checked={notifyRequests} onChange={(e) => setNotifyRequests(e.target.checked)} />
                                                        <span>Notify me when someone requests access</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                        </section>
                    </div>
                </div>

                {/* Interface & Accessibility card */}
                <div
                    className="mt-6 w-full rounded-2xl"
                    style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}
                >
                    <div className="bg-white rounded-2xl overflow-hidden">
                                    <section className="px-6 md:px-8 py-6">
                            <h2 className=" font-bold text-[28px] leading-[16px] tracking-[0.02em] text-[#97C1A9] mb-5">Interface & Accessibility</h2>
                                        <div className="mt-2 rounded-xl border border-[#E5E7EB] overflow-hidden">
                                            {/* Row: Theme */}
                                            <div className="flex items-center justify-between px-4 md:px-6 h-[56px] border-b border-[#E5E7EB]">
                                                <span className="text-[#6B7280]">Theme</span>
                                                <select className="h-10 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[140px]" value={theme} onChange={(e) => setTheme(e.target.value as any)}>
                                                    {["Light", "Dark"].map((t) => (
                                                        <option key={t} value={t}>
                                                            {t}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Row: Font size */}
                                            <div className="flex items-center justify-between px-4 md:px-6 h-[56px] border-b border-[#E5E7EB]">
                                                <span className="text-[#6B7280]">Font size</span>
                                                <select className="h-10 rounded-full border border-[#97C1A9] px-4 text-[#2E3A33] focus:outline-none w-[140px]" value={fontSize} onChange={(e) => setFontSize(e.target.value as any)}>
                                                    {["Small", "Normal", "Large"].map((f) => (
                                                        <option key={f} value={f}>
                                                            {f}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Row: High contrast (toggle) */}
                                            <div className="flex items-center justify-between px-4 md:px-6 h-[56px]">
                                                <span className="text-[#6B7280]">High contrast mode</span>
                                                <input
                                                    type="checkbox"
                                                    role="switch"
                                                    aria-label="High contrast mode"
                                                    className="toggle-green"
                                                    checked={highContrast}
                                                    onChange={(e) => setHighContrast(e.target.checked)}
                                                />
                                            </div>
                                        </div>
                        </section>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-6 flex justify-center">
                    <button
                        className="bg-[#97C1A9] text-white w-[586px] h-[54px] rounded-[16px] px-[24px] py-[16px]"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
