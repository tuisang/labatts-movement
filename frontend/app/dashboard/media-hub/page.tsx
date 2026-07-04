"use client";

import { useState } from "react";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import MediaHubSidebar from "@/components/media-hub/MediaHubSidebar";
import MediaHubStats from "@/components/media-hub/MediaHubStats";
import MediaTable from "@/components/media-hub/MediaTable";

export default function MediaHubPage() {
  const [activeNav, setActiveNav] = useState("Media Library");

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <div className="flex flex-col md:flex-row gap-10">
          <MediaHubSidebar active={activeNav} onSelect={setActiveNav} />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">
                  Media Library
                </h1>
                <p className="text-on-surface-variant">
                  Monitor, edit, and organize your elite athletic training sessions and
                  instructional content.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-lg font-label-md whitespace-nowrap hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Upload New Media
              </button>
            </div>

            <MediaHubStats />
            <MediaTable />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
