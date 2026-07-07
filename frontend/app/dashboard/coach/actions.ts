"use server";

import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";
import { revalidatePath } from "next/cache";

// ─── Existing actions (unchanged) ───

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

// ─── New: content management ───

export async function seedDefaultContent() {
  if (!(await isCoach())) throw new Error("Not authorized");

  const existingSessions = await prisma.sessionOption.count();
  const existingEquipment = await prisma.equipmentItem.count();

  if (existingSessions === 0) {
    await prisma.sessionOption.createMany({
      data: [
        { name: "Explosive Vertical Power", duration: "60 min", price: 2500 },
        { name: "Elite Agility Patterns", duration: "60 min", price: 2500 },
        { name: "Sprint Mechanics & Starts", duration: "45 min", price: 2000 },
        { name: "Balance & Coordination (Kids)", duration: "45 min", price: 1500 },
        { name: "Custom Training Consultation", duration: "30 min", price: 1000 },
      ],
    });
  }

  if (existingEquipment === 0) {
    await prisma.equipmentItem.createMany({
      data: [
        {
          name: '24" Plyo Box',
          description: "Adjustable-height plyometric box for jump training and step-ups.",
          imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600",
          pricePerDay: 500,
          category: "Plyometrics",
        },
        {
          name: "Agility Ladder Set",
          description: "20ft agility ladder with carrying bag for footwork and speed drills.",
          imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600",
          pricePerDay: 300,
          category: "Agility",
        },
        {
          name: "Weighted Vest (10kg)",
          description: "Adjustable weighted vest for resistance training and conditioning.",
          imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600",
          pricePerDay: 400,
          category: "Strength",
        },
        {
          name: "Starting Blocks",
          description: "Adjustable track starting blocks for sprint training.",
          imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600",
          pricePerDay: 600,
          category: "Sprinting",
          available: false,
        },
      ],
    });
  }

  revalidatePath("/dashboard/coach");
  revalidatePath("/book-session");
  revalidatePath("/equipment-hire");
}

export async function addSessionOption(formData: FormData) {
  if (!(await isCoach())) throw new Error("Not authorized");

  const name = formData.get("name") as string;
  const duration = formData.get("duration") as string;
  const price = Number(formData.get("price"));

  if (!name || !duration || !price) throw new Error("Name, duration, and price are required");

  await prisma.sessionOption.create({ data: { name, duration, price } });

  revalidatePath("/dashboard/coach");
  revalidatePath("/book-session");
}

export async function toggleSessionActive(id: string, active: boolean) {
  if (!(await isCoach())) throw new Error("Not authorized");
  await prisma.sessionOption.update({ where: { id }, data: { active } });
  revalidatePath("/dashboard/coach");
  revalidatePath("/book-session");
}

export async function deleteSessionOption(id: string) {
  if (!(await isCoach())) throw new Error("Not authorized");
  await prisma.sessionOption.delete({ where: { id } });
  revalidatePath("/dashboard/coach");
  revalidatePath("/book-session");
}

export async function addEquipmentItem(formData: FormData) {
  if (!(await isCoach())) throw new Error("Not authorized");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const pricePerDay = Number(formData.get("pricePerDay"));
  const category = formData.get("category") as string;

  if (!name || !description || !imageUrl || !pricePerDay || !category) {
    throw new Error("All fields are required");
  }

  await prisma.equipmentItem.create({
    data: { name, description, imageUrl, pricePerDay, category },
  });

  revalidatePath("/dashboard/coach");
  revalidatePath("/equipment-hire");
}

export async function toggleEquipmentAvailable(id: string, available: boolean) {
  if (!(await isCoach())) throw new Error("Not authorized");
  await prisma.equipmentItem.update({ where: { id }, data: { available } });
  revalidatePath("/dashboard/coach");
  revalidatePath("/equipment-hire");
}

export async function deleteEquipmentItem(id: string) {
  if (!(await isCoach())) throw new Error("Not authorized");
  await prisma.equipmentItem.delete({ where: { id } });
  revalidatePath("/dashboard/coach");
  revalidatePath("/equipment-hire");
}
