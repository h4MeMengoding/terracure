"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/icons";
import { getGrowthPhase } from "@/lib/calculate-hst";
import type { Evaluation, SensorData } from "@/types/terracure";

type RecommendationSheetProps = {
  open: boolean;
  evaluation: Evaluation;
  data: SensorData;
  onClose: () => void;
};

export function RecommendationSheet({ open, evaluation, data, onClose }: RecommendationSheetProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const steps = getRecommendationSteps(evaluation.status);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#17201C]/55 px-2" role="dialog" aria-modal="true" aria-labelledby="recommendation-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="safe-bottom max-h-[90dvh] w-full max-w-[460px] overflow-y-auto rounded-t-[20px] bg-[#F7F8F5] p-4 shadow-[0_-16px_40px_rgb(23_32_28/18%)]">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#C2CBC3]" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#A92B24]">PANDUAN LAPANGAN</p>
            <h2 id="recommendation-title" className="mt-1 text-xl font-bold text-[#17201C]">
              {evaluation.status}
            </h2>
            <p className="mt-1 text-sm font-semibold text-[#5B665F]">
              HST {data.hst}, {getGrowthPhase(data.hst)}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Tutup rekomendasi"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#CFD7CF] bg-white text-[#173F36]"
          >
            <CloseIcon />
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#414C46]">{evaluation.detail}</p>
        <ol className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <li key={step.title} className="surface-card flex gap-3 p-3.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#173F36] text-xs font-bold text-[#CDE974]">{index + 1}</span>
              <div>
                <p className="text-sm font-bold text-[#17201C]">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#4E5A53]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-4 rounded-lg border border-[#D7DEC0] bg-[#EFF7D7] p-3.5">
          <p className="text-sm font-bold text-[#23483E]">Gejala yang Perlu Diamati</p>
          <p className="mt-1 text-sm leading-6 text-[#414C46]">
            Perhatikan gejala daun pucat, tepi daun terbakar, atau pertumbuhan terhambat saat kondisi ini muncul.
          </p>
        </div>
      </div>
    </div>
  );
}

function getRecommendationSteps(status: string) {
  if (status === "Toksisitas Tinggi") {
    return [
      {
        title: "Hentikan semua pupuk kimia sementara",
        body: "Intensitas kimia sudah di atas 2000 µS/cm. Penambahan pupuk dapat menaikkan toksisitas dan merusak tanaman."
      },
      {
        title: "Lakukan pembilasan lahan",
        body: "Alirkan air bersih 2 sampai 3 hari berturut-turut untuk menurunkan kadar garam dan residu pupuk."
      },
      {
        title: "Lakukan pengapuran ringan",
        body: "Taburkan kapur dolomit 100 sampai 150 kg/ha untuk membantu menjaga pH tetap stabil."
      },
      {
        title: "Tunda pemupukan lanjut",
        body: "Evaluasi ulang setelah intensitas kimia turun di bawah 2000 µS/cm dan pH berada di atas 5.5."
      }
    ];
  }

  return [
    {
      title: "Ikuti tindakan utama",
      body: status === "Tanah Kering" ? "Tambahkan air sampai kelembapan dan tinggi air kembali aman." : "Lakukan tindakan sesuai rekomendasi utama sistem."
    },
    {
      title: "Pantau ulang parameter",
      body: "Periksa kembali data sensor pada siklus pemantauan berikutnya."
    }
  ];
}
