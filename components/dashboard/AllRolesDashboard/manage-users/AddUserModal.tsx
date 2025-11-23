"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SuperAdminAPI } from "@/utils/api";
import toast from "react-hot-toast";
import Loader from "@/components/global/Loader";

interface FormValues {
  // Create mode fields
  username: string; // full name (create only UI convenience)
  email: string;
  phone: string;
  role: string; // 'manager' | 'standard_user'
  assignTo: string; // manager id for standard_user
  setViaEmail: boolean;
  password: string;
  // Edit mode fields
  firstName?: string;
  lastName?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate?: (payload: FormValues) => void;
  mode?: 'create' | 'edit';
  isAdmin?: boolean; // controls visibility of Assign To
  initial?: (Partial<FormValues> & { id?: string; first_name?: string; last_name?: string; phone?: string }) | null; // prefill for edit
}

export default function AddUserModal({ open, onClose, onCreate, mode = "create", isAdmin = true, initial = null }: Props) {
  const [form, setForm] = useState<FormValues>({
    username: initial?.username || '',
    email: initial?.email || '',
    phone: (initial as any)?.phone || "",
    role: initial?.role || 'standard_user',
    assignTo: initial?.assignTo || '',
    setViaEmail: initial?.setViaEmail ?? false,
    password: initial?.password || '',
    firstName: initial?.first_name || '',
    lastName: initial?.last_name || '',
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      username: initial?.username || '',
      email: initial?.email || '',
      phone: (initial as any)?.phone || "",
      role: initial?.role || 'standard_user',
      assignTo: initial?.assignTo || '',
      setViaEmail: initial?.setViaEmail ?? false,
      password: initial?.password || '',
      firstName: initial?.first_name || (initial?.username ? initial.username.split(' ')[0] : ''),
      lastName: initial?.last_name || (initial?.username ? initial.username.split(' ').slice(1).join(' ') : ''),
    });
  }, [open, initial]);

  const [criteria, setCriteria] = useState({
    hasEight: false,
    up: false,
    low: false,
    num: false,
    spec: false,
  });

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (name === 'password') check(value);
  };

  const check = (pwd: string) => {
    setCriteria({
      hasEight: pwd.length >= 8,
      up: /[A-Z]/.test(pwd),
      low: /[a-z]/.test(pwd),
      num: /\d/.test(pwd),
      spec: /[@#$%&*]/.test(pwd),
    });
  };

  const generate = (length = 12) => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '@#$%&*';
    const all = upper + lower + digits + special;
    let pwd = upper[0] + lower[1] + digits[2] + special[3];
    for (let i = 4; i < length; i++) pwd += all[Math.floor(Math.random() * all.length)];
    pwd = pwd.split('').sort(() => 0.5 - Math.random()).join('');
    setForm((p) => ({ ...p, password: pwd }));
    check(pwd);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [managers, setManagers] = useState<Array<{id:string; name:string}>>([]);

  // Load managers list when needed (admin creating or editing a standard_user)
  useEffect(() => {
    const needManagers = open && isAdmin && (mode === 'create' || (mode === 'edit' && initial?.role === 'standard_user'));
    if (!needManagers) return;
    (async () => {
      const { success, message } = await SuperAdminAPI.GetAdmin({ role: 'manager', page: '1', pageSize: '50', status: 'active' });
      if (!success) return; // silent
      const data = (message as any)?.data || (message as any);
      const list = (data?.users || []).map((u: any) => ({ id: String(u.id), name: `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || u.email }));
      setManagers(list);
    })();
  }, [open, isAdmin, mode, initial?.role]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (mode === 'edit') {
      if (!initial?.id) return toast.error('User id missing');
      if (!form.firstName?.trim()) return toast.error('First name is required');
      if (!form.lastName?.trim()) return toast.error('Last name is required');
      if (!form.email?.trim()) return toast.error('Email is required');

      const payload: any = {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone?.trim() || '',
      };
      if (!form.setViaEmail && form.password) {
        payload.password = form.password;
      }
      if (initial?.role === 'standard_user' && form.assignTo) {
        payload.assigned_to = form.assignTo;
      }
      setIsSaving(true);
      const { success, message } = await SuperAdminAPI.updateAdmin(initial.id, payload);
      setIsSaving(false);
      if (success) {
        toast.success('User updated');
        onCreate?.(form);
        onClose();
      } else {
        const err = typeof message === 'string' ? message : (message?.message || 'Failed to update user');
        toast.error(err);
      }
      return;
    }

    // Create mode
    // Role-based restrictions (admin path)
    const allowedRoles = isAdmin ? ['manager', 'standard_user'] : ['standard_user'];
    if (!allowedRoles.includes(form.role)) {
      toast.error('You are not allowed to create this role');
      return;
    }

    if (!form.username?.trim()) return toast.error('Full name is required');
    if (!form.email?.trim()) return toast.error('Email is required');
    if (form.role === 'standard_user' && !form.assignTo) return toast.error('Please select a manager');
    if (!form.setViaEmail && !form.password) return toast.error('Password is required or choose Set via email');

    const payload: any = {
      name: form.username.trim(),
      email: form.email.trim(),
      phone: form.phone?.trim() || undefined,
      role: form.role,
    };
    if (form.role === 'standard_user') payload.assigned_to = form.assignTo;
    if (!form.setViaEmail) payload.password = form.password;

    setIsSaving(true);
    const { success, message } = await SuperAdminAPI.Createadmin(payload);
    setIsSaving(false);
    if (success) {
      toast.success('User created');
      onCreate?.(form);
      onClose();
    } else {
      const err = typeof message === 'string' ? message : (message?.message || 'Failed to create user');
      toast.error(err);
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="bg-[#3D3D3D69] fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[20px] w-full max-w-[420px] p-6 relative">
          {/* Close */}
          <button onClick={onClose} className="absolute right-4 top-4 text-[#98C1A9]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          <h3 className="mb-4" style={{ color: '#98C1A9', fontWeight: 700, fontSize: 18 }}>{mode === 'edit' ? 'Edit User' : 'Add New User'}</h3>

          <form onSubmit={submit} className="space-y-3">
            {mode === 'edit' ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <input name="firstName" value={form.firstName || ''} onChange={update} placeholder="First name" className="w-full h-11 rounded border border-gray-200 px-3 text-sm" />
                  <input name="lastName" value={form.lastName || ''} onChange={update} placeholder="Last name" className="w-full h-11 rounded border border-gray-200 px-3 text-sm" />
                </div>
                <input name="email" value={form.email} onChange={update} placeholder="Email address" className="w-full h-11 rounded border border-gray-200 px-3 text-sm" />
                <input name="phone" value={form.phone} onChange={update} placeholder="Phone (+123...)" className="w-full h-11 rounded border border-gray-200 px-3 text-sm" />
                {initial?.role === 'standard_user' && (
                  <select name="assignTo" value={form.assignTo} onChange={update} className="w-full h-11 rounded border border-gray-200 px-3 text-sm">
                    <option value="">Assign to manager</option>
                    {managers.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                )}
              </>
            ) : (
              <>
                <input name="username" value={form.username} onChange={update} placeholder="Full name" className="w-full h-11 rounded border border-gray-200 px-3 text-sm" />
                <input name="email" value={form.email} onChange={update} placeholder="Email address" className="w-full h-11 rounded border border-gray-200 px-3 text-sm" />
                <input name="phone" value={form.phone} onChange={update} placeholder="Phone (+123...)" className="w-full h-11 rounded border border-gray-200 px-3 text-sm" />
                <select name="role" value={form.role} onChange={update} className="w-full h-11 rounded border border-gray-200 px-3 text-sm">
                  {isAdmin && <option value="manager">manager</option>}
                  <option value="standard_user">standard_user</option>
                </select>
                {isAdmin && form.role === 'standard_user' && (
                  <select name="assignTo" value={form.assignTo} onChange={update} className="w-full h-11 rounded border border-gray-200 px-3 text-sm">
                    <option value="">Assign to manager</option>
                    {managers.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                )}
              </>
            )}

            <div className="pt-2">
              <p className="text-[#98C1A9] text-sm font-medium">Set Password</p>
              <label className="flex items-center gap-2 mt-1 text-sm text-gray-700"><input type="radio" checked={form.setViaEmail} onChange={() => setForm((p)=>({...p,setViaEmail:true}))} className="accent-[#98C1A9]"/> Set via email</label>
              <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" checked={!form.setViaEmail} onChange={() => setForm((p)=>({...p,setViaEmail:false}))} className="accent-[#98C1A9]"/> Set now</label>
            </div>

            {!form.setViaEmail && (
              <div className="flex">
                <input name="password" value={form.password} onChange={update} placeholder="Password" type="password" className="flex-1 h-11 rounded-l border border-gray-200 px-3 text-sm" />
                <button type="button" onClick={()=>generate()} className="h-11 px-4 bg-[#98C1A9] text-white rounded-r text-sm">Generate</button>
              </div>
            )}

            {!form.setViaEmail && (
              <div className="text-xs text-gray-600 space-y-1 pt-1">
                <Rule ok={criteria.hasEight} text="At least 8 characters"/>
                <Rule ok={criteria.up} text="At least 1 uppercase letter"/>
                <Rule ok={criteria.low} text="At least 1 lowercase letter"/>
                <Rule ok={criteria.num} text="At least 1 number"/>
                <Rule ok={criteria.spec} text="At least 1 special character (@#$%&*)"/>
              </div>
            )}

            <button type="submit" disabled={isSaving} className="w-full h-11 rounded-full bg-[#98C1A9] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
              {isSaving && <Loader size={18} color="#ffffff" />}
              {mode === 'edit' ? 'SAVE' : 'CREATE'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }){
  return (
    <div className="flex items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ok? '#10B981':'#EF4444'} strokeWidth="2">
        {ok ? <path d="M5 13l4 4L19 7"/> : <path d="M6 18L18 6M6 6l12 12"/>}
      </svg>
      <span>{text}</span>
    </div>
  );
}
