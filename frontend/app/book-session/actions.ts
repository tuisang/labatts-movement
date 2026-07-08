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
