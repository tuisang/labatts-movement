export default function VideoHero() {
  return (
    <div className="mb-8">
      <span className="inline-block bg-error text-on-error text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">
        Advanced Level
      </span>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Explosive Plyometric Drills: Phase 1
        </h1>
        <div className="flex gap-3 shrink-0">
          <button className="flex items-center gap-2 border border-outline-variant text-on-surface-variant px-4 py-2 rounded-lg text-sm hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download Lesson (PDF)
          </button>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-sm hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Book Similar Session
          </button>
        </div>
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden bg-inverse-surface">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <button className="absolute inset-0 flex items-center justify-center group">
          <span className="w-20 h-20 flex items-center justify-center rounded-full bg-primary group-hover:bg-primary-container transition-colors">
            <span
              className="material-symbols-outlined text-white text-[36px] translate-x-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
