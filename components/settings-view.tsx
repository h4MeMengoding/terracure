"use client";

import { useEffect, useState } from "react";
import { scenarios } from "@/data/scenarios";
import { TOTAL_HST, getGrowthPhase } from "@/lib/calculate-hst";
import { useTerracureSimulation } from "@/hooks/use-terracure-simulation";
import { AppShell } from "@/components/app-shell";
import { NotificationSettings } from "@/components/notification-settings";
import { InstallAppButton } from "@/components/install-app-button";
import { X } from "lucide-react";

export function SettingsView() {
  const { scenario, sensorData, changeScenario } = useTerracureSimulation();
  const [showDevMode, setShowDevMode] = useState(false);

  useEffect(() => {
    if (!showDevMode) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowDevMode(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDevMode]);

  return (
    <AppShell title="Pengaturan">
      <div className="settings-stack">
        <section className="rounded-[14px] bg-[#173F36] p-4 text-white">
          <p className="text-[11px] font-extrabold tracking-[0.06em] text-[#CDE974]">HST SAAT INI</p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <p className="text-4xl font-bold">{sensorData.hst}<span className="ml-1 text-base font-semibold text-[#DCE7E2]">/ {TOTAL_HST}</span></p>
            <p className="pb-1 text-right text-sm font-semibold text-[#DCE7E2]">{getGrowthPhase(sensorData.hst)}</p>
          </div>
        </section>

        <InstallAppButton />
        <NotificationSettings />
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={showDevMode}
          onClick={() => setShowDevMode(true)}
          className="surface-card w-full p-4 text-center text-sm font-extrabold text-[#173F36] transition-colors hover:border-[#9EAE9F] hover:bg-[#FAFCF9]"
        >
          DEMO MODE
        </button>
      </div>
      {showDevMode ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#17201C]/55 px-3 pb-3" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowDevMode(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="dev-mode-title" className="w-full max-w-[428px] rounded-[18px] bg-white p-5 shadow-[0_18px_50px_rgb(23_32_28/28%)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">DEV MODE</p>
                <h2 id="dev-mode-title" className="mt-1 text-[20px] font-extrabold leading-tight text-[#17201C]">Mode data dummy</h2>
              </div>
              <button type="button" aria-label="Tutup mode data dummy" onClick={() => setShowDevMode(false)} className="grid !min-h-9 h-9 w-9 shrink-0 place-items-center rounded-full border border-[#DCE2DC] text-[#477064] hover:bg-[#EFF7D7]">
                <X aria-hidden="true" size={17} />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#5F6963]">Pilih skenario lokal untuk menguji tampilan dan alur aplikasi saat data sensor belum tersedia.</p>
            <label className="mt-5 block text-xs font-bold text-[#5B665F]" htmlFor="scenario">
              Skenario data
            </label>
            <select
              id="scenario"
              value={scenario.id}
              onChange={(event) => changeScenario(event.target.value)}
              className="mt-2 w-full rounded-lg border border-[#CBD4CC] bg-white px-3 text-sm font-semibold text-[#17201C]"
            >
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </section>
        </div>
      ) : null}
    </AppShell>
  );
}
