"use server";

import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";
import { revalidatePath } from "next/cache";

export async function addProgressEntry(formData: FormData) {
  if (!(await isCoach())) throw new Error("Not authorized");

  const athleteId = formData.get("athleteId") as string;
  const metric = formData.get("metric") as string;
  const value = formData.get("value") as string;
  const notes = formData.get("notes") as string;

  if (!athleteId || !metric || !value) {
    throw new Error("Athlete, metric, and value are required");
  }

  await prisma.progressEntry.create({
    data: { athleteId, metric, value, notes: notes || null },
  });

  revalidatePath("/dashboard/coach");
}

export async function updateBookingStatus(bookingId: string, status: string) {
  if (!(await isCoach())) throw new Error("Not authorized");

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  revalidatePath("/dashboard/coach");
}

const DEFAULT_CONTRACT_TEMPLATE = (schoolName: string, program: string) => `
LABATTS MOVEMENT — INSTITUTIONAL TRAINING AGREEMENT

This agreement is between Labatts Movement ("Provider") and ${schoolName} ("Institution")
for the provision of the "${program}" program.

1. Scope: Provider will deliver the agreed training program to Institution's
   students as scheduled and mutually agreed.
2. No Fee: This agreement is provided at no charge as part of Labatts
   Movement's institutional partnership program.
3. Term: This agreement remains in effect until either party gives written
   notice of termination.
4. Conduct: Both parties agree to conduct all sessions in a safe, respectful
   manner consistent with standard youth sports safety practices.

By signing below, an authorized representative of ${schoolName} confirms
agreement to these terms.
`.trim();

export async function generateContract(bookingId: string) {
  if (!(await isCoach())) throw new Error("Not authorized");

  const booking = await prisma.institutionBooking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error("Institution booking not found");

  await prisma.institutionBooking.update({
    where: { id: bookingId },
    data: {
      status: "contract_sent",
      contractText: DEFAULT_CONTRACT_TEMPLATE(booking.schoolName, booking.program),
    },
  });

  revalidatePath("/dashboard/coach");
}
