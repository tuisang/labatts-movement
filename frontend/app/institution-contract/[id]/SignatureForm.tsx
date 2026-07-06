"use client";

import { useState } from "react";
import { signContract } from "@/app/institution-contract/[id]/actions";

export default function SignatureForm({ bookingId }: { bookingId: string }) {
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await signContract(bookingId, name);
      setSigned(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (signed) {
    return (
      <div className="bg-tertiary-container/30 border border-tertiary/30 rounded-xl p-6 text-center">
        <span className="material-symbols-outlined text-[32px] text-tertiary mb-2 block">
          check_circle
        </span>
        <p className="text-on-surface font-medium">Contract signed successfully.</p>
        <p className="text-on-surface-variant text-sm mt-1">
          A copy has been recorded. Thank you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-error-container/40 border border-error/30 rounded-lg p-3 text-sm text-error">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-on-surface mb-1">
          Type your full legal name to sign
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <label className="flex items-start gap-2 text-sm text-on-surface-variant">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          required
          className="mt-1 accent-primary"
        />
        I have read and agree to the terms above, and I confirm I am authorized
        to sign on behalf of this institution.
      </label>
      <button
        type="submit"
        disabled={!agreed || submitting}
        className="self-start bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Signing..." : "Sign Contract"}
      </button>
      <p className="text-[10px] text-on-surface-variant">
        This is a lightweight electronic acknowledgment, not a notarized or
        legally certified digital signature service.
      </p>
    </form>
  );
}
