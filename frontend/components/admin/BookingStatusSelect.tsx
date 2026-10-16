"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;

const STATUS_STYLES: Record<string, string> = {
  pending: "text-[#994700] border-[#994700]",
  confirmed: "text-green-600 border-green-600",
  completed: "text-blue-600 border-blue-600",
  cancelled: "text-red-600 border-red-600",
};

export default function BookingStatusSelect({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  const change = async (next: string) => {
    const previous = value;
    setValue(next);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      if (!res.ok) throw new Error("Failed");
      router.refresh();
    } catch {
      setValue(previous);
      window.alert("Could not update the booking status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      value={value}
      disabled={saving}
      onChange={(e) => change(e.target.value)}
      className={`bg-surface border rounded-full text-xs font-bold uppercase tracking-wider px-3 py-1.5 outline-none cursor-pointer disabled:opacity-60 ${
        STATUS_STYLES[value] ?? "text-on-surface border-outline-variant"
      }`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
