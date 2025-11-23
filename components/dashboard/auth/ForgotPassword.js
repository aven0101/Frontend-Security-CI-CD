"use client";

import AuthHeading from "@/components/common-ui/AuthCommonHeading";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { API } from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";
import Loader from '@/components/global/Loader';
import Cookies from "js-cookie";

export default function ForgotPasswordComp() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Check and remove existing fp_email cookie on component mount
  useEffect(() => {
    const existingCookie = Cookies.get("fp_email");
    if (existingCookie) {
      Cookies.remove("fp_email");
      console.log("Existing fp_email cookie removed:", existingCookie);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Here you can add API call or additional logic
    if (email) {
        const response = await API.forgotPassword({ email });
         console.log({ response });
          if (response.success === false) {
              toast.error(response.message.message || "Failed to reset password!");
              setLoading(false);
          } else {
              // Store email in cookie for password reset flow
              Cookies.set("fp_email", email, { expires: 1/24 }); // Expires in 1 hour
              toast.success(response.message.message || "Password reset link email sent successfully!");
              setLoading(false);
          }
    } else {
      toast.error("Please enter a valid email");
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
            title={"Forgot Password"}
            subTitle={"Enter your email and we'll send you a reset link."}
          />

          {/* form Container */}
          <div className="w-full lg:max-w-[428px] h-[213px] border border-[#848884] rounded-[8px] flex flex-col gap-[18px]">
            <span className="mt-[20px] text-center  lg:text-[32px] text-[26px] font-[400] text-[#98C1A9] leading-[100%]">
              Forgot Password
            </span>

            <form onSubmit={handleSubmit} className="border border-r-0 border-t-0 border-l-0 border-b-0 mb-[18px] border-[#848884] rounded-[8px] ">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full focus:outline-none h-[50px] border px-3 !font-normal text-xl text-[#848884] placeholder-[#848884]/50 border-l-0 border-r-0 border-[#848884]`}
              />
              {/* Submit Button */}
              <div className="flex flex-col lg:flex-row justify-center w-full px-4 lg:px-0 mt-[20px]">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full lg:max-w-[279px] h-[50px] px-4 rounded-[32px]  text-[18px] text-[#FFFFFF]
          bg-[#98C1A9] cursor-pointer flex justify-center items-center
          bg-[linear-gradient(247.52deg,rgba(255,255,255,0.165)_3.99%,rgba(67,225,169,0.165)_56.27%,rgba(255,255,255,0)_96.99%)]
          shadow-[inset_2px_2px_100px_#4242421A,inset_-2px_-2px_100px_#FFFFFF1A]
          backdrop-blur-[50px]
          hover:bg-[#39FF14]  transition duration-300"
                >
                  {loading ? <Loader /> : 'Reset Password'}
                </button>
              </div>
            </form>
            <div className=" w-full  flex flex-col gap-2 lg:gap-[5px]">
              <Link
                href={"/login"}
                className="text-center cursor-pointer flex flex-row items-center justify-center  text-[16px] font-[400] text-[#848884] leading-[111%]"
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
