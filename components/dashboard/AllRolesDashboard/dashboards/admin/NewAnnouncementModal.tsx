'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (payload: { title: string; html: string }) => void;
}

// UI-only rich text modal to match the provided mock. Toolbar buttons are decorative.
export default function NewAnnouncementModal({ isOpen, onClose, onCreate }: Props) {
  const [title, setTitle] = useState('');
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Basic formatting using contentEditable + execCommand for quick UI parity
  const exec = (command: string, value?: string) => {
    // Ensure editor has focus
    editorRef.current?.focus();
    try {
      document.execCommand(command, false, value);
    } catch {
      // ignore if unsupported
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Seed demo content like the screenshot
      if (editorRef.current) {
        editorRef.current.innerHTML = `
          <h2 style="color:#3CF16A; font-weight:700; margin:12px 0">Welcome to Text Editor!</h2>
          <p style="color:#6B7280">Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.</p>
          <ul style="margin:12px 0 0 18px; color:#6B7280">
            <li>Lorem ipsum dolor sit amet consectetur adipiscing.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipiscing.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipiscing.</li>
          </ul>
        `;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="bg-[#3D3D3D69] fixed inset-0 z-40" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Fixed sizing per spec: 691x533, radius 16, padding 26, gap 14 */}
        <div
          className="bg-white relative shadow-xl"
          style={{ width: 691, height: 533, borderRadius: 16, padding: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 text-[#98C1A9] hover:text-[#6ea68a]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="pb-3">
            <h2
              className="text-[#98C1A9]"
              style={{
                fontWeight: 700,
                fontSize: 24,
                lineHeight: '26px',
                letterSpacing: '0.02em',
              }}
            >
              New Broadcast
            </h2>
          </div>

          {/* Title input */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full h-12 rounded-md border border-[#E5E7EB] px-4 text-sm placeholder-gray-400 outline-none focus:ring-0 focus:border-[#98C1A9]"
          />

          {/* Toolbar */}
          <div className="mt-[14px]">
            <div className="border border-[#E5E7EB] rounded-md overflow-hidden">
              <div className="flex items-center gap-2 bg-[#F7F7F7] px-3 py-2 text-gray-600">
                {/* Font size */}
                <div className="flex items-center gap-1 bg-white rounded px-2 py-1 border border-gray-200 text-sm">
                  <span>14</span>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M5 7l5 5 5-5H5z"/></svg>
                </div>
                {/* Toolbar buttons - decorative */}
                <button onClick={() => exec('foreColor', '#3CF16A')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center font-semibold">T</button>
                <button onClick={() => exec('bold')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center font-bold">B</button>
                <button onClick={() => exec('italic')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center italic">I</button>
                <button onClick={() => exec('underline')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center underline">U</button>
                <button onClick={() => exec('strikeThrough')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center line-through">S</button>
                <span className="mx-1 h-6 w-px bg-gray-200" />
                {/* Alignment */}
                <button onClick={() => exec('justifyLeft')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h14M3 10h10"/></svg>
                </button>
                <button onClick={() => exec('justifyCenter')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8h14M8 12h9"/></svg>
                </button>
                <button onClick={() => exec('justifyRight')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h14M7 10h10"/></svg>
                </button>
                <span className="mx-1 h-6 w-px bg-gray-200" />
                {/* Lists */}
                <button onClick={() => exec('insertUnorderedList')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
                </button>
                <button onClick={() => exec('insertOrderedList')} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
                <span className="mx-1 h-6 w-px bg-gray-200" />
                {/* Image / Link */}
                <button onClick={() => fileInputRef.current?.click()} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l6-6 4 4 6-6"/></svg>
                </button>
                <button onClick={() => {
                  const url = prompt('Enter URL');
                  if (url) exec('createLink', url);
                }} className="w-8 h-8 rounded hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 007.07 0l1.41-1.41a5 5 0 00-7.07-7.07L10 5"/></svg>
                </button>
              </div>

              {/* Editor area */}
              <div className="px-4 py-3 max-h-[360px] overflow-auto">
                <div
                  ref={editorRef}
                  contentEditable
                  className="min-h-[220px] outline-none text-[15px] leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-[14px] flex justify-center">
            <button
              onClick={() => {
                const html = editorRef.current?.innerHTML || '';
                onCreate?.({ title, html });
                onClose();
              }}
              className="bg-[#98C1A9] hover:bg-[#88b3a4] text-white font-semibold"
              style={{ width: 234, height: 54, borderRadius: 26, padding: '12px 18px' }}
            >
              CREATE
            </button>
          </div>

          {/* hidden input for image upload */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                exec('insertImage', reader.result as string);
              };
              reader.readAsDataURL(file);
              // reset value to allow same file reselect
              e.currentTarget.value = '';
            }}
          />
        </div>
      </div>
    </>
  );
}
