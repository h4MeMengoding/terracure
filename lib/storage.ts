export const START_DATE_KEY = "terracure_start_date";
export const SCENARIO_KEY = "terracure_scenario";

export function readStorage(key: string) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}

export function writeStorage(key: string, value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
}

export function clearStorage(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}
