"use client";

import { useState, useCallback } from "react";
import { SWAP_MAP, type Archetype } from "@/lib/quizzes";
import { trackCtaClick, trackShare } from "@/lib/tracking";

interface ResultPageProps {
  archetype: Archetype;
  sessionId: string | null;
  onRetake: () => void;
  appStoreUrl: string;
}

export default function ResultPage({ archetype, onRetake, appStoreUrl }: ResultPageProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    trackShare(archetype.id);
    const text = `I'm a "${archetype.name}" on Sip Switch! Find your perfect non-alcoholic drink match.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Sip Switch", text, url: window.location.href });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [archetype]);

  const handleCta = useCallback(() => {
    trackCtaClick(archetype.id);
  }, [archetype]);

  return (
    <div className="min-h-screen bg-surface px-4 py-12">
      <div className="w-full max-w-md mx-auto flex flex-col result-enter">

        {/* Header */}
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase text-center mb-6">
          Your Sip Switch Profile
        </p>

        <div className="flex flex-col items-center gap-2 mb-4">
          <span className="text-[80px] leading-none">{archetype.emoji}</span>
          <h2 className="text-[32px] font-bold text-white text-center">{archetype.name}</h2>
          <p className="text-secondary text-base text-center">{archetype.tagline}</p>
          <p className="text-muted text-[15px] leading-relaxed text-center mt-1">{archetype.description}</p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-2 mb-8">
          {archetype.categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 rounded-full bg-gold-subtle border border-gold/20 text-gold text-xs"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full mb-8" />

        {/* Start here */}
        <p className="text-white text-lg font-semibold mb-4">Start here.</p>
        <div className="flex flex-col gap-3 mb-8">
          {archetype.examples.map((example, i) => (
            <div key={example} className="bg-surface-card border border-surface-border rounded-card p-5 flex items-center gap-4">
              <span className="text-gold text-xl">✦</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-white text-sm font-medium">{example}</span>
                <span className="text-[#666] text-xs">{archetype.categories[i % archetype.categories.length]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full mb-8" />

        {/* Swap engine */}
        <h3 className="text-white text-xl font-semibold mb-2">Your switch, mapped.</h3>
        <p className="text-muted text-sm mb-5">
          Every drink you love has a non-alcoholic match that actually works.
        </p>

        <div className="max-h-[400px] overflow-y-auto pr-1 mb-8 scrollbar-thin">
          <div className="flex flex-col gap-3">
            {SWAP_MAP.map((swap) => (
              <div
                key={swap.from}
                className="flex items-center gap-3 bg-surface-card border border-surface-border rounded-card p-4"
              >
                <span className="text-white text-sm shrink-0 w-[80px]">{swap.from}</span>
                <span className="text-gold shrink-0">→</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-sm font-bold">{swap.to}</span>
                  <span className="text-[#666] text-xs">{swap.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full mb-8" />

        {/* App CTA block */}
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase text-center mb-4">
          The Full Experience
        </p>
        <h3 className="text-white text-2xl font-bold text-center mb-2">
          Sip Switch finds your perfect NA drink — and learns your taste over time.
        </h3>
        <p className="text-muted text-sm text-center mb-6">
          The more you rate, the sharper your recommendations get.
        </p>

        <div className="relative w-[200px] h-[120px] mx-auto mb-4">
          <div
            className="absolute inset-0 rounded-card"
            style={{
              background: "linear-gradient(135deg, rgba(200,169,110,0.2) 0%, rgba(200,169,110,0.05) 100%)",
              filter: "blur(8px)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🍋</span>
          </div>
        </div>

        <p className="text-muted text-sm text-center mb-6">Your personalised feed is waiting</p>

        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCta}
          className="cta-pulse w-full py-[18px] rounded-btn bg-gold text-surface font-semibold text-base text-center transition-opacity duration-200 hover:opacity-90 mb-3"
        >
          Download Sip Switch — free →
        </a>

        <p className="text-muted text-xs text-center mb-8">
          Free to explore · iOS only · No commitment
        </p>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full mb-8" />

        {/* Share + Retake */}
        <button
          onClick={handleShare}
          className="w-full py-3 rounded-btn border border-surface-border bg-surface-card text-white text-sm transition-colors duration-200 hover:border-white/30 mb-3"
        >
          {copied ? "Copied!" : "Share my profile"}
        </button>

        <button onClick={onRetake} className="text-muted text-sm text-center hover:text-white transition-colors duration-200 mb-12">
          Retake the quiz
        </button>

        {/* Footer */}
        <p className="text-muted text-xs text-center pb-8">
          Sip Switch · Find your perfect non-alcoholic drink
        </p>
      </div>
    </div>
  );
}
