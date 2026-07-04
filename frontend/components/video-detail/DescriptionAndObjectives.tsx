const objectives = [
  "Increase reactive strength index by 15%",
  '"Zero-Latency" landing mechanics',
  "Optimize ground contact time (GCT)",
];

export default function DescriptionAndObjectives() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
        <h2 className="font-label-md text-label-md uppercase tracking-wider text-primary border-l-4 border-primary pl-3 mb-4">
          Activity Description
        </h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          This session focuses on maximal power output through vertical
          displacement drills. By utilizing the stretch-shortening cycle,
          athletes will learn to produce force rapidly, improving their
          vertical leap and explosive start-speed. Perfect for basketball,
          volleyball, and elite track disciplines.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
        <h2 className="font-label-md text-label-md uppercase tracking-wider text-primary border-l-4 border-primary pl-3 mb-4">
          Objectives
        </h2>
        <ul className="flex flex-col gap-3">
          {objectives.map((objective) => (
            <li key={objective} className="flex items-start gap-2 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                check_circle
              </span>
              {objective}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
