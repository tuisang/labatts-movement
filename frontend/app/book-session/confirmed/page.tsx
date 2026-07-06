import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";

export default function BookingConfirmedPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-tertiary-container/40 flex items-center justify-center">
            <span className="material-symbols-outlined text-[40px] text-tertiary">
              check_circle
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-3">
            Booking Received
          </h1>
          <p className="text-on-surface-variant mb-8">
            We&apos;ve got your request. You&apos;ll hear from a coach shortly to
            confirm your session and finalize payment.
          </p>
          <a
            href="/parent-portal"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors"
          >
            View in Parent Portal
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
