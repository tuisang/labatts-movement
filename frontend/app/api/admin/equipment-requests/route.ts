import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";

const STATUSES = ["pending", "confirmed", "returned", "cancelled"];

export async function PATCH(req: NextRequest) {
  if (!(await isCoach())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, status } = await req.json();
    if (typeof id !== "string" || !STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const request = await prisma.equipmentRequest.update({ where: { id }, data: { status } });
    return NextResponse.json({ request });
  } catch (error) {
    console.error("Update hire request error:", error);
    return NextResponse.json({ error: "Failed to update request." }, { status: 500 });
  }
}
