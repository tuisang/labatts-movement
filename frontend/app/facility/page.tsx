import type { Metadata } from "next";
import Link from "next/link";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";

export const metadata: Metadata = {
  title: "Facility | Tuistech Movement",
  description: "Hire the Tuistech Movement training facility for your team, school or group.",
};

const uses = [
  { icon: "sports_soccer", title: "Team training", text: "Book the facility for your squad's practice sessions." },
  { icon: "school", title: "School programmes", text: "Regular or one-off PE and sports sessions for schools." },
  { icon: "cake", title: "Private bookings", text: "Birthday sports parties and group activities for kids and families." },
  { icon: "groups", title: "Community use", text: "Clinics, workshops and fitness classes led by your own coaches." },
];

export default function FacilityPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-3">Facility</h1>
        <p className="text-on-surface-variant max-w-2xl mb-10">
          Hire our training space for your team, school or group. Tell us what you have in mind and we&apos;ll come back
          with availability and pricing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {uses.map((u) => (
            <div key={u.title} className="bg-surface-container-lowest rounded-xl p-5 video-card-shadow">
              <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-3 text-[24px]">{u.icon}</span>
              <h3 className="font-semibold mt-3 mb-1">{u.title}</h3>
              <p className="text-sm text-on-surface-variant">{u.text}</p>
            </div>
          ))}
        </div>
        <section className="bg-primary/10 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md mb-1">Want to hire the facility?</h2>
            <p className="text-on-surface-variant text-sm">Mention the date, group size and what you&apos;d like to use it for.</p>
          </div>
          <Link href="/contact" className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-center whitespace-nowrap hover:bg-primary-container transition-colors">
            Enquire about hire
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
