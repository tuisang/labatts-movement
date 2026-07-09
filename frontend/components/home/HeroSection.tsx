export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <div className="relative z-10 max-w-container-max mx-auto min-h-[600px] md:min-h-[700px] flex flex-col justify-center px-margin-mobile md:px-margin-desktop pb-24 sm:pb-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Featured Program
          </span>
          <span className="text-white/80 text-sm">High Performance Track</span>
        </div>

        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white max-w-2xl mb-6">
          Master the Fundamentals of{" "}
          <span className="text-primary-fixed-dim">Movement</span>
        </h1>

        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white/40"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=200')",
            }}
          />
          <div>
            <p className="text-white font-label-md text-label-md">Lead Coach Sarah Mitchell</p>
            <p className="text-white/70 text-xs">Specialist in Biomechanics &amp; Explosive Power</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Book This Program
          </button>
          <button className="bg-white/10 backdrop-blur-sm text-white border border-white/40 px-6 py-3 rounded-lg font-label-md hover:bg-white/20 transition-colors">
            View Similar Activities
          </button>
        </div>

        <button className="absolute bottom-10 right-6 md:right-10 flex items-center gap-3 text-white group">
          <span className="w-14 h-14 flex items-center justify-center rounded-full bg-black/50 border border-white/40 group-hover:bg-black/70 transition-colors">
            <span
              className="material-symbols-outlined text-[28px] translate-x-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </span>
          <span className="text-left hidden sm:block">
            <span className="block text-[10px] uppercase tracking-widest text-white/70">
              Watch Preview
            </span>
            <span className="block text-sm font-medium">Duration: 2:45</span>
          </span>
        </button>
      </div>
    </section>
  );
}
