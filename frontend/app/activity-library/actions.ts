"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { isCoach } from "@/lib/coachAuth";
import type { VideoCardData, Difficulty, Setting } from "@/components/activity-library/types";

function toCardData(v: {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  difficulty: string;
  ageGroup: string;
  coach: string;
  views: number;
  setting: string;
  equipment: string[];
}): VideoCardData {
  return {
    id: v.id,
    title: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnailUrl,
    videoUrl: v.videoUrl,
    duration: v.duration,
    difficulty: v.difficulty as Difficulty,
    ageGroup: v.ageGroup,
    coach: v.coach,
    views: v.views,
    setting: v.setting as Setting,
    equipment: v.equipment,
  };
}

// Public read — no auth. Only published videos are ever returned here;
// draft/archived videos stay visible to coaches only, via the Media Hub.
export async function getPublishedActivityVideos(): Promise<VideoCardData[]> {
  const videos = await prisma.activityVideo.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });

  return videos.map(toCardData);
}

// Public read of a single published video, for the detail page.
export async function getPublishedActivityVideoById(
  id: string
): Promise<VideoCardData | null> {
  const video = await prisma.activityVideo.findFirst({
    where: { id, status: "published" },
  });

  return video ? toCardData(video) : null;
}

// Fire-and-forget view counter. Called from the detail page.
export async function incrementActivityVideoViews(id: string): Promise<void> {
  await prisma.activityVideo
    .update({ where: { id }, data: { views: { increment: 1 } } })
    .catch(() => {
      // Non-critical — a missed view count shouldn't break playback.
    });
}

// ─── Coach-only: Media Hub management ───

export interface CoachActivityVideo extends VideoCardData {
  status: "draft" | "published" | "archived";
  createdAt: string;
}

function formatDuration(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Every status, for the coach-facing Media Hub table.
export async function getAllActivityVideosForCoach(): Promise<CoachActivityVideo[]> {
  if (!(await isCoach())) throw new Error("Not authorized");

  const videos = await prisma.activityVideo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return videos.map((v) => ({
    ...toCardData(v),
    status: v.status as "draft" | "published" | "archived",
    createdAt: v.createdAt.toISOString(),
  }));
}

export interface CreateActivityVideoInput {
  title: string;
  description: string;
  videoUrl: string;
  videoPublicId: string;
  durationSeconds: number;
  difficulty: Difficulty;
  ageGroup: string;
  coach: string;
  setting: Setting;
  equipment: string[];
}

// Called after a successful direct-to-Cloudinary upload (see the upload
// form in the Media Hub) to persist the video's metadata. The thumbnail is
// derived from Cloudinary's automatic video-to-jpg conversion, so no
// separate thumbnail upload is needed.
export async function createActivityVideo(input: CreateActivityVideoInput) {
  if (!(await isCoach())) throw new Error("Not authorized");

  if (!input.title.trim() || !input.videoUrl || !input.videoPublicId) {
    throw new Error("Title and an uploaded video are required.");
  }

  const thumbnailUrl = input.videoUrl
    .replace("/video/upload/", "/video/upload/so_0/")
    .replace(/\.[^./]+$/, ".jpg");

  await prisma.activityVideo.create({
    data: {
      title: input.title.trim(),
      description: input.description.trim(),
      videoUrl: input.videoUrl,
      videoPublicId: input.videoPublicId,
      thumbnailUrl,
      duration: formatDuration(input.durationSeconds),
      difficulty: input.difficulty,
      ageGroup: input.ageGroup,
      coach: input.coach,
      setting: input.setting,
      equipment: input.equipment,
      status: "draft",
    },
  });

  revalidatePath("/dashboard/media-hub");
  revalidatePath("/activity-library");
}

export async function setActivityVideoStatus(
  id: string,
  status: "draft" | "published" | "archived"
) {
  if (!(await isCoach())) throw new Error("Not authorized");

  await prisma.activityVideo.update({ where: { id }, data: { status } });

  revalidatePath("/dashboard/media-hub");
  revalidatePath("/activity-library");
}

export async function deleteActivityVideo(id: string) {
  if (!(await isCoach())) throw new Error("Not authorized");

  await prisma.activityVideo.delete({ where: { id } }).catch(() => {
    // Already gone — nothing to do.
  });

  revalidatePath("/dashboard/media-hub");
  revalidatePath("/activity-library");
}
