import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";

export async function GET() {
  if (!(await isCoach())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessions = await prisma.chatSession.findMany({
    include: { messages: { orderBy: { createdAt: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ sessions });
}