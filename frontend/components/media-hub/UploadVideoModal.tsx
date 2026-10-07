"use client";

import { useRef, useState } from "react";
import { createActivityVideo } from "@/app/activity-library/actions";
import type { Difficulty, Setting } from "@/components/activity-library/types";
import {
  AGE_GROUP_OPTIONS,
  DIFFICULTY_OPTIONS,
  SETTING_OPTIONS,
  EQUIPMENT_OPTIONS,
} from "@/components/activity-library/filterOptions";

const MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100MB

interface SignResponse {
  signature: string;
  timestamp: number;
  folder: string;
  apiKey: string;
  cloudName: string;
}

export default function UploadVideoModal({
  onClose,
  onUploaded,
}: {
  onClose: () => void;
  onUploaded: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"idle" | "uploading" | "saving" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<{
    videoUrl: string;
    videoPublicId: string;
    durationSeconds: number;
  } | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Beginner");
  const [ageGroup, setAgeGroup] = useState(AGE_GROUP_OPTIONS[0]);
  const [coach, setCoach] = useState("");
  const [setting, setSetting] = useState<Setting>("Indoor");
  const [equipment, setEquipment] = useState<string[]>([]);

  const toggleEquipment = (item: string) => {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const handleFileSelect = (selected: File | null) => {
    setErrorMsg(null);
    setUploadResult(null);
    if (!selected) {
      setFile(null);
      return;
    }
    if (!selected.type.startsWith("video/")) {
      setErrorMsg("Please choose a video file.");
      return;
    }
    if (selected.size > MAX_SIZE_BYTES) {
      setErrorMsg("That file is over 100MB. Please trim it or compress it first.");
      return;
    }
    setFile(selected);
  };

  const startUpload = async () => {
    if (!file) return;
    setStage("uploading");
    setProgress(0);
    setErrorMsg(null);

    try {
      const signRes = await fetch("/api/activity-video/sign", { method: "POST" });
      if (!signRes.ok) {
        const body = await signRes.json().catch(() => ({}));
        throw new Error(body.error || "Could not start the upload. Please try again.");
      }
      const sign: SignResponse = await signRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", sign.apiKey);
      formData.append("timestamp", String(sign.timestamp));
      formData.append("signature", sign.signature);
      formData.append("folder", sign.folder);
      formData.append("resource_type", "video");

      const result = await new Promise<{ secure_url: string; public_id: string; duration: number }>(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            `https://api.cloudinary.com/v1_1/${sign.cloudName}/video/upload`
          );
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              setProgress(Math.round((e.loaded / e.total) * 100));
            }
          };
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error("Cloudinary rejected the upload. Please try again."));
            }
          };
          xhr.onerror = () => reject(new Error("Upload failed — check your connection and try again."));
          xhr.send(formData);
        }
      );

      setUploadResult({
        videoUrl: result.secure_url,
        videoPublicId: result.public_id,
        durationSeconds: result.duration ?? 0,
      });
      setStage("idle");
      if (!title) {
        setTitle(file.name.replace(/\.[^./]+$/, ""));
      }
    } catch (err) {
      setStage("error");
      setErrorMsg(err instanceof Error ? err.message : "Upload failed.");
    }
  };

  const handleSave = async () => {
    if (!uploadResult) return;
    setStage("saving");
    setErrorMsg(null);
    try {
      await createActivityVideo({
        title,
        description,
        videoUrl: uploadResult.videoUrl,
        videoPublicId: uploadResult.videoPublicId,
        durationSeconds: uploadResult.durationSeconds,
        difficulty,
        ageGroup,
        coach,
        setting,
        equipment,
      });
      onUploaded();
    } catch (err) {
      setStage("error");
      setErrorMsg(err instanceof Error ? err.message : "Could not save the video.");
    }
  };

  const canSave = uploadResult && title.trim().length > 0 && stage !== "saving";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-headline-md text-[18px] text-on-surface">Upload New Media</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {!file && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-outline-variant rounded-lg py-10 flex flex-col items-center gap-2 text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[32px]">upload_file</span>
            <span className="text-sm font-medium">Click to choose a video (max 100MB)</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
        />

        {file && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-on-surface font-medium truncate pr-2">{file.name}</span>
              <span className="text-on-surface-variant shrink-0">
                {(file.size / (1024 * 1024)).toFixed(1)} MB
              </span>
            </div>

            {!uploadResult && stage !== "uploading" && (
              <button
                onClick={startUpload}
                className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md hover:bg-primary-container transition-colors"
              >
                Start Upload
              </button>
            )}

            {stage === "uploading" && (
              <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {uploadResult && (
              <p className="text-tertiary text-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Upload complete — fill in the details below.
              </p>
            )}
          </div>
        )}

        {errorMsg && <p className="text-error text-sm mb-4">{errorMsg}</p>}

        {uploadResult && (
          <div className="flex flex-col gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-outline-variant rounded-lg px-3 py-2 text-sm bg-surface-container-lowest"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={3}
              className="border border-outline-variant rounded-lg px-3 py-2 text-sm bg-surface-container-lowest"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="border border-outline-variant rounded-lg px-3 py-2 text-sm bg-surface-container-lowest"
              >
                {DIFFICULTY_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                value={setting}
                onChange={(e) => setSetting(e.target.value as Setting)}
                className="border border-outline-variant rounded-lg px-3 py-2 text-sm bg-surface-container-lowest"
              >
                {SETTING_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="border border-outline-variant rounded-lg px-3 py-2 text-sm bg-surface-container-lowest"
              >
                {AGE_GROUP_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <input
                value={coach}
                onChange={(e) => setCoach(e.target.value)}
                placeholder="Coach name"
                className="border border-outline-variant rounded-lg px-3 py-2 text-sm bg-surface-container-lowest"
              />
            </div>

            <div>
              <p className="text-xs text-on-surface-variant mb-2">Equipment</p>
              <div className="flex flex-wrap gap-2">
                {EQUIPMENT_OPTIONS.map((item) => {
                  const active = equipment.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleEquipment(item)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                        active
                          ? "bg-primary text-on-primary border-primary"
                          : "border-outline-variant text-on-surface-variant hover:border-primary"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={!canSave}
              className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {stage === "saving" ? "Saving…" : "Save as Draft"}
            </button>
            <p className="text-xs text-on-surface-variant text-center">
              Saved as a draft — publish it from the Media Library to make it live.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
