import Link from "next/link";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import CoachSessionsManager from "@/components/coach/CoachSessionsManager";
import CoachEquipmentManager from "@/components/coach/CoachEquipmentManager";
import FacilityProjectsManager from "@/components/facility/FacilityProjectsManager";
import SeedDefaultsButton from "@/components/coach/SeedDefaultsButton";
import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";

export const dynamic = "force-dynamic";

export default async function AdminCatalogPage() {
  const authorized = await isCoach();

  if (!authorized) {
    return (
      <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
        <TopNavBar />
        <main className="flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-16">
          <div className="bg-surface-container-lowest rounded-xl p-10 video-card-shadow text-center max-w-md">
            <span className="material-symbols-outlined text-[40px] text-error mb-3 block">block</span>
            <h2 className="font-headline-md text-[18px] mb-2">Not Authorized</h2>
            <p className="text-on-surface-variant text-sm">
              Sign in with an admin account to manage items.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const [sessions, equipment] = await Promise.all([
    prisma.sessionOption.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.equipmentItem.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  const projects = await prisma.facilityProject.findMany({ orderBy: { createdAt: "desc" } }).catch(() => null);

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <Link href="/admin" className="inline-flex items-center gap-1 text-primary text-sm mb-4 hover:underline">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Admin
        </Link>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-2">
          Add &amp; Manage Items
        </h1>
        <p className="text-on-surface-variant max-w-2xl mb-10">
          Add equipment for hire, bookable sessions and training videos. Changes go live on the
          site immediately.
        </p>

        <div className="flex flex-col gap-10">
          <section>
            <h2 className="font-headline-md text-headline-md mb-4">
              Equipment for Hire ({equipment.length})
            </h2>
            <CoachEquipmentManager items={equipment} />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline-md text-headline-md">
                Session Options ({sessions.length})
              </h2>
              {sessions.length === 0 && <SeedDefaultsButton />}
            </div>
            <CoachSessionsManager sessions={sessions} />
          </section>

          <section>
            <h2 className="font-headline-md text-headline-md mb-4">
              Facility Project Gallery{projects ? ` (${projects.length})` : ""}
            </h2>
            {projects ? (
              <FacilityProjectsManager projects={projects} />
            ) : (
              <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow text-sm text-on-surface-variant">
                The gallery table doesn&apos;t exist yet. Run <code>npx prisma db push</code> once to create it.
              </div>
            )}
          </section>

          <section>
            <h2 className="font-headline-md text-headline-md mb-4">Training Videos</h2>
            <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-on-surface-variant text-sm">
                Upload, publish and delete videos in the Media Hub.
              </p>
              <Link
                href="/dashboard/media-hub"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[18px]">video_library</span>
                Open Media Hub
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
