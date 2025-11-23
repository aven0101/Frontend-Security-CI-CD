

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardAPI } from "@/utils/api";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
// import { Settings } from "lucide-react"; // Removed unused import
import AuthenticatorSetupModal from "./AuthenticatorSetupModal";
// import BackupCodesModal from "./BackupCodesModal"; // temporarily disabled per request
import SecurityQuestionsModal from "./SecurityQuestionsModal";
import Loader from "@/components/global/Loader";

export default function SecuritySettings() {
  const [passwordLastChange] = useState("02/02/2025");
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [showEmailPwdModal, setShowEmailPwdModal] = useState(false);
  const [emailCurrentPassword, setEmailCurrentPassword] = useState("");
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [authenticator, setAuthenticator] = useState(true);
  const [oneTimeCode, setOneTimeCode] = useState(true);
  const [securityQuestion, setSecurityQuestion] = useState(false);

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // QR Code Modal states
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState({
    qrCode: "",
    secret: "",
    message: ""
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Backup Codes Modal states
  const [showBackupCodesModal, setShowBackupCodesModal] = useState(false);
  const [backupCodesData, setBackupCodesData] = useState({
    codes: [],
    message: ""
  });

  // Security Questions Modal states
  const [showSecurityQuestionsModal, setShowSecurityQuestionsModal] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
  ]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isSettingUpQuestions, setIsSettingUpQuestions] = useState(false);

  // Hardcoded security questions
  const availableSecurityQuestions = [
    { id: "What was the name of your first pet?", question: "What was the name of your first pet?" },
    { id: "What is your mother's maiden name?", question: "What is your mother's maiden name?" },
    { id: "What was the name of your first school?", question: "What was the name of your first school?" },
    { id: "In what city were you born?", question: "In what city were you born?" },
    { id: "What is the name of your favorite movie?", question: "What is the name of your favorite movie?" },
    { id: "What was your childhood nickname?", question: "What was your childhood nickname?" },
    { id: "What is the name of the street you grew up on?", question: "What is the name of the street you grew up on?" },
    { id: "What was your first car's make and model?", question: "What was your first car's make and model?" },
    { id: "What is your favorite food?", question: "What is your favorite food?" },
    { id: "What was the name of your first boss?", question: "What was the name of your first boss?" },
    { id: "What is your favorite book?", question: "What is your favorite book?" },
    { id: "What was your first phone number?", question: "What was your first phone number?" }
  ];

  useEffect(() => {
    // Initialize email from authUser cookie if present
    try {
      const raw = Cookies.get("authUser");

      
      if (raw) {
        let email = "";
        try {
          const obj = JSON.parse(raw);
          email = obj?.email || obj?.user?.email || obj?.data?.email || "";
        } catch {
          if (raw.includes("@")) email = raw;
        }
        if (email) {
          setPrimaryEmail(email);
          setNewEmail(email);
        }
      }
    } catch {}
    // Fetch initial 2FA settings from API
    const fetch2FASettings = async () => {
      const response = await DashboardAPI.get2FAStatus();
      if (response.success) {
        const settings = response.message;
        setAuthenticator(settings.methods.authenticator.enabled);
        setOneTimeCode(settings.methods.oneTimeCode.enabled);
        setSecurityQuestion(settings.methods.securityQuestion.enabled);
        setIs2FAEnabled(settings.is2FAEnabled);
      }
      
    };

    fetch2FASettings();
  }, []);

  const isValidEmail = (val: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val);

  const handleOpenChangeEmail = (e) => {
    e.preventDefault();
    if (!newEmail || !isValidEmail(newEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (newEmail === primaryEmail) {
      toast.error("Please enter a different email to update");
      return;
    }
    setShowEmailPwdModal(true);
  };

  const confirmChangeEmail = async () => {
    if (!emailCurrentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    setIsChangingEmail(true);
    const payload = { currentPassword: emailCurrentPassword, newEmail };
    const { success, message } = await DashboardAPI.changeEmail(payload);
    setIsChangingEmail(false);
    if (success) {
      toast.success("Email updated successfully");
      setPrimaryEmail(newEmail);
      setShowEmailPwdModal(false);
      setEmailCurrentPassword("");
      // Try to update cookie shape conservatively
      const raw = Cookies.get("authUser");
      try {
        const obj = raw ? JSON.parse(raw) : null;
        if (obj && typeof obj === 'object') {
          const updated = { ...obj, email: newEmail };
          Cookies.set("authUser", JSON.stringify(updated), { expires: 1 });
        } else {
          Cookies.set("authUser", newEmail, { expires: 1 });
        }
      } catch {
        Cookies.set("authUser", newEmail, { expires: 1 });
      }
    } else {
      toast.error(typeof message === 'string' ? message : 'Failed to change email');
    }
  };

  // Individual toggle handlers for each 2FA method
  const handleAuthenticatorToggle = async () => {
    const newState = !authenticator;
    setAuthenticator(newState);

    try {
      if (newState) {
        const response = await DashboardAPI.setupAuthenticator();
       
        if (!response.success) {
          toast.error(response.message?.message || "Failed to enable Authenticator");
          setAuthenticator(!newState); // Revert on failure
        } else {
          // If response contains QR code data, show the QR modal
          if (response.message.qrCode && response.message.secret) {
            setQrCodeData({
              qrCode: response.message.qrCode,
              secret: response.message.secret,
              message: response.message.message || "Scan this QR code with your authenticator app"
            });
            setShowQRModal(true);
          } else {
            toast.success("Authenticator 2FA enabled successfully");
          }
        }
      } else {
        const response = await DashboardAPI.disableAuthenticator();
        if (!response.success) {
          toast.error(response.message?.message || "Failed to disable Authenticator");
          setAuthenticator(!newState); // Revert on failure
        } else {
          toast.success("Authenticator 2FA disabled successfully");
        }
      }
    } catch (error) {
      console.error("Authenticator toggle error:", error);
      toast.error("An error occurred while updating Authenticator settings");
      setAuthenticator(!newState); // Revert on error
    }
  };

  const handleOneTimeCodeToggle = async () => {
    const newState = !oneTimeCode;
    setOneTimeCode(newState);

    try {
      if (newState) {
        const response = await DashboardAPI.enableOneTimeOTP();
        console.log("Enabling One Time Code 2FA:", response);
        if (!response.success) {
          toast.error(response.message?.message || "Failed to enable One-time Code");
          setOneTimeCode(!newState); // Revert on failure
        } else {
          // If response contains backup codes, show the backup codes modal
          if (response.message?.backupCodes && Array.isArray(response.message.backupCodes)) {
            setBackupCodesData({
              codes: response.message.backupCodes,
              message: response.message.backupCodesMessage || "Save these backup codes in a safe place. Each code can only be used once."
            });
            // Modal is currently disabled; show a success toast instead
            toast.success(response.message?.message || "One-time Code 2FA enabled successfully");
          } else {
            toast.success(response.message?.message || "One-time Code 2FA enabled successfully");
          }
        }
      } else {
        const response = await DashboardAPI.disableOneTimeOTP();
        console.log("Disabling One Time Code 2FA:", response);
        if (!response.success) {
          toast.error(response.message?.message || "Failed to disable One-time Code");
          setOneTimeCode(!newState); // Revert on failure
        } else {
          toast.success("One-time Code 2FA disabled successfully");
        }
      }
    } catch (error) {
      console.error("One-time Code toggle error:", error);
      toast.error("An error occurred while updating One-time Code settings");
      setOneTimeCode(!newState); // Revert on error
    }
  };

  const handleSecurityQuestionToggle = async () => {
    const newState = !securityQuestion;
    setSecurityQuestion(newState);

    try {
      if (newState) {
        // Use hardcoded security questions - no API call needed
        setSecurityQuestions(availableSecurityQuestions);
        setShowSecurityQuestionsModal(true);

      } else {
        // Disable security questions
        const response = await DashboardAPI.disableSecurityQuestions();
        console.log("Disabling Security Question 2FA:", response);
        if (!response.success) {
          toast.error(response.message?.message || "Failed to disable Security Question");
          setSecurityQuestion(!newState); // Revert on failure
        } else {
          toast.success("Security Question 2FA disabled successfully");
        }
      }
    } catch (error) {
      console.error("Security Question toggle error:", error);
      toast.error("An error occurred while updating Security Question settings");
      setSecurityQuestion(!newState); // Revert on error
    }
  };

  // Handle 2FA verification
  const handleVerifyAuthenticator = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit verification code");
      return;
    }

    setIsVerifying(true);

    try {
      const payload = {
        token: verificationCode,
      };
      const response = await DashboardAPI.verifyAuthenticator(payload);

      console.log("Verifying Authenticator 2FA:", response);

      if (response.success) {
        // Check if response contains backup codes
        if (response.message.backupCodes && Array.isArray(response.message.backupCodes)) {
          // Close QR modal and show backup codes modal
          setShowQRModal(false);
          setVerificationCode("");

          setBackupCodesData({
            codes: response.message.backupCodes,
            message: response.message.backupCodesMessage || "Save these backup codes in a safe place. Each code can only be used once."
          });
          setShowBackupCodesModal(true);
        } else {
          toast.success("Authenticator 2FA setup completed successfully!");
          setShowQRModal(false);
          setVerificationCode("");
        }
        // Keep authenticator state as true since verification was successful
      } else {
        toast.error(response.message?.message || "Invalid verification code. Please try again.");
        setVerificationCode("");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred during verification. Please try again.");
      setVerificationCode("");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle security questions setup
  const handleSetupSecurityQuestions = async () => {
    // Validate that all questions are selected and answered
    const isValid = selectedQuestions.every(q => q.question && q.answer.trim());
    if (!isValid) {
      toast.error("Please select all questions and provide answers");
      return;
    }

    // Check for duplicate questions
    const questions = selectedQuestions.map(q => q.question);
    const uniqueIds = new Set(questions);
    if (uniqueIds.size !== questions.length) {
      toast.error("Please select different questions for each option");
      return;
    }

    setIsSettingUpQuestions(true);

    try {
      const payload = {
        questions: selectedQuestions
      };
      const response = await DashboardAPI.setupSecurityQuestions(payload);
      console.log("Setting up Security Questions:", response);

      if (response.success) {
        // Check if response contains backup codes
        if (response.message.backupCodes && Array.isArray(response.message.backupCodes)) {
          // Close security questions modal and show backup codes modal
          setShowSecurityQuestionsModal(false);

          setBackupCodesData({
            codes: response.message.backupCodes,
            message: response.message.backupCodesMessage || "Save these backup codes in a safe place. Each code can only be used once."
          });
          setShowBackupCodesModal(true);

          // Reset form
          setSelectedQuestions([
            { question: "", answer: "" },
            { question: "", answer: "" },
            { question: "", answer: "" }
          ]);
        } else {
          toast.success("Security Questions 2FA setup completed successfully!");
          setShowSecurityQuestionsModal(false);
          // Reset form
          setSelectedQuestions([
            { question: "", answer: "" },
            { question: "", answer: "" },
            { question: "", answer: "" }
          ]);
        }
      } else {
        toast.error(response.message?.message || "Failed to setup security questions");
        setSecurityQuestion(false); // Revert on failure
      }
    } catch (error) {
      console.error("Security questions setup error:", error);
      toast.error("An error occurred while setting up security questions");
      setSecurityQuestion(false); // Revert on error
    } finally {
      setIsSettingUpQuestions(false);
    }
  };

  // Download backup codes as .txt file
  const downloadBackupCodes = () => {
    const codesText = backupCodesData.codes.join('\n');
    const fileContent = `2FA Backup Codes\n\n${backupCodesData.message}\n\nCodes:\n${codesText}\n\nGenerated on: ${new Date().toLocaleString()}`;

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `2FA_Backup_Codes_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Backup codes downloaded successfully!");
  };

  // Device sessions
  type DeviceRow = { id: string; time: string; location: string; agent: string; status: 'blockable' | 'unlockable'; isCurrent?: boolean };
  const [devices, setDevices] = useState<DeviceRow[]>([]);
  const [loadingDevices, setLoadingDevices] = useState<boolean>(false);
  const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({});

  const formatDateTime = (value: any) => {
    try {
      if (!value) return '';
      const d = new Date(value);
      if (isNaN(d.getTime())) return String(value);
      return `${d.toLocaleDateString()} - ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      return String(value);
    }
  };

  const fetchDeviceSessions = async () => {
    setLoadingDevices(true);
    const { success, message } = await DashboardAPI.getDeviceSessions();
    
    if (success) {
      let sessions: any[] = [];
      if (Array.isArray((message as any)?.sessions)) sessions = (message as any).sessions;
      else if (Array.isArray(message)) sessions = message as any[];
      const rows: DeviceRow[] = sessions.map((s: any, idx: number) => {
        const id = String(s.id ?? s.sessionId ?? s.uuid ?? idx + 1);
        const blocked = (s.isBlocked === 1 || s.isBlocked === true) || (s.blocked === 1 || s.blocked === true) || s.status === 'blocked';
        const city = s.location?.city ?? s.city ?? undefined;
        const country = s.location?.country ?? s.country ?? undefined;
        const locStr = [city, country].filter(Boolean).join(', ');
        const location = locStr || s.ipAddress || 'Unknown';
        const agent = s.deviceName || [s.os, s.browser].filter(Boolean).join(' - ') || s.userAgent || s.agent || s.device || 'Unknown';
        const timeRaw = s.lastActive ?? s.lastActiveAt ?? s.updatedAt ?? s.loginTime ?? s.createdAt ?? s.updated_at ?? s.created_at;
        return {
          id,
          time: formatDateTime(timeRaw),
          location,
          agent: String(agent),
          status: blocked ? 'unlockable' : 'blockable',
          isCurrent: !!s.isCurrent,
        };
      });
      setDevices(rows);
    } else {
      toast.error(typeof message === 'string' ? message : 'Failed to load device sessions');
      setDevices([]);
    }
    setLoadingDevices(false);
  };

  useEffect(() => {
    fetchDeviceSessions();
  }, []);

  const handleDeviceAction = async (row: DeviceRow) => {
    setRowBusy((m) => ({ ...m, [row.id]: true }));
    try {
      if (row.status === 'unlockable') {
        const { success, message } = await DashboardAPI.unblockDeviceSession(row.id);
        if (success) {
          toast.success('Device session unblocked');
          setDevices((list) => list.map(d => d.id === row.id ? { ...d, status: 'blockable' } : d));
        } else {
          toast.error(typeof message === 'string' ? message : 'Failed to unblock device');
        }
      } else {
        const { success, message } = await DashboardAPI.blockDeviceSession(row.id);
        if (success) {
          toast.success('Device session blocked');
          setDevices((list) => list.map(d => d.id === row.id ? { ...d, status: 'unlockable' } : d));
        } else {
          toast.error(typeof message === 'string' ? message : 'Failed to block device');
        }
      }
    } finally {
      setRowBusy((m) => ({ ...m, [row.id]: false }));
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await DashboardAPI.changePassword(data);

    if (response.success === false) {
      toast.error(response.message.message || "Failed to change password.");
    } else {
      toast.success(response.message.message || "Password changed successfully!");
    }
  };

  return (
    <>

      <Toaster position="top-right" containerClassName="!z-[99999999]" />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-[#F5F5F5] rounded-xl py-4 px-4">
          <nav aria-label="Profile Settings" className="sticky top-6">
            {/* Sidebar section heading to match screenshot */}
            <ul className="space-y-3">
              {/* Keep Personal Info as a navigable item but visually secondary */}
              <li>
                <Link href="/business/profile-settings" className="block">
                  <span className="block w-full text-left text-[#838884] rounded-[12px] py-3 px-5 ">Business Info</span>
                </Link>
              </li>
              <li>
                <Link href="/business/security" className="block">
                  <span className="block w-full text-left bg-[#97C1A9] text-white rounded-[12px] py-3 px-5 font-medium shadow-sm">Security</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className="space-y-8">
          {/* Password */}
          <form onSubmit={handlePasswordChange} className="w-full rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.12)] border border-[#E2E8F0]">
            <div className="bg-white rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#98C1A9] font-bold text-[20px]">Password:</h3>
                <div className="text-[20px] "><span className="text-[#98C1A9]">{passwordLastChange}</span> <span className="text-[#7B7B7B] ml-2">Last Change</span></div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Current Password"
                    className=" text-[20px] border border-[#D1D5DB] px-3 pr-12 text-base bg-white w-full outline-none h-12  placeholder:text-[#AAAAAA] placeholder:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showCurrentPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    className="text-[20px] border border-[#D1D5DB] px-3 pr-12 text-base bg-white w-full outline-none h-12 placeholder:text-[#AAAAAA] placeholder:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="text-[20px] border border-[#D1D5DB] px-3 pr-12 text-base bg-white w-full outline-none h-12 placeholder:text-[#AAAAAA] placeholder:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <button type="submit" className="bg-[#98C1A9] hover:bg-[#98C1A9]/90 text-white min-w-[170px] text-center h-12 px-6 rounded-2xl text-base font-medium cursor-pointer mt-5 flex items-center justify-center">Change</button>
              </div>
            </div>
          </form>

          {/* Emails */}
          <form onSubmit={handleOpenChangeEmail} className="w-full rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.12)] border border-[#E2E8F0]">
            <div className="bg-white rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#98C1A9] font-bold text-[20px]">Emails Settings:</h3>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  name="primaryEmail"
                  placeholder="Primary Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="border border-[#D1D5DB] px-3 text-base bg-white w-full outline-none h-12 rounded-md placeholder:text-[#AAAAAA] placeholder:text-sm"
                />
              </div>
              <div className="w-full flex justify-end">
                <button type="submit" className="bg-[#98C1A9] hover:bg-[#98C1A9]/90 text-white min-w-[170px] text-center h-12 px-6 rounded-2xl text-base font-medium cursor-pointer mt-5 flex items-center justify-center">Update</button>
              </div>
            </div>
          </form>

          {/* Change Email Password Modal */}
          {showEmailPwdModal && (
            <div className="fixed inset-0 z-[9999999] flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowEmailPwdModal(false)} />
              <div className="relative z-10 max-w-md w-full rounded-2xl bg-white p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-[#00281A] mb-3 font-aptos">Confirm Email Change</h2>
                <p className="mb-4 text-gray-700">To update your email to <span className="font-semibold">{newEmail}</span>, please enter your current password.</p>
                <input
                  type="password"
                  value={emailCurrentPassword}
                  onChange={(e) => setEmailCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowEmailPwdModal(false)}
                    className="w-[120px] min-h-[45px] rounded-full bg-[#98C1A9] text-white font-bold flex items-center justify-center text-[0.95rem] px-4"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmChangeEmail}
                    disabled={isChangingEmail}
                    className={`w-[140px] min-h-[45px] rounded-full bg-[#98C1A9] text-white font-bold flex items-center justify-center text-[0.95rem] px-4 ${isChangingEmail ? 'opacity-70' : ''}`}
                  >
                    {isChangingEmail ? 'Updating...' : 'Update Email'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2FA */}
          <div className="w-full rounded-xl border border-[#E2E8F0] shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
            <div className="bg-white rounded-xl p-0 overflow-hidden">
              <div className="px-6 md:px-8 py-5">
                <h3 className="text-[#7FAF99] font-bold text-[20px]">2-Factor Authentication</h3>
              </div>
              <div className="border-b-1 border-[#848884]"></div>
              <div className="divide-y divide-[#848884]">
                {[
                  { label: 'Authenticator', state: authenticator, handler: handleAuthenticatorToggle },
                  { label: 'One-time code', state: oneTimeCode, handler: handleOneTimeCodeToggle },
                  { label: 'Security question', state: securityQuestion, handler: handleSecurityQuestionToggle }
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-6 md:px-8 py-4">
                    <span className="text-[#848884] text-[20px]">{row.label}</span>
                    <button
                      role="switch"
                      aria-checked={row.state}
                      onClick={row.handler}
                      className={`cursor-pointer relative inline-flex h-[22px] w-[41px] items-center rounded-full transition-colors ${row.state ? 'bg-[#98C1A9]' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${row.state ? 'translate-x-5' : 'translate-x-[1px]'}`} />
                    </button>
                  </div>
                ))}
              </div>
              {!authenticator && !oneTimeCode && !securityQuestion && !is2FAEnabled &&
                <>
                  <div className="border-b-1 border-[#848884]"></div>
                  <p className="text-[#F59E0B] ml-5 my-3">2FA is not enabled — enable it to protect your account.</p>
                </>
              }
            </div>
          </div>

          {/* Logged-in Devices */}
          <div className="w-full rounded-xl border border-[#E2E8F0] shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="px-6 md:px-8 py-5">
                <h3 className="text-[#7FAF99] font-bold text-[20px]">Logged-in Devices</h3>
              </div>
              <div className="border-b-1 border-[#848884]"></div>
              <div>
                {devices.map(d => (
                  <div key={d.id} className="grid grid-cols-12 gap-4 items-center justify-start px-6 md:px-8 py-3 border-t border-[#848884] first:border-t-0">
                    <div className="col-span-1 text-[#6B7280] flex items-center gap-3">
                      {/* simple inline icon */}
                      <span className="inline-flex items-center justify-center w-8 h-8">
                        <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.7712 0.914062H1.82835C1.3234 0.914062 0.914062 1.3234 0.914062 1.82835V16.4569C0.914062 16.9619 1.3234 17.3712 1.82835 17.3712H23.7712C24.2761 17.3712 24.6855 16.9619 24.6855 16.4569V1.82835C24.6855 1.3234 24.2761 0.914062 23.7712 0.914062Z" stroke="#98C1A9" stroke-width="1.82857" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M10.9711 17.3711L9.14258 21.9425" stroke="#98C1A9" stroke-width="1.82857" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M14.6289 17.3711L16.4575 21.9425" stroke="#98C1A9" stroke-width="1.82857" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7.31445 21.9434H18.2859" stroke="#98C1A9" stroke-width="1.82857" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M17.3714 9.14258H8.22852" stroke="#98C1A9" stroke-width="1.82857" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                      </span>
                    </div>
                    <div className="text-[#6B7280] col-span-3">{d.time}</div>
                    <div className="text-[#6B7280] col-span-3">{d.location}</div>
                    <div className="text-[#6B7280] col-span-3">{d.agent}</div>
                    <div className="text-right col-span-2">
                      {d.status === 'unlockable' ? (
                        <button
                          onClick={() => handleDeviceAction(d)}
                          disabled={!!rowBusy[d.id] || d.isCurrent}
                          className={`text-white text-center h-11 w-full rounded-2xl text-md cursor-pointer flex items-center justify-center bg-[#C8BDF3] ${rowBusy[d.id] || d.isCurrent ? 'opacity-60' : ''}`}
                        >
                          {rowBusy[d.id] ? <Loader /> : (d.isCurrent ? 'Current' : 'Unblock')}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeviceAction(d)}
                          disabled={!!rowBusy[d.id] || d.isCurrent}
                          className={`text-white text-center h-11 w-full rounded-2xl text-md cursor-pointer flex items-center justify-center bg-[#97C1A9] ${rowBusy[d.id] || d.isCurrent ? 'opacity-60' : ''}`}
                        >
                          {rowBusy[d.id] ? <Loader /> : (d.isCurrent ? 'Current' : 'Block')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Authenticator Setup Modal */}
      <AuthenticatorSetupModal
        open={showQRModal}
        qrCode={qrCodeData.qrCode}
        secret={qrCodeData.secret}
        message={qrCodeData.message}
        verificationCode={verificationCode}
        onVerificationCodeChange={setVerificationCode}
        onClose={() => setShowQRModal(false)}
        onCancel={() => {
          setShowQRModal(false);
          setVerificationCode("");
          setAuthenticator(false);
        }}
        onVerify={handleVerifyAuthenticator}
        isVerifying={isVerifying}
      />

      {/* Backup Codes Modal - temporarily disabled */}
      {false && (
        <></>
        // <BackupCodesModal
        //   open={showBackupCodesModal}
        //   codes={backupCodesData.codes as any}
        //   message={backupCodesData.message}
        //   onClose={() => setShowBackupCodesModal(false)}
        //   onDownload={downloadBackupCodes}
        //   onSaved={() => {
        //     setShowBackupCodesModal(false);
        //     toast.success("One-time Code 2FA enabled successfully!");
        //   }}
        // />
      )}

      {/* Security Questions Modal */}
      <SecurityQuestionsModal
        open={showSecurityQuestionsModal}
        questions={securityQuestions as any}
        selected={selectedQuestions as any}
        onSelectChange={(index, question) => {
          const newQs = [...selectedQuestions];
          newQs[index].question = question;
          setSelectedQuestions(newQs);
        }}
        onAnswerChange={(index, answer) => {
          const newQs = [...selectedQuestions];
          newQs[index].answer = answer;
          setSelectedQuestions(newQs);
        }}
        onClose={() => {
          setShowSecurityQuestionsModal(false);
          setSecurityQuestion(false);
          setSelectedQuestions([
            { question: "", answer: "" },
            { question: "", answer: "" },
            { question: "", answer: "" }
          ]);
        }}
        onSubmit={handleSetupSecurityQuestions}
        isSubmitting={isSettingUpQuestions}
      />
    </>
  );
}
