import type { Metadata } from "next";
import Link from "next/link";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";

export const metadata: Metadata = {
  title: "Facility & Events | Tuistech Movement",
  description:
    "Hire the Tuistech Movement training facility and find out about camps, tournaments and community events.",
};

const facilityUses = [
  { icon: "sports_soccer", title: "Team training", text: "Book the facility for your squad's practice sessions." },
  { icon: "school", title: "School programmes", text: "Regular or one-off PE and sports sessions for schools." },
  { icon: "cake", title: "Private bookings", text: "Birthday sports parties and group activities for kids and families." },
  { icon: "groups", title: "Community use", text: "Clinics, workshops and fitness classes led by your own coaches." },
];

const eventTypes = [
  { icon: "emoji_events", title: "Tournaments & matches" },
  { icon: "camping", title: "Holiday camps" },
  { icon: "directions_run", title: "Fun runs & athletics days" },
  { icon: "workshop_premium", title: "Coaching clinics" },
];

export default function FacilityEventsPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-3">
          Facility &amp; Events
        </h1>
        <p className="text-on-surface-variant max-w-2xl mb-10">
          Hire our training space for your team, school or group, or get involved in the events we run. Tell us what you
          have in mind and we&apos;ll come back with availability and pricing.
        </p>

        <section className="mb-12">
          <h2 className="font-headline-md text-headline-md mb-4">Hire the facility</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilityUses.map((u) => (
              <div key={u.title} className="bg-surface-container-lowest rounded-xl p-5 video-card-shadow">
                <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-3 text-[24px]">
                  {u.icon}
                </span>
                <h3 className="font-semibold mt-3 mb-1">{u.title}</h3>
                <p className="text-sm text-on-surface-variant">{u.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-headline-md text-headline-md mb-4">Events</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {eventTypes.map((e) => (
              <div key={e.title} className="flex items-center gap-3 bg-surface-container-lowest rounded-xl p-4 video-card-shadow">
                <span className="material-symbols-outlined text-primary text-[26px]">{e.icon}</span>
                <span className="text-sm font-medium">{e.title}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant">
            No dates are published here yet. Contact us to hear about upcoming events or to propose one.
          </p>
        </section>

        <section className="bg-primary/10 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md mb-1">Ready to book or enquire?</h2>
            <p className="text-on-surface-variant text-sm">
              Mention the date, group size and what you&apos;d like to use the facility for.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-center whitespace-nowrap hover:bg-primary-container transition-colors"
          >
            Make an enquiry
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
