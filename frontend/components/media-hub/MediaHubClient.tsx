"use client";

import { useEffect, useState, useCallback } from "react";
import MediaHubSidebar from "@/components/media-hub/MediaHubSidebar";
import MediaHubStats from "@/components/media-hub/MediaHubStats";
import MediaTable from "@/components/media-hub/MediaTable";
import UploadVideoModal from "@/components/media-hub/UploadVideoModal";
import {
  getAllActivityVideosForCoach,
  type CoachActivityVideo,
} from "@/app/activity-library/actions";

export default function MediaHubClient() {
  const [activeNav, setActiveNav] = useState("Media Library");
  const [videos, setVideos] = useState<CoachActivityVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    getAllActivityVideosForCoach()
      .then(setVideos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <MediaHubSidebar active={activeNav} onSelect={setActiveNav} />

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">
              Media Library
            </h1>
            <p className="text-on-surface-variant">
              Monitor, edit, and organize your elite athletic training sessions and
              instructional content.
            </p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-lg font-label-md whitespace-nowrap hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Upload New Media
          </button>
        </div>

        <MediaHubStats />

        {loading ? (
          <div className="bg-surface-container-lowest rounded-xl p-10 text-center video-card-shadow text-on-surface-variant">
            Loading media…
          </div>
        ) : (
          <MediaTable videos={videos} onChanged={refresh} />
        )}
      </div>

      {showUpload && (
        <UploadVideoModal
          onClose={() => setShowUpload(false)}
          onUploaded={() => {
            setShowUpload(false);
            refresh();
          }}
        />
      )}
    </div>
  );
}
