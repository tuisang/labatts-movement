import { formatViews } from "@/components/activity-library/types";
import type { CoachActivityVideo } from "@/app/activity-library/actions";

export default function MediaHubStats({ videos }: { videos: CoachActivityVideo[] }) {
  const published = videos.filter((v) => v.status === "published").length;
  const drafts = videos.filter((v) => v.status === "draft").length;
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);

  const stats = [
    { label: "Total Videos", value: String(videos.length), color: "text-on-surface" },
    { label: "Published", value: String(published), color: "text-primary" },
    { label: "Drafts", value: String(drafts), color: "text-on-surface" },
    { label: "Total Views", value: formatViews(totalViews).replace(/\s*views?$/i, ""), color: "text-tertiary" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-5 video-card-shadow"
        >
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
            {stat.label}
          </p>
          <p className={`font-headline-md text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
