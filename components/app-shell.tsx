"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChartNoAxesColumnIncreasing, LayoutDashboard, ListTree, Settings2 } from "lucide-react";
import { useState } from "react";
import { RiceMark } from "@/components/icons";

const menu = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/tabel-hmi", label: "Tabel", icon: ListTree },
  { href: "/riwayat", label: "Riwayat", icon: ChartNoAxesColumnIncreasing },
  { href: "/pengaturan", label: "Setelan", icon: Settings2 }
];

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [showNotice, setShowNotice] = useState(false);

  return (
    <main className="flex min-h-dvh justify-center bg-[#DFE2DC] text-[#17201C]">
      <div className="app-frame relative flex flex-col">
        <header className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between border-b border-[#DCE2DC] bg-[#EEF1EB] px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#173F36] text-[#CDE974]">
              <RiceMark className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold tracking-[0.08em] text-[#637069]">TERRACURE</p>
              <h1 className="truncate text-[24px] font-extrabold leading-none tracking-[-0.02em]">{title}</h1>
            </div>
          </div>
          <button type="button" aria-label="Lihat status notifikasi" aria-expanded={showNotice} onClick={() => setShowNotice((value) => !value)} className="relative grid h-11 w-11 place-items-center rounded-full border border-[#CFD7CF] bg-white text-[#173F36] transition-colors hover:bg-[#EFF7D7]">
            <Bell aria-hidden="true" size={19} strokeWidth={2.2} />
          </button>
        </header>
        {showNotice ? <div role="status" className="mx-4 mt-3 rounded-lg border border-[#D7DEC0] bg-[#EFF7D7] px-4 py-3 text-sm font-medium text-[#28483F]">Peringatan aktif ditampilkan langsung pada ringkasan kondisi lahan.</div> : null}
        <div className="page-content min-h-0 flex-1">{children}</div>
        <nav aria-label="Menu utama" className="fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-40 flex w-[calc(100%-24px)] max-w-[428px] -translate-x-1/2 items-center justify-around rounded-[24px] border border-white/15 bg-[#17201C]/96 px-1.5 py-2 shadow-[0_12px_32px_rgb(23_32_28/24%)] backdrop-blur-md">
          {menu.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex min-h-[54px] min-w-[50px] flex-1 flex-col items-center justify-center gap-1 rounded-[18px] px-1 text-[10px] font-semibold leading-none transition-colors ${active ? "bg-[#CDE974] text-[#17201C]" : "text-[#E7ECE8] hover:bg-white/10"}`}>
                <Icon aria-hidden="true" size={19} strokeWidth={active ? 2.5 : 2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
