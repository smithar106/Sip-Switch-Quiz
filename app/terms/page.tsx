import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Sip Switch",
  description: "Terms of Service for Sip Switch.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-[36px] font-bold mb-2">Terms of Service</h1>
        <p className="text-[#555] text-sm mb-10">Last updated: June 2026</p>

        <div className="flex flex-col gap-8">
          <Section
            title="1. Acceptance"
            content="By accessing or using the Sip Switch web quiz or iOS application, you agree to be bound by these Terms of Service. If you do not agree, do not use the service."
          />

          <Section
            title="2. Description of Service"
            content="Sip Switch is an AI-powered non-alcoholic drink discovery app for iOS. The web quiz at sipswitch.app is a conversion funnel that matches your taste profile to NA drink archetypes and recommends the iOS app for personalised recommendations."
          />

          <Section
            title="3. Eligibility"
            content="You must be 13 years of age or older to use Sip Switch. Sip Switch does not promote alcohol consumption. Our mission is to help people discover satisfying non-alcoholic alternatives."
          />

          <Section
            title="4. Subscriptions"
            content="The iOS app offers a 14-day free trial, then $4.99/month or $29.99/year via Apple App Store. Payment is handled entirely by Apple. You can cancel anytime in iOS Settings → Subscriptions. No refunds are issued for partial months."
          />

          <Section
            title="5. Intellectual Property"
            content="All drink archetypes, swap mappings, recommendation logic, branding, and copy are the intellectual property of Red Derby Ventures LLC. You may not reproduce, distribute, or create derivative works without written permission."
          />

          <Section
            title="6. Disclaimer"
            content="Drink recommendations are for guidance and discovery purposes only. Product availability and pricing are not guaranteed and vary by region. Sip Switch is not a medical service and does not provide advice on alcohol use disorders. If you are concerned about your relationship with alcohol, please consult a qualified healthcare professional."
          />

          <Section
            title="7. Governing Law"
            content="These terms are governed by the laws of Ontario, Canada. Any disputes shall be resolved in the courts of Toronto, Ontario."
          />

          <Section
            title="8. Contact"
            content="Questions about these terms? Reach us at support@sipswitch.app"
          />
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <Link href="/" className="text-[#C8A96E] text-sm hover:underline">
            ← Back to Sip Switch
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-[#999] text-sm leading-relaxed">{content}</p>
    </div>
  );
}
