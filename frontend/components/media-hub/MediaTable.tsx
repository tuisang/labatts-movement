"use client";

import { useState } from "react";
import { setActivityVideoStatus, deleteActivityVideo } from "@/app/activity-library/actions";
import { formatViews } from "@/components/activity-library/types";
import type { CoachActivityVideo } from "@/app/activity-library/actions";

type Status = "draft" | "published" | "archived";

const tabs: { label: string; status: Status | "all" }[] = [
  { label: "All Content", status: "all" },
  { label: "Published", status: "published" },
  { label: "Drafts", status: "draft" },
  { label: "Archived", status: "archived" },
];

const statusClasses: Record<Status, string> = {
  published: "bg-tertiary-container text-on-tertiary-container",
  draft: "bg-surface-container-high text-on-surface-variant",
  archived: "bg-error-container text-on-error-container",
};

export default function MediaTable({
  videos,
  onChanged,
}: {
  videos: CoachActivityVideo[];
  onChanged: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Status | "all">("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = videos.filter((v) => activeTab === "all" || v.status === activeTab);

  const handleStatusChange = async (id: string, status: Status) => {
    setBusyId(id);
    try {
      await setActivityVideoStatus(id, status);
      onChanged();
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video permanently? This can't be undone.")) return;
    setBusyId(id);
    try {
      await deleteActivityVideo(id);
      onChanged();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl video-card-shadow overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-outline-variant/50">
        <div className="flex gap-1 bg-surface-container rounded-lg p-1 w-fit flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab.status === activeTab
                  ? "bg-surface-container-lowest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-on-surface-variant">
                  No media here yet.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="border-b border-outline-variant/30 last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-10 rounded bg-cover bg-center shrink-0 bg-surface-container"
                        style={{ backgroundImage: `url('${item.thumbnailUrl}')` }}
                      />
                      <div>
                        <p className="font-medium text-on-surface">{item.title}</p>
                        <p className="text-xs text-on-surface-variant">{item.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusClasses[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-on-surface">{formatViews(item.views)}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {item.equipment.map((cat) => (
                        <span
                          key={cat}
                          className="bg-surface-container text-on-surface-variant text-xs px-2 py-1 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-on-surface-variant">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.status !== "published" && (
                        <button
                          disabled={busyId === item.id}
                          onClick={() => handleStatusChange(item.id, "published")}
                          className="text-xs font-medium text-primary hover:underline disabled:opacity-50"
                        >
                          Publish
                        </button>
                      )}
                      {item.status !== "archived" && (
                        <button
                          disabled={busyId === item.id}
                          onClick={() => handleStatusChange(item.id, "archived")}
                          className="text-xs font-medium text-on-surface-variant hover:underline disabled:opacity-50"
                        >
                          Archive
                        </button>
                      )}
                      <button
                        disabled={busyId === item.id}
                        onClick={() => handleDelete(item.id)}
                        className="text-xs font-medium text-error hover:underline disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
