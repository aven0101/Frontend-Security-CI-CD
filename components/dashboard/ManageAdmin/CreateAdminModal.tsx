'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import Image from 'next/image';
import toast, { Toaster } from "react-hot-toast";
import Loader from '@/components/global/Loader';
import { SuperAdminAPI } from '@/utils/api';

type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    phone_number?: string;
};

interface CreateAdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onSuccess?: () => void;
}

const CreateAdminModal = ({ isOpen, onClose, user = null, onSuccess }: CreateAdminModalProps) => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        setViaEmail: false
    });

    const [passwordCriteria, setPasswordCriteria] = useState({
        hasEightChars: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* Reset form and password criteria when modal opens/closes */
    useEffect(() => {
        if (isOpen) {
            // Reset all states when modal opens
            setShowPassword(false);
            setPasswordCriteria({
                hasEightChars: false,
                hasUppercase: false,
                hasLowercase: false,
                hasNumber: false,
                hasSpecialChar: false
            });

            if (user && user.id != null) {
                const extractedPhone = (user as any)?.phone ?? (user as any)?.phone_number ?? (user as any)?.mobile ?? (user as any)?.contact ?? (user as any)?.contact_number ?? (user as any)?.contactNo ?? '';
                // Edit mode - populate with user data
                setFormData({
                    email: user.email || '',
                    firstName: user.first_name || '',
                    lastName: user.last_name || '',
                    phone: extractedPhone || '',
                    password: '',
                    setViaEmail: false
                });
            } else {
                // Create mode - reset form
                setFormData({
                    email: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    password: '',
                    setViaEmail: false
                });
            }
        } else {
            // Reset states when modal closes
            setShowPassword(false);
            setIsSubmitting(false);
            setPasswordCriteria({
                hasEightChars: false,
                hasUppercase: false,
                hasLowercase: false,
                hasNumber: false,
                hasSpecialChar: false
            });
        }
    }, [isOpen, user]);

    const checkPasswordCriteria = (password: string) => {
        setPasswordCriteria({
            hasEightChars: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[@#$%&*]/.test(password)
        });
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy: ', err);
            return false;
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'password') {
            checkPasswordCriteria(value);
        }
    };

    const handleSetPasswordOption = (isViaEmail: boolean) => {
        setFormData(prev => ({
            ...prev,
            setViaEmail: isViaEmail
        }));
    };

    // Generate a strong password that satisfies all criteria
    const generatePassword = (length = 12) => {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const digits = '0123456789';
        const special = '@#$%&*';
        const all = upper + lower + digits + special;

        // ensure each required type is present
        let pwd = '';
        pwd += upper[Math.floor(Math.random() * upper.length)];
        pwd += lower[Math.floor(Math.random() * lower.length)];
        pwd += digits[Math.floor(Math.random() * digits.length)];
        pwd += special[Math.floor(Math.random() * special.length)];

        for (let i = 4; i < length; i++) {
            pwd += all[Math.floor(Math.random() * all.length)];
        }

        // simple shuffle
        pwd = pwd.split('').sort(() => 0.5 - Math.random()).join('');
        return pwd;
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Normalize and validate phone if provided
        const rawPhone = (formData.phone || '').trim();
        let normalizedPhone = rawPhone;
        if (rawPhone) {
            // allow + and digits, remove spaces, dashes, parentheses
            normalizedPhone = rawPhone.replace(/[^+\d]/g, '');
            // Basic E.164-ish validation: optional + then 7-15 digits, first digit non-zero
            const e164 = /^\+?[1-9]\d{6,14}$/;
            if (!e164.test(normalizedPhone)) {
                setIsSubmitting(false);
                toast.error('Please enter a valid phone number');
                return;
            }
        }
        
        const payload: any = {
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            ...(normalizedPhone ? { phone: normalizedPhone, phone_number: normalizedPhone } : {}),
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            role: 'admin',
        };
        // For create only: handle password options
        if (!(user && user.id != null)) {
            if (!formData.setViaEmail) {
                payload.password = formData.password;
            } else {
                payload.set_password_via_email = true;
            }
        }

        // Decide create vs update
        const { success, message } = user && user.id != null
            ? await SuperAdminAPI.updateAdmin(user.id, payload)
            : await SuperAdminAPI.Createadmin(payload);
        setIsSubmitting(false);
        if (success) {
            toast.success(user && user.id != null ? "Admin updated successfully!" : "Admin created successfully!");
            // Call onSuccess callback to refresh user list
            if (onSuccess) {
                onSuccess();
            }
            setTimeout(() => {
                onClose();
            }, 1000);
        } else {
            toast.error(typeof message === 'string' ? message : 'Failed to create admin');
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <Toaster position="top-right" containerClassName="!z-[99999999]" />
            <div className="bg-[#3D3D3D69] w-full h-full fixed top-0 left-0 z-[999999]"></div>
            <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-[9999999]">
                <div className="bg-white rounded-[20px] w-full max-w-md p-8 relative">


                    {/* Modal Title */}
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className="text-2xl font-semibold text-[#98C1A9]">
                            {user.id != null ? "Update Admin" : 'Create New Admin'}
                        </h2>
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="cursor-pointer"
                        >
                            <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 0.5L0.5 13.5" stroke="#98C1A9" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M0.5 0.5L13.5 13.5" stroke="#98C1A9" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="space-y-4 text-center">
                            <div className='border-1 border-[#EBECF0]'>
                                
                                <input
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="outline-0 w-full px-4 py-3 border-b-1 border-[#F1F1F1] placeholder-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-0 bg-white"
                                />

                                <div className="grid grid-cols-2 gap-0">
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="outline-0 w-full px-4 py-3 border-r-1 border-b-1 border-[#F1F1F1] placeholder-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-0 bg-white"
                                    />
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="outline-0 w-full px-4 py-3 border-b-1 border-[#F1F1F1] placeholder-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-0 bg-white"
                                    />
                                </div>

                                {/* Phone Field */}
                                <input
                                    type="tel"
                                    autoComplete="off"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="outline-0 w-full px-4 py-3 border-b-1 border-[#F1F1F1] placeholder-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-0 bg-white"
                                />

                                {/* Set Password Section - only in create mode */}
                                {!(user && user.id != null) && (
                                <div className='p-4'>
                                    <h3 className="text-[#98C1A9] font-medium mb-2 text-left">Set Password</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <input
                                                    type="radio"
                                                    id="setViaEmail"
                                                    name="passwordOption"
                                                    checked={formData.setViaEmail}
                                                    onChange={() => handleSetPasswordOption(true)}
                                                    className="sr-only"
                                                />
                                                <div
                                                    onClick={() => handleSetPasswordOption(true)}
                                                    className={`w-5 h-5 rounded-lg border-2 cursor-pointer flex items-center justify-center transition-colors ${formData.setViaEmail
                                                        ? 'bg-[#98C1A9] border-[#98C1A9]'
                                                        : 'bg-white border-gray-300 hover:border-[#98C1A9]'
                                                        }`}
                                                >
                                                    {formData.setViaEmail && (
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <label htmlFor="setViaEmail" className="text-gray-600 cursor-pointer" onClick={() => handleSetPasswordOption(true)}>Set via email</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <input
                                                    type="radio"
                                                    id="setNow"
                                                    name="passwordOption"
                                                    checked={!formData.setViaEmail}
                                                    onChange={() => handleSetPasswordOption(false)}
                                                    className="sr-only"
                                                />
                                                <div
                                                    onClick={() => handleSetPasswordOption(false)}
                                                    className={`w-5 h-5 rounded-lg border-2 cursor-pointer flex items-center justify-center transition-colors ${!formData.setViaEmail
                                                        ? 'bg-[#98C1A9] border-[#98C1A9]'
                                                        : 'bg-white border-gray-300 hover:border-[#98C1A9]'
                                                        }`}
                                                >
                                                    {!formData.setViaEmail && (
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <label htmlFor="setNow" className="text-gray-600 cursor-pointer" onClick={() => handleSetPasswordOption(false)}>Set now</label>
                                        </div>
                                    </div>
                                </div>
                                )}

                                {/* Password Input and Criteria - only in create mode */}
                                {!formData.setViaEmail && !(user && user.id != null) && (
                                    <div className='p-4 pt-0'>
                                        <div className="flex">
                                            <div className="relative flex-1">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    autoComplete="new-password"
                                                    name="password"
                                                    placeholder="Enter password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="outline-0 w-full px-4 py-3 pr-12 border-1 border-[#F1F1F1] placeholder-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-0 bg-white"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? (
                                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    const pwd = generatePassword(12);
                                                    setFormData(prev => ({ ...prev, password: pwd }));
                                                    checkPasswordCriteria(pwd);

                                                    const copied = await copyToClipboard(pwd);
                                                    if (copied) {
                                                        toast.success("Password generated and copied");
                                                    } else {
                                                        toast.success("Logged in successfully!");
                                                    }
                                                }}
                                                className="px-4 py-2 bg-white text-[#98C1A9] border-1 border-l-0 border-[#F1F1F1] cursor-pointer hover:bg-gray-50 transition-colors"
                                            >
                                                Generate
                                            </button>
                                        </div>

                                        {/* Password Criteria */}
                                        <div className="mt-2 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Image src={passwordCriteria.hasEightChars ? '/dashboard/right.png' : '/dashboard/wrong.png'} alt={passwordCriteria.hasEightChars ? 'right' : 'wrong'} width={16} height={16} />
                                                <span className="text-sm text-gray-600">At least 8 characters</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Image src={passwordCriteria.hasUppercase ? '/dashboard/right.png' : '/dashboard/wrong.png'} alt={passwordCriteria.hasUppercase ? 'right' : 'wrong'} width={16} height={16} />
                                                <span className="text-sm text-gray-600">At least 1 uppercase letter</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Image src={passwordCriteria.hasLowercase ? '/dashboard/right.png' : '/dashboard/wrong.png'} alt={passwordCriteria.hasLowercase ? 'right' : 'wrong'} width={16} height={16} />
                                                <span className="text-sm text-gray-600">At least 1 lowercase letter</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Image src={passwordCriteria.hasNumber ? '/dashboard/right.png' : '/dashboard/wrong.png'} alt={passwordCriteria.hasNumber ? 'right' : 'wrong'} width={16} height={16} />
                                                <span className="text-sm text-gray-600">At least 1 number</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Image src={passwordCriteria.hasSpecialChar ? '/dashboard/right.png' : '/dashboard/wrong.png'} alt={passwordCriteria.hasSpecialChar ? 'right' : 'wrong'} width={16} height={16} />
                                                <span className="text-sm text-gray-600">At least 1 special character (@#$%&*)</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="py-3 bg-[#98C1A9] text-white min-h-[48px] flex items-center justify-center rounded-full hover:bg-[#98C1A9]/90 transition-colors mt-2 cursor-pointer text-center m-auto min-w-[234px]"
                            >
                                {isSubmitting ? <Loader /> : user.id != null ? 'Update Admin' : 'Create Admin'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default CreateAdminModal;