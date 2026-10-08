import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";

export async function GET() {
  if (!(await isCoach())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ reviews });
}

export async function PATCH(req: NextRequest) {
  if (!(await isCoach())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, approved } = await req.json();
  const review = await prisma.review.update({ where: { id }, data: { approved } });
  return NextResponse.json({ review });
}

export async function DELETE(req: NextRequest) {
  if (!(await isCoach())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ success: true });
}