"use client";

import { useState } from "react";

export default function SchoolInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: this currently only opens the visitor's email client via mailto.
    // Once you're ready to wire this to your backend, replace this handler
    // with a fetch() to an API route that emails ADMIN_EMAIL via your
    // existing SMTP config (same pattern as your other projects), and/or
    // saves the inquiry to the database.
    const subject = encodeURIComponent(`Schools Program Inquiry: ${schoolName}`);
    const body = encodeURIComponent(
      `School: ${schoolName}\nContact: ${contactName}\nEmail: ${email}\nApprox. student count: ${studentCount}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:info@tuistech.co.ke?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-8 video-card-shadow text-center">
        <span className="material-symbols-outlined text-[40px] text-tertiary mb-3 block">
          mail
        </span>
        <h3 className="font-headline-md text-[18px] text-on-surface mb-2">
          Your email client should have opened
        </h3>
        <p className="text-on-surface-variant text-sm">
          If it didn&apos;t, email us directly at{" "}
          <a href="mailto:info@tuistech.co.ke" className="text-primary underline">
            info@tuistech.co.ke
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest rounded-xl p-8 video-card-shadow flex flex-col gap-4"
    >
      <div>
        <label className="block text-sm font-medium text-on-surface mb-1">School Name</label>
        <input
          required
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Contact Name</label>
          <input
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-on-surface mb-1">
          Approx. Student Count
        </label>
        <input
          value={studentCount}
          onChange={(e) => setStudentCount(e.target.value)}
          className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-on-surface mb-1">Message</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        className="self-start bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors"
      >
        Send Inquiry
      </button>
    </form>
  );
}
