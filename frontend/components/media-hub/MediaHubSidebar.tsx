"use client";

const navItems = [
  { icon: "video_library", label: "Media Library" },
  { icon: "upload", label: "Upload" },
  { icon: "playlist_play", label: "Playlists" },
  { icon: "bar_chart", label: "Analytics" },
  { icon: "forum", label: "Moderate Comments" },
];

export default function MediaHubSidebar({
  active = "Media Library",
  onSelect,
}: {
  active?: string;
  onSelect?: (label: string) => void;
}) {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <h2 className="font-headline-md text-headline-md text-primary mb-1">Media Hub</h2>
      <p className="text-on-surface-variant text-sm mb-6">Manage your training content</p>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.label === active;
          return (
            <button
              key={item.label}
              onClick={() => onSelect?.(item.label)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors font-medium ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <button className="mt-6 w-full text-left px-4 py-3 rounded-lg bg-surface-container text-on-surface-variant text-sm font-medium hover:bg-surface-container-high transition-colors">
        Clear All Filters
      </button>
    </aside>
  );
}
