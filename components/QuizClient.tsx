"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { QUESTIONS, calculateArchetype, type Archetype } from "@/lib/quizzes";
import { trackQuizStart, trackAnswer, trackQuizComplete, trackEmailSubmit, trackEmailSkipped } from "@/lib/tracking";
import ResultPage from "./ResultPage";

type Phase = "landing" | "quiz" | "calculating" | "email" | "result";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface QuizClientProps {
  appStoreUrl: string;
}

export default function QuizClient({ appStoreUrl }: QuizClientProps) {
  const [phase, setPhase] = useState<Phase>("landing");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const calculatingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      if (calculatingTimer.current) clearTimeout(calculatingTimer.current);
    };
  }, []);

  const startQuiz = useCallback(() => {
    trackQuizStart();
    setPhase("quiz");
    setCurrentStep(0);
    setAnswers({});
    setAnimKey((k) => k + 1);
  }, []);

  const handleSelect = useCallback(
    (optionId: string) => {
      if (selectedOption) return;
      setSelectedOption(optionId);
      const question = QUESTIONS[currentStep];
      const newAnswers = { ...answers, [question.id]: optionId };
      setAnswers(newAnswers);
      trackAnswer(question.id, optionId);

      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = setTimeout(() => {
        setSelectedOption(null);
        if (currentStep < QUESTIONS.length - 1) {
          setCurrentStep((s) => s + 1);
          setAnimKey((k) => k + 1);
        } else {
          setPhase("calculating");
          calculatingTimer.current = setTimeout(() => {
            const result = calculateArchetype(newAnswers);
            setArchetype(result);
            trackQuizComplete(result.id);
            setPhase("email");
          }, 1800);
        }
      }, 180);
    },
    [currentStep, answers, selectedOption]
  );

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (submitting) return;

      const trimmed = email.trim();
      if (trimmed && !EMAIL_REGEX.test(trimmed)) {
        setEmailError("Please enter a valid email address");
        return;
      }

      setEmailError("");
      setSubmitting(true);

      if (archetype) {
        try {
          if (trimmed) {
            const res = await fetch("/api/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: trimmed, archetype_id: archetype.id, answers }),
            });
            const data = await res.json();
            setSessionId(data.session_id ?? null);
            trackEmailSubmit(archetype.id);
          } else {
            trackEmailSkipped(archetype.id);
          }
        } catch {
          // proceed regardless
        }
      }

      setSubmitting(false);
      setPhase("result");
    },
    [email, submitting, archetype, answers]
  );

  const handleSkip = useCallback(() => {
    if (archetype) trackEmailSkipped(archetype.id);
    setPhase("result");
  }, [archetype]);

  const handleRetake = useCallback(() => {
    setPhase("quiz");
    setCurrentStep(0);
    setAnswers({});
    setArchetype(null);
    setSessionId(null);
    setSelectedOption(null);
    setEmail("");
    setEmailError("");
    setAnimKey((k) => k + 1);
  }, []);

  if (phase === "result" && archetype) {
    return <ResultPage archetype={archetype} sessionId={sessionId} onRetake={handleRetake} appStoreUrl={appStoreUrl} />;
  }

  if (phase === "calculating") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 result-enter">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-lg">Matching your taste profile...</p>
        </div>
      </div>
    );
  }

  if (phase === "email" && archetype) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-md flex flex-col items-center gap-6 result-enter">
          <div className="w-16 h-16 rounded-2xl bg-gold-subtle flex items-center justify-center">
            <span className="text-3xl">{archetype.emoji}</span>
          </div>
          <h2 className="text-3xl font-bold text-white text-center">{archetype.name}</h2>
          <p className="text-muted text-center">Your drink profile is ready. Save your matches to your inbox.</p>
          <form onSubmit={handleEmailSubmit} className="w-full flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="your@email.com"
              className="w-full px-5 py-4 rounded-btn bg-surface-card border border-surface-border text-white placeholder:text-muted focus:outline-none focus:border-gold transition-colors duration-200"
            />
            {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-[18px] rounded-btn bg-gold text-surface font-semibold text-base transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send my matches →"}
            </button>
          </form>
          <button onClick={handleSkip} className="text-muted text-sm hover:text-white transition-colors duration-200">
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  if (phase === "landing") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-md flex flex-col items-center gap-8 step-enter">
          <div className="w-20 h-20 rounded-2xl bg-gold-subtle flex items-center justify-center">
            <span className="text-4xl">🍋</span>
          </div>

          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">Sip Switch</p>

          <h1 className="text-4xl font-bold text-white text-center leading-tight">
            Find your perfect non-alcoholic drink
          </h1>

          <p className="text-muted text-center text-base leading-relaxed">
            Tell us what you love about drinking. We find the NA version that actually satisfies.
          </p>

          <div className="flex flex-col gap-3 w-full">
            {["5 questions, under 60 seconds", "Matched to your exact taste profile", "Real products you can buy today"].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-gold text-sm">✓</span>
                <span className="text-secondary text-sm">{text}</span>
              </div>
            ))}
          </div>

          <button onClick={startQuiz} className="cta-pulse w-full py-[18px] rounded-btn bg-gold text-surface font-semibold text-base transition-opacity duration-200 hover:opacity-90">
            Find my drink →
          </button>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentStep];
  const isFirstTwo = currentStep < 2;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="px-4 pt-8 pb-4">
        <div className="w-full max-w-md mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full progress-bar"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <p className="text-muted text-xs mt-3">
            {currentStep + 1} / {QUESTIONS.length}
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div key={animKey} className="w-full max-w-md step-enter">
          <h2 className="text-2xl font-bold text-white text-center mb-8">{question.title}</h2>

          <div className={isFirstTwo ? "flex flex-col gap-3" : "grid grid-cols-2 gap-3"}>
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-5 rounded-card border transition-all duration-200 ${
                    isSelected
                      ? "bg-gold-light border-gold"
                      : "bg-surface-card border-surface-border hover:border-white/20"
                  } disabled:cursor-default`}
                >
                  <span className="text-white text-sm leading-snug block">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
