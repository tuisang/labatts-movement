"use client";

import { useState } from "react";
import type { EquipmentItem } from "./equipmentCatalog";

const field =
  "w-full border border-outline-variant rounded-lg px-3 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary";
const MS_DAY = 24 * 60 * 60 * 1000;

export default function HireRequestModal({
  item,
  onClose,
}: {
  item: EquipmentItem;
  onClose: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: today,
    endDate: today,
    quantity: "1",
    notes: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const days =
    form.startDate && form.endDate
      ? Math.round(
          (new Date(`${form.endDate}T00:00:00Z`).getTime() -
            new Date(`${form.startDate}T00:00:00Z`).getTime()) /
            MS_DAY
        ) + 1
      : 0;
  const qty = Math.max(1, Number(form.quantity) || 1);
  const estimate = days > 0 ? days * qty * item.pricePerDay : 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/equipment-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, itemId: item.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface-container-lowest rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline-md text-[18px] text-on-surface">Request to hire</h2>
          <button onClick={onClose} aria-label="Close" className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {status === "sent" ? (
          <div className="text-center py-6">
            <span className="material-symbols-outlined text-[44px] text-tertiary mb-3 block">check_circle</span>
            <h3 className="font-headline-md text-[18px] mb-2">Request sent</h3>
            <p className="text-on-surface-variant text-sm mb-6">
              Thanks! We&apos;ll confirm availability and next steps by phone or email shortly.
            </p>
            <button onClick={onClose} className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <div className="bg-surface-container rounded-lg px-4 py-3 text-sm">
              <p className="font-medium text-on-surface">{item.name}</p>
              <p className="text-on-surface-variant">KSh {item.pricePerDay.toLocaleString()} / day</p>
            </div>

            <input type="text" name="website" value={form.website} onChange={(e) => set("website", e.target.value)}
              tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <input required maxLength={100} placeholder="Your name" value={form.name} onChange={(e) => set("name", e.target.value)} className={field} />
            <div className="grid grid-cols-2 gap-3">
              <input required type="tel" maxLength={40} placeholder="Phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={field} />
              <input required type="email" maxLength={200} placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} className={field} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <label className="col-span-1 text-xs text-on-surface-variant flex flex-col gap-1">
                From
                <input required type="date" min={today} value={form.startDate}
                  onChange={(e) => { set("startDate", e.target.value); if (form.endDate < e.target.value) set("endDate", e.target.value); }}
                  className={field} />
              </label>
              <label className="col-span-1 text-xs text-on-surface-variant flex flex-col gap-1">
                To
                <input required type="date" min={form.startDate || today} value={form.endDate}
                  onChange={(e) => set("endDate", e.target.value)} className={field} />
              </label>
              <label className="col-span-1 text-xs text-on-surface-variant flex flex-col gap-1">
                Quantity
                <input required type="number" min={1} max={50} value={form.quantity}
                  onChange={(e) => set("quantity", e.target.value)} className={field} />
              </label>
            </div>
            <textarea rows={3} maxLength={1000} placeholder="Notes (optional) — e.g. pickup or delivery to a school"
              value={form.notes} onChange={(e) => set("notes", e.target.value)} className={field} />

            {estimate > 0 && (
              <p className="text-sm text-on-surface">
                Estimate: <span className="font-bold text-primary">KSh {estimate.toLocaleString()}</span>{" "}
                <span className="text-on-surface-variant">
                  ({days} day{days === 1 ? "" : "s"} × {qty} × KSh {item.pricePerDay.toLocaleString()})
                </span>
              </p>
            )}
            {status === "error" && <p className="text-error text-sm">{error}</p>}

            <button type="submit" disabled={status === "sending"}
              className="bg-primary text-on-primary py-3 rounded-full font-label-md hover:bg-primary-container transition-colors disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send request"}
            </button>
            <p className="text-xs text-on-surface-variant text-center">No payment now — we&apos;ll confirm availability first.</p>
          </form>
        )}
      </div>
    </div>
  );
}
