'use client';

import { useState } from 'react';

type NormalizedRole = 'admin' | 'manager';

export default function SharingPolicy({ role }: { role?: string }) {
  // Normalize incoming role string (e.g., "business-manager" → "manager")
  const localRole: NormalizedRole = (role || '')
    .toLowerCase()
    .includes('manager')
    ? 'manager'
    : 'admin';
  // Sharing settings toggles
  const [allowOrgSharing, setAllowOrgSharing] = useState(true);
  const [allowExternal, setAllowExternal] = useState(true);
  const [requireLogin, setRequireLogin] = useState(true);
  const [allowDownload, setAllowDownload] = useState(true);

  // Link expiration policies
  const [maxDuration, setMaxDuration] = useState('30 days');
  const [defaultDuration, setDefaultDuration] = useState('7 days');
  const [letUsersModify, setLetUsersModify] = useState(true);
  const [notifyBeforeExpiry, setNotifyBeforeExpiry] = useState(true);

  // Permission level settings (manager only)
  const [internalPerms, setInternalPerms] = useState<string[]>(['view', 'edit', 'download', 'upload']);
  const [externalPerms, setExternalPerms] = useState<string[]>(['view', 'edit']);
  const [guestsNoAccess, setGuestsNoAccess] = useState(false); // false -> View Only

  // Notification rules (manager only)
  const [notifyAccess, setNotifyAccess] = useState(true);
  const [notifyRequest, setNotifyRequest] = useState(true);
  const [notifyDownloadEdit, setNotifyDownloadEdit] = useState(true);

  const togglePerm = (list: string[], setList: (v: string[]) => void, key: string) => {
    if (list.includes(key)) setList(list.filter((x) => x !== key));
    else setList([...list, key]);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-[28px] md:text-[32px] font-semibold mb-4" style={{ color: '#98C1A9' }}>Sharing Policy</h1>

      {/* Sharing Settings */}
      <Section title="Sharing Settings">
        <Row label="Allow file sharing within organization">
          <input type="checkbox" className="toggle-green" checked={allowOrgSharing} onChange={(e)=>setAllowOrgSharing(e.target.checked)} />
        </Row>
        <Row label="Allow external file sharing">
          <input type="checkbox" className="toggle-green" checked={allowExternal} onChange={(e)=>setAllowExternal(e.target.checked)} />
        </Row>
        <Row label="Require login to view shared file">
          <input type="checkbox" className="toggle-green" checked={requireLogin} onChange={(e)=>setRequireLogin(e.target.checked)} />
        </Row>
        <Row label="Allow download of shared files">
          <input type="checkbox" className="toggle-green" checked={allowDownload} onChange={(e)=>setAllowDownload(e.target.checked)} />
        </Row>
      </Section>

      {/* Link Expiration Policies */}
      <Section title="Link Expiration Policies">
        <Row label="Max allowed link duration">
          <Select value={maxDuration} onChange={setMaxDuration} options={["7 days", "15 days", "30 days", "60 days"]} />
        </Row>
        <Row label="Default link expiration for users">
          <Select value={defaultDuration} onChange={setDefaultDuration} options={["1 day", "7 days", "15 days", "30 days"]} />
        </Row>
        <Row label="Let users modify expiration">
          <input type="checkbox" className="toggle-green" checked={letUsersModify} onChange={(e)=>setLetUsersModify(e.target.checked)} />
        </Row>
        <Row label="Notify user before expiration">
          <input type="checkbox" className="toggle-green" checked={notifyBeforeExpiry} onChange={(e)=>setNotifyBeforeExpiry(e.target.checked)} />
        </Row>
      </Section>

      {/* Permission Level Settings - manager only */}
      {localRole === 'manager' && (
        <Section title="Permission Level Settings">
          <div className="divide-y">
            <PermRow
              label="Internal users"
              options={["view", "edit", "download", "upload"]}
              selected={internalPerms}
              onToggle={(key)=>togglePerm(internalPerms, setInternalPerms, key)}
            />
            <PermRow
              label="External users"
              options={["view", "edit", "download", "upload"]}
              selected={externalPerms}
              onToggle={(key)=>togglePerm(externalPerms, setExternalPerms, key)}
            />
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-[#6B7A72]">Guests (anonymous)</span>
              <div className="flex items-center gap-6 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input className="radio-square-green" type="radio" name="guest_access" checked={!guestsNoAccess} onChange={()=>setGuestsNoAccess(false)} />
                  <span>View Only</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input className="radio-square-green" type="radio" name="guest_access" checked={guestsNoAccess} onChange={()=>setGuestsNoAccess(true)} />
                  <span>No access</span>
                </label>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Notification Rules - manager only */}
      {localRole === 'manager' && (
        <Section title="Notification Rules">
          <Row label="When a shared file is accessed">
            <input type="checkbox" className="toggle-green" checked={notifyAccess} onChange={(e)=>setNotifyAccess(e.target.checked)} />
          </Row>
          <Row label="When someone requests access">
            <input type="checkbox" className="toggle-green" checked={notifyRequest} onChange={(e)=>setNotifyRequest(e.target.checked)} />
          </Row>
          <Row label="When someone downloads or edits">
            <input type="checkbox" className="toggle-green" checked={notifyDownloadEdit} onChange={(e)=>setNotifyDownloadEdit(e.target.checked)} />
          </Row>
        </Section>
      )}

      {/* Save */}
      <div className="flex justify-center mt-6">
        <button className="px-8 py-3 rounded-full text-white" style={{ background: '#98C1A9' }}>Save Changes</button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }){
  return (
    <div className="bg-white rounded-2xl border border-gray-200 mb-5 overflow-hidden" style={{ boxShadow: '0px 0px 7.22px rgba(0,0,0,0.15)' }}>
      <div className="px-5 py-3 border-b" style={{ borderColor: '#98C1A9' }}>
        <h2 className="text-base font-semibold" style={{ color: '#98C1A9' }}>{title}</h2>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }){
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b last:border-0" style={{ borderColor: '#EDF2EF' }}>
      <span className="text-sm text-[#6B7A72]">{label}</span>
      <div className="flex items-center">{children}</div>
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string)=>void; options: string[] }){
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className="appearance-none bg-white border border-[#98C1A9] text-[#98C1A9] rounded-full px-4 py-1 pr-8 text-sm"
      >
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M5 7l5 5 5-5H5z"/></svg>
      </div>
    </div>
  );
}

function PermRow({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (key: string)=>void }){
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <span className="text-sm text-[#6B7A72]">{label}</span>
      <div className="flex items-center gap-6 text-sm">
        {options.map((opt) => (
          <label key={opt} className="inline-flex items-center gap-2">
            <input className="chk-green" type="checkbox" checked={selected.includes(opt)} onChange={()=>onToggle(opt)} />
            <span className="capitalize">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
