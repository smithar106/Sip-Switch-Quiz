import Link from "next/link";

const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/app/sip-switch";

const SWAPS = [
  { from: "IPA", to: "Athletic Brewing Run Wild", reason: "Same hop profile, zero alcohol" },
  { from: "Negroni", to: "Lyre's Negroni Kit", reason: "Bitter, complex, ritual intact" },
  { from: "Aperol Spritz", to: "Ghia + Sparkling Water", reason: "Bitter orange, aperitivo mood" },
  { from: "Prosecco", to: "Surely Sparkling Rosé", reason: "Celebratory, dry, actually good" },
  { from: "Whisky", to: "Lyre's American Malt", reason: "Oak, vanilla, sipping spirit" },
];

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-[#C8A96E]/10 rounded-2xl flex items-center justify-center text-3xl mb-6">
          🍋
        </div>

        <p className="text-[#C8A96E] uppercase tracking-widest text-xs font-semibold mb-4">
          Sip Switch
        </p>

        <h1 className="text-5xl font-extrabold leading-tight tracking-tight whitespace-pre-line">
          Find your perfect{"\n"}non-alcoholic drink
        </h1>

        <p className="text-[#999] text-lg leading-relaxed max-w-md mx-auto mt-4">
          Tell us what you love about drinking. We find the NA version that actually satisfies — matched to your exact taste profile.
        </p>

        <div className="flex gap-8 justify-center mt-8 mb-10">
          {[
            { stat: "82%", label: "rise in NA beverage sales" },
            { stat: "54%", label: "of people drinking less" },
            { stat: "10+", label: "NA archetypes mapped" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="text-[#C8A96E] font-bold text-lg">{item.stat}</span>
              <span className="text-[#666] text-sm text-center leading-tight max-w-[100px]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/quiz"
            className="bg-[#C8A96E] text-[#0A0A0A] rounded-2xl py-4 px-8 font-bold hover:opacity-90 transition-opacity"
          >
            Take the quiz →
          </Link>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/10 text-white rounded-2xl py-4 px-8 hover:border-white/30 transition-colors"
          >
            Download on iOS
          </a>
        </div>

        <p className="text-[#555] text-sm mt-3">Free quiz · No account required</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <p className="text-[#C8A96E] uppercase tracking-widest text-xs font-semibold mb-4">
          How It Works
        </p>
        <h2 className="text-[36px] font-bold mb-10">Your switch in 60 seconds</h2>

        <div className="flex flex-col gap-6">
          {[
            {
              emoji: "🎯",
              title: "Answer 5 questions",
              desc: "Tell us what you drink, when you drink it, and what flavour notes you love.",
            },
            {
              emoji: "🧪",
              title: "We map your taste profile",
              desc: "Our scoring engine matches your answers across 6 flavour dimensions to find your NA archetype.",
            },
            {
              emoji: "🍋",
              title: "Get your perfect matches",
              desc: "Real products, exact swaps, and a personalised feed in the app that learns over time.",
            },
          ].map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="w-10 h-10 bg-[#C8A96E] rounded-full flex items-center justify-center text-sm font-bold text-[#0A0A0A] shrink-0">
                {step.emoji}
              </span>
              <div>
                <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                <p className="text-[#999] text-sm leading-relaxed mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE SWAP ENGINE */}
      <section className="py-24 bg-white/[0.02] px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C8A96E] uppercase tracking-widest text-xs font-semibold mb-4">
            The Swap Engine
          </p>
          <h2 className="text-[32px] font-bold mb-3">Every drink you love has an NA match</h2>
          <p className="text-[#999] mb-8">
                        {"We've mapped 10 classic drinks to their best non-alcoholic alternatives."}
          </p>

          <div className="grid grid-cols-1 gap-3 mt-8 max-w-lg mx-auto">
            {SWAPS.map((swap) => (
              <div
                key={swap.from}
                className="flex items-center gap-3 p-4 bg-white/5 border border-white/8 rounded-2xl"
              >
                <span className="text-white text-sm font-medium shrink-0 w-[100px]">{swap.from}</span>
                <span className="text-[#C8A96E] shrink-0">→</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-sm font-semibold">{swap.to}</span>
                  <span className="text-[#666] text-xs">{swap.reason}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/quiz" className="text-[#C8A96E] text-sm hover:underline">
              Take the quiz to see all 10 swaps →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 text-center px-6">
        <div className="max-w-lg mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to make the switch?</h2>
          <p className="text-[#999] text-lg mb-8">
                        {"Join thousands of people who've found their perfect NA drink."}
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-[#C8A96E] text-[#0A0A0A] rounded-2xl py-4 px-8 font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Take the free quiz →
          </Link>
          <p className="mt-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] text-sm hover:text-[#999] transition-colors"
            >
              Or download the app
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#555] text-sm">
            © 2026 Sip Switch · Red Derby Ventures LLC
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[#555] text-sm hover:text-[#999] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[#555] text-sm hover:text-[#999] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
