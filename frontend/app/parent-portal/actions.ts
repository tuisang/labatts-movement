"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addAthlete(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in");

  const name = formData.get("name") as string;
  const ageGroup = formData.get("ageGroup") as string;
  const sport = formData.get("sport") as string;

  if (!name || !ageGroup) throw new Error("Name and age group are required");

  await prisma.athlete.create({
    data: {
      parentClerkId: userId,
      name,
      ageGroup,
      sport: sport || null,
    },
  });

  revalidatePath("/parent-portal");
}
