"use client";

import { useState } from "react";
import FilterSidebar, { ActiveFilters, emptyFilters } from "@/components/activity-library/FilterSidebar";

interface FeaturedActivity {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  meta: string;
  progress: number;
}

const featuredActivities: FeaturedActivity[] = [
  {
    id: "explosive-starting-block",
    title: "Explosive Starting Block Technique",
    description: "Master the physics of the first 10 meters with data-driven analysis.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800",
    duration: "12:45",
    difficulty: "Intermediate",
    meta: "Blocks Required",
    progress: 70,
  },
  {
    id: "advanced-agility-ladder",
    title: "Advanced Agility Ladder Circuits",
    description: "Improve neuromuscular coordination and lateral quickness.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800",
    duration: "08:20",
    difficulty: "Advanced",
    meta: "Ladder & Cones",
    progress: 40,
  },
];

export default function FeaturedActivities() {
  const [filters, setFilters] = useState<ActiveFilters>(emptyFilters);

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
      <div className="flex flex-col md:flex-row gap-10">
        <FilterSidebar filters={filters} onChange={setFilters} />

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featuredActivities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-surface-container-lowest rounded-xl overflow-hidden video-card-shadow transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${activity.thumbnailUrl}')` }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <span
                  className={`absolute top-3 right-3 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider ${
                    activity.difficulty === "Advanced" ? "bg-error" : "bg-primary"
                  }`}
                >
                  {activity.difficulty}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/80 text-white text-label-sm px-2 py-1 rounded">
                  {activity.duration}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-headline-md text-[17px] text-on-surface mb-2">
                  {activity.title}
                </h3>
                <p className="text-on-surface-variant text-sm mb-4">{activity.description}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">build</span>
                    {activity.meta}
                  </span>
                  <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${activity.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
