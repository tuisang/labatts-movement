"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import FilterSidebar, { ActiveFilters, emptyFilters } from "@/components/activity-library/FilterSidebar";
import VideoCard from "@/components/activity-library/VideoCard";
import { videoLibraryData } from "@/components/activity-library/types";

const categoryTabs = ["Fundamental Movement Skills", "Agility Training", "School Class Activities"];
const PAGE_SIZE = 6;

function ActivityLibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") ?? "";

  const [filters, setFilters] = useState<ActiveFilters>(emptyFilters);
  const [activeTab, setActiveTab] = useState(categoryTabs[1]);
  const [page, setPage] = useState(1);

  const filteredVideos = useMemo(() => {
    return videoLibraryData.filter((video) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          video.title.toLowerCase().includes(q) || video.description.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      if (filters.ageGroup.length > 0 && !filters.ageGroup.includes(video.ageGroup)) return false;
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(video.difficulty)) return false;
      if (filters.setting.length > 0 && !filters.setting.includes(video.setting)) return false;
      if (
        filters.equipment.length > 0 &&
        !video.equipment.some((eq) => filters.equipment.includes(eq))
      )
        return false;
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / PAGE_SIZE));
  const paginatedVideos = filteredVideos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (next: ActiveFilters) => {
    setFilters(next);
    setPage(1);
  };

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

        {searchQuery && (
          <div className="flex items-center gap-3 mb-6 bg-surface-container rounded-lg px-4 py-2.5 w-fit">
            <span className="text-sm text-on-surface-variant">
              Showing results for <span className="font-medium text-on-surface">&quot;{searchQuery}&quot;</span>
            </span>
            <button
              onClick={() => router.push("/activity-library")}
              className="text-primary text-sm font-medium hover:underline"
            >
              Clear
            </button>
          </div>
        )}

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
          <FilterSidebar filters={filters} onChange={handleFilterChange} />

          <div className="flex-1">
            {paginatedVideos.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-xl p-10 text-center video-card-shadow">
                <span className="material-symbols-outlined text-[40px] text-on-surface-variant mb-3 block">
                  search_off
                </span>
                <p className="text-on-surface-variant">
                  No videos match your selected filters. Try clearing some filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-16 gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                  disabled={page === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ActivityLibraryPage() {
  return (
    <Suspense fallback={null}>
      <ActivityLibraryContent />
    </Suspense>
  );
}
