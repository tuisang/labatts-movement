"use client";

import { useRef, useTransition } from "react";
import { addSessionOption, toggleSessionActive, deleteSessionOption } from "@/app/dashboard/coach/actions";

interface SessionOptionData {
  id: string;
  name: string;
  duration: string;
  price: number;
  active: boolean;
}

export default function CoachSessionsManager({ sessions }: { sessions: SessionOptionData[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 video-card-shadow">
      <div className="flex flex-col gap-2 mb-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between border-b border-outline-variant/30 pb-2"
          >
            <div>
              <p className={`text-sm font-medium ${session.active ? "text-on-surface" : "text-on-surface-variant line-through"}`}>
                {session.name}
              </p>
              <p className="text-xs text-on-surface-variant">
                {session.duration} • KSh {session.price}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  startTransition(() => toggleSessionActive(session.id, !session.active))
                }
                disabled={isPending}
                className="text-xs border border-outline-variant px-2.5 py-1 rounded-lg hover:bg-surface-container transition-colors disabled:opacity-50"
              >
                {session.active ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => startTransition(() => deleteSessionOption(session.id))}
                disabled={isPending}
                className="text-xs text-error border border-error/30 px-2.5 py-1 rounded-lg hover:bg-error-container/30 transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {sessions.length === 0 && (
          <p className="text-on-surface-variant text-sm italic">No sessions yet.</p>
        )}
      </div>

      <form
        ref={formRef}
        action={async (formData) => {
          await addSessionOption(formData);
          formRef.current?.reset();
        }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-2 border-t border-outline-variant/30 pt-4"
      >
        <input
          name="name"
          placeholder="Session name"
          required
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:col-span-2"
        />
        <input
          name="duration"
          placeholder="e.g. 60 min"
          required
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="price"
          type="number"
          placeholder="Price (KSh)"
          required
          className="border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="sm:col-span-4 self-start bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-label-md hover:bg-primary-container transition-colors"
        >
          Add Session
        </button>
      </form>
    </div>
  );
}
