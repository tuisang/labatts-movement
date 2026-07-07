"use client";

import { useTransition } from "react";
import { seedDefaultContent } from "@/app/dashboard/coach/actions";

export default function SeedDefaultsButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => seedDefaultContent())}
      disabled={isPending}
      className="text-xs border border-outline-variant text-on-surface-variant px-3 py-1.5 rounded-lg hover:bg-surface-container transition-colors disabled:opacity-50"
    >
      {isPending ? "Seeding..." : "Seed Default Content"}
    </button>
  );
}
