import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Tuistech Movement",
  description: "Manage athletes, bookings and training content for Tuistech Movement.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
