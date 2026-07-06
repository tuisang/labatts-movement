"use client";

import { useRef } from "react";
import { addProgressEntry } from "@/app/dashboard/coach/actions";

interface ProgressEntryData {
  id: string;
  metric: string;
  value: string;
  notes: string | null;
  recordedAt: Date;
}

interface CoachAthleteCardProps {
  id: string;
  name: string;
  ageGroup: string;
  sport: string | null;
  parentClerkId: string;
  progress: ProgressEntryData[];
}

export default function CoachAthleteCard({
  id,
  name,
  ageGroup,
  sport,
  parentClerkId,
  progress,
}: CoachAthleteCardProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-headline-md text-[18px] text-on-surface">{name}</h3>
          <p className="text-on-surface-variant text-xs">
            {ageGroup}
            {sport ? ` • ${sport}` : ""}
          </p>
          <p className="text-on-surface-variant text-[10px] mt-1">
            Parent ID: {parentClerkId.slice(0, 12)}...
          </p>
        </div>
        <span className="material-symbols-outlined text-[28px] text-primary">person</span>
      </div>

      {progress.length > 0 && (
        <div className="flex flex-col gap-2 mb-4 border-t border-outline-variant/30 pt-3">
          {progress.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between text-sm">
              <span className="text-on-surface-variant">
                {entry.metric}
                {entry.notes ? ` — ${entry.notes}` : ""}
              </span>
              <span className="font-medium text-primary">{entry.value}</span>
            </div>
          ))}
        </div>
      )}

      <form
        ref={formRef}
        action={async (formData) => {
          await addProgressEntry(formData);
          formRef.current?.reset();
        }}
        className="flex flex-col gap-2 border-t border-outline-variant/30 pt-3"
      >
        <input type="hidden" name="athleteId" value={id} />
        <div className="grid grid-cols-2 gap-2">
          <input
            name="metric"
            placeholder="Metric (e.g. Vertical jump)"
            required
            className="border border-outline-variant rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="value"
            placeholder="Value (e.g. 24 in)"
            required
            className="border border-outline-variant rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <input
          name="notes"
          placeholder="Notes (optional)"
          className="border border-outline-variant rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="self-start bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-label-md hover:bg-primary-container transition-colors"
        >
          Add Progress Entry
        </button>
      </form>
    </div>
  );
}
