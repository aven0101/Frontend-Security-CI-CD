import ResetPasswordComp from "@/components/dashboard/auth/ResetPassword";
import { Suspense } from "react";

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ResetPasswordComp />
    </Suspense>
  );
}
