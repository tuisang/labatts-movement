"use client";

import { useState } from "react";

type Status = "Published" | "Draft" | "Archived";

interface MediaItem {
  id: string;
  title: string;
  meta: string;
  status: Status;
  views: string;
  categories: string[];
  date: string;
  thumbnailUrl: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "explosive-start-drills",
    title: "Explosive Start Drills",
    meta: "08:42 • 4K UHD",
    status: "Published",
    views: "12,402",
    categories: ["Sprinting", "Agility"],
    date: "Oct 12, 2023",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=200",
  },
  {
    id: "olympic-lifting-basics",
    title: "Olympic Lifting Basics",
    meta: "15:20 • 1080p",
    status: "Draft",
    views: "0",
    categories: ["Strength"],
    date: "Dec 01, 2023",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=200",
  },
  {
    id: "facility-tour-intro",
    title: "Facility Tour & Intro",
    meta: "03:15 • 4K UHD",
    status: "Published",
    views: "45,110",
    categories: ["General"],
    date: "Aug 22, 2023",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=200",
  },
  {
    id: "mobility-flow-session-1",
    title: "Mobility Flow: Session 1",
    meta: "22:00 • 1080p",
    status: "Published",
    views: "2,891",
    categories: ["Recovery", "Yoga"],
    date: "Nov 15, 2023",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=200",
  },
];

const tabs = ["All Content", "Published", "Drafts", "Archived"];

const statusClasses: Record<Status, string> = {
  Published: "bg-tertiary-container text-on-tertiary-container",
  Draft: "bg-surface-container-high text-on-surface-variant",
  Archived: "bg-error-container text-on-error-container",
};

export default function MediaTable() {
  const [activeTab, setActiveTab] = useState("All Content");

  const filtered = mediaItems.filter((item) => {
    if (activeTab === "All Content") return true;
    if (activeTab === "Published") return item.status === "Published";
    if (activeTab === "Drafts") return item.status === "Draft";
    if (activeTab === "Archived") return item.status === "Archived";
    return true;
  });

  return (
    <div className="bg-surface-container-lowest rounded-xl video-card-shadow overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-outline-variant/50">
        <div className="flex gap-1 bg-surface-container rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === activeTab
                  ? "bg-surface-container-lowest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <select className="border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface-variant bg-surface-container-lowest">
          <option>Sort by: Newest First</option>
          <option>Sort by: Oldest First</option>
          <option>Sort by: Most Views</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/50">
              <th className="px-5 py-3 font-medium">Media Item</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Views</th>
              <th className="px-5 py-3 font-medium">Categories</th>
              <th className="px-5 py-3 font-medium">Date Uploaded</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-outline-variant/30 last:border-0">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-10 rounded bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url('${item.thumbnailUrl}')` }}
                    />
                    <div>
                      <p className="font-medium text-on-surface">{item.title}</p>
                      <p className="text-xs text-on-surface-variant">{item.meta}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusClasses[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-on-surface">{item.views}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {item.categories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-surface-container text-on-surface-variant text-xs px-2 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-on-surface-variant">{item.date}</td>
                <td className="px-5 py-4 text-right">
                  <button className="text-on-surface-variant hover:text-on-surface">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-5 text-sm text-on-surface-variant">
        <span>Showing 1-{filtered.length} of 1,284 results</span>
        <div className="flex gap-2">
          <button className="border border-outline-variant px-3 py-1.5 rounded-lg hover:bg-surface-container transition-colors">
            Previous
          </button>
          <button className="border border-outline-variant px-3 py-1.5 rounded-lg hover:bg-surface-container transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
