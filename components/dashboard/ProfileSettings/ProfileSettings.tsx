"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import CountryList from "country-list-with-dial-code-and-flag";

import Loader from "@/components/global/Loader";
import CountryCodeInput from "@/components/common-ui/CountryCodeInput";
import { DashboardAPI } from "@/utils/api";

/* -------------------------------------------------------------------------- */
/*                               Type Definitions                             */
/* -------------------------------------------------------------------------- */
type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  businessDescription?: string;
  phoneCode: string; // e.g. "+1"
  phoneNumber: string; // local number only
  address: Address;
};

/* -------------------------------------------------------------------------- */
/*                            Profile Settings Page                           */
/* -------------------------------------------------------------------------- */
export default function ProfileSettings() {
  /* ---------------------------------- State ---------------------------------- */
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    businessDescription: "",
    phoneCode: "+1",
    phoneNumber: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  /* --------------------------------- Handlers -------------------------------- */
  const updateField = (key: keyof Profile, value: any) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const updateAddressField = (key: keyof Address, value: string) =>
    setProfile((p) => ({ ...p, address: { ...p.address, [key]: value } }));

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  /* -------------------------------------------------------------------------- */
  /*                             Utility: Phone Split                           */
  /* -------------------------------------------------------------------------- */
  const getDialParts = (raw: string): { code: string; number: string } => {
    if (!raw) return { code: "+1", number: "" };
    const cleaned = String(raw).replace(/\s|\-|\(|\)/g, "");

    try {
      const all = CountryList.getAll();
      const codes: string[] = all.map((c: any) => c.dial_code).filter(Boolean);

      let best = "";
      for (const code of codes) {
        if (cleaned.startsWith(code) && code.length > best.length) {
          best = code;
        }
      }

      if (best) {
        return { code: best, number: cleaned.slice(best.length) };
      }

      const m = cleaned.match(/^\+\d{1,3}/);
      const c = m ? m[0] : "+1";
      return { code: c, number: cleaned.replace(c, "") };
    } catch {
      const m = cleaned.match(/^\+\d{1,3}/);
      const c = m ? m[0] : "+1";
      return { code: c, number: cleaned.replace(c, "") };
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                          Normalize API Response                            */
  /* -------------------------------------------------------------------------- */
  const mapFromApi = (message: any): Profile => {
    const root = message?.data ? message.data : message || {};
    const user = root?.user || {};
    const business = root?.business || null;

    const addrRaw = root?.address || null;
    const addrFlat = {
      line1: root?.address_line1,
      line2: root?.address_line2,
      city: root?.address_city,
      state: root?.address_state,
      zip: root?.address_zip,
      country: root?.address_country,
    };

    const rawPhone: string = user.phone || "";
    const parts = getDialParts(rawPhone);

    return {
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      email: user.email || "",
      phoneCode: parts.code || "+1",
      phoneNumber: parts.number || "",
      businessName: business?.name || "",
      businessDescription: business?.description || "",
      address: {
        line1: (addrRaw?.line1 ?? addrFlat.line1) || "",
        line2: (addrRaw?.line2 ?? addrFlat.line2) || "",
        city: (addrRaw?.city ?? addrFlat.city) || "",
        state: (addrRaw?.state ?? addrFlat.state) || "",
        zip: (addrRaw?.zip ?? addrFlat.zip) || "",
        country: (addrRaw?.country ?? addrFlat.country) || "",
      },
    };
  };

  /* -------------------------------------------------------------------------- */
  /*                             Fetch User Profile                             */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const loadProfile = async () => {
      setIsFetching(true);
      const { success, message } = await DashboardAPI.getProfile();

      if (success) {
        setProfile(mapFromApi(message));
      } else {
        const err =
          typeof message === "string"
            ? message
            : message?.message || "Failed to load profile";
        toast.error(err);
      }
      setIsFetching(false);
    };

    loadProfile();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                              Save Profile Info                             */
  /* -------------------------------------------------------------------------- */
  const handleSave = async () => {
    try {
      setIsSaving(true);

      const payload = {
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
        phone: `${profile.phoneCode}${profile.phoneNumber}`,
        business_name: profile.businessName,
        business_description: profile.businessDescription || "",
        address_line1: profile.address.line1,
        address_line2: profile.address.line2,
        address_city: profile.address.city,
        address_state: profile.address.state,
        address_zip: profile.address.zip,
        address_country: profile.address.country,
      };

      const { success, message } = await DashboardAPI.updateProfile(payload);

      if (success) {
        toast.success(message?.message || "Profile updated successfully");

        // Optimistically update
        const parts = getDialParts(payload.phone);
        setProfile((p) => ({
          ...p,
          firstName: payload.first_name,
          lastName: payload.last_name,
          email: payload.email,
          phoneCode: parts.code,
          phoneNumber: parts.number,
          businessName: payload.business_name,
          businessDescription: payload.business_description,
          address: {
            line1: payload.address_line1 || "",
            line2: payload.address_line2 || "",
            city: payload.address_city || "",
            state: payload.address_state || "",
            zip: payload.address_zip || "",
            country: payload.address_country || "",
          },
        }));

        // Refresh to reflect backend truth
        const refreshed = await DashboardAPI.getProfile();
        if (refreshed.success) {
          setProfile(mapFromApi(refreshed.message));
        }
      } else {
        const err =
          typeof message === "string"
            ? message
            : message?.message || "Failed to update profile";
        toast.error(err);
      }
    } finally {
      setIsSaving(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              Save Address Modal                            */
  /* -------------------------------------------------------------------------- */
  const handleAddressSave = () => {
    if (
      !profile.address.line1 ||
      !profile.address.city ||
      !profile.address.state ||
      !profile.address.country
    ) {
      toast.error("Please fill required address fields");
      return;
    }
    handleSave();
    closeAddressModal();
  };

  /* -------------------------------------------------------------------------- */
  /*                                  JSX Render                                */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="bg-[#F5F5F5] rounded-xl py-4 px-4">
        <nav aria-label="Profile Settings" className="sticky top-6">
          <ul className="space-y-3">
            <li>
              <Link href="/business/profile-settings" className="block">
                <span className="block w-full text-left bg-[#97C1A9] text-white rounded-[12px] py-3 px-5 font-medium shadow-sm">
                  Business Info
                </span>
              </Link>
            </li>
            <li>
              <Link href="/business/security" className="block">
                <span className="block w-full text-left  text-[#838884] rounded-[12px] py-3 px-5">
                  Security
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="space-y-10">
        <h2 className="text-2xl md:text-[28px] font-semibold text-[#97C1A9]">
          Profile Settings
        </h2>

        {/* Profile Form Card */}
        <div className="w-full rounded-xl border border-[#E2E8F0] shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
          <div className="bg-white rounded-xl p-6 md:p-8">
            <div className="space-y-4">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#6B7280] mb-2">
                    First Name
                  </label>
                  <input
                    value={profile.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className="w-full h-12 text-[20px] border border-[#D1D5DB] px-3 text-[#2E3A33]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] mb-2">
                    Last Name
                  </label>
                  <input
                    value={profile.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className="w-full h-12 text-[20px] border border-[#D1D5DB] px-3  text-[#2E3A33]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">
                  Email
                </label>
                <input
                  value={profile.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full h-12 text-[20px] border border-[#D1D5DB] px-3 text-[#2E3A33]"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">
                  Business Name
                </label>
                <input
                  value={profile.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  className="w-full h-12 text-[20px] border border-[#D1D5DB] px-3 text-[#2E3A33]"
                />
              </div>

              {/* Business Description */}
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">
                  Business Description
                </label>
                <textarea
                  value={profile.businessDescription || ""}
                  onChange={(e) =>
                    updateField("businessDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full text-[20px] border border-[#D1D5DB] px-3 py-2 text-[#2E3A33]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">
                  Phone
                </label>
                <CountryCodeInput
                  value={profile.phoneNumber}
                  selectedCode={profile.phoneCode}
                  onCodeChange={(code: string) => updateField("phoneCode", code)}
                  onChange={(v: any) => {
                    if (v?.countryCode) updateField("phoneCode", v.countryCode);
                    updateField("phoneNumber", v?.phoneNumber ?? "");
                  }}
                  classNameBtn="h-12"
                  classNameInput="h-12"
                
                />
              </div>

              {/* Address Summary */}
              <div className="mt-6">
                <label className="block text-sm text-[#6B7280] mb-2">
                  Address:
                </label>
                <div className="relative">
                  <textarea
                    readOnly
                    value={[
                      profile.address.line1,
                      profile.address.line2,
                      [profile.address.city, profile.address.state]
                        .filter(Boolean)
                        .join(", "),
                      [profile.address.zip, profile.address.country]
                        .filter(Boolean)
                        .join(" "),
                    ]
                      .filter(Boolean)
                      .join("\n")}
                    className="w-full min-h-[140px] text-[20px] border border-[#D1D5DB] px-3 py-2 text-sm text-[#2E3A33] bg-white"
                    placeholder="No address added yet"
                  />
                      {/* Top-right small edit icon with underline like the design */}
                      <button
                        onClick={openAddressModal}
                        className="absolute top-2 right-2 p-1 hover:opacity-90"
                        aria-label="Edit Address"
                      >
                        <Image
                          src="/dashboard/address-icon.png"
                          alt="Edit address"
                          width={20}
                          height={20}
                        />
                      </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6 flex justify-center">
                <button
                  onClick={handleSave}
                  disabled={isSaving || isFetching}
                  className="bg-[#97C1A9] hover:bg-[#97C1A9]/90 disabled:opacity-60 text-white px-8 py-3 rounded-full text-sm min-w-[240px] flex items-center justify-center gap-2"
                >
                  {(isSaving || isFetching) && (
                    <Loader size={18} color="#ffffff" />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Address Modal */}
        {isAddressModalOpen && (
          <>
            <div className="bg-[#3D3D3D69] fixed inset-0 z-[99998]" />
            <div className="fixed inset-0 flex items-center justify-center z-[99999] p-4">
              <div className="bg-white rounded-[20px] w-full max-w-lg p-8 relative">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-[#97C1A9]">
                    Address
                  </h2>
                  <button onClick={closeAddressModal} className="cursor-pointer">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5 0.5L0.5 13.5"
                        stroke="#98C1A9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0.5 0.5L13.5 13.5"
                        stroke="#98C1A9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="border border-[#AAAAAA] rounded-md divide-y divide-[#AAAAAA]">
                  <input
                    value={profile.address.line1}
                    onChange={(e) =>
                      updateAddressField("line1", e.target.value)
                    }
                    placeholder="Line 1"
                    className="w-full h-12 px-4 text-sm outline-none"
                  />
                  <input
                    value={profile.address.line2}
                    onChange={(e) =>
                      updateAddressField("line2", e.target.value)
                    }
                    placeholder="Line 2 (Optional)"
                    className="w-full h-12 px-4 text-sm outline-none"
                  />
                  <div className="grid grid-cols-2 border-t border-[#AAAAAA]">
                    <input
                      value={profile.address.city}
                      onChange={(e) =>
                        updateAddressField("city", e.target.value)
                      }
                      placeholder="City"
                      className="w-full h-12 px-4 text-sm outline-none border-r border-[#AAAAAA]"
                    />
                    <input
                      value={profile.address.state}
                      onChange={(e) =>
                        updateAddressField("state", e.target.value)
                      }
                      placeholder="Region/State"
                      className="w-full h-12 px-4 text-sm outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 border-t border-[#AAAAAA]">
                    <input
                      value={profile.address.zip}
                      onChange={(e) => updateAddressField("zip", e.target.value)}
                      placeholder="Zip"
                      className="w-full h-12 px-4 text-sm outline-none border-r border-[#AAAAAA]"
                    />
                    <input
                      value={profile.address.country}
                      onChange={(e) =>
                        updateAddressField("country", e.target.value)
                      }
                      placeholder="Country"
                      className="w-full h-12 px-4 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleAddressSave}
                    disabled={isSaving}
                    className="py-3 bg-[#97C1A9] text-white rounded-full min-w-[200px] hover:bg-[#97C1A9]/90 disabled:opacity-60"
                  >
                    {isSaving ? "Saving…" : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
