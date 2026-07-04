const drills = [
  {
    id: "frontal-focus",
    label: "Initial Take-off: Frontal Focus",
    angle: "Front Angle",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
  },
  {
    id: "hip-mechanics",
    label: "Hip Mechanics: Profile View",
    angle: "Side Angle",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800",
  },
  {
    id: "contact-time",
    label: "Contact Time: Ultra Slow-Mo",
    angle: "0.25x Slow-mo",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800",
  },
];

export default function CoachPOVDrills() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
      <h2 className="font-headline-md text-[18px] text-on-surface mb-1">Coach POV Drills</h2>
      <p className="text-on-surface-variant text-xs mb-4">Master the form with multi-angle views</p>

      <div className="flex flex-col gap-6">
        {drills.map((drill) => (
          <div key={drill.id}>
            <div className="relative rounded-lg overflow-hidden aspect-video">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${drill.imageUrl}')` }}
              />
              <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">videocam</span>
                {drill.angle}
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mt-2">{drill.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
