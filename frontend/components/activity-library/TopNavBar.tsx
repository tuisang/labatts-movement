"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { LogoMark } from "@/components/Logo";

type NavLink = { label: string; href: string; icon: string };

const navLinks: NavLink[] = [
  { label: "Activity Library", href: "/activity-library", icon: "play_circle" },
  { label: "Equipment Hire", href: "/equipment-hire", icon: "fitness_center" },
  { label: "Schools", href: "/schools", icon: "school" },
  { label: "Parent Portal", href: "/parent-portal", icon: "family_restroom" },
];

const coachLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard/coach", icon: "dashboard" },
  { label: "Media Hub", href: "/dashboard/media-hub", icon: "video_library" },
  { label: "Admin", href: "/admin", icon: "admin_panel_settings" },
];

const baseLink =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-label-md text-label-md whitespace-nowrap transition-colors duration-200";
const activeLink = "bg-primary/10 text-primary font-bold";
const idleLink = "text-secondary font-medium hover:bg-surface-container hover:text-primary";

export default function TopNavBar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const signInRef = useRef<HTMLDivElement>(null);
  const coachRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setIsCoach(false);
      return;
    }
    fetch("/api/coach-status")
      .then((res) => res.json())
      .then((data) => setIsCoach(Boolean(data.isCoach)))
      .catch(() => setIsCoach(false));
  }, [isLoaded, isSignedIn]);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    if (!signInOpen && !coachOpen) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (signInRef.current && !signInRef.current.contains(t)) setSignInOpen(false);
      if (coachRef.current && !coachRef.current.contains(t)) setCoachOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSignInOpen(false);
        setCoachOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [signInOpen, coachOpen]);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      setMobileMenuOpen(false);
      setSearchOpen(false);
      router.push(`/activity-library?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur border-b border-outline-variant/30 shadow-sm w-full">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16 gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <Link
            className="flex items-center gap-2.5 shrink-0"
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Tuistech Movement home"
          >
            <LogoMark size={38} />
            <span className="font-headline-md text-headline-md font-bold text-primary whitespace-nowrap leading-none">
              Tuistech Movement
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseLink} ${isActive(link.href) ? activeLink : idleLink}`}
              >
                {link.label}
              </Link>
            ))}

            {isCoach && (
              <div className="relative ml-2 pl-3 border-l border-outline-variant/60" ref={coachRef}>
                <button
                  onClick={() => setCoachOpen((p) => !p)}
                  aria-haspopup="menu"
                  aria-expanded={coachOpen}
                  className={`${baseLink} ${
                    coachLinks.some((l) => isActive(l.href))
                      ? "bg-primary text-on-primary font-bold"
                      : "text-primary font-semibold bg-primary/10 hover:bg-primary/20"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">shield_person</span>
                  Coach
                  <span
                    className={`material-symbols-outlined text-[18px] transition-transform ${
                      coachOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {coachOpen && (
                  <div
                    role="menu"
                    className="absolute left-3 mt-2 w-56 rounded-2xl bg-surface shadow-xl border border-outline-variant/40 p-2"
                  >
                    {coachLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={() => setCoachOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-label-md text-label-md transition-colors ${
                          isActive(link.href)
                            ? "bg-primary/10 text-primary font-bold"
                            : "text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          {link.icon}
                        </span>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`hidden 2xl:flex items-center gap-2 bg-surface-container rounded-full px-4 py-2 transition-all ${
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
              className="bg-transparent outline-none text-sm text-on-surface placeholder:text-on-surface-variant w-44"
            />
          </div>

          <button
            onClick={() => setSearchOpen((p) => !p)}
            aria-label="Search training videos"
            className="hidden sm:inline-flex 2xl:hidden items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">
              {searchOpen ? "close" : "search"}
            </span>
          </button>

          <SignedOut>
            <div className="relative hidden sm:block" ref={signInRef}>
              <button
                onClick={() => setSignInOpen((p) => !p)}
                aria-haspopup="menu"
                aria-expanded={signInOpen}
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full font-label-md text-label-md text-primary border border-primary hover:bg-primary/10 transition-colors whitespace-nowrap"
              >
                Sign In
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform ${
                    signInOpen ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
              {signInOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface shadow-xl border border-outline-variant/40 p-2"
                >
                  <SignInButton mode="modal" forceRedirectUrl="/dashboard/coach">
                    <button
                      role="menuitem"
                      onClick={() => setSignInOpen(false)}
                      className="w-full flex items-center gap-3 text-left px-3 py-3 rounded-xl hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-2 text-[20px]">
                        sports
                      </span>
                      <span>
                        <span className="block font-label-md text-label-md text-on-surface font-semibold">
                          Coach
                        </span>
                        <span className="block text-xs text-on-surface-variant">
                          Dashboard, media &amp; admin
                        </span>
                      </span>
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal" forceRedirectUrl="/parent-portal">
                    <button
                      role="menuitem"
                      onClick={() => setSignInOpen(false)}
                      className="w-full flex items-center gap-3 text-left px-3 py-3 rounded-xl hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-2 text-[20px]">
                        family_restroom
                      </span>
                      <span>
                        <span className="block font-label-md text-label-md text-on-surface font-semibold">
                          Parent
                        </span>
                        <span className="block text-xs text-on-surface-variant">
                          Bookings &amp; child progress
                        </span>
                      </span>
                    </button>
                  </SignInButton>
                </div>
              )}
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <Link
            href="/book-session"
            className="bg-primary text-on-primary px-4 sm:px-5 py-2.5 rounded-full font-label-md text-label-md hover:bg-primary-container transition-colors whitespace-nowrap shadow-sm"
          >
            Book Now
          </Link>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="xl:hidden text-on-surface p-1 rounded-full hover:bg-surface-container"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Search panel (shown when the search icon is clicked) */}
      {searchOpen && (
        <div className="hidden sm:block 2xl:hidden border-t border-outline-variant/40 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-3">
            <div className="flex items-center gap-2 bg-surface-container rounded-full px-4 py-2.5 ring-2 ring-primary/40">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                search
              </span>
              <input
                autoFocus
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchSubmit}
                placeholder="Search training videos and press Enter..."
                className="bg-transparent outline-none text-sm text-on-surface placeholder:text-on-surface-variant flex-1"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile / tablet menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-outline-variant/40 bg-surface px-margin-mobile py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-surface-container rounded-full px-4 py-2.5">
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-secondary font-medium hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {isCoach && (
              <>
                <p className="px-4 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Coach tools
                </p>
                {coachLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md transition-colors ${
                      isActive(link.href)
                        ? "bg-primary text-on-primary font-bold"
                        : "text-primary font-medium bg-primary/5 hover:bg-primary/15"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </>
            )}
          </nav>

          <SignedOut>
            <div className="grid grid-cols-2 gap-2">
              <SignInButton mode="modal" forceRedirectUrl="/dashboard/coach">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-full border border-primary text-primary font-label-md text-label-md hover:bg-primary/10"
                >
                  Coach Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal" forceRedirectUrl="/parent-portal">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-full border border-primary text-primary font-label-md text-label-md hover:bg-primary/10"
                >
                  Parent Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      )}
    </header>
  );
}
