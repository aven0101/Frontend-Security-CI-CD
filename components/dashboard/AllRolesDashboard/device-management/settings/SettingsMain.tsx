"use client";

import React, { useMemo, useState } from "react";
import ProfileSidebar from "../DeviceManagementSideBar";
import { Switch } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type Settings = {
	requireMFA: boolean;
	allowMobileAccess: boolean;
	allowRemoteWipe: boolean;
	sessionTimeoutHours: number; // hours
	deviceExpirationDays: number | "never"; // days inactive or never
};

type Props = {
	initialSettings?: Partial<Settings>;
	onChange?: (settings: Settings) => void;
};

const sessionOptions = [1, 4, 8, 12, 24, 48, 72];
const deviceExpiryOptions: Array<number | "never"> = [30, 60, 90, 120, "never"];

function classNames(...classes: (string | false | null | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}

function Row({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-between px-4 py-4">
			{children}
		</div>
	);
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
	return (
		<Row>
			<span className="text-[14px] text-[#2E3A33]">{label}</span>
			<Switch
				checked={value}
				onChange={onChange}
				className={classNames(
					value ? "bg-[#97C1A9]" : "bg-[#E3EAE5]",
					"relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
				)}
			>
				<span
					aria-hidden="true"
					className={classNames(
						value ? "translate-x-[20px]" : "translate-x-0",
						"pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					)}
				/>
			</Switch>
		</Row>
	);
}

function DropdownPill<T>({ label, value, onSelect, display }: { label: string; value: T; onSelect: (val: T) => void; display: (val: T) => string }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="inline-flex items-center gap-2 rounded-full border border-[#97C1A9] bg-white px-3 py-[6px] text-[12px] text-[#2E3A33] hover:bg-[#97C1A9]/10"
			>
				{display(value)}
				<ChevronDownIcon className="h-4 w-4 text-[#2A8A64]" />
			</button>

			{open && (
				<div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-lg border border-[#E0E8E3] bg-white shadow-lg">
					<ul className="max-h-64 overflow-auto py-1 text-sm">
						{/* This generic list will be provided by the parent via mapping */}
						{/* Rendered by children via function passed through onSelect closure */}
					</ul>
				</div>
			)}
		</div>
	);
}

export default function SettingsMain({ initialSettings, onChange }: Props) {
	const [settings, setSettings] = useState<Settings>({
		requireMFA: true,
		allowMobileAccess: true,
		allowRemoteWipe: true,
		sessionTimeoutHours: 24,
		deviceExpirationDays: 90,
		...initialSettings,
	});

	const notify = (next: Settings) => {
		setSettings(next);
		onChange?.(next);
	};

	const sessionLabel = useMemo(() => `${settings.sessionTimeoutHours} hr`, [settings.sessionTimeoutHours]);
	const expiryLabel = useMemo(
		() => (settings.deviceExpirationDays === "never" ? "Never" : `${settings.deviceExpirationDays} days`),
		[settings.deviceExpirationDays]
	);

	return (
		<div className="flex gap-6">
			<ProfileSidebar />

			<main className="flex-1">
				<h1 className="mb-4 text-3xl font-semibold text-[#97C1A9]">Settings</h1>

				{/* Settings card */}
				<section className="rounded-2xl border border-[#E0E8E3] bg-white shadow-[0px_0px_6.5px_0px_#00000026]">
					<div className="divide-y divide-[#E8EFEA]">
						<ToggleRow
							label="Require MFA on new device"
							value={settings.requireMFA}
							onChange={(v) => notify({ ...settings, requireMFA: v })}
						/>
						<ToggleRow
							label="Allow access from mobile devices"
							value={settings.allowMobileAccess}
							onChange={(v) => notify({ ...settings, allowMobileAccess: v })}
						/>
						<ToggleRow
							label="Allow remote wipe out"
							value={settings.allowRemoteWipe}
							onChange={(v) => notify({ ...settings, allowRemoteWipe: v })}
						/>

						{/* Default session timeout (hours) */}
						<Row>
							<span className="text-[14px] text-[#2E3A33]">Default session timeout (hours)</span>

							{/* Custom dropdown */}
							<div className="relative">
								<button
									type="button"
									onClick={(e) => {
										const menu = (e.currentTarget.nextSibling as HTMLDivElement)!
										;(menu as any).style.display = (menu as any).style.display === "block" ? "none" : "block";
									}}
									className="inline-flex items-center gap-2 rounded-full border border-[#97C1A9] bg-white px-3 py-[6px] text-[12px] text-[#2E3A33] hover:bg-[#97C1A9]/10"
								>
									{sessionLabel}
									<ChevronDownIcon className="h-4 w-4 text-[#2A8A64]" />
								</button>
								<div className="absolute right-0 z-20 mt-2 hidden w-40 overflow-hidden rounded-lg border border-[#E0E8E3] bg-white shadow-lg">
									<ul className="max-h-64 overflow-auto py-1 text-sm">
										{sessionOptions.map((opt) => (
											<li key={opt}>
												<button
													type="button"
													onClick={(ev) => {
														const parent = (ev.currentTarget.closest("div") as HTMLDivElement)!;
														parent.style.display = "none";
														notify({ ...settings, sessionTimeoutHours: opt });
													}}
													className={classNames(
														"w-full px-3 py-2 text-left hover:bg-[#F7F9F8]",
														settings.sessionTimeoutHours === opt ? "text-[#2A8A64] font-medium" : "text-[#2E3A33]"
													)}
												>
													{opt} hr
												</button>
											</li>
										))}
									</ul>
								</div>
							</div>
						</Row>

						{/* Device expiration */}
						<Row>
							<span className="text-[14px] text-[#2E3A33]">Device expiration (days of inactive)</span>
							<div className="relative">
								<button
									type="button"
									onClick={(e) => {
										const menu = (e.currentTarget.nextSibling as HTMLDivElement)!
										;(menu as any).style.display = (menu as any).style.display === "block" ? "none" : "block";
									}}
									className="inline-flex items-center gap-2 rounded-full border border-[#97C1A9] bg-white px-3 py-[6px] text-[12px] text-[#2E3A33] hover:bg-[#97C1A9]/10"
								>
									{expiryLabel}
									<ChevronDownIcon className="h-4 w-4 text-[#2A8A64]" />
								</button>
								<div className="absolute right-0 z-20 mt-2 hidden w-44 overflow-hidden rounded-lg border border-[#E0E8E3] bg-white shadow-lg">
									<ul className="max-h-64 overflow-auto py-1 text-sm">
										{deviceExpiryOptions.map((opt) => (
											<li key={String(opt)}>
												<button
													type="button"
													onClick={(ev) => {
														const parent = (ev.currentTarget.closest("div") as HTMLDivElement)!;
														parent.style.display = "none";
														notify({ ...settings, deviceExpirationDays: opt });
													}}
													className={classNames(
														"w-full px-3 py-2 text-left hover:bg-[#F7F9F8]",
														settings.deviceExpirationDays === opt ? "text-[#2A8A64] font-medium" : "text-[#2E3A33]"
													)}
												>
													{opt === "never" ? "Never" : `${opt} days`}
												</button>
											</li>
										))}
									</ul>
								</div>
							</div>
						</Row>
					</div>
				</section>

				{/* Tips and Quick Links */}
				<section className="mt-6 rounded-2xl border border-[#E0E8E3] bg-white p-5 shadow-[0px_0px_6.5px_0px_#00000026]">
					<h3 className="mb-4 text-[16px] font-semibold text-[#2E3A33]">Tips and Quick Links</h3>
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

