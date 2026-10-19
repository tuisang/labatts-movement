"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadButton from "@/components/coach/ImageUploadButton";
import { addFacilityProject, deleteFacilityProject } from "@/app/facility/actions";
import { PROJECT_CATEGORIES } from "@/lib/facilityCategories";
import { optimise, type GalleryProject } from "@/components/facility/ProjectGallery";

const field =
  "border border-outline-variant rounded-lg px-3 py-2 text-sm bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary";

export default function FacilityProjectsManager({ projects }: { projects: GalleryProject[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(PROJECT_CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const add = async () => {
    setError("");
    if (!imageUrl) return setError("Please upload a photo first.");
    setSaving(true);
    try {
      await addFacilityProject({ title, category, location, description, imageUrl });
      setTitle("");
      setLocation("");
      setDescription("");
      setImageUrl("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save the project.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Remove this project from the gallery?")) return;
    try {
      await deleteFacilityProject(id);
      router.refresh();
    } catch {
      window.alert("Could not remove the project.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface-container-lowest rounded-xl p-5 video-card-shadow grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5">
        <div className="flex flex-col gap-2">
          <div className="aspect-[4/3] rounded-lg bg-surface-container overflow-hidden flex items-center justify-center text-on-surface-variant text-xs">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={optimise(imageUrl, 400)} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              "Photo preview"
            )}
          </div>
          <ImageUploadButton onUploaded={setImageUrl} label={imageUrl ? "Change photo" : "Upload photo"} />
        </div>
        <div className="flex flex-col gap-3">
          <input className={field} placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select className={field} value={category} onChange={(e) => setCategory(e.target.value)}>
              {PROJECT_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input className={field} placeholder="Location (optional)" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <textarea
            className={field}
            rows={3}
            placeholder="Short description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p className="text-error text-sm">{error}</p>}
          <button
            onClick={add}
            disabled={saving || !title.trim()}
            className="self-start bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md hover:bg-primary-container transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Add to gallery"}
          </button>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-surface-container-lowest rounded-xl overflow-hidden video-card-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={optimise(p.imageUrl, 400)} alt={p.title} referrerPolicy="no-referrer" className="aspect-[4/3] w-full object-cover" />
              <div className="p-3">
                <p className="text-sm font-medium truncate">{p.title}</p>
                <p className="text-xs text-on-surface-variant">{p.category}</p>
                <button onClick={() => remove(p.id)} className="text-xs text-error hover:underline mt-1">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
