"use client";

import { useState } from "react";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import FilterSidebar from "@/components/activity-library/FilterSidebar";
import VideoCard from "@/components/activity-library/VideoCard";
import { videoLibraryData } from "@/components/activity-library/types";

const categoryTabs = ["Fundamental Movement Skills", "Agility Training", "School Class Activities"];
const totalPages = 3;

export default function ActivityLibraryPage() {
  const [activeFilter, setActiveFilter] = useState("Age");
  const [activeTab, setActiveTab] = useState(categoryTabs[1]);
  const [page, setPage] = useState(1);

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Video Library
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl mb-8">
          Elite training for every athlete. Explore over 500+ instructional videos designed by
          professional coaches.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === activeTab
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <FilterSidebar
            active={activeFilter}
            onSelect={setActiveFilter}
            onClearAll={() => setActiveFilter("Age")}
          />

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoLibraryData.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            <div className="flex justify-center mt-16 gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                    n === page
                      ? "bg-primary text-on-primary font-bold"
                      : "border border-outline-variant text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
