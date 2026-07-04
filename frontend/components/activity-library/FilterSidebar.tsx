const filters = [
  { icon: "mood", label: "Age" },
  { icon: "trending_up", label: "Skill Level" },
  { icon: "speed", label: "Difficulty" },
  { icon: "home_work", label: "Indoor/Outdoor" },
  { icon: "build", label: "Equipment" },
];

export default function FilterSidebar({
  active = "Age",
  onSelect,
  onClearAll,
}: {
  active?: string;
  onSelect?: (label: string) => void;
  onClearAll?: () => void;
}) {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <h2 className="font-headline-md text-headline-md text-primary mb-1">Filters</h2>
      <p className="text-on-surface-variant text-sm mb-6">Refine your training</p>

      <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">
        Category
      </p>
      <nav className="flex flex-col gap-1">
        {filters.map((filter) => {
          const isActive = filter.label === active;
          return (
            <button
              key={filter.label}
              onClick={() => onSelect?.(filter.label)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors font-medium ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{filter.icon}</span>
              {filter.label}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onClearAll}
        className="mt-4 text-primary font-label-md text-label-md hover:underline px-4"
      >
        Clear All
      </button>
    </aside>
  );
}
