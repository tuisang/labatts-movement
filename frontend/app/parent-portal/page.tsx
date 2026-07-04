import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import AddAthleteForm from "@/components/parent-portal/AddAthleteForm";
import AthleteCard from "@/components/parent-portal/AthleteCard";
import BookingsList from "@/components/parent-portal/BookingsList";
import { prisma } from "@/lib/prisma";

async function ParentDashboard() {
  const { userId } = await auth();
  if (!userId) return null;

  const [athletes, bookings] = await Promise.all([
    prisma.athlete.findMany({
      where: { parentClerkId: userId },
      include: { progress: { orderBy: { recordedAt: "desc" } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.findMany({
      where: { clerkUserId: userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <AddAthleteForm />

      {athletes.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl p-8 video-card-shadow text-center">
          <span className="material-symbols-outlined text-[40px] text-primary mb-3 block">
            family_restroom
          </span>
          <p className="text-on-surface-variant">
            Add your first athlete above to start tracking their progress.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {athletes.map((athlete) => (
            <AthleteCard
              key={athlete.id}
              name={athlete.name}
              ageGroup={athlete.ageGroup}
              sport={athlete.sport}
              progress={athlete.progress}
            />
          ))}
        </div>
      )}

      <BookingsList bookings={bookings} />
    </div>
  );
}

export default function ParentPortalPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Parent Portal
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl mb-10">
          Track your athlete&apos;s progress and manage bookings.
        </p>

        <SignedOut>
          <div className="bg-surface-container-lowest rounded-xl p-10 video-card-shadow text-center max-w-md">
            <span className="material-symbols-outlined text-[40px] text-primary mb-3 block">
              lock
            </span>
            <p className="text-on-surface-variant mb-6">
              Sign in to view your athlete&apos;s progress and bookings.
            </p>
            <SignInButton mode="modal">
              <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <ParentDashboard />
        </SignedIn>
      </main>

      <Footer />
    </div>
  );
}
