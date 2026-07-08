import Link from "next/link";
import { VideoCardData, difficultyBadgeClasses } from "./types";

export default function VideoCard({ video }: { video: VideoCardData }) {
  return (
    <div className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden video-card-shadow transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${video.thumbnailUrl}')` }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center bg-white/30 backdrop-blur-md rounded-full text-white border border-white/40 opacity-90 group-hover:opacity-100 group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300">
            <span
              className="material-symbols-outlined text-[40px] translate-x-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span
            className={`${difficultyBadgeClasses[video.difficulty]} text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider`}
          >
            {video.difficulty}
          </span>
          <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
            {video.ageGroup}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-black/80 text-white text-label-sm px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-headline-md text-[18px] text-on-surface mb-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-on-surface-variant font-body-md text-sm line-clamp-2 mb-4">
          {video.description}
        </p>
        <div className="mt-auto grid grid-cols-2 gap-4 border-t border-outline-variant/30 pt-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              person
            </span>
            <span className="text-label-sm text-on-surface-variant">{video.coach}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              visibility
            </span>
            <span className="text-label-sm text-on-surface-variant">{video.views}</span>
          </div>
        </div>
        <Link
          href={`/activity-library/${video.id}`}
          className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors"
        >
          Watch Lesson
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
