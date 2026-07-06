"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/book-session/actions";
import { sessionOptions } from "./sessionOptions";

type Step = "form" | "awaiting-payment" | "error";

export default function BookingForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const service = formData.get("service") as string;
    const date = formData.get("date") as string;
    const paymentMethod = formData.get("paymentMethod") as string;

    try {
      const { bookingId } = await createBooking({ name, phone, email, service, date, paymentMethod });

      if (paymentMethod === "mpesa") {
        const res = await fetch("/api/mpesa/stk-push", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, bookingId }),
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          setErrorMessage(
            data.error ?? "We couldn't send the M-Pesa prompt. Please check the number and try again."
          );
          setStep("error");
          setSubmitting(false);
          return;
        }

        setStep("awaiting-payment");
      } else {
        // Cash ("Pay at Session") — no payment step needed, booking is confirmed
        // pending in-person payment.
        router.push("/book-session/confirmed");
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "awaiting-payment") {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-8 video-card-shadow max-w-xl text-center">
        <span className="material-symbols-outlined text-[40px] text-primary mb-3 block">
          smartphone
        </span>
        <h3 className="font-headline-md text-[18px] text-on-surface mb-2">
          Check Your Phone
        </h3>
        <p className="text-on-surface-variant text-sm mb-6">
          We&apos;ve sent an M-Pesa prompt for the KSh 1,000 booking confirmation
          fee. Enter your M-Pesa PIN to complete it. You&apos;ll get a confirmation
          email once payment goes through.
        </p>
        <button
          onClick={() => router.push("/book-session/confirmed")}
          className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors"
        >
          I&apos;ve Paid — Continue
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest rounded-xl p-8 video-card-shadow flex flex-col gap-4 max-w-xl"
    >
      {step === "error" && (
        <div className="bg-error-container/40 border border-error/30 rounded-lg p-4 text-sm text-error">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-on-surface mb-1">Your Name</label>
        <input
          name="name"
          required
          className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Phone</label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="07XX XXX XXX"
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-on-surface mb-1">Session</label>
        <select
          name="service"
          required
          defaultValue=""
          className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest"
        >
          <option value="" disabled>
            Select a session
          </option>
          {sessionOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name} — {option.duration}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Preferred Date</label>
          <input
            name="date"
            type="date"
            required
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Payment Method</label>
          <select
            name="paymentMethod"
            required
            defaultValue=""
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest"
          >
            <option value="" disabled>
              Select payment method
            </option>
            <option value="mpesa">Pay KSh 1,000 via M-Pesa (confirms your slot)</option>
            <option value="cash">Pay at Session</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-on-surface-variant">
        The KSh 1,000 M-Pesa fee confirms your booking slot and is separate
        from the session cost itself, which is paid at the session.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="self-start bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Processing..." : "Confirm Booking"}
      </button>
    </form>
  );
}
