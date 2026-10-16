"use client";

import { useRef, useState, useTransition } from "react";
import EquipmentImage from "@/components/equipment-hire/EquipmentImage";
import ImageUploadButton from "@/components/coach/ImageUploadButton";
import { addEquipmentItem, toggleEquipmentAvailable, deleteEquipmentItem, updateEquipmentImage } from "@/app/dashboard/coach/actions";

interface EquipmentItemData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pricePerDay: number;
  category: string;
  available: boolean;
}

export default function CoachEquipmentManager({ items }: { items: EquipmentItemData[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
      <div className="flex flex-col gap-2 mb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-outline-variant/30 pb-2"
          >
            <div className="flex items-center gap-3">
              <EquipmentImage
                src={item.imageUrl}
                alt={item.name}
                className="w-12 h-12 rounded-lg shrink-0"
              />
              <div>
              <p className={`text-sm font-medium ${item.available ? "text-on-surface" : "text-on-surface-variant line-through"}`}>
                {item.name}
              </p>
              <p className="text-xs text-on-surface-variant">
                {item.category} • KSh {item.pricePerDay}/day
              </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <ImageUploadButton
                label="Change photo"
                onUploaded={(url) => updateEquipmentImage(item.id, url)}
              />
              <button
                onClick={() =>
                  startTransition(() => toggleEquipmentAvailable(item.id, !item.available))
                }
                disabled={isPending}
                className="text-xs border border-outline-variant px-2.5 py-1 rounded-lg hover:bg-surface-container transition-colors disabled:opacity-50"
              >
                {item.available ? "Mark Unavailable" : "Mark Available"}
              </button>
              <button
                onClick={() => startTransition(() => deleteEquipmentItem(item.id))}
                disabled={isPending}
                className="text-xs text-error border border-error/30 px-2.5 py-1 rounded-lg hover:bg-error-container/30 transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-on-surface-variant text-sm italic">No equipment yet.</p>
        )}
      </div>

      <form
        ref={formRef}
        action={async (formData) => {
          setError("");
          try {
            await addEquipmentItem(formData);
            formRef.current?.reset();
            setImageUrl("");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Could not add the item.");
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-outline-variant/30 pt-4"
      >
        <input
          name="name"
          placeholder="Item name"
          required
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="category"
          placeholder="Category (e.g. Agility)"
          required
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="description"
          placeholder="Description"
          required
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:col-span-2"
        />
        <div className="sm:col-span-2 flex flex-col gap-2">
          <input
            name="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL (a direct link to the photo, e.g. https://…/photo.jpg)"
            required
            className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span>or</span>
            <ImageUploadButton label="Upload a photo from your device" onUploaded={(url) => setImageUrl(url)} />
          </div>
          {imageUrl.trim() ? (
            <div className="flex items-center gap-3">
              <EquipmentImage
                src={imageUrl.trim()}
                alt="Preview"
                className="w-28 h-20 rounded-lg border border-outline-variant"
              />
              <p className="text-xs text-on-surface-variant">
                Preview. If you see a broken-image icon, the link isn&apos;t a direct image — right-click
                the photo and choose &ldquo;Copy image address&rdquo;.
              </p>
            </div>
          ) : (
            <p className="text-xs text-on-surface-variant">
              Tip: right-click a photo online and choose &ldquo;Copy image address&rdquo;, then paste it here.
            </p>
          )}
        </div>
        <input
          name="pricePerDay"
          type="number"
          placeholder="Price per day (KSh)"
          required
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="self-start bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-label-md hover:bg-primary-container transition-colors"
        >
          Add Equipment
        </button>
        {error && <p className="text-error text-sm sm:col-span-2">{error}</p>}
      </form>
    </div>
  );
}
