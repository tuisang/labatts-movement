import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";

export async function GET() {
  if (!(await isCoach())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ quotes });
}

export async function PATCH(req: NextRequest) {
  if (!(await isCoach())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status, adminNotes } = await req.json();
  const quote = await prisma.quote.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(adminNotes !== undefined && { adminNotes }),
    },
  });
  return NextResponse.json({ quote });
}