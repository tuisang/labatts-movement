"use client";

import { useState } from "react";

const navLinks = [
  { label: "Activity Library", href: "#", active: true },
  { label: "Equipment Hire", href: "#" },
  { label: "Schools", href: "#" },
  { label: "Parent Portal", href: "#" },
];

export default function TopNavBar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm w-full">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16">
        <div className="flex items-center gap-8">
          <a
            className="font-headline-md text-headline-md font-bold text-primary"
            href="#"
          >
            Labatts Movement
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={
                  link.active
                    ? "font-label-md text-label-md text-primary font-bold border-b-2 border-primary py-5"
                    : "font-label-md text-label-md text-secondary font-medium hover:text-primary transition-colors duration-200"
                }
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`hidden sm:flex items-center gap-2 bg-surface-container rounded-lg px-3 py-2 transition-all ${
              searchFocused ? "ring-2 ring-primary" : ""
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="Search training videos..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent outline-none text-sm text-on-surface placeholder:text-on-surface-variant w-48"
            />
          </div>
          <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
}
