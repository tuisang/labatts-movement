import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs text-primary tracking-[0.3em] mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        ERROR 404
      </p>
      <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary" style={{ fontFamily: "Montserrat, sans-serif" }}>
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Page Not Found
      </h2>
      <p className="text-outline max-w-md mb-10 leading-relaxed">
        This page has run off course. It may have been moved, renamed, or perhaps it never existed.
      </p>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          { href: "/", label: "Home" },
          { href: "/activity-library", label: "Activity Library" },
          { href: "/equipment-hire", label: "Equipment Hire" },
          { href: "/book-session", label: "Book a Session" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="border border-outline-variant text-on-surface-variant px-5 py-2 text-sm hover:border-primary hover:text-primary transition-all"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="bg-primary text-on-primary px-10 py-4 text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        ← BACK TO HOME
      </Link>
    </main>
  );
}
