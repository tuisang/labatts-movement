"use client";

import { useState } from "react";

export interface ActiveFilters {
  ageGroup: string[];
  difficulty: string[];
  setting: string[];
  equipment: string[];
}

export const emptyFilters: ActiveFilters = {
  ageGroup: [],
  difficulty: [],
  setting: [],
  equipment: [],
};

interface FilterCategory {
  key: keyof ActiveFilters;
  icon: string;
  label: string;
  options: string[];
}

// Note: "Skill Level" from the original design and "Difficulty" both map to the
// same underlying field — the data model only tracks one skill dimension.
const categories: FilterCategory[] = [
  { key: "ageGroup", icon: "mood", label: "Age", options: ["Ages 4-7", "Ages 5-8", "Ages 10+", "Ages 12+", "Ages 16+"] },
  { key: "difficulty", icon: "trending_up", label: "Skill Level", options: ["Beginner", "Intermediate", "Advanced"] },
  { key: "setting", icon: "home_work", label: "Indoor/Outdoor", options: ["Indoor", "Outdoor"] },
  { key: "equipment", icon: "build", label: "Equipment", options: ["Plyo Box", "Cones", "Agility Ladder", "Soccer Ball", "Starting Blocks", "None"] },
];

export default function FilterSidebar({
  filters,
  onChange,
}: {
  filters: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
}) {
  const [expanded, setExpanded] = useState<keyof ActiveFilters | null>("ageGroup");

  const toggleOption = (key: keyof ActiveFilters, option: string) => {
    const current = filters[key];
    const next = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    onChange({ ...filters, [key]: next });
  };

  const totalActive = Object.values(filters).flat().length;

  return (
    <aside className="w-full md:w-64 shrink-0">
      <h2 className="font-headline-md text-headline-md text-primary mb-1">Filters</h2>
      <p className="text-on-surface-variant text-sm mb-6">Refine your training</p>

      <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">
        Category
      </p>
      <div className="flex flex-col gap-1">
        {categories.map((category) => {
          const isExpanded = expanded === category.key;
          const activeCount = filters[category.key].length;
          return (
            <div key={category.key}>
              <button
                onClick={() => setExpanded(isExpanded ? null : category.key)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-left transition-colors font-medium ${
                  activeCount > 0
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{category.icon}</span>
                  {category.label}
                  {activeCount > 0 && (
                    <span className="bg-on-primary/20 text-xs px-1.5 py-0.5 rounded-full">
                      {activeCount}
                    </span>
                  )}
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  {isExpanded ? "expand_less" : "expand_more"}
                </span>
              </button>

              {isExpanded && (
                <div className="flex flex-col gap-1 pl-4 py-2">
                  {category.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm text-on-surface-variant cursor-pointer hover:text-on-surface"
                    >
                      <input
                        type="checkbox"
                        checked={filters[category.key].includes(option)}
                        onChange={() => toggleOption(category.key, option)}
                        className="accent-primary"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onChange(emptyFilters)}
        disabled={totalActive === 0}
        className="mt-4 text-primary font-label-md text-label-md hover:underline px-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline"
      >
        Clear All{totalActive > 0 ? ` (${totalActive})` : ""}
      </button>
    </aside>
  );
}
