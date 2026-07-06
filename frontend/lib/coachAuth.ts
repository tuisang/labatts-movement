import { currentUser } from "@clerk/nextjs/server";

// Add coach emails here via the COACH_EMAILS env var, comma-separated,
// e.g. COACH_EMAILS="alex2000rui@gmail.com,othercoach@example.com"
// Add this to both .env and .env.local (same lesson as DATABASE_URL —
// keep them in sync so the CLI and the app agree).
function getCoachEmails(): string[] {
  return (process.env.COACH_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function isCoach(): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;

  const email = user.primaryEmailAddress?.emailAddress?.toLowerCase();
  if (!email) return false;

  return getCoachEmails().includes(email);
}
