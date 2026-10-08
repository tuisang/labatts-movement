import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";

export async function GET(req: NextRequest) {
  if (!(await isCoach())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isCoach())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ error: "Failed to update booking." }, { status: 500 });
  }
}