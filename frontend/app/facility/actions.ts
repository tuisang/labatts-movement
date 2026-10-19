"use server";

import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";
import { revalidatePath } from "next/cache";

import { PROJECT_CATEGORIES } from "@/lib/facilityCategories";

function cleanUrl(input: string) {
  let url = (input ?? "").trim();
  if (url.startsWith("//")) url = `https:${url}`;
  url = url.replace(/^http:\/\//i, "https://");
  if (!/^https:\/\/\S+$/i.test(url)) throw new Error("Image must be a valid https link.");
  return url;
}

export async function addFacilityProject(input: {
  title: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
}) {
  if (!(await isCoach())) throw new Error("Not authorized");
  const title = input.title.trim().slice(0, 120);
  if (!title) throw new Error("Please give the project a title.");
  if (!(PROJECT_CATEGORIES as readonly string[]).includes(input.category)) throw new Error("Invalid category.");

  await prisma.facilityProject.create({
    data: {
      title,
      category: input.category,
      location: input.location.trim().slice(0, 120),
      description: input.description.trim().slice(0, 600),
      imageUrl: cleanUrl(input.imageUrl),
    },
  });
  revalidatePath("/facility");
  revalidatePath("/admin/catalog");
}

export async function deleteFacilityProject(id: string) {
  if (!(await isCoach())) throw new Error("Not authorized");
  await prisma.facilityProject.delete({ where: { id } });
  revalidatePath("/facility");
  revalidatePath("/admin/catalog");
}
