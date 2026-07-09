"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Activity Library", href: "/activity-library" },
  { label: "Equipment Hire", href: "/equipment-hire" },
  { label: "Schools", href: "/schools" },
  { label: "Parent Portal", href: "/parent-portal" },
];

export default function TopNavBar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      setMobileMenuOpen(false);
      router.push(`/activity-library?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm w-full">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16">
        <div className="flex items-center gap-8">
          <Link
            className="font-headline-md text-headline-md font-bold text-primary"
            href="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            Labatts Movement
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={
                    isActive
                      ? "font-label-md text-label-md text-primary font-bold border-b-2 border-primary py-5"
                      : "font-label-md text-label-md text-secondary font-medium hover:text-primary transition-colors duration-200"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search training videos..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent outline-none text-sm text-on-surface placeholder:text-on-surface-variant w-48"
            />
          </div>
          <Link
            href="/book-session"
            className="bg-primary text-on-primary px-3.5 sm:px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors whitespace-nowrap"
          >
            Book Now
          </Link>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-on-surface p-1"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/40 bg-surface px-margin-mobile py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-surface-container rounded-lg px-3 py-2.5">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search training videos..."
              className="bg-transparent outline-none text-sm text-on-surface placeholder:text-on-surface-variant flex-1"
            />
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    isActive
                      ? "font-label-md text-label-md text-primary font-bold bg-surface-container rounded-lg px-4 py-3"
                      : "font-label-md text-label-md text-secondary font-medium px-4 py-3 hover:bg-surface-container rounded-lg transition-colors"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
