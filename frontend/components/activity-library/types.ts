export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Setting = "Indoor" | "Outdoor";
export type VideoStatus = "draft" | "published" | "archived";

export interface VideoCardData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  difficulty: Difficulty;
  ageGroup: string;
  coach: string;
  views: number;
  setting: Setting;
  equipment: string[];
}

export function formatViews(views: number): string {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(views >= 10000 ? 0 : 1)}k Views`;
  }
  return `${views} ${views === 1 ? "View" : "Views"}`;
}

export const difficultyBadgeClasses: Record<Difficulty, string> = {
  Beginner: "bg-tertiary",
  Intermediate: "bg-primary",
  Advanced: "bg-error",
};
