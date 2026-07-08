import { auth } from "@clerk/nextjs/server";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import BookingForm from "@/components/booking/BookingForm";
import { prisma } from "@/lib/prisma";

export default async function BookSessionPage() {
  const { userId } = await auth();

  const [sessions, athletes] = await Promise.all([
    prisma.sessionOption.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    }),
    userId
      ? prisma.athlete.findMany({
          where: { parentClerkId: userId },
          orderBy: { createdAt: "asc" },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Book a Session
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl mb-10">
          Reserve your spot with one of our coaches.
        </p>

        {sessions.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-10 video-card-shadow max-w-xl text-center">
            <p className="text-on-surface-variant">
              No sessions are available to book right now. Please check back soon.
            </p>
          </div>
        ) : (
          <BookingForm sessions={sessions} athletes={athletes} />
        )}
      </main>

      <Footer />
    </div>
  );
}
