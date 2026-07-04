export default function ClassTools() {
  return (
    <div className="mt-6">
      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-3">
        Class Tools
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-3 text-sm text-on-surface hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[18px] text-primary">
            auto_awesome
          </span>
          Analyze My Form (AI)
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-3 text-sm text-on-surface hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[18px] text-primary">forum</span>
          Ask Coach a Question
        </button>
      </div>
    </div>
  );
}
