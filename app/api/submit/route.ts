import { NextResponse } from "next/server";
import { calculateArchetype } from "@/lib/quizzes";

export async function POST(request: Request) {
  let body: { email?: string; archetype_id?: string; answers?: Record<string, string> } = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: true, archetype_id: null, session_id: crypto.randomUUID() });
  }

  const sessionId = crypto.randomUUID();

  let recalculatedArchetypeId = body.archetype_id ?? null;

  if (body.answers && typeof body.answers === "object") {
    try {
      const archetype = calculateArchetype(body.answers);
      recalculatedArchetypeId = archetype.id;
    } catch {
      // keep client archetype_id on recalculation failure
    }
  }

  const email = body.email?.trim() || null;

  try {
    const { supabase } = await import("@/lib/supabase");
    if (supabase) {
      await supabase.from("quiz_leads").upsert(
        {
          email,
          archetype_id: recalculatedArchetypeId,
          answers: body.answers ?? null,
        },
        { onConflict: "email" }
      );
    }
  } catch {
    // never block user on Supabase failure
  }

  return NextResponse.json({
    ok: true,
    archetype_id: recalculatedArchetypeId,
    session_id: sessionId,
  });
}
