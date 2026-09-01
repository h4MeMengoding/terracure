export type HmiRuleGroup = {
  priority: string;
  tone: "hydrology" | "ph" | "ec" | "early" | "vegetative" | "generative";
  rows: Array<{
    parameter: string;
    declaration: string;
    recommendation: string;
  }>;
};

export const hmiRules: HmiRuleGroup[] = [
  {
    priority: "Hidrologi",
    tone: "hydrology",
    rows: [
      { parameter: "Kelembapan < 40%", declaration: "Tanah Kering", recommendation: "Lakukan pengairan." },
      { parameter: "Kelembapan >= 40% AND Tinggi Air = 0 mm", declaration: "Tanah Kering", recommendation: "Lakukan pengairan." },
      { parameter: "Kelembapan >= 40% AND Tinggi Air > 0 mm", declaration: "Hidrologi Normal", recommendation: "Lanjut cek pH tanah." }
    ]
  },
  {
    priority: "pH Tanah",
    tone: "ph",
    rows: [
      { parameter: "pH < 5.5", declaration: "pH Asam", recommendation: "Tunda pemupukan! Taburkan kapur dolomit." },
      { parameter: "pH >= 5.5", declaration: "pH Normal", recommendation: "Lanjut cek Intensitas Kimia." }
    ]
  },
  {
    priority: "Intensitas Kimia (Residu/Toksisitas lahan)",
    tone: "ec",
    rows: [
      { parameter: "Intensitas Kimia > 2000 µS/cm", declaration: "Toksisitas Tinggi", recommendation: "Hentikan pupuk kimia! Bilas lahan." },
      { parameter: "Intensitas Kimia <= 2000 µS/cm", declaration: "Residu Aman", recommendation: "Lanjut evaluasi nutrisi berdasar waktu." }
    ]
  },
  {
    priority: "Hara Awal/Perakaran (HST 0-10)",
    tone: "early",
    rows: [
      { parameter: "0 <= HST <= 10 AND P < 15 mg/kg", declaration: "Fosfor Rendah", recommendation: "Tambah pupuk SP-36." },
      { parameter: "0 <= HST <= 10 AND P >= 15 mg/kg", declaration: "Fosfor Normal", recommendation: "-" }
    ]
  },
  {
    priority: "Hara Vegetatif (HST 11-35)",
    tone: "vegetative",
    rows: [
      { parameter: "11 <= HST <= 35 AND N < 30 mg/kg", declaration: "Nitrogen Rendah", recommendation: "Tambah Urea." },
      { parameter: "11 <= HST <= 35 AND N >= 30 mg/kg", declaration: "Nitrogen Normal", recommendation: "-" }
    ]
  },
  {
    priority: "Hara Generatif (HST 36-55)",
    tone: "generative",
    rows: [
      { parameter: "36 <= HST <= 55 AND K < 50 mg/kg", declaration: "Kalium Rendah", recommendation: "Tambah KCl." },
      { parameter: "36 <= HST <= 55 AND K >= 50 mg/kg", declaration: "Kalium Normal", recommendation: "-" }
    ]
  }
];
