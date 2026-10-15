import Link from "next/link";
import type { VideoCardData } from "@/components/activity-library/types";

const FALLBACK_BG =
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000";

export default function HeroSection({ video }: { video: VideoCardData | null }) {
  const bg = video?.thumbnailUrl || FALLBACK_BG;
  const watchHref = video ? `/activity-library/${video.id}` : "/activity-library";
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url('${bg}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <div className="relative z-10 max-w-container-max mx-auto min-h-[600px] md:min-h-[700px] flex flex-col justify-center px-margin-mobile md:px-margin-desktop pb-24 sm:pb-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Featured Program
          </span>
          <span className="text-white/80 text-sm">{video ? video.title : "High Performance Track"}</span>
        </div>

        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white max-w-2xl mb-6">
          Master the Fundamentals of{" "}
          <span className="text-primary-fixed-dim">Movement</span>
        </h1>

        {video && (
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold border-2 border-white/40">
              {video.coach.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-label-md text-label-md">Coach {video.coach}</p>
              <p className="text-white/70 text-xs">
                {video.difficulty} &middot; {video.ageGroup}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/book-session"
            className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Book This Program
          </Link>
          <Link
            href="/activity-library"
            className="bg-white/10 backdrop-blur-sm text-white border border-white/40 px-6 py-3 rounded-lg font-label-md hover:bg-white/20 transition-colors"
          >
            View Similar Activities
          </Link>
        </div>

        <Link
          href={watchHref}
          className="absolute bottom-10 right-6 md:right-10 flex items-center gap-3 text-white group"
        >
          <span className="w-14 h-14 flex items-center justify-center rounded-full bg-black/50 border border-white/40 group-hover:bg-black/70 transition-colors">
            <span
              className="material-symbols-outlined text-[28px] translate-x-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </span>
          <span className="text-left hidden sm:block">
            <span className="block text-[10px] uppercase tracking-widest text-white/70">
              Watch Preview
            </span>
            <span className="block text-sm font-medium">
              {video ? `Duration: ${video.duration}` : "Browse the library"}
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
