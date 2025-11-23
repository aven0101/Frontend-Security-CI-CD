"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthHeading from "@/components/common-ui/AuthCommonHeading";
import CountryCodeInput from "@/components/common-ui/CountryCodeInput";
import { DashboardAPI, API } from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import Loader from "@/components/global/Loader";

export default function Security2FAComp() {

    const router = useRouter();
    const [open, setOpen] = useState(null);
    const [phone, setPhone] = useState("");
    const [availableRoles, setAvailableRoles] = useState([]);
    const [roleSelection, setRoleSelection] = useState(false);

    // Authenticator OTP states
    const [authenticatorOtpValues, setAuthenticatorOtpValues] = useState(["", "", "", "", "", ""]);
    const [isVerifyingAuthenticator, setIsVerifyingAuthenticator] = useState(false);
    const authenticatorOtpRefs = useRef([]);

    // One-time code OTP states
    const [oneTimeOtpValues, setOneTimeOtpValues] = useState(["", "", "", "", "", ""]);
    const [isVerifyingOneTime, setIsVerifyingOneTime] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const oneTimeOtpRefs = useRef([]);

    // Success flags to hide Verify buttons once verified
    const [authVerifiedSuccess, setAuthVerifiedSuccess] = useState(false);
    // Removed Verify button for one-time code; success flag not needed
    const [secQVerifiedSuccess, setSecQVerifiedSuccess] = useState(false);

    // Security questions states
    const [isFetchingSecQ, setIsFetchingSecQ] = useState(false);
    const [isVerifyingSecQ, setIsVerifyingSecQ] = useState(false);
    const [securityQuestionsList, setSecurityQuestionsList] = useState([]); // [{id, question}]
    const [selectedQuestionId, setSelectedQuestionId] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [questionQueue, setQuestionQueue] = useState([]); // shuffled array of ids
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const getAvailableMethods = () => {
        try {
            return JSON.parse(Cookies.get("availableMethods") || "{}");
        } catch (error) {
            console.error("Error parsing availableMethods cookie:", error);
            return {};
        }
    };
    
    const availableMethods = getAvailableMethods();
    const securityQuestionsEnabled = (
        availableMethods?.securityQuestion == 1 ||
        availableMethods?.security_question == 1 ||
        availableMethods?.securityQuestions == 1
    );

    console.log({ availableMethods });

    const [tempToken, setTempToken] = useState(Cookies.get("authToken"));

    const toggleDropdown = (type) => {
        setOpen(open === type ? null : type);
    };

    // Fetch security questions when enabled and not yet loaded
    useEffect(() => {
        if (securityQuestionsEnabled && securityQuestionsList.length === 0 && !isFetchingSecQ) {
            fetchSecurityQuestions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [securityQuestionsEnabled]);

    const shuffle = (arr) => {
        // Fisher–Yates shuffle
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const fetchSecurityQuestions = async () => {
        try {
            setIsFetchingSecQ(true);
            const res = await DashboardAPI.getSecurityQuestions();
            if (res.success) {
                // Accept either {questions: [...]} or an array
                let list = [];
                const msg = res.message;
                if (Array.isArray(msg)) list = msg;
                else if (Array.isArray(msg?.questions)) list = msg.questions;
                // Normalize to { id, question }
                const normalized = list.map((q, idx) => ({
                    id: q.id ?? q.uuid ?? `q_${idx + 1}`,
                    question: q.question ?? q.text ?? String(q),
                }));
                setSecurityQuestionsList(normalized);
                // Reset any previous selection/answer
                if (normalized.length > 0) {
                    const order = shuffle(normalized.map(q => q.id));
                    setQuestionQueue(order);
                    setCurrentQuestionIndex(0);
                    setSelectedQuestionId(order[0]);
                    setSelectedAnswer("");
                } else {
                    setSelectedQuestionId("");
                    setSelectedAnswer("");
                    setQuestionQueue([]);
                    setCurrentQuestionIndex(0);
                }
            } else {
                toast.error(typeof res.message === 'string' ? res.message : 'Failed to load security questions');
            }
        } catch (e) {
            console.error('Fetch security questions error:', e);
            toast.error('An error occurred while loading security questions.');
        } finally {
            setIsFetchingSecQ(false);
        }
    };

    const verify2FA = async (otpCode, method) => {
        // Set loading state based on method
        if (method === "authenticator") {
            setIsVerifyingAuthenticator(true);
        } else if (method === "one_time_code") {
            setIsVerifyingOneTime(true);
        }

        try {
            const payload = {
                "tempToken": tempToken,
                "method": method,
                "code": otpCode,
            };

            const response = await DashboardAPI.verifyAuth2FA(payload);

            if (response.success) {
                const methodName = method === "authenticator" ? "Authenticator" : "One-time Code";
                toast.success(`${methodName} 2FA verification successful!`);

                // hide Verify button after success for authenticator
                if (method === "authenticator") setAuthVerifiedSuccess(true);

                if (response.message.availableRoles && response.message.availableRoles.length > 0 && response.message.requireRoleSelection === true) {
                    setAvailableRoles(response.message.availableRoles);
                    if (response.message.tempToken) {
                        setRoleSelection(true);
                        Cookies.set("authToken", response.message.tempToken, { expires: 24 / 24 });
                    }
                } else {
                    if (response.message.user && response.message.user.token) {
                        Cookies.set("authToken", response.message.user.token, { expires: 24 / 24 });
                        Cookies.set("authRole", response.message.user.role, { expires: 24 / 24 });
                        // Store user as JSON string so downstream readers can parse safely
                        Cookies.set("authUser", JSON.stringify(response.message.user), { expires: 24 / 24 });
                        router.push("/business/dashboard");
                        toast.success("Logged in successfully!");
                    }
                }
                // You can add navigation logic here, e.g., redirect to dashboard
                // router.push('/dashboard');
            } else {
                toast.error(response.message || "Invalid verification code. Please try again.");
                // Clear the OTP inputs on error based on method
                if (method === "authenticator") {
                    setAuthenticatorOtpValues(["", "", "", "", "", ""]);
                    authenticatorOtpRefs.current[0]?.focus();
                } else if (method === "one_time_code") {
                    setOneTimeOtpValues(["", "", "", "", "", ""]);
                    oneTimeOtpRefs.current[0]?.focus();
                }
            }
            
        } catch (error) {
            console.error("Verification error:", error);
            toast.error("An error occurred during verification. Please try again.");
            // Clear the OTP inputs on error based on method
            if (method === "authenticator") {
                setAuthenticatorOtpValues(["", "", "", "", "", ""]);
                authenticatorOtpRefs.current[0]?.focus();
            } else if (method === "one_time_code") {
                setOneTimeOtpValues(["", "", "", "", "", ""]);
                oneTimeOtpRefs.current[0]?.focus();
            }
        } finally {
            // Reset loading state based on method
            if (method === "authenticator") {
                setIsVerifyingAuthenticator(false);
            } else if (method === "one_time_code") {
                setIsVerifyingOneTime(false);
            }
        }
    };

    const verifySecurityQuestions = async () => {
        // Must select a question and provide the answer
        if (!selectedQuestionId) {
            toast.error('Please select a security question.');
            return;
        }
        if (!String(selectedAnswer).trim()) {
            toast.error('Please enter your answer.');
            return;
        }

        setIsVerifyingSecQ(true);
        try {
            const payload = {
                tempToken: tempToken,
                method: "security_question",
                // API expects: answers: [{ id, answer }]
                answers: [
                    {
                        id: isNaN(Number(selectedQuestionId)) ? selectedQuestionId : Number(selectedQuestionId),
                        answer: selectedAnswer,
                    },
                ],
            };
            const response = await DashboardAPI.verifyAuth2FA(payload);

            if (response.success) {
                toast.success("Security Questions 2FA verification successful!");
                setSecQVerifiedSuccess(true);

                if (response.message.availableRoles && response.message.availableRoles.length > 0 && response.message.requireRoleSelection === true) {
                    setAvailableRoles(response.message.availableRoles);
                    if (response.message.tempToken) {
                        setRoleSelection(true);
                        Cookies.set("authToken", response.message.tempToken, { expires: 24 / 24 });
                    }
                } else {
                    if (response.message.user && response.message.user.token) {
                        Cookies.set("authToken", response.message.user.token, { expires: 24 / 24 });
                        Cookies.set("authRole", response.message.user.role, { expires: 24 / 24 });
                        Cookies.set("authUser", response.message.user, { expires: 24 / 24 });
                        router.push("/business/dashboard");
                        toast.success("Logged in successfully!");
                    }
                }
            } else {
                toast.error(response.message || "Verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Security questions verification error:", error);
            toast.error("An error occurred during verification. Please try again.");
        } finally {
            setIsVerifyingSecQ(false);
        }
    };

    const tryAnotherQuestion = () => {
        if (!securityQuestionsList.length || questionQueue.length <= 1) {
            toast.error('Only one security question available.');
            return;
        }
        const nextIdx = (currentQuestionIndex + 1) % questionQueue.length;
        setCurrentQuestionIndex(nextIdx);
        setSelectedQuestionId(questionQueue[nextIdx]);
        setSelectedAnswer("");
    };

    const handleAuthenticatorOtpChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtpValues = [...authenticatorOtpValues];
        newOtpValues[index] = value;
        setAuthenticatorOtpValues(newOtpValues);

        // Auto-focus to next input if value is entered
        if (value && index < 5) {
            authenticatorOtpRefs.current[index + 1]?.focus();
        }

        // Check if OTP is complete (all 6 digits filled)
        if (value && index === 5) {
            // OTP is complete, automatically verify
            const completeOtp = newOtpValues.join('');
            if (completeOtp.length === 6) {
                verify2FA(completeOtp, "authenticator");
            }
        }
    };

    const handleAuthenticatorOtpKeyDown = (index, e) => {
        // Handle backspace navigation
        if (e.key === 'Backspace') {
            if (!authenticatorOtpValues[index] && index > 0) {
                // If current input is empty and backspace is pressed, move to previous input
                authenticatorOtpRefs.current[index - 1]?.focus();
            }
        }
        // Handle arrow key navigation
        else if (e.key === 'ArrowLeft' && index > 0) {
            authenticatorOtpRefs.current[index - 1]?.focus();
        }
        else if (e.key === 'ArrowRight' && index < 5) {
            authenticatorOtpRefs.current[index + 1]?.focus();
        }
    };

    const handleAuthenticatorOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const digits = pastedData.replace(/\D/g, '').slice(0, 6);

        const newOtpValues = ["", "", "", "", "", ""];
        for (let i = 0; i < digits.length; i++) {
            newOtpValues[i] = digits[i];
        }
        setAuthenticatorOtpValues(newOtpValues);

        // If complete OTP is pasted, automatically verify
        if (digits.length === 6) {
            verify2FA(digits, "authenticator");
        } else {
            // Focus on the next empty input or the last input
            const nextIndex = Math.min(digits.length, 5);
            authenticatorOtpRefs.current[nextIndex]?.focus();
        }
    };

    // One-time code functions
    const sendOneTimeCode = async () => {
        setIsSendingOtp(true);
        try {
            const payload = {
                tempToken: tempToken,
            };

            const response = await DashboardAPI.sendOneTimeOTP(payload);

            if (response.success) {
                toast.success("OTP sent successfully!");
            } else {
                toast.error(response.message?.message || "Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error("Send OTP error:", error);
            toast.error("An error occurred while sending OTP. Please try again.");
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleOneTimeOtpChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtpValues = [...oneTimeOtpValues];
        newOtpValues[index] = value;
        setOneTimeOtpValues(newOtpValues);

        // Auto-focus to next input if value is entered
        if (value && index < 5) {
            oneTimeOtpRefs.current[index + 1]?.focus();
        }

        // Check if OTP is complete (all 6 digits filled)
        if (value && index === 5) {
            // OTP is complete, automatically verify
            const completeOtp = newOtpValues.join('');
            if (completeOtp.length === 6) {
                verify2FA(completeOtp, "one_time_code");
            }
        }
    };

    const handleOneTimeOtpKeyDown = (index, e) => {
        // Handle backspace navigation
        if (e.key === 'Backspace') {
            if (!oneTimeOtpValues[index] && index > 0) {
                // If current input is empty and backspace is pressed, move to previous input
                oneTimeOtpRefs.current[index - 1]?.focus();
            }
        }
        // Handle arrow key navigation
        else if (e.key === 'ArrowLeft' && index > 0) {
            oneTimeOtpRefs.current[index - 1]?.focus();
        }
        else if (e.key === 'ArrowRight' && index < 5) {
            oneTimeOtpRefs.current[index + 1]?.focus();
        }
    };

    const handleOneTimeOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const digits = pastedData.replace(/\D/g, '').slice(0, 6);

        const newOtpValues = ["", "", "", "", "", ""];
        for (let i = 0; i < digits.length; i++) {
            newOtpValues[i] = digits[i];
        }
        setOneTimeOtpValues(newOtpValues);

        // If complete OTP is pasted, automatically verify
        if (digits.length === 6) {
            verify2FA(digits, "one_time_code");
        } else {
            // Focus on the next empty input or the last input
            const nextIndex = Math.min(digits.length, 5);
            oneTimeOtpRefs.current[nextIndex]?.focus();
        }
    };

    const handleRoleSelect = async (role) => {

        const response = await API.selectRole({ selectedRole: role });

        if (response.success) {
            if (response.message.user && response.message.user.token) {
                Cookies.set("authToken", response.message.user.token, { expires: 24 / 24 });
                Cookies.set("authRole", response.message.user.activeRole, { expires: 24 / 24 });
                // Store user as JSON string consistently
                const userJson = JSON.stringify(response.message.user);
                if (response.message.user.activeRole === "super_admin") {
                    Cookies.set("authUser", userJson, { expires: 24 / 24 });
                    toast.success("Logged in successfully!");
                    router.push("/business/manage-admins");
                } else if (response.message.user.activeRole === "admin" || response.message.user.activeRole === "manager" || response.message.user.activeRole === "standard_user") {
                    Cookies.set("authUser", userJson, { expires: 24 / 24 });
                    toast.success("Logged in successfully!");
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
                        title={"2FA Verification"}
                        subTitle={"Verify before updating your password."}
                    />

                    {/* form Container */}
                    <div className="w-full lg:max-w-[428px] flex flex-col gap-[18px]">
                        <div className="w-full border border-[#848884] rounded-[8px] overflow-hidden flex flex-col gap-[18px]">
                            <span className="mt-[20px] text-center font-belanosima lg:text-[32px] text-[26px] font-[400] text-[#98C1A9] leading-[100%]">
                                Two-Factor Authentication{" "}
                            </span>
                            <form>
                                <div className="flex flex-col">
                                    {/* --- Option 1: Auth Code --- */}
                                    { availableMethods.authenticator == 1 && <div className="relative w-full border-r-0 border-l-0 border-b-0 border border-[#848884] backdrop-blur-[50px] transition-all duration-500 overflow-hidden">
                                        {/* Clickable Header */}
                                        <div onClick={() => toggleDropdown("auth")} className="cursor-pointer flex justify-between items-center w-full focus:outline-none focus:ring-0 opacity-50 h-[50px] lg:px-6 px-2 font-[400] font-belanosima text text-[14.5px] border-b-0 border-l-0 placeholder-[#848884] text-[#848884] border-[#848884] backdrop-blur-[50px]">
                                            Authenticator Code
                                            <ChevronDown className={`transition-transform text-[#848884] ${open === "auth" ? "rotate-180" : "rotate-0"}`} size={22} />
                                        </div>

                                        {/* Expandable Content */}
                                        <div className={`transition-all duration-500 overflow-hidden ${open === "auth" ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"}`} >
                                            <div className="flex flex-col justify-center items-center gap-3 px-[20px] pb-4">
                                                <div className="flex gap-2 justify-center">
                                                    {Array.from({ length: 6 }).map((_, i) => (
                                                        <input
                                                            key={i}
                                                            ref={(el) => authenticatorOtpRefs.current[i] = el}
                                                            type="text"
                                                            maxLength={1}
                                                            value={authenticatorOtpValues[i]}
                                                            onChange={(e) => handleAuthenticatorOtpChange(i, e.target.value)}
                                                            onKeyDown={(e) => handleAuthenticatorOtpKeyDown(i, e)}
                                                            onPaste={handleAuthenticatorOtpPaste}
                                                            disabled={isVerifyingAuthenticator}
                                                            className={`lg:w-[52px] lg:h-[52px] w-[42px] h-[42px] bg-[#EEEEEE] border border-[#848884] rounded-[8px] text-center text-[24px] font-belanosima text-[#002715] focus:outline-none focus:border-[#43E1A9] focus:ring-0 transition-all ${isVerifyingAuthenticator ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        />
                                                    ))}
                                                </div>
                                                {/* Centered Verify button; hidden after success */}
                                                {!authVerifiedSuccess && (
                                                    <div className="pt-2 w-full flex justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => verify2FA(authenticatorOtpValues.join(''), "authenticator")}
                                                            disabled={isVerifyingAuthenticator || authenticatorOtpValues.join('').length !== 6}
                                                            className={`lg:max-w-[279px] w-full h-[50px] px-4 rounded-[32px] font-belanosima text-[18px] text-[#FFFFFF] transition duration-300 ${
                                                                (isVerifyingAuthenticator || authenticatorOtpValues.join('').length !== 6)
                                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                                    : 'bg-[#98C1A9] hover:bg-[#39FF14] cursor-pointer'
                                                            }`}
                                                        >
                                                            {isVerifyingAuthenticator ? (
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <Loader />
                                                                </div>
                                                            ) : (
                                                                'Verify'
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>}

                                    {/* --- Option 2: One Time Code --- */}
                                    { availableMethods.oneTimeCode == 1 && <div className="relative w-full border border-r-0 border-l-0 border-b-0 border-[#848884] backdrop-blur-[50px] transition-all duration-500 overflow-hidden">
                                        {/* Clickable Header */}
                                        <div onClick={() => toggleDropdown("oneTime")} className="cursor-pointer flex justify-between items-center w-full focus:outline-none focus:ring-0 opacity-50 h-[50px] lg:px-6 px-2 font-[400] font-belanosima text text-[14.5px] border-b-0 border-l-0 placeholder-[#848884] text-[#848884] border-[#848884] backdrop-blur-[50px]">
                                            One Time Code
                                            <ChevronDown className={`transition-transform text-[#848884] ${open === "oneTime" ? "rotate-180" : "rotate-0"}`} size={22} />
                                        </div>

                                        {/* Expandable Content */}
                                        <div className={`transition-all duration-500 overflow-hidden ${open === "oneTime" ? "max-h-[400px] mt-4 opacity-100" : "max-h-0 opacity-0"}`} >
                                            <div className="flex flex-col justify-center items-center gap-3 px-[20px] pb-4">
                                                {/* OTP Input Fields */}
                                                <div className="flex gap-2 justify-center">
                                                    {Array.from({ length: 6 }).map((_, i) => (
                                                        <input
                                                            key={i}
                                                            ref={(el) => oneTimeOtpRefs.current[i] = el}
                                                            type="text"
                                                            maxLength={1}
                                                            value={oneTimeOtpValues[i]}
                                                            onChange={(e) => handleOneTimeOtpChange(i, e.target.value)}
                                                            onKeyDown={(e) => handleOneTimeOtpKeyDown(i, e)}
                                                            onPaste={handleOneTimeOtpPaste}
                                                            disabled={isVerifyingOneTime}
                                                            className={`lg:w-[52px] lg:h-[52px] w-[42px] h-[42px] bg-[#EEEEEE] border border-[#848884] rounded-[8px] text-center text-[24px] font-belanosima text-[#002715] focus:outline-none focus:border-[#43E1A9] focus:ring-0 transition-all ${isVerifyingOneTime ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Send OTP Button placed after input code section */}
                                                <div className="pt-2 w-full flex justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={sendOneTimeCode}
                                                        disabled={isSendingOtp}
                                                        className={`lg:max-w-[279px] w-full h-[50px] px-4 rounded-[32px] font-belanosima text-[18px] text-[#FFFFFF] transition duration-300 ${isSendingOtp
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-[#98C1A9] hover:bg-[#39FF14] cursor-pointer'
                                                            }`}
                                                    >
                                                        {isSendingOtp ? (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Loader />
                                                            </div>
                                                        ) : (
                                                            'Send OTP'
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Verify button removed for One-time Code; verification happens automatically when all 6 digits are entered */}
                                            </div>
                                        </div>
                                    </div>}

                                    {/* --- Option 3: Security Questions --- */}
                                    { securityQuestionsEnabled && <div className="relative w-full border border-r-0 border-l-0 border-b-0 border-[#848884] backdrop-blur-[50px] transition-all duration-500 overflow-hidden">
                                        {/* Clickable Header */}
                                        <div onClick={() => toggleDropdown("securityQ")} className="cursor-pointer flex justify-between items-center w-full focus:outline-none focus:ring-0 opacity-50 h-[50px] lg:px-6 px-2 font-[400] font-belanosima text text-[14.5px] border-b-0 border-l-0 placeholder-[#848884] text-[#848884] border-[#848884] backdrop-blur-[50px]">
                                            Security Questions
                                            <ChevronDown className={`transition-transform text-[#848884] ${open === "securityQ" ? "rotate-180" : "rotate-0"}`} size={22} />
                                        </div>

                                        {/* Expandable Content */}
                                        <div className={`transition-all duration-500 overflow-hidden ${open === "securityQ" ? "max-h-[800px] mt-4 opacity-100" : "max-h-0 opacity-0"}`} >
                                            <div className="flex flex-col gap-4 px-[20px] pb-4">
                                                {isFetchingSecQ ? (
                                                    <div className="flex items-center justify-center gap-2 py-4 text-[#98C1A9]">
                                                        <div className="w-4 h-4 border-2 border-[#98C1A9] border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="text-sm font-belanosima">Loading questions...</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {securityQuestionsList.length === 0 ? (
                                                            <p className="text-center text-[#848884]">No questions available.</p>
                                                        ) : (
                                                            <div className="flex flex-col gap-4">
                                                                <div className="flex flex-col gap-2">
                                                                    <label className="text-[#002715] font-belanosima text-[15px]">Answer your security question</label>
                                                                    <div className="w-full h-[44px] px-3 flex items-center bg-[#F7F7F7] border border-[#848884] rounded-[8px] text-[16px] text-[#002715]">
                                                                        <span className="truncate">
                                                                            {securityQuestionsList.find(q => String(q.id) === String(selectedQuestionId))?.question || 'Loading...'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-2">
                                                                    <label className="text-[#002715] font-belanosima text-[15px]">Your answer</label>
                                                                    <input
                                                                        type="text"
                                                                        value={selectedAnswer}
                                                                        onChange={(e) => setSelectedAnswer(e.target.value)}
                                                                        disabled={isVerifyingSecQ}
                                                                        className={`w-full h-[44px] px-3 bg-[#EEEEEE] border border-[#848884] rounded-[8px] text-[16px] text-[#002715] focus:outline-none focus:border-[#43E1A9] focus:ring-0 ${isVerifyingSecQ ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                        placeholder="Enter your answer"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={tryAnotherQuestion}
                                                                        className="self-start text-[#7FAF99] hover:underline text-[14px] mt-1"
                                                                    >
                                                                        Can’t remember this answer? Try another question.
                                                                    </button>
                                                                </div>
                                                                {!secQVerifiedSuccess && (
                                                                    <div className="pt-2 w-full flex justify-center">
                                                                        <button
                                                                            type="button"
                                                                            onClick={verifySecurityQuestions}
                                                                            disabled={isVerifyingSecQ || !selectedQuestionId || !String(selectedAnswer).trim()}
                                                                            className={`lg:max-w-[279px] w-full h-[50px] px-4 rounded-[32px] font-belanosima text-[18px] text-[#FFFFFF] transition duration-300 ${
                                                                                (isVerifyingSecQ || !selectedQuestionId || !String(selectedAnswer).trim())
                                                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                                                    : 'bg-[#98C1A9] hover:bg-[#39FF14] cursor-pointer'
                                                                            }`}
                                                                        >
                                                                            {isVerifyingSecQ ? (
                                                                                <div className="flex items-center justify-center gap-2">
                                                                                    <Loader />
                                                                                </div>
                                                                            ) : (
                                                                                'Verify'
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </form>
                        </div>
                        {roleSelection &&
                            <div className="flex justify-between items-center">
                                <p>Proceed as</p>
                                <div className="flex gap-2">
                                    {availableRoles.map((role) => (
                                        <button
                                            onClick={() => handleRoleSelect(role)}
                                            key={role} className="border rounded-full cursor-pointer px-4 capitalize">
                                            {role.replace(/_/g, " ")}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        }
                        <div className=" w-full  flex flex-col gap-5 lg:gap-[5px]">
                            <Link
                                href={"/login"}
                                className="text-center cursor-pointer flex flex-row items-center justify-center font-belanosima text-[16px] font-[400] text-[#848884] leading-[111%]"
                            >
                                <ArrowLeft size={20} />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
