import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedActivities from "@/components/home/FeaturedActivities";

export default function HomePage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedActivities />
      </main>
      <Footer />
    </div>
  );
}
