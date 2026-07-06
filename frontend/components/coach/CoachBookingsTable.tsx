"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/app/dashboard/coach/actions";

interface BookingData {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  paymentMethod: string;
  status: string;
  mpesaReceiptNumber: string | null;
}

const statusOptions = ["pending", "awaiting_payment", "confirmed", "completed", "cancelled"];

export default function CoachBookingsTable({ bookings }: { bookings: BookingData[] }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (bookingId: string, status: string) => {
    startTransition(() => {
      updateBookingStatus(bookingId, status);
    });
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl video-card-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/50">
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Payment</th>
              <th className="px-5 py-3 font-medium">Receipt</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-outline-variant/30 last:border-0">
                <td className="px-5 py-4">
                  <p className="font-medium text-on-surface">{booking.name}</p>
                  <p className="text-xs text-on-surface-variant">
                    {booking.phone} • {booking.email}
                  </p>
                </td>
                <td className="px-5 py-4 text-on-surface">{booking.service}</td>
                <td className="px-5 py-4 text-on-surface-variant">{booking.date}</td>
                <td className="px-5 py-4 text-on-surface-variant capitalize">
                  {booking.paymentMethod}
                </td>
                <td className="px-5 py-4 text-on-surface-variant text-xs">
                  {booking.mpesaReceiptNumber ?? "—"}
                </td>
                <td className="px-5 py-4">
                  <select
                    defaultValue={booking.status}
                    disabled={isPending}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="border border-outline-variant rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest capitalize disabled:opacity-50"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <p className="text-on-surface-variant text-sm italic p-8 text-center">
          No bookings yet.
        </p>
      )}
    </div>
  );
}
