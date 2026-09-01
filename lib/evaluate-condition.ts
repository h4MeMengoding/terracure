import type { Evaluation, SensorData } from "@/types/terracure";

export function evaluateCondition(data: SensorData): Evaluation {
  const { moisture, waterLevel, ph, ec, nitrogen, phosphorus, potassium, hst } = data;

  if (moisture < 40) {
    return {
      priority: "Hidrologi",
      status: "Tanah Kering",
      severity: "critical",
      trigger: "Kelembapan < 40%",
      recommendation: "Lakukan pengairan.",
      detail: "Kadar air tanah terlalu rendah untuk mendukung pertumbuhan padi."
    };
  }

  if (moisture >= 40 && waterLevel === 0) {
    return {
      priority: "Hidrologi",
      status: "Tanah Kering",
      severity: "critical",
      trigger: "Tinggi air = 0 cm",
      recommendation: "Lakukan pengairan.",
      detail: "Kelembapan masih terbaca, tetapi tidak ada genangan air di permukaan."
    };
  }

  if (ph < 5.5) {
    return {
      priority: "pH Tanah",
      status: "pH Asam",
      severity: "critical",
      trigger: "pH < 5.5",
      recommendation: "Tunda pemupukan! Taburkan kapur dolomit.",
      detail: "Tanah terlalu asam dan dapat menghambat penyerapan unsur hara."
    };
  }

  if (ec > 2000) {
    return {
      priority: "Intensitas Kimia",
      status: "Toksisitas Tinggi",
      severity: "critical",
      trigger: "Intensitas kimia > 2000 µS/cm",
      recommendation: "Hentikan pupuk kimia! Lakukan pembilasan lahan.",
      detail: "Intensitas kimia yang tinggi menunjukkan akumulasi garam atau residu pupuk kimia."
    };
  }

  if (hst >= 0 && hst <= 10 && phosphorus < 15) {
    return {
      priority: "Hara Awal / Perakaran",
      status: "Fosfor Rendah",
      severity: "warning",
      trigger: "P < 15 mg/kg",
      recommendation: "Tambah pupuk SP-36.",
      detail: "Fase awal membutuhkan fosfor untuk mendukung perkembangan akar."
    };
  }

  if (hst >= 11 && hst <= 35 && nitrogen < 30) {
    return {
      priority: "Hara Vegetatif",
      status: "Nitrogen Rendah",
      severity: "warning",
      trigger: "N < 30 mg/kg",
      recommendation: "Tambah Urea.",
      detail: "Fase vegetatif membutuhkan nitrogen untuk daun dan anakan."
    };
  }

  if (hst >= 36 && hst <= 55 && potassium < 50) {
    return {
      priority: "Hara Generatif",
      status: "Kalium Rendah",
      severity: "warning",
      trigger: "K < 50 mg/kg",
      recommendation: "Tambah KCl.",
      detail: "Fase generatif membutuhkan kalium untuk membantu pembentukan hasil."
    };
  }

  return {
    priority: "Normal",
    status: "Kondisi Normal",
    severity: "normal",
    trigger: "Semua parameter dalam batas aman",
    recommendation: "Lanjutkan pemantauan rutin.",
    detail: "Tidak ada kondisi prioritas yang membutuhkan tindakan segera."
  };
}
