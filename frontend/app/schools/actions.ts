"use server";

import { prisma } from "@/lib/prisma";

export async function createInstitutionInquiry(formData: FormData) {
  const schoolName = formData.get("schoolName") as string;
  const contactName = formData.get("contactName") as string;
  const contactEmail = formData.get("contactEmail") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const studentCount = formData.get("studentCount") as string;
  const program = formData.get("program") as string;
  const proposedDate = formData.get("proposedDate") as string;
  const notes = formData.get("notes") as string;

  if (!schoolName || !contactName || !contactEmail || !program) {
    throw new Error("School name, contact name, email, and program are required");
  }

  await prisma.institutionBooking.create({
    data: {
      schoolName,
      contactName,
      contactEmail,
      contactPhone: contactPhone || null,
      studentCount: studentCount || null,
      program,
      proposedDate: proposedDate || null,
      notes: notes || null,
      status: "pending",
    },
  });
}
