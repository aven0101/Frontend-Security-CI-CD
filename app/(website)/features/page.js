"use client";

import FeatureCardSection from "@/components/features/FeatureCards";
import FeatureChooseSection from "@/components/features/FeatureChoose";
import FeatureContactSection from "@/components/features/FeatureContact";
import FeatureHeroSection from "@/components/features/FeatureHero";
import FeaturePrivacySection from "@/components/features/FeaturePrivacy";
import FeatureStepSection from "@/components/features/FeatureSteps";
import FeatureTrySection from "@/components/features/FeatureTry";

export default function Features() {
  return (
    <>
      <FeatureHeroSection />
      {/* highlights sections */}
      <FeatureCardSection />
      <FeatureStepSection />
      {/* Try Section */}
      <FeatureTrySection />
      {/* Choose section */}
      <FeatureChooseSection />
      <FeaturePrivacySection/>
      <FeatureContactSection/>
    </>
  );
}
