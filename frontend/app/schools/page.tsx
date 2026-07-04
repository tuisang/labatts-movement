import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import SchoolInquiryForm from "@/components/schools/SchoolInquiryForm";

const benefits = [
  {
    icon: "sports",
    title: "PE Curriculum Support",
    description: "Ready-to-run activity plans mapped to fundamental movement skills.",
  },
  {
    icon: "groups",
    title: "Coach-Led Sessions",
    description: "Bring our coaches on-site for live sessions, or use our video library.",
  },
  {
    icon: "insights",
    title: "Progress Tracking",
    description: "Track student engagement and movement development over the term.",
  },
];

export default function SchoolsPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Schools Program
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl mb-10">
          Bring elite-level movement training to your PE curriculum. Built for
          teachers, loved by students.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow"
            >
              <span className="material-symbols-outlined text-[28px] text-primary mb-3 block">
                {benefit.icon}
              </span>
              <h3 className="font-headline-md text-[16px] text-on-surface mb-2">
                {benefit.title}
              </h3>
              <p className="text-on-surface-variant text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            Request Program Info
          </h2>
          <SchoolInquiryForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
