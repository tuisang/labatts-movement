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

/**
 * Cloudinary can re-encode any uploaded video on the fly. Phone cameras often
 * record HEVC/.mov files that Chrome and Firefox can't decode, so playback uses
 * a universally supported H.264/AAC MP4 rendition instead of the raw upload.
 */
export function toPlaybackUrl(url: string): string {
  const marker = "/video/upload/";
  const i = url.indexOf(marker);
  if (i === -1) return url;
  const head = url.slice(0, i + marker.length);
  const rest = url.slice(i + marker.length);
  // Already has a transformation segment (contains a comma-separated param list)
  if (/^[a-z]{1,3}_[^/]*,/.test(rest) || /^(f|vc|q)_[^/]+\//.test(rest)) return url;
  return `${head}f_mp4,vc_h264,ac_aac,q_auto/${rest.replace(/\.[^./?]+$/, ".mp4")}`;
}
