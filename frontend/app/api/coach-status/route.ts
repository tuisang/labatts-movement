import { NextResponse } from "next/server";
import { isCoach } from "@/lib/coachAuth";

// Lightweight check the client-side nav can call to decide whether to show
// coach-only links. COACH_EMAILS itself is a server-only env var, so this
// is the only way a client component can know.
export async function GET() {
  return NextResponse.json({ isCoach: await isCoach() });
}
