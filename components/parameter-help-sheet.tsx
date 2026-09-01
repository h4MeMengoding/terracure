"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type ParameterHelpSheetProps = {
  open: boolean;
  label: string;
  description: string;
  onClose: () => void;
};

export function ParameterHelpSheet({ open, label, description, onClose }: ParameterHelpSheetProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#17201C]/45 px-3 pb-3" role="presentation" onMouseDown={onClose}>
      <section aria-labelledby="parameter-help-title" aria-modal="true" role="dialog" className="w-full max-w-[428px] rounded-[20px] bg-white p-5 shadow-[0_18px_50px_rgb(23_32_28/28%)]" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6C766F]">Penjelasan parameter</p>
            <h2 id="parameter-help-title" className="mt-1 text-xl font-bold text-[#17201C]">{label}</h2>
          </div>
          <button type="button" aria-label="Tutup penjelasan" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#DCE2DC] text-[#173F36] transition-colors hover:bg-[#EFF7D7]">
            <X aria-hidden="true" size={19} strokeWidth={2.2} />
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#4E5A53]">{description}</p>
      </section>
    </div>
  );
}
