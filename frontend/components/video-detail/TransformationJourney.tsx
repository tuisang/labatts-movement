export default function TransformationJourney() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="font-headline-md text-[18px] text-on-surface">Transformation Journey</h2>
          <p className="text-on-surface-variant text-xs">Progression tracking for Athlete ID: #8821</p>
        </div>
        <span className="bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
          12 Week Progress
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative rounded-lg overflow-hidden aspect-square bg-surface-container">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400')",
            }}
          />
          <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded">
            WEEK 1: BASELINE
          </span>
        </div>
        <div className="relative rounded-lg overflow-hidden aspect-square bg-surface-container">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=400')",
            }}
          />
          <span className="absolute top-2 left-2 bg-error text-white text-[10px] font-bold px-2 py-1 rounded">
            WEEK 12: ELITE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <p className="text-sm font-medium text-on-surface mb-1">Initial Assessment</p>
          <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "18%" }} />
          </div>
          <p className="text-[10px] text-on-surface-variant mt-1">Form Accuracy: 18%</p>
        </div>
        <div>
          <p className="text-sm font-medium text-on-surface mb-1">Mastery Reached</p>
          <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "95%" }} />
          </div>
          <p className="text-[10px] text-on-surface-variant mt-1">Form Accuracy: 95%</p>
        </div>
      </div>
    </div>
  );
}
