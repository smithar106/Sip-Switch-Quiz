import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Sip Switch",
  description: "How Sip Switch collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-[36px] font-bold mb-2">Privacy Policy</h1>
        <p className="text-[#555] text-sm mb-10">Last updated: June 2026</p>

        <div className="flex flex-col gap-8">
          <Section
            title="1. Information We Collect"
            items={[
              "Taste profile quiz answers and drink preferences",
              "Email address (optional — only if you choose to receive your results by email)",
              "Anonymous usage analytics to understand how people use the quiz",
            ]}
          />

          <Section
            title="2. How We Use It"
            items={[
              "To generate personalised non-alcoholic drink recommendations",
              "To improve our matching engine and archetype scoring",
              "To send quiz results to your inbox (only if you provide an email)",
            ]}
          />

          <Section
            title="3. Data Sharing"
            items={[
              "We do not sell your data. Ever.",
              "We use Supabase for secure data storage.",
              "We use PostHog for anonymous usage analytics.",
            ]}
          />

          <Section
            title="4. Data Retention"
            items={[
              "Quiz results are stored for 12 months to refine our recommendation engine.",
              "You can unsubscribe from emails at any time — each email includes an unsubscribe link.",
            ]}
          />

          <Section
            title="5. Contact"
            items={[
              "Questions about your data? Reach us at support@sipswitch.app",
            ]}
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

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="text-[#999] text-sm leading-relaxed flex items-start gap-2">
            <span className="text-[#C8A96E] mt-1 shrink-0">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
