import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import SignatureForm from "./SignatureForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function InstitutionContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await prisma.institutionBooking.findUnique({ where: { id } });

  if (!booking || !booking.contractText) {
    notFound();
  }

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Institutional Training Agreement
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl mb-10">
          {booking.schoolName} — {booking.program}
        </p>

        <div className="max-w-2xl flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 video-card-shadow">
            <pre className="whitespace-pre-wrap font-body-md text-sm text-on-surface leading-relaxed">
              {booking.contractText}
            </pre>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 video-card-shadow">
            {booking.status === "signed" ? (
              <div className="text-center">
                <span className="material-symbols-outlined text-[32px] text-tertiary mb-2 block">
                  verified
                </span>
                <p className="text-on-surface font-medium">
                  This contract was signed by {booking.signedByName}
                </p>
                <p className="text-on-surface-variant text-sm mt-1">
                  {booking.signedAt?.toLocaleString()}
                </p>
              </div>
            ) : (
              <SignatureForm bookingId={booking.id} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
