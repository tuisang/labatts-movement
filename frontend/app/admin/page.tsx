import Link from "next/link";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import BookingStatusSelect from "@/components/admin/BookingStatusSelect";
import { prisma } from "@/lib/prisma";
import { isCoach } from "@/lib/coachAuth";

export const dynamic = "force-dynamic";

const quickActions = [
  { href: "/admin/catalog", icon: "add_box", label: "Add Items", sub: "Equipment, sessions & videos" },
  { href: "/dashboard/media-hub", icon: "video_library", label: "Media Hub", sub: "Upload & publish videos" },
  { href: "/dashboard/coach", icon: "sports", label: "Coach Dashboard", sub: "Athletes & institutions" },
];

export default async function AdminPage() {
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
              This area is only for Tuistech Movement staff. Sign in with an admin account to continue.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const [bookings, athletes, publishedVideos, draftVideos, equipment, sessions] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.athlete.count(),
    prisma.activityVideo.count({ where: { status: "published" } }),
    prisma.activityVideo.count({ where: { status: "draft" } }),
    prisma.equipmentItem.count(),
    prisma.sessionOption.count(),
  ]);

  const pending = bookings.filter((b) => b.status === "pending").length;

  const stats = [
    { label: "Bookings", value: bookings.length, hint: `${pending} pending`, icon: "event" },
    { label: "Athletes", value: athletes, hint: "registered by parents", icon: "directions_run" },
    { label: "Videos", value: publishedVideos, hint: `${draftVideos} draft`, icon: "play_circle" },
    { label: "Equipment", value: equipment, hint: `${sessions} session options`, icon: "fitness_center" },
  ];

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-2">
          Admin
        </h1>
        <p className="text-on-surface-variant max-w-2xl mb-8">
          Everything happening across Tuistech Movement, and shortcuts to add new content.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface-container-lowest rounded-xl p-5 video-card-shadow">
              <span className="material-symbols-outlined text-primary text-[26px]">{s.icon}</span>
              <p className="text-3xl font-bold mt-2">{s.value}</p>
              <p className="text-sm font-medium">{s.label}</p>
              <p className="text-xs text-on-surface-variant">{s.hint}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center gap-4 bg-surface-container-lowest rounded-xl p-5 video-card-shadow hover:-translate-y-0.5 transition-transform"
            >
              <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-3 text-[24px]">
                {a.icon}
              </span>
              <span>
                <span className="block font-semibold">{a.label}</span>
                <span className="block text-xs text-on-surface-variant">{a.sub}</span>
              </span>
            </Link>
          ))}
        </div>

        <section>
          <h2 className="font-headline-md text-headline-md mb-4">All Bookings ({bookings.length})</h2>
          <div className="bg-surface-container-lowest rounded-xl video-card-shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/40 text-xs text-on-surface-variant uppercase tracking-wider">
                  <th className="p-4">Client</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-container/50">
                    <td className="p-4">
                      <p className="font-semibold text-sm">{b.name}</p>
                      <p className="text-xs text-on-surface-variant">{b.email}</p>
                      <p className="text-xs text-on-surface-variant">{b.phone}</p>
                    </td>
                    <td className="p-4 text-sm capitalize">{b.service}</td>
                    <td className="p-4 text-sm">{b.date}</td>
                    <td className="p-4 text-sm capitalize">{b.paymentMethod}</td>
                    <td className="p-4">
                      <BookingStatusSelect id={b.id} status={b.status} />
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-on-surface-variant">
                      No bookings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
