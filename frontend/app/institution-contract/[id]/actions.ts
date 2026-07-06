"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function signContract(bookingId: string, signedByName: string) {
  if (!signedByName || signedByName.trim().length < 2) {
    throw new Error("Please enter your full name to sign");
  }

  const booking = await prisma.institutionBooking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error("Contract not found");
  if (booking.status === "signed") throw new Error("This contract has already been signed");

  await prisma.institutionBooking.update({
    where: { id: bookingId },
    data: {
      status: "signed",
      signedByName: signedByName.trim(),
      signedAt: new Date(),
    },
  });

  revalidatePath(`/institution-contract/${bookingId}`);
}
