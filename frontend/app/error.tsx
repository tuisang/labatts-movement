"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <main className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Animated error icon */}
      <div className="mb-8 relative">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#a83300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
      </div>

      <p className="text-xs text-primary tracking-[0.3em] mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        SYSTEM ERROR
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Something Went Wrong
      </h1>
      <p className="text-outline max-w-md mb-3 leading-relaxed">
        An unexpected error occurred. Our team has been notified and is working to resolve it.
      </p>
      {error.digest && (
        <p className="text-xs text-[var(--color-outline-variant)] mb-8" style={{ fontFamily: "Montserrat, sans-serif" }}>
          ERROR ID: {error.digest}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={reset}
          className="bg-primary text-on-primary px-8 py-3 text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          ↺ TRY AGAIN
        </button>
        <Link
          href="/"
          className="border border-outline-variant text-on-surface-variant px-8 py-3 text-sm font-semibold hover:border-primary hover:text-primary transition-all"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          ← BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
