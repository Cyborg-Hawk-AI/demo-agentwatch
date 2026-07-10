"use client";

import { useState } from "react";
import { Info } from "lucide-react";

interface DevNoteProps {
  note: string;
  position?: "top" | "bottom" | "left" | "right";
}

export default function DevNote({ note, position = "top" }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent-hover ring-1 ring-accent/30 transition hover:bg-accent/30"
        aria-label="Developer note"
      >
        <Info className="h-3 w-3" />
      </button>
      {open && (
        <span
          className={`absolute z-50 w-64 rounded-lg border border-surface-border bg-surface-overlay p-3 text-xs leading-relaxed text-gray-300 shadow-xl animate-fade-in ${positionClasses[position]}`}
        >
          <span className="mb-1 block font-semibold text-accent-hover">
            DEV NOTE
          </span>
          {note}
        </span>
      )}
    </span>
  );
}
