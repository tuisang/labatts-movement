"use client";

import { useRef } from "react";
import { addAthlete } from "@/app/parent-portal/actions";

export default function AddAthleteForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addAthlete(formData);
        formRef.current?.reset();
      }}
      className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow flex flex-col gap-4"
    >
      <h3 className="font-headline-md text-[16px] text-on-surface">Add an Athlete</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          name="name"
          placeholder="Child's name"
          required
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="ageGroup"
          placeholder="Age group (e.g. 10-12)"
          required
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="sport"
          placeholder="Sport (optional)"
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        className="self-start bg-primary text-on-primary px-5 py-2.5 rounded-lg text-sm font-label-md hover:bg-primary-container transition-colors"
      >
        Add Athlete
      </button>
    </form>
  );
}
