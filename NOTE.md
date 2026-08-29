# Prompt Codex – TERRACURE

Paste prompt ini di Codex pada root project.

```text
Buat aplikasi TERRACURE berdasarkan file PRD.md.

Baca PRD.md sebagai sumber utama fitur, menu, data dummy, algoritma, dan alur aplikasi.
Baca DESIGN.md sebagai sumber utama gaya UI.

Gunakan antislop DURING mode.

Tech stack:
- Next.js
- Tailwind CSS
- PWA
- Data dummy lokal
- LocalStorage untuk HST/start simulation
- Tanpa backend
- Tanpa database
- Tanpa login
- Mobile-only UI
- Desktop tetap berupa frame mobile di tengah layar

Menu wajib:
- Dashboard
- Tabel HMI
- Riwayat
- Info
- Pengaturan

Implementasi utama:
1. Splash screen TERRACURE selama sekitar 2 detik.
2. Dashboard dengan data sensor dummy, HST, status kondisi, dan rekomendasi.
3. Bottom sheet/modal untuk detail rekomendasi.
4. Tabel HMI berisi aturan algoritma dari PRD.md.
5. Riwayat dengan dummy history, tabel, filter, dan grafik sederhana.
6. Info berisi penjelasan parameter tanah.
7. Pengaturan berisi start/reset simulasi, tanggal mulai tanam, HST, mode dummy, dan info aplikasi.

Gunakan algoritma keputusan sesuai PRD.md dan urutan prioritas berikut:
1. Kelembapan / tinggi air
2. pH tanah
3. EC
4. Fase HST
5. Nutrisi sesuai fase
6. Normal jika tidak ada masalah

HST:
- HST dihitung dari tanggal mulai simulasi.
- Simpan tanggal mulai di LocalStorage.
- HST dimulai dari 0 sampai maksimal 115.
- Jika simulasi belum dimulai, gunakan default demo HST 34.

Data dummy utama:
- Suhu: 30.8 °C
- Kelembapan: 100%
- EC: 2650 µS/cm
- pH: 7.5
- Nitrogen: 65 mg/kg
- Fosfor: 40 mg/kg
- Kalium: 80 mg/kg
- Tinggi air: 3 cm
- HST: 34/115
- Status utama: Toksisitas Tinggi
- Rekomendasi: Hentikan pupuk kimia dan lakukan pembilasan lahan

Jaga implementasi tetap sederhana dan rapi.
Jangan membuat fitur di luar PRD.md.
Setelah selesai, jelaskan file yang dibuat/diubah dan cara menjalankan aplikasi.
```

## Prompt Audit Setelah Implementasi

```text
Use antislop AFTER mode.

Audit UI TERRACURE yang sudah dibuat.
Jangan ubah file dulu.

Cek:
1. Apakah sudah sesuai PRD.md?
2. Apakah sudah sesuai DESIGN.md?
3. Apakah UI tetap mobile-only dan center di desktop?
4. Apakah warning state jelas?
5. Apakah menu sudah sesuai?
6. Apakah ada elemen yang terlalu generik/AI-looking?

Berikan temuan dalam list bernomor dan rekomendasi perbaikannya.
```
