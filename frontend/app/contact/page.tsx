"use client";

import { useEffect, useState } from "react";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";

const field =
  "w-full border border-outline-variant rounded-lg px-4 py-3 text-sm bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  // Prefill the message when arriving from a service page, e.g. /contact?service=Facility%20repair
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    if (service) {
      setForm((p) => (p.message ? p : { ...p, message: `I'd like to enquire about: ${service.slice(0, 80)}.\n\nFacility location / details:\n` }));
    }
  }, []);

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-2">
          Contact Us
        </h1>
        <p className="text-on-surface-variant max-w-2xl mb-10">
          Questions about sessions, equipment hire or school programs? Send us a message and we&apos;ll
          get back to you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 md:p-8 video-card-shadow">
            {status === "sent" ? (
              <div className="text-center py-10">
                <span className="material-symbols-outlined text-[48px] text-tertiary mb-3 block">
                  check_circle
                </span>
                <h2 className="font-headline-md text-headline-md mb-2">Message sent</h2>
                <p className="text-on-surface-variant mb-6">
                  Thank you, {form.name.split(" ")[0]}. We&apos;ll reply to {form.email} soon.
                </p>
                <button
                  onClick={() => {
                    setForm({ name: "", email: "", phone: "", message: "", website: "" });
                    setStatus("idle");
                  }}
                  className="text-primary font-label-md hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your name *"
                    className={field}
                  />
                  <input
                    required
                    type="email"
                    maxLength={200}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="Email address *"
                    className={field}
                  />
                </div>
                <input
                  type="tel"
                  maxLength={40}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="Phone (optional)"
                  className={field}
                />
                <textarea
                  required
                  rows={6}
                  maxLength={3000}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="How can we help? *"
                  className={field}
                />
                {/* Honeypot: hidden from people, filled in by bots */}
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  className="hidden"
                  name="website"
                />
                {error && <p className="text-error text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="self-start bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:bg-primary-container transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-4">
            {[
              { icon: "call", label: "Phone", value: "+254 726 461 196", href: "tel:+254726461196" },
              { icon: "mail", label: "Email", value: "info@tuistech.co.ke", href: "mailto:info@tuistech.co.ke" },
              { icon: "location_on", label: "Location", value: "Nairobi, Kenya" },
            ].map((item) => {
              const inner = (
                <>
                  <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-3 text-[22px]">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-xs text-on-surface-variant uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="block font-medium">{item.value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4 bg-surface-container-lowest rounded-xl p-5 video-card-shadow";
              return item.href ? (
                <a key={item.label} href={item.href} className={`${cls} hover:-translate-y-0.5 transition-transform`}>
                  {inner}
                </a>
              ) : (
                <div key={item.label} className={cls}>
                  {inner}
                </div>
              );
            })}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
