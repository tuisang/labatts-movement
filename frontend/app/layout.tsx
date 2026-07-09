import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/lib/CartContext";
import { Suspense } from "react";
import Loading from "@/app/loading";
import AthleteChatbot from "@/components/AthleteChatbot";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const OG_IMAGE = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Labatts Movement | Elite Athletic Training Nairobi",
    template: "%s | Labatts Movement",
  },
  description:
    "Elite athletic training platform in Nairobi, Kenya. Instructional videos, coach-led sessions, and performance tracking for athletes of all ages.",
  keywords: [
    "athletic training Nairobi",
    "sports training Kenya",
    "youth sports Nairobi",
    "agility training Kenya",
    "plyometric training Nairobi",
    "Labatts Movement",
    "sports coaching Nairobi",
    "PE program Kenya",
    "athlete development Nairobi",
    "fitness training Kenya",
  ],
  authors: [{ name: "Labatts Movement", url: "https://tuistech.co.ke" }],
  creator: "Labatts Movement",
  publisher: "Labatts Movement",
  category: "Sports & Athletic Training",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://labattsmovement.tuistech.co.ke",
    siteName: "Labatts Movement",
    title: "Labatts Movement | Elite Athletic Training Nairobi",
    description:
      "Elite athletic training platform in Nairobi, Kenya. Instructional videos, coach-led sessions, and performance tracking for athletes of all ages.",

  },
  twitter: {
    card: "summary_large_image",
    title: "Labatts Movement | Elite Athletic Training Nairobi",
    description:
      "Elite athletic training platform in Nairobi, Kenya. Instructional videos, coach-led sessions, and performance tracking.",

    creator: "@labattsmovement",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Labatts Movement",
  description:
    "Elite athletic training platform in Nairobi, Kenya. Instructional videos, coach-led sessions, and performance tracking for athletes of all ages.",
  url: "https://labattsmovement.tuistech.co.ke",
  telephone: "+254700000000",
  email: "info@tuistech.co.ke",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2921,
    longitude: 36.8219,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "15:00",
    },
  ],
  image: OG_IMAGE,
  sameAs: [],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en-KE">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <meta name="theme-color" content="#f7f9fb" />
          <meta name="msapplication-TileColor" content="#a83300" />
          <link rel="canonical" href="https://labattsmovement.tuistech.co.ke" />
        </head>
        <body className={`${libreFranklin.variable} bg-background text-on-surface`}>          
        <CartProvider>
            <Suspense fallback={<Loading />}>
              {children}
            <AthleteChatbot />
            </Suspense>          
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
