"use client";

import { EquipmentItem } from "./equipmentCatalog";
import { useState } from "react";
import EquipmentImage from "./EquipmentImage";
import HireRequestModal from "./HireRequestModal";

export default function EquipmentCard({ item }: { item: EquipmentItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden video-card-shadow flex flex-col">
      <div className="relative aspect-video">
        <EquipmentImage src={item.imageUrl} alt={item.name} className="absolute inset-0 w-full h-full" />
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-error text-on-error text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
              Currently Unavailable
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-surface-container-lowest/90 text-on-surface-variant text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded">
          {item.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-headline-md text-[17px] text-on-surface mb-2">{item.name}</h3>
        <p className="text-on-surface-variant text-sm mb-4 flex-1">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-headline-md text-lg text-primary">
            KSh {item.pricePerDay}
            <span className="text-xs text-on-surface-variant font-normal">/day</span>
          </span>
          {item.available ? (
            <button
              onClick={() => setOpen(true)}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-label-md hover:bg-primary-container transition-colors"
            >
              Request to Hire
            </button>
          ) : (
            <button
              disabled
              className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-label-md opacity-40 cursor-not-allowed"
            >
              Request to Hire
            </button>
          )}
        </div>
      </div>
      {open && <HireRequestModal item={item} onClose={() => setOpen(false)} />}
    </div>
  );
}
