"use client";

import { useState } from "react";
import CoachAthleteCard from "./CoachAthleteCard";

interface ProgressEntryData {
  id: string;
  metric: string;
  value: string;
  notes: string | null;
  recordedAt: Date;
}

interface AthleteData {
  id: string;
  name: string;
  ageGroup: string;
  sport: string | null;
  parentClerkId: string;
  progress: ProgressEntryData[];
}

const PAGE_SIZE = 9;

export default function CoachAthletesGrid({ athletes }: { athletes: AthleteData[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(athletes.length / PAGE_SIZE));
  const paginated = athletes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((athlete) => (
          <CoachAthleteCard
            key={athlete.id}
            id={athlete.id}
            name={athlete.name}
            ageGroup={athlete.ageGroup}
            sport={athlete.sport}
            parentClerkId={athlete.parentClerkId}
            progress={athlete.progress}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <span className="flex items-center px-3 text-sm text-on-surface-variant">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      )}
    </div>
  );
}
