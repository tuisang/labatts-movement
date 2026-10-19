import type { Metadata } from "next";
import Link from "next/link";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";

export const metadata: Metadata = {
  title: "Events | Tuistech Movement",
  description: "Tournaments, holiday camps, fun runs and coaching clinics from Tuistech Movement.",
};

const types = [
  { icon: "emoji_events", title: "Tournaments & matches" },
  { icon: "camping", title: "Holiday camps" },
  { icon: "directions_run", title: "Fun runs & athletics days" },
  { icon: "workshop_premium", title: "Coaching clinics" },
];

export default function EventsPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-3">Events</h1>
        <p className="text-on-surface-variant max-w-2xl mb-10">
          The kinds of events we run and host. Upcoming dates will be listed here.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {types.map((e) => (
            <div key={e.title} className="flex items-center gap-3 bg-surface-container-lowest rounded-xl p-4 video-card-shadow">
              <span className="material-symbols-outlined text-primary text-[26px]">{e.icon}</span>
              <span className="text-sm font-medium">{e.title}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-on-surface-variant mb-12">No upcoming events are scheduled right now.</p>
        <section className="bg-primary/10 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md mb-1">Have an event in mind?</h2>
            <p className="text-on-surface-variant text-sm">Propose one, or ask to be told when the next one is announced.</p>
          </div>
          <Link href="/contact" className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-center whitespace-nowrap hover:bg-primary-container transition-colors">
            Get in touch
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
