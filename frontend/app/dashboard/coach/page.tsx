import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import CoachAthleteCard from "@/components/coach/CoachAthleteCard";
import CoachBookingsTable from "@/components/coach/CoachBookingsTable";
import CoachInstitutionsTable from "@/components/coach/CoachInstitutionsTable";
import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";

async function CoachDashboardContent() {
  const authorized = await isCoach();

  if (!authorized) {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-10 video-card-shadow text-center max-w-md">
        <span className="material-symbols-outlined text-[40px] text-error mb-3 block">
          block
        </span>
        <h2 className="font-headline-md text-[18px] text-on-surface mb-2">
          Not Authorized
        </h2>
        <p className="text-on-surface-variant text-sm">
          This dashboard is only available to coaching staff. If you believe
          you should have access, contact the administrator.
        </p>
      </div>
    );
  }

  const [athletes, bookings, institutionBookings] = await Promise.all([
    prisma.athlete.findMany({
      include: { progress: { orderBy: { recordedAt: "desc" } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.institutionBooking.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="flex flex-col gap-10 w-full">
      <section>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
          Athletes ({athletes.length})
        </h2>
        {athletes.length === 0 ? (
          <p className="text-on-surface-variant text-sm italic">
            No athletes added by parents yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {athletes.map((athlete) => (
              <CoachAthleteCard
                key={athlete.id}
                id={athlete.id}
                name={athlete.name}
                ageGroup={athlete.ageGroup}
                sport={athlete.sport}
                parentClerkId={athlete.parentClerkId}
                progress={athlete.progress}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
          Bookings ({bookings.length})
        </h2>
        <CoachBookingsTable bookings={bookings} />
      </section>

      <section>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
          Institution Inquiries ({institutionBookings.length})
        </h2>
        <CoachInstitutionsTable bookings={institutionBookings} />
      </section>
    </div>
  );
}

export default function CoachDashboardPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Coach Dashboard
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl mb-10">
          Manage athlete progress, bookings, and institution partnerships.
        </p>

        <SignedOut>
          <div className="bg-surface-container-lowest rounded-xl p-10 video-card-shadow text-center max-w-md">
            <span className="material-symbols-outlined text-[40px] text-primary mb-3 block">
              lock
            </span>
            <p className="text-on-surface-variant mb-6">Sign in to access the coach dashboard.</p>
            <SignInButton mode="modal">
              <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <CoachDashboardContent />
        </SignedIn>
      </main>

      <Footer />
    </div>
  );
}
