import type { Metadata } from "next";
import Link from "next/link";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";

export const metadata: Metadata = {
  title: "Facility Services | Tuistech Movement",
  description:
    "Facility building, repair, maintenance and competition preparation for sports facility owners.",
};

const services = [
  {
    icon: "construction",
    title: "Facility building",
    text: "Plan and build a new training or competition facility, from the layout and surfaces to the equipment fit-out.",
    points: ["Site assessment and planning", "Playing surfaces and markings", "Equipment and fixtures"],
  },
  {
    icon: "build",
    title: "Repair",
    text: "Fix worn or damaged surfaces, fixtures and equipment so your facility is safe and playable again.",
    points: ["Surface and line repairs", "Goals, nets and fixtures", "Safety checks"],
  },
  {
    icon: "event_repeat",
    title: "Maintenance",
    text: "Keep your facility in good condition with regular upkeep, so small problems don't become expensive ones.",
    points: ["Scheduled inspections", "Cleaning and upkeep", "Ongoing care plans"],
  },
  {
    icon: "emoji_events",
    title: "Competition preparation",
    text: "Get your facility ready to host matches, tournaments and meets that meet competition requirements.",
    points: ["Pitch / court / track set-up", "Markings, goals and equipment checks", "Match-day readiness"],
  },
];

export default function FacilityPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-3">
          Facility Services
        </h1>
        <p className="text-on-surface-variant max-w-2xl mb-10">
          Own a sports facility? We can build it, repair it, keep it maintained and get it ready for competition. Pick
          the service you need and tell us about your facility.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((s) => (
            <div key={s.title} className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow flex flex-col">
              <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-3 text-[26px] self-start">
                {s.icon}
              </span>
              <h2 className="font-headline-md text-headline-md mt-4 mb-2">{s.title}</h2>
              <p className="text-sm text-on-surface-variant mb-4">{s.text}</p>
              <ul className="text-sm space-y-1.5 mb-6">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?service=${encodeURIComponent(s.title)}`}
                className="mt-auto self-start border border-primary text-primary px-5 py-2.5 rounded-full font-label-md hover:bg-primary/10 transition-colors"
              >
                Request {s.title.toLowerCase()}
              </Link>
            </div>
          ))}
        </div>

        <section className="bg-primary/10 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md mb-1">Not sure which service you need?</h2>
            <p className="text-on-surface-variant text-sm">
              Describe your facility and what you&apos;re trying to achieve, and we&apos;ll advise.
            </p>
          </div>
          <Link
            href="/contact?service=Facility%20advice"
            className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-center whitespace-nowrap hover:bg-primary-container transition-colors"
          >
            Talk to us
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
