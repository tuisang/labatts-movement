"use client";

import { useRef, useState } from "react";

const MAX_MB = 10;

/** Picks a photo, uploads it straight to Cloudinary and hands back its https URL. */
export default function ImageUploadButton({
  onUploaded,
  label = "Upload photo",
  className = "",
}: {
  onUploaded: (url: string) => void | Promise<void>;
  label?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) return setError("Please choose an image file.");
    if (file.size > MAX_MB * 1024 * 1024) return setError(`Image must be under ${MAX_MB} MB.`);

    setBusy(true);
    try {
      const signRes = await fetch("/api/equipment-image/sign", { method: "POST" });
      if (!signRes.ok) {
        const body = await signRes.json().catch(() => ({}));
        throw new Error(body.error || "Could not start the upload.");
      }
      const sign = await signRes.json();

      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", sign.apiKey);
      fd.append("timestamp", String(sign.timestamp));
      fd.append("signature", sign.signature);
      fd.append("folder", sign.folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Cloudinary rejected the upload. Please try again.");
      const data = await res.json();
      await onUploaded(data.secure_url as string);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <span className={`inline-flex flex-col gap-1 ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="text-xs border border-outline-variant px-2.5 py-1 rounded-lg hover:bg-surface-container transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {busy ? "Uploading…" : label}
      </button>
      {error && <span className="text-error text-xs">{error}</span>}
    </span>
  );
}
