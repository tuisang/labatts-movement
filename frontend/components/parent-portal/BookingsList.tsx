interface BookingData {
  id: string;
  service: string;
  date: string;
  status: string;
}

const statusClasses: Record<string, string> = {
  pending: "bg-surface-container-high text-on-surface-variant",
  confirmed: "bg-tertiary-container text-on-tertiary-container",
  completed: "bg-tertiary-container text-on-tertiary-container",
  cancelled: "bg-error-container text-on-error-container",
};

export default function BookingsList({ bookings }: { bookings: BookingData[] }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
      <h3 className="font-headline-md text-[18px] text-on-surface mb-4">Your Bookings</h3>
      {bookings.length === 0 ? (
        <p className="text-on-surface-variant text-sm italic">
          No bookings yet.{" "}
          <a href="/activity-library" className="text-primary underline">
            Browse the activity library
          </a>{" "}
          to book a session.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between border-t border-outline-variant/30 pt-3"
            >
              <div>
                <p className="text-sm font-medium text-on-surface">{booking.service}</p>
                <p className="text-xs text-on-surface-variant">{booking.date}</p>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                  statusClasses[booking.status] ?? statusClasses.pending
                }`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
