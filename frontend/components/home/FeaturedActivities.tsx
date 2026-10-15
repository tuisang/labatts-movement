import Link from "next/link";
import VideoCard from "@/components/activity-library/VideoCard";
import type { VideoCardData } from "@/components/activity-library/types";

export default function FeaturedActivities({ videos }: { videos: VideoCardData[] }) {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-1">
            Latest Training Videos
          </h2>
          <p className="text-on-surface-variant">Fresh sessions from our coaches.</p>
        </div>
        <Link
          href="/activity-library"
          className="hidden sm:flex items-center gap-1 text-primary font-label-md hover:underline whitespace-nowrap"
        >
          View all
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>

      {videos.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl p-10 text-center video-card-shadow text-on-surface-variant">
          New training videos are coming soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}
