import { notFound } from "next/navigation";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import { videoLibraryData, difficultyBadgeClasses } from "@/components/activity-library/types";

export function generateStaticParams() {
  return videoLibraryData.map((video) => ({ slug: video.id }));
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = videoLibraryData.find((v) => v.id === slug);

  if (!video) {
    notFound();
  }

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <span
          className={`inline-block ${difficultyBadgeClasses[video.difficulty]} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-3`}
        >
          {video.difficulty}
        </span>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="font-headline-md text-headline-md text-on-surface">{video.title}</h1>
          <a
            href="/book-session"
            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-sm hover:bg-primary-container transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Book This Session
          </a>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden bg-inverse-surface mb-8">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: `url('${video.thumbnailUrl}')` }}
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
          <span className="absolute bottom-3 right-3 bg-black/80 text-white text-label-sm px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
            <h2 className="font-label-md text-label-md uppercase tracking-wider text-primary border-l-4 border-primary pl-3 mb-4">
              About This Session
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">{video.description}</p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
            <h2 className="font-label-md text-label-md uppercase tracking-wider text-primary border-l-4 border-primary pl-3 mb-4">
              Session Details
            </h2>
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Coach</dt>
                <dd className="text-on-surface font-medium">{video.coach}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Age Group</dt>
                <dd className="text-on-surface font-medium">{video.ageGroup}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Duration</dt>
                <dd className="text-on-surface font-medium">{video.duration}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Setting</dt>
                <dd className="text-on-surface font-medium">{video.setting}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Views</dt>
                <dd className="text-on-surface font-medium">{video.views}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
          <h2 className="font-label-md text-label-md uppercase tracking-wider text-primary border-l-4 border-primary pl-3 mb-4">
            Equipment Needed
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {video.equipment.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 border border-outline-variant rounded-lg px-4 py-2"
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  fitness_center
                </span>
                <span className="text-sm text-on-surface">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-error-container/40 border border-error/30 rounded-lg p-4 flex gap-3">
            <span className="material-symbols-outlined text-error text-[20px] shrink-0">
              warning
            </span>
            <div>
              <h3 className="text-error font-label-md text-sm mb-1">Safety Note</h3>
              <p className="text-on-surface-variant text-sm">
                Ensure a proper warm-up before starting. Discontinue immediately if sharp
                joint pain or unusual discomfort occurs, and consult a coach before
                continuing.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
