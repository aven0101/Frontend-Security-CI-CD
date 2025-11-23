"use client";

import React from "react";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  qrCode: string;
  secret: string;
  message: string;
  verificationCode: string;
  onVerificationCodeChange: (val: string) => void;
  onClose: () => void; // closes without reverting state
  onCancel: () => void; // closes and reverts authenticator toggle
  onVerify: () => void;
  isVerifying?: boolean;
};

export default function AuthenticatorSetupModal({
  open,
  qrCode,
  secret,
  message,
  verificationCode,
  onVerificationCodeChange,
  onClose,
  onCancel,
  onVerify,
  isVerifying = false,
}: Props) {
  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    onVerificationCodeChange(value);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      toast.success("Secret key copied to clipboard!");
    } catch {
      toast.error("Failed to copy secret key");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 max-w-lg w-full mx-4 rounded-2xl shadow-2xl animate-fadeIn bg-white">
        <div className="rounded-2xl bg-white p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#00281A] font-aptos">Setup Authenticator</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* QR Code */}
          <div className="text-center mb-6">
            <div className="inline-block p-1 bg-white rounded-lg border-2 border-gray-200 mb-4">
              {/* Using img instead of next/image to keep this component generic */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCode} alt="2FA QR Code" className="w-28 h-28 mx-auto" />
            </div>
            <p className="text-gray-700 text-base mb-4">{message}</p>
          </div>

          {/* Secret Key */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manual Entry Key (if you can't scan):
            </label>
            <div className="relative">
              <input
                type="text"
                value={secret}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono select-all"
              />
              <button
                onClick={handleCopy}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy to clipboard"
                aria-label="Copy secret"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Open your authenticator app (Google Authenticator, Authy, etc.)</li>
              <li>Scan the QR code or manually enter the key above</li>
              <li>Enter the 6-digit code from your app to complete setup</li>
            </ol>
          </div>

          {/* Verification Code Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter 6-digit verification code:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={handleChange}
              placeholder="123456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#98C1A9] focus:border-transparent"
              maxLength={6}
            />
            <p className="text-xs text-gray-500 mt-1 text-center">Enter the 6-digit code shown in your authenticator app</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onVerify}
              disabled={verificationCode.length !== 6 || isVerifying}
              className={`px-6 py-2 rounded-lg transition-colors ${
                verificationCode.length !== 6 || isVerifying
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#98C1A9] hover:bg-[#98C1A9]/90 text-white"
              }`}
            >
              {isVerifying ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                "Verify & Complete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
