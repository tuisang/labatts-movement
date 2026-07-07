import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://labattsmovement.tuistech.co.ke";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/activity-library`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/equipment-hire`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/schools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/book-session`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
