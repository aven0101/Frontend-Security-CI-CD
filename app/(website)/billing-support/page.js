"use client";

import BillingAlert from "@/components/billing/BillingAlert";
import BillingFAQ from "@/components/billing/billingFAQ";
import BillingHelp from "@/components/billing/BillingHelp";

export default function BillingSupport() {
  return (
    <>
      <BillingAlert />
      <BillingFAQ />
      <BillingHelp />
    </>
  );
}
