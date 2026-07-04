import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import VideoHero from "@/components/video-detail/VideoHero";
import DescriptionAndObjectives from "@/components/video-detail/DescriptionAndObjectives";
import EquipmentAndSafety from "@/components/video-detail/EquipmentAndSafety";
import TransformationJourney from "@/components/video-detail/TransformationJourney";
import CoachPOVDrills from "@/components/video-detail/CoachPOVDrills";
import ClassTools from "@/components/video-detail/ClassTools";

export default function VideoDetailPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <VideoHero />
        <DescriptionAndObjectives />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-start">
          <EquipmentAndSafety />
          <TransformationJourney />
        </div>

        <CoachPOVDrills />
        <ClassTools />
      </main>

      <Footer />
    </div>
  );
}
