const stats = [
  { label: "Total Videos", value: "1,284", color: "text-on-surface" },
  { label: "Monthly Views", value: "84.2k", color: "text-primary" },
  { label: "Storage Used", value: "72%", color: "text-on-surface" },
  { label: "Avg. Completion", value: "89%", color: "text-tertiary" },
];

export default function MediaHubStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-5 video-card-shadow"
        >
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
            {stat.label}
          </p>
          <p className={`font-headline-md text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
