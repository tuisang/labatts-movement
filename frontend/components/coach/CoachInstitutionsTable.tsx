"use client";

import { useState } from "react";
import { generateContract } from "@/app/dashboard/coach/actions";

interface InstitutionBookingData {
  id: string;
  schoolName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string | null;
  program: string;
  proposedDate: string | null;
  status: string;
  signedByName: string | null;
  signedAt: Date | null;
}

const statusBadgeClasses: Record<string, string> = {
  pending: "bg-surface-container-high text-on-surface-variant",
  contract_sent: "bg-tertiary-container text-on-tertiary-container",
  signed: "bg-primary text-on-primary",
  cancelled: "bg-error-container text-on-error-container",
};

export default function CoachInstitutionsTable({
  bookings,
}: {
  bookings: InstitutionBookingData[];
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string) => {
    const link = `${window.location.origin}/institution-contract/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl video-card-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/50">
              <th className="px-5 py-3 font-medium">School</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Program</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-outline-variant/30 last:border-0">
                <td className="px-5 py-4">
                  <p className="font-medium text-on-surface">{booking.schoolName}</p>
                  <p className="text-xs text-on-surface-variant">{booking.proposedDate}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-on-surface">{booking.contactName}</p>
                  <p className="text-xs text-on-surface-variant">{booking.contactEmail}</p>
                </td>
                <td className="px-5 py-4 text-on-surface-variant">{booking.program}</td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                      statusBadgeClasses[booking.status] ?? statusBadgeClasses.pending
                    }`}
                  >
                    {booking.status.replace("_", " ")}
                  </span>
                  {booking.signedByName && (
                    <p className="text-[10px] text-on-surface-variant mt-1">
                      Signed by {booking.signedByName}
                    </p>
                  )}
                </td>
                <td className="px-5 py-4">
                  {booking.status === "pending" && (
                    <form action={generateContract.bind(null, booking.id)}>
                      <button
                        type="submit"
                        className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-label-md hover:bg-primary-container transition-colors"
                      >
                        Generate Contract
                      </button>
                    </form>
                  )}
                  {(booking.status === "contract_sent" || booking.status === "signed") && (
                    <button
                      onClick={() => handleCopyLink(booking.id)}
                      className="border border-outline-variant text-on-surface-variant px-3 py-1.5 rounded-lg text-xs hover:bg-surface-container transition-colors"
                    >
                      {copiedId === booking.id ? "Copied!" : "Copy Signing Link"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <p className="text-on-surface-variant text-sm italic p-8 text-center">
          No institution inquiries yet.
        </p>
      )}
    </div>
  );
}
