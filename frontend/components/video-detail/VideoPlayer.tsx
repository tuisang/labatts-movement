"use client";

import { useState } from "react";
import { toPlaybackUrl } from "@/components/activity-library/types";

export default function VideoPlayer({
  videoUrl,
  poster,
  duration,
}: {
  videoUrl: string;
  poster: string;
  duration: string;
}) {
  // Try the universally-playable MP4 rendition first, then the original upload.
  const sources = Array.from(new Set([toPlaybackUrl(videoUrl), videoUrl]));
  const [attempt, setAttempt] = useState(0);
  const failed = attempt >= sources.length;

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-inverse-surface mb-8">
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-white p-6 bg-black">
          <span className="material-symbols-outlined text-[40px] text-white/70">videocam_off</span>
          <p className="text-sm max-w-sm">
            This video couldn&apos;t be played in your browser. It may still be processing, or its
            format may not be supported.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setAttempt(0)}
              className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-label-md"
            >
              Try again
            </button>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-white/40 text-sm font-label-md"
            >
              Open file
            </a>
          </div>
        </div>
      ) : (
        <video
          key={sources[attempt]}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          src={sources[attempt]}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          onError={() => setAttempt((a) => a + 1)}
        >
          Your browser does not support video playback.
        </video>
      )}
      {!failed && (
        <span className="absolute bottom-3 right-3 bg-black/80 text-white text-label-sm px-2 py-1 rounded pointer-events-none">
          {duration}
        </span>
      )}
    </div>
  );
}
