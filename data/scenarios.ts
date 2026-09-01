import type { Scenario } from "@/types/terracure";

export const scenarios: Scenario[] = [
  {
    id: "toxicity",
    name: "Toksisitas Tinggi",
    data: {
      temperature: 30.8,
      moisture: 100,
      ec: 2650,
      ph: 7.5,
      nitrogen: 65,
      phosphorus: 40,
      potassium: 80,
      waterLevel: 30,
      hst: 34
    }
  },
  {
    id: "dry",
    name: "Tanah Kering",
    data: {
      temperature: 31.2,
      moisture: 35,
      ec: 1200,
      ph: 6.2,
      nitrogen: 45,
      phosphorus: 25,
      potassium: 60,
      waterLevel: 0,
      hst: 20
    }
  },
  {
    id: "acid",
    name: "pH Asam",
    data: {
      temperature: 29.6,
      moisture: 70,
      ec: 1300,
      ph: 5.2,
      nitrogen: 20,
      phosphorus: 20,
      potassium: 55,
      waterLevel: 20,
      hst: 20
    }
  },
  {
    id: "low-n",
    name: "Nitrogen Rendah",
    data: {
      temperature: 30.1,
      moisture: 75,
      ec: 1200,
      ph: 6.5,
      nitrogen: 20,
      phosphorus: 30,
      potassium: 70,
      waterLevel: 20,
      hst: 25
    }
  },
  {
    id: "low-k",
    name: "Kalium Rendah",
    data: {
      temperature: 29.8,
      moisture: 80,
      ec: 1100,
      ph: 6.5,
      nitrogen: 40,
      phosphorus: 30,
      potassium: 35,
      waterLevel: 20,
      hst: 45
    }
  }
];

export const defaultScenario = scenarios[0];
