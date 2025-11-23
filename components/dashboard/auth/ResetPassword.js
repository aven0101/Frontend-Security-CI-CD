"use client";

import AuthHeading from "@/components/common-ui/AuthCommonHeading";
import PasswordInput from "@/components/common-ui/PasswordInput";
import { API } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import Loader from "@/components/global/Loader";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordComp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Extract token from URL query parameter
        const token = searchParams.get("token");

        // Prepare form data for submission
        const submitData = {
            token: token,
            password: formData.newPassword,
            confirmPassword: formData.confirmPassword
        };

        // Basic validation
        if (!formData.newPassword || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            console.log("Validation Error: Empty fields");
            setLoading(false);
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            console.log("Validation Error: Passwords don't match");
            setLoading(false);
            return;
        }

        if (!token) {
            toast.error("No token found. Please use a valid reset link.");
            console.log("Error: No token in URL query parameter");
            setLoading(false);
            return;
        }

        try {

            const response = await API.resetPassword(submitData);

            if (response.success === false) {
                toast.error(response.message || "Failed to reset password!");
                setLoading(false);
            } else {
                toast.success(response.message.message || "Password reset successfully!");
                Cookies.remove("fp_email");
                setLoading(false);
                 router.push("/login");
            }

        } catch (error) {
            toast.error("Failed to reset password");
            console.log("API Error:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="min-h-screen flex flex-col items-center justify-center lg:py-0 py-10">
                <div className="lg:max-w-[1200px] w-full flex lg:flex-row flex-col justify-between mx-auto lg:gap-[68px] gap-[40px]">
                    {/* heading section */}
                    <AuthHeading
                        title={"Reset Password"}
                        subTitle={"Create a new password to regain access to your account."}
                    />

                    {/* form Container */}
                    <div className="w-full lg:max-w-[428px] h-[265px] border border-[#848884] rounded-[8px] flex flex-col gap-[18px]">
                        <span className="mt-[20px] text-center  lg:text-[32px] text-[26px] font-[400] text-[#98C1A9] leading-[100%]">
                            Reset Password
                        </span>

                        <form onSubmit={handleSubmit}>
                            {/* Password Input */}
                            <PasswordInput
                                placeholder="New Password"
                                classNameInput={`w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl text-[#848884] placeholder-[#848884]/50 border-l-0 border-r-0 border-[#848884]`}
                                value={formData.newPassword}
                                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                            />
                            {/* Password Input */}
                            <PasswordInput
                                placeholder="Re-Enter Password"
                                classNameInput={`w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl text-[#848884] placeholder-[#848884]/50 border-l-0 border-t-0 border-r-0 border-[#848884]`}
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            />

                            {/* Reset Button */}
                            <div className="flex flex-col lg:flex-row justify-center w-full px-4 lg:px-0 mt-[20px]">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center justify-center w-full lg:max-w-[279px] h-[50px] px-4 rounded-[32px]  text-[18px] text-[#FFFFFF]
          bg-[#98C1A9] cursor-pointer
          bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)]
          shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]
          backdrop-blur-[50px]
          hover:bg-[#39FF14] transition duration-300
          disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader /> : "Continue"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
