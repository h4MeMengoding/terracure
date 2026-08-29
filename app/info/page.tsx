import { InfoCard } from "@/components/info-card";
import { AppShell } from "@/components/app-shell";
import { parameterInfo } from "@/data/parameter-info";

export default function InfoPage() {
  return (
    <AppShell title="Info">
      <div className="space-y-4">
        <section className="rounded-lg bg-[#173F36] p-4 text-white">
          <p className="text-xs font-bold text-[#CDE974]">KAMUS SENSOR</p>
          <h2 className="mt-1 text-xl font-bold">Memahami kondisi tanah</h2>
          <p className="mt-2 text-sm leading-6 text-[#DFE9E4]">Gunakan rentang acuan untuk membaca arti setiap nilai yang tampil pada ringkasan lahan.</p>
        </section>
        {parameterInfo.map((parameter) => (
          <InfoCard key={parameter.name} {...parameter} />
        ))}
      </div>
    </AppShell>
  );
}
