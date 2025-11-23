'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import AuthHeading from "@/components/common-ui/AuthCommonHeading";
import PasswordInput from "@/components/common-ui/PasswordInput";
import Link from "next/link";
import { API } from "@/utils/api";
import Cookies from "js-cookie";
import Loader from "@/components/global/Loader";

export default function LoginComponent() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const [roleSelection, setRoleSelection] = useState(false);
    const [availableRoles, setAvailableRoles] = useState([]);

    // Check auth token and clear availableRoles if not present
    useEffect(() => {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
            setAvailableRoles([]);
            setRoleSelection(false);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        const response = await API.login(formData);
        
        if (response.success === false) {
            toast.error(response.message || "Login failed");
        } else {
            if (response.message.user) {
                if (response.message.require2FA) {
                    Cookies.set("authToken", response.message.tempToken, { expires: 24 / 24 });
                    Cookies.set("required2FA", response.message.tempToken, { expires: 24 / 24 });
                    Cookies.set("availableMethods", JSON.stringify(response.message.availableMethods), { expires: 1 });
                    console.log('require2FA');
                    router.push("/security");
                } else {
                    if (response.message.user.account_name == 'business') {
                        if (response.message.user.is_active == 1) {
                            if (response.message.availableRoles && response.message.availableRoles.length > 0 && response.message.requireRoleSelection === true) {
                                setAvailableRoles(response.message.availableRoles);
                                if (response.message.tempToken) {
                                    setRoleSelection(true);
                                    Cookies.set("authToken", response.message.tempToken, { expires: 24 / 24 });
                                    Cookies.set("authUser", JSON.stringify(response.message.user), { expires: 24 / 24 });
                                    console.log('role selection');
                                }
                            } else {
                                if (response.message.user && response.message.user.token) {
                                    Cookies.set("authToken", response.message.user.token, { expires: 24 / 24 });
                                    Cookies.set("authRole", response.message.user.role, { expires: 24 / 24 });
                                    Cookies.set("authUser", JSON.stringify(response.message.user), { expires: 24 / 24 });
                                    router.push("/business/dashboard");
                                    toast.success("Logged in successfully!");
                                    console.log('direct login');
                                }
                            }

                        } else {
                            toast.error(response.message.message || "User Not Active");
                        }
                    }
                }
            } else {
                toast.error(response.message || "User Not Found");
            }
        }

        setLoading(false);
    };

    const handleRoleSelect = async (role) => {

        const response = await API.selectRole({ selectedRole: role });

        if (response.success) {
            if (response.message.user && response.message.user.token) {
                Cookies.set("authToken", response.message.user.token, { expires: 24 / 24 });
                Cookies.set("authRole", response.message.user.activeRole, { expires: 24 / 24 });
                if (response.message.user.activeRole === "super_admin") {
                    Cookies.set("authUser", JSON.stringify(response.message.user), { expires: 24 / 24 });
                    toast.success("Logged in successfully!");
                    console.log('super admin');
                    router.push("/business/manage-admins");
                    
                } else if (response.message.user.activeRole === "admin" || response.message.user.activeRole === "manager" || response.message.user.activeRole === "standard_user") {
                    console.log(response.message.user);
                    Cookies.set("authUser", JSON.stringify(response.message.user), { expires: 24 / 24 });
                    toast.success("Logged in successfully!");
                    console.log('admin');
                    router.push("/business/dashboard");
                }
            }
        }
    }
    return (
        <>
            <Toaster position="top-right" />
            <div className="min-h-screen flex flex-col items-center justify-center lg:py-0 py-10">
                <div className="lg:max-w-[1200px] w-full flex lg:flex-row flex-col justify-between mx-auto lg:gap-[68px] gap-[40px]">
                    {/* heading section */}
                    <AuthHeading
                        title="Welcome Back"
                        subTitle="Log in to access your dashboard and continue where you left off."
                    />
                    {/* form Container */}
                    <div className="w-full lg:max-w-[428px] flex flex-col gap-[18px]">
                        <div className="w-full border border-[#848884] rounded-[8px] flex flex-col gap-[18px]">
                            <span className="mt-[20px] text-center font-belanosima lg:text-[32px] text-[26px] font-[400] text-[#98C1A9] leading-[100%]">
                                Login
                            </span>

                            <form
                                className="border border-r-0 border-t-0 border-l-0 border-b-0 mb-[18px] border-[#848884] rounded-[8px]"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Username or Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl text-[#848884] placeholder-[#848884]/50 border-l-0 border-r-0 border-[#848884]`}
                                />

                                <PasswordInput
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    classNameInput={`w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl text-[#848884] placeholder-[#848884]/50 border-l-0 border-t-0 border-r-0 border-[#848884]`}
                                />

                                <div className="flex flex-col lg:flex-row justify-center w-full px-4 lg:px-0 mt-[20px]">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full lg:max-w-[279px] h-[50px] px-4 rounded-[32px] flex justify-center items-center text-[18px] text-[#FFFFFF] bg-[#98C1A9] cursor-pointer bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)] shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A] backdrop-blur-[50px] hover:bg-[#39FF14] transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {loading ? <Loader /> : "Login"}
                                    </button>
                                </div>

                                {!roleSelection && <div className="w-full lg:max-w-[370px] mx-auto flex flex-col gap-2 lg:gap-0 mt-[18px] px-2 lg:px-0">
                                    <span className="text-right font-belanosima text-[20px] font-[400] text-[#39FF14] leading-[111%]">
                                        <Link href="/forgot-password">Forgot Password?</Link>
                                    </span>
                                </div>}
                            </form>
                        </div>

                        {roleSelection &&
                            <div className="flex justify-between items-center">
                                <p className="text-lg text-[#848884] font-semibold">Proceed as</p>
                                <div className="flex gap-2">
                                    {availableRoles.map((role) => (
                                        <button
                                            onClick={() => handleRoleSelect(role)}
                                            key={role} className="border rounded-full cursor-pointer px-4 py-2 min-w-[125px] capitalize text-[#FFFFFF] bg-[#98C1A9] hover:bg-[#39FF14] transition">
                                            {role.replace(/_/g, " ")}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        }

                        <div className="w-full lg:max-w-[1200px] flex flex-col gap-2 lg:gap-0 mt-[8px]">
                            <span className="text-right text-[16px] font-[400] text-[#848884] leading-[111%]">
                                Don&apos;t have an account?{" "}
                                <Link href="/choose-account" className="text-[#39FF14] underline ml-1">
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
