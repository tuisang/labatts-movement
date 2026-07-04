"use client";

import { EquipmentItem } from "./equipmentCatalog";

export default function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden video-card-shadow flex flex-col">
      <div className="relative aspect-video">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${item.imageUrl}')` }}
        />
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
            <a
              href={`mailto:info@tuistech.co.ke?subject=${encodeURIComponent(
                `Equipment Hire Request: ${item.name}`
              )}&body=${encodeURIComponent(
                `Hi Labatts Movement,\n\nI'd like to request hire of the ${item.name} (KSh ${item.pricePerDay}/day). Please let me know availability and next steps.\n\nThanks!`
              )}`}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-label-md hover:bg-primary-container transition-colors"
            >
              Request to Hire
            </a>
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
    </div>
  );
}
