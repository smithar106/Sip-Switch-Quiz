export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  console.log(`[track] ${name}`, data ?? {});
}

export function trackQuizStart() {
  trackEvent("quiz_start");
}

export function trackAnswer(questionId: string, answerId: string) {
  trackEvent("quiz_answer", { question_id: questionId, answer_id: answerId });
}

export function trackQuizComplete(archetypeId: string) {
  trackEvent("quiz_complete", { archetype_id: archetypeId });
}

export function trackEmailSubmit(archetypeId: string) {
  trackEvent("email_submit", { archetype_id: archetypeId });
}

export function trackEmailSkipped(archetypeId: string) {
  trackEvent("email_skipped", { archetype_id: archetypeId });
}

export function trackCtaClick(archetypeId: string) {
  trackEvent("cta_click", { archetype_id: archetypeId });
}

export function trackShare(archetypeId: string) {
  trackEvent("share", { archetype_id: archetypeId });
}
