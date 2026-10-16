"use client";

import { useState } from "react";
import { updateActivityVideo, type CoachActivityVideo } from "@/app/activity-library/actions";
import type { Difficulty, Setting } from "@/components/activity-library/types";
import ImageUploadButton from "@/components/coach/ImageUploadButton";
import {
  AGE_GROUP_OPTIONS,
  DIFFICULTY_OPTIONS,
  SETTING_OPTIONS,
  EQUIPMENT_OPTIONS,
} from "@/components/activity-library/filterOptions";

const field =
  "border border-outline-variant rounded-lg px-3 py-2 text-sm bg-surface-container-lowest w-full";

export default function EditVideoModal({
  video,
  onClose,
  onSaved,
}: {
  video: CoachActivityVideo;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [difficulty, setDifficulty] = useState<Difficulty>(video.difficulty);
  const [setting, setSetting] = useState<Setting>(video.setting);
  const [ageGroup, setAgeGroup] = useState(video.ageGroup);
  const [coach, setCoach] = useState(video.coach);
  const [equipment, setEquipment] = useState<string[]>(video.equipment);
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // What the thumbnail will look like after saving.
  const previewThumb =
    thumbnail && thumbnail !== "reset"
      ? thumbnail
      : thumbnail === "reset"
      ? video.videoUrl.replace("/video/upload/", "/video/upload/so_0/").replace(/\.[^./]+$/, ".jpg")
      : video.thumbnailUrl;

  const toggleEquipment = (item: string) =>
    setEquipment((prev) => (prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateActivityVideo(video.id, {
        title,
        description,
        difficulty,
        ageGroup,
        coach,
        setting,
        equipment,
        thumbnail,
      });
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save your changes.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-headline-md text-[18px] text-on-surface">Edit Video</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-28 h-16 rounded-lg bg-cover bg-center bg-surface-container shrink-0"
              style={{ backgroundImage: `url('${previewThumb}')` }}
            />
            <div className="flex flex-col gap-1.5">
              <ImageUploadButton
                label="Upload custom thumbnail"
                onUploaded={(url) => setThumbnail(url)}
              />
              <button
                type="button"
                onClick={() => setThumbnail("reset")}
                className="text-xs text-primary hover:underline text-left"
              >
                Use the video&apos;s first frame
              </button>
            </div>
          </div>

          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className={field} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className={field}
          />
          <div className="grid grid-cols-2 gap-3">
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className={field}>
              {DIFFICULTY_OPTIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select value={setting} onChange={(e) => setSetting(e.target.value as Setting)} className={field}>
              {SETTING_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className={field}>
              {Array.from(new Set([...AGE_GROUP_OPTIONS, video.ageGroup])).map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <input value={coach} onChange={(e) => setCoach(e.target.value)} placeholder="Coach name" className={field} />
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

          {error && <p className="text-error text-sm">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 border border-outline-variant py-2.5 rounded-lg font-label-md hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="flex-1 bg-primary text-on-primary py-2.5 rounded-lg font-label-md hover:bg-primary-container transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
