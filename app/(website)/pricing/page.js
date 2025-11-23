'use client';
import PricingHeading from "@/components/pricing/PricingHeader";
import PricingTabs from "@/components/pricing/PricingTabs";
import TryPricing from "@/components/pricing/TryPricing";

export default function Pricing() {
  return (
    <>
      <PricingHeading />
      <TryPricing/>
      <PricingTabs/>
    </>
  );
}
