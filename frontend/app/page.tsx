import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedActivities from "@/components/home/FeaturedActivities";
import { getPublishedActivityVideos } from "@/app/activity-library/actions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Homepage shows the newest published videos; fall back to nothing if the DB is unreachable.
  const videos = await getPublishedActivityVideos().catch(() => []);

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1">
        <HeroSection video={videos[0] ?? null} />
        <FeaturedActivities videos={videos.slice(0, 6)} />
      </main>
      <Footer />
    </div>
  );
}
