import { AppShell } from "@/components/app-shell";
import { HmiTable } from "@/components/hmi-table";

export default function TabelHmiPage() {
  return (
    <AppShell title="Tabel">
      <div className="space-y-5">
        <section className="rounded-lg bg-[#CDE974] p-4">
          <p className="text-xs font-extrabold text-[#355248]">URUTAN PEMERIKSAAN</p>
          <h2 className="mt-1 text-[22px] font-extrabold leading-tight text-[#17201C]">Tabel HMI</h2>
          <p className="mt-2 text-sm leading-6 text-[#35423B]">
            Sistem membaca parameter secara berurutan: hidrologi, pH tanah, EC, fase HST, lalu nutrisi sesuai fase.
          </p>
        </section>
        <HmiTable />
      </div>
    </AppShell>
  );
}
