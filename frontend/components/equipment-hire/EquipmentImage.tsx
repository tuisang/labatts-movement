"use client";

import { useEffect, useState } from "react";

/**
 * Renders an equipment photo from any image URL. Uses a real <img> with
 * referrerPolicy="no-referrer" so hosts that block hotlinking from other
 * sites still serve the picture, and falls back to an icon if it can't load.
 */
export default function EquipmentImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div className={`bg-surface-container flex items-center justify-center ${className}`}>
        <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
          {src ? "broken_image" : "fitness_center"}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
