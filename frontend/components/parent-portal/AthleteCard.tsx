interface ProgressEntryData {
  id: string;
  metric: string;
  value: string;
  notes: string | null;
  recordedAt: Date;
}

interface AthleteCardProps {
  name: string;
  ageGroup: string;
  sport: string | null;
  progress: ProgressEntryData[];
}

export default function AthleteCard({ name, ageGroup, sport, progress }: AthleteCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-headline-md text-[18px] text-on-surface">{name}</h3>
          <p className="text-on-surface-variant text-xs">
            {ageGroup}
            {sport ? ` • ${sport}` : ""}
          </p>
        </div>
        <span className="material-symbols-outlined text-[32px] text-primary">person</span>
      </div>

      {progress.length === 0 ? (
        <p className="text-on-surface-variant text-sm italic">
          No progress entries yet. Your coach will add updates after each session.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {progress.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between border-t border-outline-variant/30 pt-3"
            >
              <div>
                <p className="text-sm font-medium text-on-surface">{entry.metric}</p>
                {entry.notes && (
                  <p className="text-xs text-on-surface-variant">{entry.notes}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">{entry.value}</p>
                <p className="text-[10px] text-on-surface-variant">
                  {new Date(entry.recordedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
