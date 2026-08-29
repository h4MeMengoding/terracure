"use client";

import { useEffect, useState } from "react";
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
import { SplashScreen } from "@/components/splash-screen";

let dashboardSplashShown = false;

export function DashboardView() {
  const { mounted, sensorData } = useTerracureSimulation();
  const [showSplash, setShowSplash] = useState(() => !dashboardSplashShown);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const data = mounted ? sensorData : defaultScenario.data;
  const evaluation = evaluateCondition(data);

  useEffect(() => {
    if (dashboardSplashShown) {
      setShowSplash(false);
      return;
    }

    dashboardSplashShown = true;
    const timer = window.setTimeout(() => setShowSplash(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  const cards = sensorMetrics.map((metric) => ({
    label: metric.label,
    value: formatNumber(metric.value(data)),
    unit: metric.unit,
    note: metric.note(data),
    severity: metric.severity(data)
  }));

  return (
    <AppShell title="Dashboard">
      <div className="space-y-5">
        <HstCard hst={data.hst} />
        <DeclarationPanel evaluation={evaluation} onOpenRecommendation={() => setShowRecommendation(true)} />
        <section>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#17201C]">Sensor Lahan</h2>
              <p className="mt-1 text-xs text-[#5F6963]">Nilai simulasi untuk demonstrasi HMI</p>
            </div>
            <span className="text-xs font-bold text-[#5B665F]">8 sensor</span>
          </div>
          <div className="metric-grid grid gap-3">
            {cards.map((card) => (
              <ParameterCard key={card.label} {...card} />
            ))}
          </div>
        </section>
      </div>
      <RecommendationSheet open={showRecommendation} evaluation={evaluation} data={data} onClose={() => setShowRecommendation(false)} />
    </AppShell>
  );
}
