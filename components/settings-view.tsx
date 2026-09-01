"use client";

import { scenarios } from "@/data/scenarios";
import { TOTAL_HST, getGrowthPhase } from "@/lib/calculate-hst";
import { useTerracureSimulation } from "@/hooks/use-terracure-simulation";
import { AppShell } from "@/components/app-shell";
import { NotificationSettings } from "@/components/notification-settings";
import { InstallAppButton } from "@/components/install-app-button";

export function SettingsView() {
  const { scenario, sensorData, changeScenario } = useTerracureSimulation();

  return (
    <AppShell title="Pengaturan">
      <div className="settings-stack">
        <section className="rounded-[14px] bg-[#173F36] p-4 text-white">
          <p className="text-[11px] font-extrabold tracking-[0.06em] text-[#CDE974]">HST SAAT INI</p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <p className="text-4xl font-bold">{sensorData.hst}<span className="ml-1 text-base font-semibold text-[#DCE7E2]">/ {TOTAL_HST}</span></p>
            <p className="pb-1 text-right text-sm font-semibold text-[#DCE7E2]">{getGrowthPhase(sensorData.hst)}</p>
          </div>
          <p className="mt-3 border-t border-white/15 pt-3 text-xs leading-5 text-[#DCE7E2]">
            Sistem memakai HST dari skenario demonstrasi.
          </p>
        </section>

        <section className="surface-card p-4">
          <label className="block text-[18px] font-extrabold leading-tight text-[#17201C]" htmlFor="scenario">
            Mode data dummy
          </label>
          <select
            id="scenario"
            value={scenario.id}
            onChange={(event) => changeScenario(event.target.value)}
            className="mt-3 w-full rounded-lg border border-[#CBD4CC] bg-white px-3 text-sm font-semibold text-[#17201C]"
          >
            {scenarios.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <p className="mt-3 text-xs leading-5 text-[#5F6963]">
            Pilihan ini hanya mengubah data dummy lokal untuk kebutuhan presentasi.
          </p>
        </section>
        <InstallAppButton />
        <NotificationSettings />
      </div>
    </AppShell>
  );
}
