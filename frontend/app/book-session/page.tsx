import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import BookingForm from "@/components/booking/BookingForm";

export default function BookSessionPage() {
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

        <BookingForm />
      </main>

      <Footer />
    </div>
  );
}
