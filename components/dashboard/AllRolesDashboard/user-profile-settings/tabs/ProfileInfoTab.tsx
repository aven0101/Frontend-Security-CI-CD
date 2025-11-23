"use client";

import Image from "next/image";
import { useState } from "react";
import CountryCodeInput from "@/components/common-ui/CountryCodeInput";

type Profile = {
  username: string;
  fullName: string;
  nickName: string;
  email: string;
  organization: string;
  phone: string;
  address: string;
};

export default function ProfileInfoTab() {
  const [profile, setProfile] = useState<Profile>({
    username: "Phoebebuffay123",
    fullName: "Phoebe buffay",
    nickName: "Phoebe buffay",
    email: "Phoebebuffay@gmail.com",
    organization: "Aerialink Inc",
    phone: "+44-45268241",
    address: "",
  });

  const updateField = (key: keyof Profile, value: string) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const updateBasic = () => {
    console.log("Update Basic", {
      username: profile.username,
      fullName: profile.fullName,
      nickName: profile.nickName,
    });
  };

  const updateContact = () => {
    console.log("Update Contact", {
      email: profile.email,
      organization: profile.organization,
      phone: profile.phone,
      address: profile.address,
    });
  };

  return (
    <div className="space-y-10">
      {/* Basic */}
      <div
        className="w-full rounded-xl"
        style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}
      >
        <div className="bg-white rounded-xl p-6 md:p-8">
          <h3 className="text-[#7FAF99] font-semibold mb-4">Basic</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Inputs */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">Username / ID</label>
                <input
                  value={profile.username}
                  onChange={(e) => updateField("username", e.target.value)}
                  className="w-full h-[44px] rounded-[4px] border border-[#D1D5DB] px-3 text-sm text-[#2E3A33] placeholder:text-[#97A3AF]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#6B7280] mb-2">Full Name</label>
                <input
                  value={profile.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="w-full h-[44px] rounded-[4px] border border-[#D1D5DB] px-3 text-sm text-[#2E3A33] placeholder:text-[#97A3AF]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#6B7280] mb-2">Nick Name</label>
                <input
                  value={profile.nickName}
                  onChange={(e) => updateField("nickName", e.target.value)}
                  className="w-full h-[44px] rounded-[4px] border border-[#D1D5DB] px-3 text-sm text-[#2E3A33] placeholder:text-[#97A3AF]"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={updateBasic}
                  className="bg-[#97C1A9] hover:bg-[#97C1A9]/90 text-white px-6 py-2 rounded-full text-sm"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex items-center justify-center">
              <div className="relative w-[132px] h-[132px] rounded-full bg-[#E6EFF0] flex items-center justify-center">
                <Image src="/dashboard/user-avatar.png" alt="avatar" width={132} height={132} className="rounded-full object-cover" />
                <button
                  className="absolute -right-1 bottom-2 bg-[#97C1A9] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                  aria-label="Edit avatar"
                >
                  <Image src="/dashboard/edit-admin.png" alt="edit" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div
        className="w-full rounded-xl"
        style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0" }}
      >
        <div className="bg-white rounded-xl p-6 md:p-8">
          <h3 className="text-[#7FAF99] font-semibold mb-4">Contact</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">Email</label>
                <input
                  value={profile.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full h-[44px] rounded-[4px] border border-[#D1D5DB] px-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">Add Organization:</label>
                <input
                  value={profile.organization}
                  onChange={(e) => updateField("organization", e.target.value)}
                  className="w-full h-[44px] rounded-[4px] border border-[#D1D5DB] px-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">Phone</label>
                <CountryCodeInput
                  value={profile.phone}
                  onChange={(e: any) => updateField("phone", e.target.value)}
                  classNameBtn="h-[44px]"
                  classNameInput="h-[44px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">Address:</label>
                <textarea
                  value={profile.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full min-h-[140px] rounded-[6px] border border-[#D1D5DB] px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={updateContact}
              className="bg-[#97C1A9] hover:bg-[#97C1A9]/90 text-white px-6 py-2 rounded-full text-sm"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
