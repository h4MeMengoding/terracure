# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# TERRACURE – Smart HMI Sawah

## 1. Ringkasan Produk

**Nama Produk:** TERRACURE  
**Jenis Produk:** Web App PWA dengan tampilan mobile-only  
**Target Penggunaan:** Simulasi dan presentasi aplikasi HMI sawah  
**Platform:** Browser mobile dan desktop  
**Mode Desktop:** Tampilan tetap berbentuk mobile/vertikal di tengah layar, dengan area kanan dan kiri kosong  
**Status Data:** Dummy lokal yang masuk akal dan mengikuti algoritma TERRACURE  
**Backend/Database:** Tidak digunakan untuk versi demo  

TERRACURE adalah aplikasi Human-Machine Interface (HMI) berbasis web app PWA yang digunakan untuk menampilkan data parameter tanah secara sederhana, visual, dan mudah dipahami. Aplikasi ini tidak hanya menampilkan angka sensor, tetapi juga menerjemahkan data menjadi kondisi lahan, status peringatan, dan rekomendasi tindakan agronomi.

Aplikasi ini dibuat untuk kebutuhan simulasi dan presentasi. Oleh karena itu, data sensor menggunakan data dummy lokal yang tetap dibuat realistis dan mengikuti aturan algoritma yang telah ditentukan.

Prinsip utama aplikasi adalah:

```text
Data Sensor → Kondisi → Vonis → Tindakan
```

Pengguna tidak diwajibkan memahami data teknis secara mendalam. Dashboard harus langsung membantu pengguna memahami kondisi sawah dan tindakan yang perlu dilakukan.

---

## 2. Tujuan Produk

Tujuan utama TERRACURE adalah menyediakan antarmuka HMI sederhana yang mampu:

1. Menampilkan parameter tanah secara real-time berbasis data dummy.
2. Memberikan indikator visual normal atau kritis pada setiap parameter.
3. Menghasilkan deklarasi kondisi berdasarkan algoritma prioritas.
4. Memberikan rekomendasi taktis sesuai kondisi lahan.
5. Menampilkan riwayat data dan grafik tren parameter.
6. Menyediakan tabel logika HMI agar sistem tidak terlihat seperti black box.
7. Menyediakan halaman informasi parameter agar pengguna memahami arti setiap data.
8. Menjalankan simulasi HST dari hari ke-0 sampai hari ke-115 berdasarkan waktu mulai sistem.

---

## 3. Target Pengguna

Aplikasi ini ditujukan untuk:

1. Petani atau pengguna awam yang ingin memahami kondisi lahan secara cepat.
2. Tim pengembang atau mahasiswa yang ingin mendemonstrasikan konsep HMI sawah.
3. Audiens presentasi yang ingin melihat simulasi hubungan antara data sensor, algoritma, dan rekomendasi.

Untuk versi ini, aplikasi hanya digunakan sebagai demo sehingga tidak memerlukan sistem multi-user, autentikasi, database, atau integrasi sensor sungguhan.

---

## 4. Tech Stack Final

Aplikasi dibuat menggunakan stack berikut:

```text
Framework      : Next.js
Styling        : Tailwind CSS
App Type       : Progressive Web App (PWA)
UI Target      : Mobile-only
Desktop Layout : Mobile frame / vertical centered layout
Data Source    : Local dummy data
State Storage  : LocalStorage
Backend        : Tidak ada
Database       : Tidak ada
Deployment     : Bisa menggunakan Vercel / Netlify / hosting statis Next.js
```

### 4.1 Alasan Pemilihan Stack

Next.js dipilih karena mudah digunakan untuk membuat web app modern, mendukung routing halaman, mudah di-deploy, dan dapat dikembangkan menjadi PWA. Tailwind CSS digunakan agar styling cepat, konsisten, dan mudah dikontrol. Karena aplikasi hanya digunakan untuk simulasi, data dummy lokal dan LocalStorage sudah cukup.

Backend dan database tidak diperlukan pada versi demo agar pengerjaan lebih sederhana, stabil, dan cocok untuk presentasi.

---

## 5. Batasan Scope Versi Demo

### 5.1 Termasuk dalam Scope

Fitur yang masuk dalam versi demo:

1. Splash screen TERRACURE.
2. Dashboard monitoring parameter tanah.
3. Panel deklarasi kondisi dan rekomendasi taktis.
4. Bottom sheet atau modal rekomendasi detail.
5. Tabel HMI berisi logika keputusan.
6. Halaman Riwayat berisi tabel data dan grafik tren.
7. Halaman Info berisi penjelasan parameter.
8. Halaman Pengaturan untuk kontrol simulasi.
9. Simulasi HST berdasarkan waktu mulai sistem.
10. Data dummy lokal yang realistis.
11. Tampilan PWA mobile-only.

### 5.2 Tidak Termasuk dalam Scope

Fitur berikut tidak diperlukan pada versi demo:

1. Login/register.
2. Database cloud.
3. Backend API.
4. Integrasi ESP32/sensor asli.
5. Push notification native sungguhan.
6. Multi-user.
7. Multi-lahan.
8. Role admin/petani.
9. Export data.
10. Input manual semua parameter secara kompleks.

---

## 6. Konsep Tampilan Aplikasi

Aplikasi menggunakan konsep mobile-only. Pada layar desktop, aplikasi tetap ditampilkan seperti layar smartphone vertikal di tengah halaman.

### 6.1 Layout Umum

Struktur umum layar aplikasi:

```text
┌─────────────────────────────┐
│ Header / Logo TERRACURE     │
├────────┬────────────────────┤
│ Sidebar│ Konten Halaman     │
│ Menu   │                    │
│        │                    │
└────────┴────────────────────┘
```

Menu utama berada di sisi kiri seperti resource UI yang diberikan.

### 6.2 Menu Utama

Menu yang digunakan:

```text
Dashboard
Tabel HMI
Riwayat
Info
Pengaturan
```

Menu tidak perlu ditambah agar aplikasi tetap sederhana dan fokus pada fungsi utama HMI.

---

## 7. Alur Pengguna Utama

Alur utama penggunaan aplikasi:

```text
Splash Screen
↓
Dashboard
↓
Pengguna melihat parameter tanah
↓
Sistem menandai parameter normal/kritis
↓
Sistem menampilkan deklarasi kondisi
↓
Pengguna membuka rekomendasi taktis
↓
Pengguna dapat melihat Tabel HMI untuk transparansi logika
↓
Pengguna dapat melihat Riwayat untuk mengevaluasi tren data
↓
Pengguna dapat membuka Info untuk memahami parameter
```

---

## 8. Struktur Halaman dan Fitur

## 8.1 Splash Screen

### Deskripsi

Splash screen muncul saat aplikasi pertama kali dibuka. Splash screen menampilkan identitas aplikasi TERRACURE dan memberi kesan aplikasi sedang memuat data terbaru.

### Elemen Tampilan

1. Logo TERRACURE.
2. Nama aplikasi `TERRACURE`.
3. Subtitle `Smart HMI Sawah`.
4. Ilustrasi tanaman padi.
5. Teks loading, contoh:

```text
Memuat data terbaru...
```

6. Progress bar visual.

### Perilaku

1. Splash screen tampil selama sekitar 2–3 detik.
2. Setelah selesai, pengguna diarahkan ke Dashboard.
3. Splash screen hanya bersifat visual untuk demo.

---

## 8.2 Dashboard

### Deskripsi

Dashboard adalah halaman utama aplikasi. Halaman ini menampilkan kondisi terbaru lahan berdasarkan data dummy sensor. Dashboard harus menjadi halaman yang paling mudah dipahami karena menjadi pusat monitoring.

### Data yang Ditampilkan

Dashboard menampilkan parameter berikut:

1. Temperatur / Suhu Tanah.
2. Kelembapan Tanah.
3. Electrical Conductivity (EC).
4. pH Tanah.
5. Nitrogen (N).
6. Fosfor (P).
7. Kalium (K).
8. HST atau Hari Setelah Tanam.

### Elemen Tampilan

1. Header aplikasi dengan logo dan nama TERRACURE.
2. Ikon notifikasi.
3. Sidebar menu.
4. Kartu HST, contoh:

```text
34 / 115
```

5. Grid kartu parameter.
6. Warna hijau untuk parameter normal.
7. Warna merah untuk parameter kritis.
8. Panel deklarasi kondisi di bagian bawah.
9. Tombol `Lihat Rekomendasi`.

### Contoh Data Dummy Utama

Data default untuk skenario demo utama:

```js
const currentSensorData = {
  temperature: 30.8,
  moisture: 100,
  ec: 2650,
  ph: 7.5,
  nitrogen: 65,
  phosphorus: 40,
  potassium: 80,
  waterLevel: 3,
  hst: 34,
  totalHst: 115
}
```

### Output Kondisi dari Data Dummy Utama

Karena `EC = 2650 µS/cm` dan batas EC adalah `> 2000 µS/cm`, sistem harus menghasilkan:

```text
Deklarasi Kondisi : Toksisitas Tinggi
Rekomendasi       : Hentikan pupuk kimia! Lakukan pembilasan lahan.
```

### Panel Deklarasi

Panel deklarasi muncul ketika ada kondisi yang membutuhkan perhatian.

Contoh isi panel:

```text
Toksisitas
EC > 2000 µS/cm

Rekomendasi Taktis
Hentikan Pupuk Kimia!
Lakukan Perbaikan.
```

Tombol:

```text
Lihat Rekomendasi
```

---

## 8.3 Bottom Sheet / Modal Rekomendasi

### Deskripsi

Bottom sheet atau modal rekomendasi muncul setelah pengguna menekan tombol `Lihat Rekomendasi` pada Dashboard.

### Isi Modal

Untuk skenario EC tinggi, modal menampilkan:

```text
Kondisi Saat Ini: PERLU PERBAIKAN
Toksisitas tinggi akibat kelebihan pupuk kimia
```

Judul:

```text
Rekomendasi Taktis
(HST 34 - Fase Vegetatif Akhir)
```

Penjelasan:

```text
Nilai EC yang tinggi menunjukkan akumulasi garam atau residu pupuk kimia yang berlebih dalam tanah. Kondisi ini dapat menghambat penyerapan unsur hara, menyebabkan daun mengering atau terbakar, dan menurunkan hasil panen.
```

Langkah rekomendasi:

```text
1. Hentikan semua pupuk kimia sementara.
   EC sudah > 2000 µS/cm, penambahan pupuk akan meningkatkan toksisitas dan merusak tanaman.

2. Lakukan pembilasan lahan (flushing).
   Alirkan air bersih 2–3 hari berturut-turut untuk menurunkan kadar garam/residu pupuk.

3. Pengapuran ringan.
   Taburkan kapur dolomit 100–150 kg/ha untuk membantu menjaga pH tetap stabil.

4. Pemupukan lanjut.
   Tunda pemupukan. Evaluasi ulang setelah EC < 2000 µS/cm dan pH > 5.5.
```

Bagian tambahan:

```text
Rekomendasi Petani
Perhatikan gejala daun pucat/terbakar dan pertumbuhan terhambat sebagai tanda toksisitas garam atau pupuk.
```

---

## 8.4 Tabel HMI

### Deskripsi

Tabel HMI adalah halaman transparansi logika. Halaman ini menjelaskan hubungan antara parameter terbaca, deklarasi kondisi, dan rekomendasi taktis.

### Tujuan

1. Menjelaskan alasan sistem memberikan rekomendasi.
2. Menghindari kesan sistem sebagai black box.
3. Membantu pengguna atau audiens presentasi memahami algoritma keputusan.

### Kolom Tabel

Tabel HMI memiliki kolom:

```text
Skenario Prioritas
Parameter yang Terbaca
Deklarasi Kondisi
Rekomendasi Taktis
```

### Isi Tabel

| Skenario Prioritas | Parameter yang Terbaca | Deklarasi Kondisi | Rekomendasi Taktis |
|---|---|---|---|
| Hidrologi | Kelembapan < 40% | Tanah Kering | Lakukan pengairan. |
| Hidrologi | Kelembapan >= 40% AND Tinggi Air = 0 cm | Tanah Kering | Lakukan pengairan. |
| Hidrologi | Kelembapan >= 40% AND Tinggi Air > 0 cm | Hidrologi Normal | Lanjut cek pH tanah. |
| pH Tanah | pH < 5.5 | pH Asam | Tunda pemupukan! Taburkan kapur dolomit. |
| pH Tanah | pH >= 5.5 | pH Normal | Lanjut cek EC. |
| Electrical Conductivity (EC) | EC > 2000 µS/cm | Toksisitas Tinggi | Hentikan pupuk kimia! Bilas lahan. |
| Electrical Conductivity (EC) | EC <= 2000 µS/cm | Residu Aman | Lanjut evaluasi nutrisi berdasarkan waktu. |
| Hara Awal / Perakaran (HST 0–10) | 0 <= HST <= 10 AND P < 15 mg/kg | Fosfor Rendah | Tambah pupuk SP-36. |
| Hara Awal / Perakaran (HST 0–10) | 0 <= HST <= 10 AND P >= 15 mg/kg | Fosfor Normal | Tidak ada rekomendasi penambahan. |
| Hara Vegetatif (HST 11–35) | 11 <= HST <= 35 AND N < 30 mg/kg | Nitrogen Rendah | Tambah Urea. |
| Hara Vegetatif (HST 11–35) | 11 <= HST <= 35 AND N >= 30 mg/kg | Nitrogen Normal | Tidak ada rekomendasi penambahan. |
| Hara Generatif (HST 36–55) | 36 <= HST <= 55 AND K < 50 mg/kg | Kalium Rendah | Tambah KCl. |
| Hara Generatif (HST 36–55) | 36 <= HST <= 55 AND K >= 50 mg/kg | Kalium Normal | Tidak ada rekomendasi penambahan. |

---

## 8.5 Riwayat

### Deskripsi

Halaman Riwayat menampilkan data historis dalam bentuk tabel dan grafik. Data ini berasal dari dummy history yang dibuat lokal.

### Tujuan

1. Menunjukkan perubahan data dari waktu ke waktu.
2. Membantu pengguna mengevaluasi apakah kondisi membaik atau memburuk.
3. Mendukung presentasi bahwa aplikasi tidak hanya membaca data saat ini, tetapi juga menyimpan tren historis.

### Elemen Tampilan

1. Tab filter waktu:

```text
7 Hari
30 Hari
Semua
```

2. Tabel data.
3. Grafik tren parameter.
4. Dropdown parameter grafik.
5. Informasi rata-rata.
6. Informasi nilai terakhir.

### Kolom Tabel Riwayat

```text
Tanggal
Waktu
HST
EC
pH
N
P
K
```

### Parameter Grafik

Dropdown grafik harus mendukung:

```text
EC (µS/cm)
pH Tanah
Nitrogen (N)
Fosfor (P)
Kalium (K)
Kelembapan
Temperatur
```

### Contoh Dummy Riwayat

```js
const historyData = [
  { date: "17 Mei 2026", time: "10.20", hst: 34, ec: 2650, ph: 5.2, n: 65, p: 40, k: 80 },
  { date: "18 Mei 2026", time: "09.20", hst: 34, ec: 2420, ph: 5.3, n: 60, p: 38, k: 79 },
  { date: "19 Mei 2026", time: "10.10", hst: 33, ec: 2190, ph: 5.3, n: 58, p: 36, k: 81 }
]
```

Catatan: data dummy riwayat dapat dibuat sampai 30 hari agar grafik terlihat lebih natural.

---

## 8.6 Info

### Deskripsi

Halaman Info adalah pusat literasi parameter. Halaman ini menjelaskan arti setiap parameter dengan bahasa sederhana.

### Tujuan

1. Membantu pengguna memahami arti data sensor.
2. Menjelaskan fungsi biologis parameter terhadap tanaman.
3. Menjadi halaman edukatif dalam aplikasi.

### Parameter yang Dijelaskan

1. Temperatur / Suhu Tanah.
2. Kelembapan.
3. Electrical Conductivity (EC).
4. pH Tanah.
5. Nitrogen (N).
6. Fosfor (P).
7. Kalium (K).
8. Hari Setelah Tanam (HST).

### Isi Info Parameter

#### Temperatur / Suhu Tanah

Memantau kondisi suhu tanah sebagai salah satu indikator kondisi lingkungan perakaran.

#### Kelembapan

Memantau kadar air tanah dan membantu menentukan kebutuhan pengairan.

#### Electrical Conductivity (EC)

Mendeteksi kepekatan ion dan residu pupuk serta mengidentifikasi potensi toksisitas lahan.

#### pH Tanah

Memantau tingkat keasaman tanah dan menentukan apakah kondisi pH dapat menghambat penyerapan hara.

#### Nitrogen (N)

Memantau ketersediaan nitrogen untuk mendukung pertumbuhan vegetatif, terutama daun dan anakan.

#### Fosfor (P)

Memantau ketersediaan fosfor untuk mendukung kebutuhan nutrisi tanaman, terutama pada fase awal pertumbuhan.

#### Kalium (K)

Memantau ketersediaan kalium, terutama sebagai nutrisi penting pada fase generatif.

#### Hari Setelah Tanam (HST)

Menentukan fase pertumbuhan padi dan menjadi acuan algoritma dalam menentukan kebutuhan nutrisi.

---

## 8.7 Pengaturan

### Deskripsi

Halaman Pengaturan digunakan untuk mengelola simulasi aplikasi. Karena aplikasi hanya untuk demo, isi pengaturan dibuat sederhana dan berfokus pada kontrol simulasi.

### Elemen Pengaturan

1. Tanggal mulai tanam.
2. Tombol mulai sistem.
3. Tombol reset sistem.
4. Informasi HST saat ini.
5. Mode data dummy.
6. Status notifikasi demo.
7. Tentang aplikasi.

### Fungsi Tombol Mulai Sistem

Ketika pengguna menekan tombol `Mulai Sistem`, aplikasi menyimpan tanggal dan waktu mulai ke LocalStorage.

Contoh key LocalStorage:

```text
terracure_start_date
```

### Fungsi Tombol Reset Sistem

Ketika pengguna menekan tombol `Reset Sistem`, aplikasi menghapus tanggal mulai dari LocalStorage dan mengembalikan simulasi ke kondisi awal.

---

## 9. Sistem HST

### Deskripsi

HST atau Hari Setelah Tanam dihitung otomatis berdasarkan waktu mulai sistem. HST dimulai dari 0 dan berjalan sampai 115 hari.

### Perilaku

1. Saat sistem belum dimulai, HST dapat ditampilkan sebagai `0/115`.
2. Saat pengguna menekan `Mulai Sistem`, aplikasi menyimpan tanggal mulai.
3. Setiap kali aplikasi dibuka, sistem menghitung selisih hari dari tanggal mulai.
4. Nilai HST tidak boleh lebih dari 115.
5. Jika lebih dari 115 hari, HST tetap ditampilkan sebagai `115/115`.

### Contoh Logika

```js
function calculateHST(startDate) {
  if (!startDate) return 0

  const start = new Date(startDate)
  const now = new Date()
  const diffTime = now.getTime() - start.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return Math.min(Math.max(diffDays, 0), 115)
}
```

### Fase Berdasarkan HST

```text
HST 0–10   : Fase Awal / Perakaran
HST 11–35  : Fase Vegetatif
HST 36–55  : Fase Generatif
HST 56–115 : Fase Lanjutan / Monitoring
```

Catatan: algoritma rekomendasi nutrisi utama hanya menggunakan fase 0–10, 11–35, dan 36–55 sesuai data brief.

---

## 10. Data Dummy dan Rentang Sensor

Data dummy harus mengikuti rentang berikut:

| Parameter | Rentang |
|---|---:|
| pH Tanah | 3.0 – 9.0 pH |
| Nitrogen (N) | 0 – 1999 mg/kg |
| Fosfor (P) | 0 – 1999 mg/kg |
| Kalium (K) | 0 – 1999 mg/kg |
| EC | 0 – 10000 µS/cm |
| Kelembapan | 0 – 100% |
| Suhu Tanah | -20°C – 60°C |
| Tinggi Muka Air | 0 – 15 cm |
| HST | 0 – 115 hari |

### Skenario Demo Utama

Skenario default aplikasi adalah kondisi EC tinggi:

```js
const demoScenario = {
  name: "Toksisitas Tinggi",
  temperature: 30.8,
  moisture: 100,
  ec: 2650,
  ph: 7.5,
  nitrogen: 65,
  phosphorus: 40,
  potassium: 80,
  waterLevel: 3,
  hst: 34,
  recommendation: "Hentikan pupuk kimia! Lakukan pembilasan lahan."
}
```

### Skenario Dummy Tambahan

Agar aplikasi dapat didemonstrasikan dalam beberapa kondisi, siapkan skenario tambahan:

#### 1. Tanah Kering

```js
{
  moisture: 35,
  waterLevel: 0,
  ph: 6.2,
  ec: 1200,
  nitrogen: 45,
  phosphorus: 25,
  potassium: 60,
  hst: 20
}
```

Output:

```text
Tanah Kering
Lakukan pengairan.
```

#### 2. pH Asam

```js
{
  moisture: 70,
  waterLevel: 2,
  ph: 5.2,
  ec: 1300,
  nitrogen: 20,
  phosphorus: 20,
  potassium: 55,
  hst: 20
}
```

Output:

```text
pH Asam
Tunda pemupukan! Taburkan kapur dolomit.
```

#### 3. Nitrogen Rendah

```js
{
  moisture: 75,
  waterLevel: 2,
  ph: 6.5,
  ec: 1200,
  nitrogen: 20,
  phosphorus: 30,
  potassium: 70,
  hst: 25
}
```

Output:

```text
Nitrogen Rendah
Tambah Urea.
```

#### 4. Kalium Rendah

```js
{
  moisture: 80,
  waterLevel: 2,
  ph: 6.5,
  ec: 1100,
  nitrogen: 40,
  phosphorus: 30,
  potassium: 35,
  hst: 45
}
```

Output:

```text
Kalium Rendah
Tambah KCl.
```

---

## 11. Algoritma Keputusan

### 11.1 Prinsip Algoritma

Algoritma TERRACURE mengevaluasi data secara hierarkis. Sistem harus memprioritaskan keselamatan lahan sebelum kebutuhan nutrisi.

Urutan evaluasi:

```text
1. Hidrologi / kondisi air
2. pH tanah
3. EC / residu pupuk
4. Fase HST
5. Nutrisi sesuai fase
6. Deklarasi kondisi dan rekomendasi
```

### 11.2 Pseudocode

```js
function evaluateCondition(data) {
  const {
    moisture,
    waterLevel,
    ph,
    ec,
    nitrogen,
    phosphorus,
    potassium,
    hst
  } = data

  if (moisture < 40) {
    return {
      priority: "Hidrologi",
      status: "Tanah Kering",
      severity: "critical",
      recommendation: "Lakukan pengairan."
    }
  }

  if (moisture >= 40 && waterLevel === 0) {
    return {
      priority: "Hidrologi",
      status: "Tanah Kering",
      severity: "critical",
      recommendation: "Lakukan pengairan."
    }
  }

  if (ph < 5.5) {
    return {
      priority: "pH Tanah",
      status: "pH Asam",
      severity: "critical",
      recommendation: "Tunda pemupukan! Taburkan kapur dolomit."
    }
  }

  if (ec > 2000) {
    return {
      priority: "Electrical Conductivity (EC)",
      status: "Toksisitas Tinggi",
      severity: "critical",
      recommendation: "Hentikan pupuk kimia! Lakukan pembilasan lahan."
    }
  }

  if (hst >= 0 && hst <= 10 && phosphorus < 15) {
    return {
      priority: "Hara Awal / Perakaran",
      status: "Fosfor Rendah",
      severity: "warning",
      recommendation: "Tambah pupuk SP-36."
    }
  }

  if (hst >= 11 && hst <= 35 && nitrogen < 30) {
    return {
      priority: "Hara Vegetatif",
      status: "Nitrogen Rendah",
      severity: "warning",
      recommendation: "Tambah Urea."
    }
  }

  if (hst >= 36 && hst <= 55 && potassium < 50) {
    return {
      priority: "Hara Generatif",
      status: "Kalium Rendah",
      severity: "warning",
      recommendation: "Tambah KCl."
    }
  }

  return {
    priority: "Normal",
    status: "Kondisi Normal",
    severity: "normal",
    recommendation: "Lanjutkan pemantauan rutin."
  }
}
```

---

## 12. Status Warna

Aplikasi menggunakan status warna sederhana:

```text
Hijau : Normal / Aman
Merah : Kritis / Perlu tindakan segera
```

Untuk kebutuhan tambahan, warna kuning boleh digunakan sebagai status peringatan ringan, tetapi tampilan utama tetap mengikuti brief: hijau untuk normal dan merah untuk kritis.

---

## 13. PWA Requirements

Aplikasi harus dapat berperilaku seperti PWA sederhana.

### Fitur PWA

1. Memiliki manifest file.
2. Memiliki nama aplikasi TERRACURE.
3. Memiliki icon aplikasi.
4. Bisa ditambahkan ke home screen.
5. Memiliki theme color hijau TERRACURE.
6. Memiliki splash/loading experience.

### Contoh Manifest

```json
{
  "name": "TERRACURE",
  "short_name": "TERRACURE",
  "description": "Smart HMI Sawah untuk monitoring kondisi tanah dan rekomendasi agronomi.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#207567",
  "orientation": "portrait"
}
```

---

## 14. Struktur Folder yang Disarankan

Struktur project Next.js yang disarankan:

```text
terracure/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── dashboard/
│   │   └── page.tsx
│   ├── tabel-hmi/
│   │   └── page.tsx
│   ├── riwayat/
│   │   └── page.tsx
│   ├── info/
│   │   └── page.tsx
│   └── pengaturan/
│       └── page.tsx
│
├── components/
│   ├── app-shell.tsx
│   ├── sidebar-menu.tsx
│   ├── header.tsx
│   ├── parameter-card.tsx
│   ├── hst-card.tsx
│   ├── declaration-panel.tsx
│   ├── recommendation-sheet.tsx
│   ├── hmi-table.tsx
│   ├── history-table.tsx
│   ├── trend-chart.tsx
│   └── info-card.tsx
│
├── data/
│   ├── dummy-current.ts
│   ├── dummy-history.ts
│   ├── hmi-rules.ts
│   └── parameter-info.ts
│
├── lib/
│   ├── evaluate-condition.ts
│   ├── calculate-hst.ts
│   ├── local-storage.ts
│   └── format.ts
│
├── public/
│   ├── icons/
│   ├── manifest.json
│   └── logo.png
│
└── package.json
```

---

## 15. Komponen Utama

### 15.1 AppShell

Wrapper utama aplikasi. Bertugas menjaga tampilan mobile-only.

Kriteria:

1. Lebar maksimal sekitar 390–430 px.
2. Posisi center pada desktop.
3. Tinggi minimal 100vh.
4. Memiliki sidebar menu.
5. Konten dapat scroll.

### 15.2 SidebarMenu

Menu kiri yang berisi navigasi:

```text
Dashboard
Tabel HMI
Riwayat
Info
Pengaturan
```

Harus menampilkan active state berdasarkan halaman saat ini.

### 15.3 ParameterCard

Kartu untuk menampilkan satu parameter.

Props yang disarankan:

```ts
type ParameterCardProps = {
  label: string
  value: string | number
  unit?: string
  icon?: React.ReactNode
  status: "normal" | "critical" | "warning"
}
```

### 15.4 DeclarationPanel

Panel peringatan pada Dashboard.

Props:

```ts
type DeclarationPanelProps = {
  status: string
  description: string
  recommendation: string
  severity: "normal" | "critical" | "warning"
  onOpenRecommendation: () => void
}
```

### 15.5 RecommendationSheet

Bottom sheet/modal untuk rekomendasi taktis detail.

### 15.6 TrendChart

Grafik tren parameter pada halaman Riwayat.

Boleh menggunakan library chart ringan seperti `recharts`, tetapi jika ingin mengurangi dependency, grafik sederhana juga dapat dibuat manual dengan SVG.

Untuk demo, penggunaan `recharts` diperbolehkan.

---

## 16. Acceptance Criteria

Aplikasi dianggap selesai jika memenuhi kriteria berikut:

1. Aplikasi berhasil dijalankan sebagai Next.js app.
2. Tampilan utama mobile-only dan tetap center ketika dibuka di desktop.
3. Splash screen muncul sebelum Dashboard.
4. Sidebar memiliki menu Dashboard, Tabel HMI, Riwayat, Info, dan Pengaturan.
5. Dashboard menampilkan semua parameter utama.
6. HST tampil dalam format `x/115`.
7. Sistem dapat menghitung HST dari waktu mulai sistem.
8. Data dummy utama menghasilkan kondisi `Toksisitas Tinggi`.
9. Parameter kritis diberi indikator merah.
10. Parameter normal diberi indikator hijau.
11. Panel rekomendasi muncul di Dashboard.
12. Tombol `Lihat Rekomendasi` membuka detail rekomendasi.
13. Tabel HMI menampilkan aturan algoritma sesuai brief.
14. Riwayat menampilkan tabel data historis.
15. Riwayat menampilkan grafik tren parameter.
16. Info menampilkan penjelasan semua parameter.
17. Pengaturan memiliki tombol mulai dan reset simulasi.
18. Aplikasi memiliki konfigurasi PWA dasar.
19. Tidak ada fitur login, database, atau backend.
20. Aplikasi siap digunakan untuk simulasi presentasi.

---

## 17. Catatan untuk Codex AI Agent

Gunakan dokumen ini sebagai sumber utama implementasi. Jangan menambahkan fitur besar di luar PRD tanpa alasan kuat.

Prioritas pengerjaan:

```text
1. Setup Next.js + Tailwind CSS
2. Buat layout mobile-only AppShell
3. Buat sidebar menu
4. Buat splash screen
5. Buat data dummy
6. Buat algoritma evaluateCondition
7. Buat Dashboard
8. Buat bottom sheet rekomendasi
9. Buat Tabel HMI
10. Buat Riwayat + grafik
11. Buat Info
12. Buat Pengaturan
13. Tambahkan PWA manifest
14. Rapikan responsive desktop center layout
```

Instruksi desain:

1. Ikuti struktur menu dari resource UI.
2. Jangan membuat tampilan desktop penuh.
3. Jangan membuat landing page marketing.
4. Jangan menambahkan hero section.
5. Jangan menambahkan login/register.
6. Jangan membuat UI terlalu kompleks.
7. Fokus pada dashboard HMI mobile.
8. Gunakan warna hijau sebagai warna utama TERRACURE.
9. Gunakan merah hanya untuk status kritis.
10. Pastikan teks rekomendasi mudah dibaca.

Instruksi data:

1. Gunakan data dummy lokal.
2. Data dummy harus masuk akal.
3. Data dummy harus mengikuti threshold algoritma.
4. Jangan menggunakan API eksternal.
5. Jangan menggunakan database.

Instruksi teknis:

1. Gunakan TypeScript jika project menggunakan TypeScript.
2. Pisahkan data, komponen, dan logic ke folder berbeda.
3. Buat fungsi `evaluateCondition` secara terpisah.
4. Buat fungsi `calculateHST` secara terpisah.
5. Simpan start date HST di LocalStorage.
6. Pastikan aplikasi tetap bisa berjalan tanpa data eksternal.

---

## 18. Prompt Awal untuk Codex

Gunakan prompt berikut untuk mulai membuat aplikasi:

```text
Baca dan ikuti PRD.md ini sebagai sumber utama.

Buat aplikasi TERRACURE menggunakan Next.js + Tailwind CSS + PWA.
Aplikasi ini adalah web app PWA mobile-only untuk simulasi HMI sawah.

Ketentuan utama:
- UI hanya mobile-only.
- Saat dibuka di desktop, tampilan tetap vertikal di tengah layar dengan kanan-kiri kosong.
- Tidak perlu backend.
- Tidak perlu database.
- Gunakan data dummy lokal yang masuk akal.
- Gunakan LocalStorage untuk menyimpan tanggal mulai sistem dan menghitung HST dari 0 sampai 115.
- Menu utama: Dashboard, Tabel HMI, Riwayat, Info, Pengaturan.
- Buat splash screen TERRACURE sebelum masuk Dashboard.
- Dashboard harus menampilkan parameter suhu, kelembapan, EC, pH, N, P, K, dan HST.
- Gunakan algoritma evaluasi sesuai PRD.
- Skenario demo utama adalah EC tinggi: EC 2650 µS/cm sehingga status menjadi Toksisitas Tinggi.
- Buat panel rekomendasi dan modal/bottom sheet detail rekomendasi.
- Buat halaman Tabel HMI, Riwayat, Info, dan Pengaturan sesuai PRD.

Jangan menambahkan login, database, backend, landing page marketing, atau fitur besar lain di luar PRD.
```

---

## 19. Definition of Done

Project dinyatakan selesai apabila aplikasi dapat dibuka, menampilkan splash screen, masuk ke Dashboard, menampilkan data dummy, menghasilkan rekomendasi berdasarkan algoritma, menyediakan menu lengkap, dan dapat digunakan untuk demonstrasi presentasi tanpa backend/database.

