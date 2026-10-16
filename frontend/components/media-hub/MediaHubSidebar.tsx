"use client";

import Link from "next/link";

export default function MediaHubSidebar({ onUpload }: { onUpload: () => void }) {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors font-medium w-full";

  return (
    <aside className="w-full md:w-64 shrink-0">
      <h2 className="font-headline-md text-headline-md text-primary mb-1">Media Hub</h2>
      <p className="text-on-surface-variant text-sm mb-6">Manage your training content</p>

      <nav className="flex flex-col gap-1">
        <span className={`${base} bg-primary text-on-primary`}>
          <span className="material-symbols-outlined text-[20px]">video_library</span>
          Media Library
        </span>
        <button
          onClick={onUpload}
          className={`${base} text-on-surface-variant hover:bg-surface-container`}
        >
          <span className="material-symbols-outlined text-[20px]">upload</span>
          Upload
        </button>
        <Link
          href="/activity-library"
          className={`${base} text-on-surface-variant hover:bg-surface-container`}
        >
          <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          View public library
        </Link>
        <Link
          href="/admin"
          className={`${base} text-on-surface-variant hover:bg-surface-container`}
        >
          <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
          Back to Admin
        </Link>
      </nav>
    </aside>
  );
}
