"use client";

import React, { useState } from "react";
import ProfileSidebar from "../DeviceManagementSideBar";
import ErrorAlerts from "../../ErrorAlerts";
import { ComputerDesktopIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

function SectionHeader({ title, badge, onToggle, open }: { title: string; badge?: { text: string; colorClass: string }; onToggle: () => void; open: boolean }) {
	return (
		<button
			type="button"
			className="w-full flex items-center justify-between py-4 bg-white cursor-pointer rounded-2xl px-3 shadow-[0px_0px_6.5px_0px_#00000040]"
			onClick={onToggle}
		>
			<div className="flex items-center gap-2">
				<h3 className="text-[#97C1A9] font-medium text-[17px]">{title}</h3>
				{badge && (
					<span className={`inline-flex items-center justify-center min-w-[19px] h-[19px] leading-[22px] px-2 rounded-full ${badge.colorClass} text-white text-[12px] font-semibold`}>
						{badge.text}
					</span>
				)}
			</div>
			<svg
				className={`h-5 w-5 text-[#2A8A64] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	);
}

function ComplianceRow({ label, ok }: { label: string; ok: boolean }) {
	return (
		<div className="flex items-center justify-between rounded-full border border-[#E0E8E3] bg-white px-3 py-2 text-xs">
			<span className="text-[#5B6B62]">{label}</span>
			{ok ? (
				<CheckCircleIcon className="h-4 w-4 text-[#7ED2AD]" />
			) : (
				<XCircleIcon className="h-4 w-4 text-[#EF4444]" />
			)}
		</div>
	);
}

function ComplianceCard({ platform, device, icon: Icon, rows }: { platform: string; device: string; icon: any; rows: { label: string; ok: boolean }[] }) {
	return (
		<div className="rounded-2xl border border-[#E0E8E3] bg-white p-4 shadow-sm">
			<div className="mb-2 text-center text-[#97C1A9] font-semibold">Compliance</div>
			<div className="mb-2 grid place-items-center">
				<Icon className="h-10 w-10 text-[#97C1A9]" />
			</div>
			<div className="text-center text-[13px] font-semibold text-[#2E3A33]">{platform}</div>
			<div className="mb-4 text-center text-xs text-[#6B7280]">{device}</div>
			<div className="space-y-2">
				{rows.map((r, i) => (
					<ComplianceRow key={i} label={r.label} ok={r.ok} />
				))}
			</div>
		</div>
	);
}

export default function SecurityMain() {
	const [notifOpen, setNotifOpen] = useState(true);

	return (
		<div className="flex gap-6">
			<ProfileSidebar />

					<main className="flex-1">
						<h1 className="mb-4 text-3xl font-semibold text-[#97C1A9]">Security</h1>

				{/* Errors & Alerts */}
			<ErrorAlerts title="Errors & Alerts" badgeText="+5" badgeColorClassName="bg-[#EF4444]" />

				{/* Notifications header + reused content */}
				<div className="mt-4">
					<SectionHeader
						title="Notifications"
						badge={{ text: "i", colorClass: "bg-[#97C1A9]" }}
						onToggle={() => setNotifOpen((v) => !v)}
						open={notifOpen}
					/>
					{notifOpen && (
						<div className="mt-0">
							{/* Reuse the same alerts content without its header */}
							<ErrorAlerts showHeader={false} />
						</div>
					)}
				</div>

				{/* Compliance cards */}
				<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
					<ComplianceCard
						platform="Windows 11 Pro"
						device="HP Desktop-XXXXX"
						icon={ComputerDesktopIcon}
						rows={[
							{ label: "OS Updated:", ok: true },
							{ label: "Antivirus Installed:", ok: true },
							{ label: "Device Encrypted:", ok: true },
							{ label: "MDM Registered:", ok: true },
							{ label: "Jailbreak Detection:", ok: false },
						]}
					/>
					<ComplianceCard
						platform="iOS"
						device="iPhone - Safari"
						icon={DevicePhoneMobileIcon}
						rows={[
							{ label: "OS Updated:", ok: true },
							{ label: "Antivirus Installed:", ok: true },
							{ label: "Device Encrypted:", ok: true },
							{ label: "MDM Registered:", ok: true },
							{ label: "Jailbreak Detection:", ok: false },
						]}
					/>
					<ComplianceCard
						platform="Windows 11 Pro"
						device="HP Desktop-XXXXX"
						icon={ComputerDesktopIcon}
						rows={[
							{ label: "OS Updated:", ok: true },
							{ label: "Antivirus Installed:", ok: true },
							{ label: "Device Encrypted:", ok: true },
							{ label: "MDM Registered:", ok: true },
							{ label: "Jailbreak Detection:", ok: false },
						]}
					/>
				</div>

				{/* Tips and Quick Links */}
				<section className="mt-6 rounded-xl border border-[#E8EFEA] bg-white p-4">
					<h3 className="mb-4 text-sm font-semibold text-[#2E3A33]">Tips and Quick Links</h3>
					<div className="flex flex-wrap gap-3">
						<button className="rounded-full border border-[#97C1A9] px-4 py-2 text-sm text-[#2E3A33] hover:bg-[#97C1A9]/10">Reset password</button>
						<button className="rounded-full border border-[#97C1A9] px-4 py-2 text-sm text-[#2E3A33] hover:bg-[#97C1A9]/10">Update info</button>
						<button className="rounded-full border border-[#97C1A9] px-4 py-2 text-sm text-[#2E3A33] hover:bg-[#97C1A9]/10">Change plan</button>
					</div>
				</section>
			</main>
		</div>
	);
}

