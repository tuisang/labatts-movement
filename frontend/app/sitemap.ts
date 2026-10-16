import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://labattsmovement.tuistech.co.ke";
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/activity-library`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/equipment-hire`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/schools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/book-session`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  // Published videos get their own entries; if the database is unreachable the
  // sitemap still serves the static pages.
  try {
    const videos = await prisma.activityVideo.findMany({
      where: { status: "published" },
      select: { id: true, updatedAt: true },
    });
    return [
      ...pages,
      ...videos.map((v) => ({
        url: `${base}/activity-library/${v.id}`,
        lastModified: v.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return pages;
  }
}
