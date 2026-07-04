const equipment = [
  { icon: "inventory_2", label: '24" Plyo Box' },
  { icon: "timer", label: "Stopwatch" },
  { icon: "fitness_center", label: "Weight Vest (10pt)" },
];

export default function EquipmentAndSafety() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow mb-6">
      <h2 className="font-label-md text-label-md uppercase tracking-wider text-primary border-l-4 border-primary pl-3 mb-4">
        Equipment Needed
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {equipment.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 border border-outline-variant rounded-lg px-4 py-3"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              {item.icon}
            </span>
            <span className="text-sm text-on-surface">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-error-container/40 border border-error/30 rounded-lg p-4 flex gap-3">
        <span className="material-symbols-outlined text-error text-[20px] shrink-0">
          warning
        </span>
        <div>
          <h3 className="text-error font-label-md text-sm mb-1">Safety Protocol</h3>
          <p className="text-on-surface-variant text-sm">
            Ensure a non-slip surface is available. Maintain a 5-minute
            warm-up before attempting high-impact jumps. Discontinue
            immediately if sharp joint pain occurs.
          </p>
        </div>
      </div>
    </div>
  );
}
