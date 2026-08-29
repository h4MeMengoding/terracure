# DESIGN.md – TERRACURE

## Gaya UI
Gunakan gaya **Clean Agritech Dashboard / Functional Agritech Mobile HMI**.

UI harus terasa seperti aplikasi monitoring sawah berbasis sensor, bukan landing page startup.

## Prinsip Utama
UI harus cepat menjawab:

1. Kondisi sawah sekarang bagaimana?
2. Parameter mana yang bermasalah?
3. Tindakan apa yang harus dilakukan?

## Layout
- Mobile-only.
- Di desktop, tetap tampil sebagai frame mobile di tengah layar.
- Sisi kanan dan kiri desktop dibiarkan kosong/netral.
- Gunakan sidebar/menu kiri seperti referensi UI.
- Konten utama harus tetap mudah dibaca.

## Menu
Menu wajib:

- Dashboard
- Tabel HMI
- Riwayat
- Info
- Pengaturan

## Warna
Gunakan nuansa agritech:

- Hijau untuk kondisi normal dan identitas utama.
- Merah hanya untuk kondisi kritis/peringatan.
- Oranye untuk waspada jika diperlukan.
- Background netral terang.
- Hindari gradient berlebihan.

Rekomendasi warna:

- Primary Green: `#1F6F5B`
- Dark Green: `#145344`
- Soft Green: `#D8F3E4`
- Light Mint: `#EEF8F3`
- Warning Red: `#EF2B1D`
- Warning Orange: `#D97706`
- Soft Yellow: `#FFF6C7`
- Text Dark: `#1F2933`
- Text Muted: `#6B7280`
- Background: `#F7FAF8`

## Komponen
Gunakan komponen sederhana:

- Kartu parameter sensor.
- Panel deklarasi kondisi.
- Bottom sheet/modal rekomendasi.
- Tabel HMI dengan horizontal scroll.
- Grafik line chart sederhana untuk riwayat.
- Kartu info parameter.

## Aturan UI
- Prioritaskan angka sensor agar mudah dibaca.
- Gunakan label dan satuan yang jelas.
- Jangan terlalu banyak dekorasi.
- Jangan gunakan glassmorphism berlebihan.
- Jangan gunakan animasi jika tidak diperlukan.
- Jangan membuat layout dashboard desktop penuh.
- Jangan menambahkan fitur di luar PRD.

## Tone Bahasa
Gunakan bahasa Indonesia yang praktis, langsung, dan mudah dipahami petani.

Hindari copywriting generik seperti:

- “Transform your farming experience”
- “Unlock the power of agriculture”
- “Smart solution for your future”
