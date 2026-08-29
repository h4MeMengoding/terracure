"use client";

import { useMemo, useState } from "react";
import { scenarios } from "@/data/scenarios";
import { TOTAL_HST, calculateHST, getGrowthPhase } from "@/lib/calculate-hst";
import { formatDateInput } from "@/lib/format";
import { useTerracureSimulation } from "@/hooks/use-terracure-simulation";
import { AppShell } from "@/components/app-shell";

export function SettingsView() {
  const { startDate, scenario, sensorData, startSimulation, resetSimulation, changeScenario } = useTerracureSimulation();
  const defaultInput = useMemo(() => formatDateInput(new Date()), []);
  const [dateInput, setDateInput] = useState(defaultInput);
  const startedHst = startDate ? calculateHST(startDate) : null;

  return (
    <AppShell title="Pengaturan">
      <div className="space-y-5">
        <section className="rounded-lg bg-[#173F36] p-4 text-white">
          <p className="text-xs font-bold text-[#CDE974]">HST SAAT INI</p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <p className="text-4xl font-bold">{sensorData.hst}<span className="ml-1 text-base font-semibold text-[#DCE7E2]">/ {TOTAL_HST}</span></p>
            <p className="pb-1 text-right text-sm font-semibold text-[#DCE7E2]">{getGrowthPhase(sensorData.hst)}</p>
          </div>
          <p className="mt-3 border-t border-white/15 pt-3 text-xs leading-5 text-[#DCE7E2]">
            {startedHst === null ? "Sistem memakai HST dari skenario demonstrasi." : `Simulasi berjalan dari tanggal tanam dengan HST terhitung ${startedHst}.`}
          </p>
        </section>

        <section className="surface-card p-4">
          <h2 className="text-base font-bold text-[#17201C]">Musim Tanam</h2>
          <p className="mt-1 text-xs leading-5 text-[#5F6963]">Tanggal ini menjadi dasar perhitungan HST.</p>
          <label className="mt-4 block text-xs font-bold text-[#5B665F]" htmlFor="start-date">
            Tanggal mulai tanam
          </label>
          <input
            id="start-date"
            type="date"
            value={dateInput}
            onChange={(event) => setDateInput(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[#CBD4CC] bg-white px-3 text-sm font-semibold text-[#17201C]"
          />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => startSimulation(dateInput)} className="rounded-lg bg-[#173F36] px-3 py-3 text-sm font-bold text-white">
              Mulai Sistem
            </button>
            <button type="button" onClick={resetSimulation} className="rounded-lg border border-[#CBD4CC] bg-white px-3 py-3 text-sm font-bold text-[#23483E]">
              Reset Sistem
            </button>
          </div>
        </section>

        <section className="surface-card p-4">
          <label className="block text-base font-bold text-[#17201C]" htmlFor="scenario">
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

        <section className="surface-card p-4">
          <h2 className="text-base font-bold text-[#17201C]">Tentang Aplikasi</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-[#5F6963]">Produk</dt>
              <dd className="font-bold text-[#17201C]">TERRACURE</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#5F6963]">Data</dt>
              <dd className="font-bold text-[#17201C]">Dummy lokal</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#5F6963]">Notifikasi</dt>
              <dd className="font-bold text-[#17201C]">Demo in-app</dd>
            </div>
          </dl>
        </section>
      </div>
    </AppShell>
  );
}
