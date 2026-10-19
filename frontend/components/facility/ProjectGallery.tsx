"use client";

import { useEffect, useState } from "react";

export type GalleryProject = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
};

/** Cloudinary images get a lighter delivery version; other hosts are used as-is. */
export function optimise(url: string, width: number) {
  return url.includes("res.cloudinary.com") && url.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
    : url;
}

export default function ProjectGallery({ projects }: { projects: GalleryProject[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<GalleryProject | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <>
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === c
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((p) => (
          <button
            key={p.id}
            onClick={() => setOpen(p)}
            className="group text-left bg-surface-container-lowest rounded-xl overflow-hidden video-card-shadow hover:-translate-y-0.5 transition-transform"
          >
            <div className="aspect-[4/3] bg-surface-container overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimise(p.imageUrl, 800)}
                alt={p.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.category}</span>
              <h3 className="font-semibold mt-1">{p.title}</h3>
              {p.location && <p className="text-xs text-on-surface-variant mt-0.5">{p.location}</p>}
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <div
            className="bg-surface rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={optimise(open.imageUrl, 1600)}
              alt={open.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[60vh] object-contain bg-black"
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{open.category}</span>
                  <h3 className="font-headline-md text-headline-md">{open.title}</h3>
                  {open.location && <p className="text-sm text-on-surface-variant">{open.location}</p>}
                </div>
                <button onClick={() => setOpen(null)} aria-label="Close" className="text-on-surface-variant hover:text-on-surface">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              {open.description && <p className="text-sm text-on-surface-variant mt-3">{open.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
