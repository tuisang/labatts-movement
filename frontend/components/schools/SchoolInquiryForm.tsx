"use client";

import { useState } from "react";
import { createInstitutionInquiry } from "@/app/schools/actions";

const programs = [
  "PE Curriculum Support",
  "Coach-Led On-Site Sessions",
  "Video Library Access",
  "Custom Program",
];

export default function SchoolInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      await createInstitutionInquiry(new FormData(e.currentTarget));
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-8 video-card-shadow text-center">
        <span className="material-symbols-outlined text-[40px] text-tertiary mb-3 block">
          check_circle
        </span>
        <h3 className="font-headline-md text-[18px] text-on-surface mb-2">
          Inquiry Received
        </h3>
        <p className="text-on-surface-variant text-sm">
          Thanks — a member of our team will reach out to discuss the program
          and next steps. No payment is required at this stage.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest rounded-xl p-8 video-card-shadow flex flex-col gap-4"
    >
      {errorMessage && (
        <div className="bg-error-container/40 border border-error/30 rounded-lg p-4 text-sm text-error">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-on-surface mb-1">School Name</label>
        <input
          name="schoolName"
          required
          className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Contact Name</label>
          <input
            name="contactName"
            required
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
          <input
            name="contactEmail"
            required
            type="email"
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Phone (optional)</label>
          <input
            name="contactPhone"
            type="tel"
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">
            Approx. Student Count
          </label>
          <input
            name="studentCount"
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Program</label>
          <select
            name="program"
            required
            defaultValue=""
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest"
          >
            <option value="" disabled>
              Select a program
            </option>
            {programs.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">
            Proposed Start Date
          </label>
          <input
            name="proposedDate"
            type="date"
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-on-surface mb-1">
          Additional Notes (optional)
        </label>
        <textarea
          name="notes"
          rows={4}
          className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="self-start bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
