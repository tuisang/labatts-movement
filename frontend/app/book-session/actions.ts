"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function createBooking(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  paymentMethod: string;
  athleteId?: string;
}) {
  const { userId } = await auth();

  if (!data.name || !data.phone || !data.email || !data.service || !data.date || !data.paymentMethod) {
    throw new Error("All fields are required");
  }

  // Rate limit: max 3 bookings per email per 10 minutes, to deter spam
  // without needing separate IP-tracking infrastructure.
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const recentBookings = await prisma.booking.count({
    where: { email: data.email, createdAt: { gte: tenMinutesAgo } },
  });
  if (recentBookings >= 3) {
    throw new Error("Too many booking attempts. Please wait a few minutes and try again.");
  }

  const booking = await prisma.booking.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      date: data.date,
      paymentMethod: data.paymentMethod,
      status: "pending",
      clerkUserId: userId ?? null,
      athleteId: data.athleteId || null,
    },
  });

  return { bookingId: booking.id };
}
