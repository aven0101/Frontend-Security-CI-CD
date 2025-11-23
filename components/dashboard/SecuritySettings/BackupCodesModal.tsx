'use client'

import React from 'react';
import toast from 'react-hot-toast';

type Props = {
  open: boolean;
  codes: string[];
  message?: string;
  onClose: () => void;
  onDownload?: () => void;
  onSaved?: () => void; // called when user confirms they saved the codes
};

export default function BackupCodesModal({ open, codes, message, onClose, onDownload, onSaved }: Props) {
  if (!open) return null;

  const handleSaved = () => {
    if (onSaved) onSaved();
    else toast.success('Backup codes acknowledged.');
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 max-w-lg w-full mx-4 rounded-2xl shadow-2xl animate-fadeIn bg-white">
        <div className="rounded-2xl bg-white p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#00281A] font-aptos">Backup Codes</h2>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Warning Message */}
          {message && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg width="20" height="20" className="text-yellow-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" />
                </svg>
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1">Important!</h3>
                  <p className="text-sm text-yellow-700">{message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Backup Codes */}
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="grid grid-cols-2 gap-2">
                {codes.map((code, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded border font-mono text-center text-sm select-all hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      toast.success(`Code ${code} copied to clipboard!`);
                    }}
                    title="Click to copy"
                  >
                    {code}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Click any code to copy it to clipboard</p>
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">How to use backup codes:</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Use these codes when you can't access your primary 2FA method</li>
              <li>Each code can only be used once</li>
              <li>Store them in a secure location (password manager, safe place)</li>
              <li>Download and print them for offline access</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 bg-[#98C1A9] hover:bg-[#98C1A9]/90 text-white rounded-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download as .txt
            </button>
            <button
              onClick={handleSaved}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              I've Saved These Codes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
