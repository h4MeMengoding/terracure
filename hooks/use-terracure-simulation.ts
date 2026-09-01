"use client";

import { useEffect, useMemo, useState } from "react";
import { readStorage, SCENARIO_KEY, writeStorage } from "@/lib/storage";
import { defaultScenario, scenarios } from "@/data/scenarios";

export function useTerracureSimulation() {
  const [scenarioId, setScenarioId] = useState(defaultScenario.id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setScenarioId(readStorage(SCENARIO_KEY) ?? defaultScenario.id);
    setMounted(true);
  }, []);

  const scenario = useMemo(() => scenarios.find((item) => item.id === scenarioId) ?? defaultScenario, [scenarioId]);
  const sensorData = scenario.data;

  function changeScenario(id: string) {
    writeStorage(SCENARIO_KEY, id);
    setScenarioId(id);
  }

  return {
    mounted,
    scenario,
    scenarios,
    sensorData,
    changeScenario
  };
}
