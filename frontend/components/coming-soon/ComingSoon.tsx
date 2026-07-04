import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: string;
}

export default function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[40px] text-primary">{icon}</span>
          </div>
          <span className="inline-block bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Coming Soon
          </span>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-3">{title}</h1>
          <p className="text-on-surface-variant mb-8">{description}</p>
          <a
            href="/activity-library"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Activity Library
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
