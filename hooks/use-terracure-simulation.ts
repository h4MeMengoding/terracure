"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateHST } from "@/lib/calculate-hst";
import { clearStorage, readStorage, SCENARIO_KEY, START_DATE_KEY, writeStorage } from "@/lib/storage";
import { defaultScenario, scenarios } from "@/data/scenarios";

export function useTerracureSimulation() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [scenarioId, setScenarioId] = useState(defaultScenario.id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStartDate(readStorage(START_DATE_KEY));
    setScenarioId(readStorage(SCENARIO_KEY) ?? defaultScenario.id);
    setMounted(true);
  }, []);

  const scenario = useMemo(() => scenarios.find((item) => item.id === scenarioId) ?? defaultScenario, [scenarioId]);
  const hst = startDate ? calculateHST(startDate) : scenario.data.hst;
  const sensorData = { ...scenario.data, hst };

  function startSimulation(dateValue?: string) {
    const nextDate = dateValue ? new Date(`${dateValue}T00:00:00`).toISOString() : new Date().toISOString();
    writeStorage(START_DATE_KEY, nextDate);
    setStartDate(nextDate);
  }

  function resetSimulation() {
    clearStorage(START_DATE_KEY);
    setStartDate(null);
  }

  function changeScenario(id: string) {
    writeStorage(SCENARIO_KEY, id);
    setScenarioId(id);
  }

  return {
    mounted,
    startDate,
    scenario,
    scenarios,
    sensorData,
    startSimulation,
    resetSimulation,
    changeScenario
  };
}
