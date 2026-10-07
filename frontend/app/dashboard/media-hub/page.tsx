import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import MediaHubClient from "@/components/media-hub/MediaHubClient";
import { isCoach } from "@/lib/coachAuth";

export default async function MediaHubPage() {
  const authorized = await isCoach();

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        {authorized ? (
          <MediaHubClient />
        ) : (
          <div className="bg-surface-container-lowest rounded-xl p-10 video-card-shadow text-center max-w-md mx-auto">
            <span className="material-symbols-outlined text-[40px] text-error mb-3 block">
              block
            </span>
            <h2 className="font-headline-md text-[18px] text-on-surface mb-2">
              Not Authorized
            </h2>
            <p className="text-on-surface-variant text-sm">
              This page is only available to coaching staff. If you believe
              you should have access, contact the administrator.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
