"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API } from "@/utils/api";

import AuthHeading from "@/components/common-ui/AuthCommonHeading";
// import CountryCodeInput from "@/components/common-ui/CountryCodeInput";
import PhoneInput from "@/components/about/PhoneInput";
import PasswordInput from "@/components/common-ui/PasswordInput";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function BusinessRegister() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        businessName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        // phoneCode: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        else if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters long";
        if (formData.confirmPassword !== formData.password)
            newErrors.confirmPassword = "Passwords do not match";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const firstError = Object.values(validationErrors)[0];
            toast.error(firstError);
            return;
        }

        setLoading(true);
        const payload = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            // phone: `${formData.phoneCode}${formData.phone}`,
            phone: formData.phone, // already includes dial code from PhoneInput
            businessName: formData.businessName,
            businessDescription: "",
        };

        const res = await API.register(payload);

        if (res.success) {
            toast.success("Account created successfully!");
            setFormData({
                businessName: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                // phoneCode: "",
                password: "",
                confirmPassword: "",
            });

            router.push('/login');
        } else {
            toast.error(res.message || "Registration failed");

            // If there are field-specific errors, map them to the errors state
            if (res.fields && Array.isArray(res.fields)) {
                const fieldErrors = {};
                res.fields.forEach(fieldError => {
                    // Map API field names to form field names if they differ
                    if (fieldError.field === 'name') fieldErrors.firstName = fieldError.error;
                    else if (fieldError.field === 'phone') fieldErrors.phone = fieldError.error;
                    else fieldErrors[fieldError.name] = fieldError.error;
                });
                setErrors(fieldErrors);
            }
        }

        setLoading(false);
    };

    return (
        <>
            <Toaster position="top-right"
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    removeDelay: 1000,
                    // Default options for specific types
                    success: {
                        duration: 5000,
                    },
                }}
            />
            <div className="min-h-screen flex flex-col items-center justify-center lg:py-0 py-10">
                <div className="lg:max-w-[1200px] w-full flex lg:flex-row flex-col justify-between mx-auto lg:gap-[68px] gap-[40px]">
                    {/* Heading */}
                    <AuthHeading
                        title={"Welcome"}
                        subTitle={"Start your journey now with our management system!"}
                    />

                    {/* Form */}
                    <div className="w-full lg:max-w-[428px] rounded-[8px] flex flex-col gap-[18px]">
                        <div className="w-full border border-[#848884] rounded-[8px] flex flex-col gap-[18px]">
                            <span className="mt-[20px] text-center  lg:text-[32px] text-[26px] font-[400] text-[#98C1A9] leading-[100%]">
                                Business Account
                            </span>

                            <form onSubmit={handleSubmit} className="text-black">
                                {/* Business Name */}
                                <input
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    placeholder="Business Name (Optional)"
                                    className="w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl placeholder-[#848884]/50 text-[#848884] border-l-0 border-r-0 border-b-0 border-[#848884]"
                                />

                                {/* First & Last Name */}
                                <div className="flex flex-col md:flex-row gap-0">
                                    <div className="w-full">
                                        <input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First Name"
                                            required
                                            className={`${errors.firstName ? 'bg-red-100' : ''} w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl placeholder-[#848884]/50 text-[#848884] border-l-0 border-b-0 border-[#848884]`}
                                        />
                                        {/* {errors.firstName && (
                                            <p className="text-red-500 text-sm px-3 mt-1">
                                                {errors.firstName}
                                            </p>
                                        )} */}
                                    </div>
                                    <input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name (Optional)"
                                        className="w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl placeholder-[#848884]/50 text-[#848884] border-l-0 border-b-0 border-r-0 border-[#848884]"
                                    />
                                </div>

                                {/* Email */}
                                <div className="w-full">
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                        className={`${errors.email ? 'bg-red-100' : ''} w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl text-[#848884] placeholder-[#848884]/50 border-l-0 border-r-0 border-b-0 border-[#848884] autofill:!bg-[white] autofill:!text-[#848884]`}
                                    />
                                    {/* {errors.email && (
                                        <p className="text-red-500 text-sm px-3 mt-1">
                                            {errors.email}
                                        </p>
                                    )} */}
                                </div>

                                {/* Phone */}
                                <div className={`flex flex-col gap-2 `}>
                                    <PhoneInput
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        label="Phone number"
                                    />
                                    {/* {errors.phone && (
                                        <p className="text-red-500 text-sm px-3">{errors.phone}</p>
                                    )} */}
                                </div>

                                {/* Password */}
                                <div>
                                    <PasswordInput
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        classNameInput={` ${errors.password ? 'bg-red-100' : ''} w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl text-[#848884] placeholder-[#848884]/50 border-l-0 border-r-0 border-b-0 border-[#848884]`}
                                    />
                                    {/* {errors.password && (
                                        <p className="text-red-500 text-sm px-3 mt-1">
                                            {errors.password}
                                        </p>
                                    )} */}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <PasswordInput
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({ ...formData, confirmPassword: e.target.value })
                                        }
                                        classNameInput={` ${errors.confirmPassword ? 'bg-red-100' : ''} w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl text-[#848884] placeholder-[#848884]/50 border-l-0 border-r-0 border-[#848884]`}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex flex-col lg:flex-row justify-center w-full py-4 px-4 lg:px-0">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full lg:max-w-[279px] h-[50px] px-4 rounded-[32px]  text-[18px] text-white
                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#98C1A9] hover:bg-[#39FF14] cursor-pointer transition duration-300"}
                    `}
                                    >
                                        {loading ? "Creating..." : "Create Account"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Link */}
                        <div className="w-full lg:max-w-[1200px] flex flex-col gap-2 lg:gap-0">
                            <span className="text-right  text-[16px] font-[400] text-[#848884] leading-[111%]">
                                Already have an account?{" "}
                                <Link href="/login" className="text-[#39FF14] underline ml-1">
                                    Login
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
