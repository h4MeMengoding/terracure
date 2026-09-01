"use client";

import { useState } from "react";
import { defaultScenario } from "@/data/scenarios";
import { sensorMetrics } from "@/data/sensor-metrics";
import { evaluateCondition } from "@/lib/evaluate-condition";
import { formatNumber } from "@/lib/format";
import { useTerracureSimulation } from "@/hooks/use-terracure-simulation";
import { AppShell } from "@/components/app-shell";
import { DeclarationPanel } from "@/components/declaration-panel";
import { HstCard } from "@/components/hst-card";
import { ParameterCard } from "@/components/parameter-card";
import { RecommendationSheet } from "@/components/recommendation-sheet";
import type { Severity } from "@/types/terracure";

type DashboardCard = {
  label: string;
  value: string;
  unit: string;
  note: string;
  severity: Severity;
  range: string;
  description: string;
};

export function DashboardView() {
  const { mounted, sensorData } = useTerracureSimulation();
  const [showRecommendation, setShowRecommendation] = useState(false);
  const data = mounted ? sensorData : defaultScenario.data;
  const evaluation = evaluateCondition(data);

  const cards = sensorMetrics.map((metric) => ({
    label: metric.label,
    value: formatNumber(metric.value(data)),
    unit: metric.unit,
    note: metric.note(data),
    severity: metric.severity(data),
    range: metric.range,
    description: metric.description
  }));

  const fieldCards = cards.filter((card) => ["Suhu Tanah", "Kelembapan", "pH Tanah", "Tinggi Air"].includes(card.label));
  const nutrientCards = cards.filter((card) => ["Intensitas Kimia", "Nitrogen", "Fosfor", "Kalium"].includes(card.label));

  return (
    <AppShell title="Dashboard">
      <div className="dashboard-stack">
        <section className="dashboard-intro">
          <div>
            <p className="eyebrow">RINGKASAN LAHAN</p>
            <h2 className="mt-1 text-[28px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#17201C]">Kondisi sawah hari ini</h2>
          </div>
        </section>
        <DeclarationPanel evaluation={evaluation} onOpenRecommendation={() => setShowRecommendation(true)} />
        <HstCard hst={data.hst} />
        <SensorSection title="Kondisi Lahan" cards={[...fieldCards, ...nutrientCards]} />
      </div>
      <RecommendationSheet open={showRecommendation} evaluation={evaluation} data={data} onClose={() => setShowRecommendation(false)} />
    </AppShell>
  );
}

function SensorSection({ title, cards }: { title: string; cards: DashboardCard[] }) {
  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow">PEMBACAAN SENSOR</p>
          <h2 className="mt-1 text-[20px] font-extrabold leading-tight tracking-[-0.015em] text-[#17201C]">{title}</h2>
        </div>
        <span className="shrink-0 text-xs font-bold text-[#5B665F]">{cards.length} parameter</span>
      </div>
      <div className="metric-grid grid gap-3">
        {cards.map((card) => <ParameterCard key={card.label} {...card} />)}
      </div>
    </section>
  );
}
