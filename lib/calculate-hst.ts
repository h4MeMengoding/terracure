export const TOTAL_HST = 115;

export function getGrowthPhase(hst: number) {
  if (hst <= 10) return "Fase Awal / Perakaran";
  if (hst <= 35) return "Fase Vegetatif";
  if (hst <= 55) return "Fase Generatif";
  return "Fase Lanjutan / Monitoring";
}
