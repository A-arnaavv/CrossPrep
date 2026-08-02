import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import FAQSection from "@/components/landing/FAQSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FinalCTA from "@/components/landing/FinalCTA";
import HeroSection from "@/components/landing/HeroSection";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingNavbar from "@/components/landing/LandingNavbar";
import SocialProof from "@/components/landing/SocialProof";
import WorkflowSection from "@/components/landing/WorkflowSection";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f9ff] text-slate-950">
      <LandingNavbar />
      <HeroSection />
      <SocialProof />
      <FeaturesSection />
      <WorkflowSection />
      <FAQSection />
      <FinalCTA />
      <LandingFooter />
    </main>
  );
}