"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Globe, Share2 } from "lucide-react";
import { InstallGuide } from "@/components/install-app-button";
import { RiceMark } from "@/components/icons";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    setIsInstalled(standalone);
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent) && !standalone);
    setIsAndroid(/android/i.test(navigator.userAgent));

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstall() {
    if (isInstalled) return;
    if (!deferredPrompt) {
      setShowGuide(true);
      return;
    }
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }

  return (
    <main className="flex min-h-dvh justify-center bg-[#DFE2DC]">
      <section className="flex min-h-dvh w-full max-w-[460px] flex-col bg-[#EEF1EB] px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#173F36] text-[#CDE974]"><RiceMark className="h-7 w-7" /></div>
          <div>
            <p className="text-[11px] font-extrabold tracking-[0.08em] text-[#637069]">TERRACURE</p>
            <h1 className="text-[24px] font-extrabold leading-tight text-[#17201C]">Install Aplikasi</h1>
          </div>
        </div>

        <div className="my-auto space-y-4">
          <section className="surface-card p-5">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#173F36] text-[#CDE974]"><Download aria-hidden="true" size={23} /></div>
            <h2 className="mt-5 text-[24px] font-extrabold leading-tight text-[#17201C]">Tambahkan TERRACURE</h2>
            <p className="mt-2 text-sm leading-6 text-[#5F6963]">Buka lebih cepat dari Home Screen dan gunakan pengalaman aplikasi yang lebih nyaman.</p>

            {isIOS ? (
              <div className="mt-5 grid gap-2">
                <Link href="/" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#173F36] px-4 text-sm font-bold text-white hover:bg-[#245347]"><Globe aria-hidden="true" size={17} />Buka di web</Link>
                <button type="button" onClick={() => setShowGuide(true)} className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#CBD4CC] px-4 text-sm font-bold text-[#23483E] hover:bg-[#EFF7D7]"><Share2 aria-hidden="true" size={17} />Cara ke Home Screen</button>
              </div>
            ) : (
              <button type="button" disabled={isInstalled} onClick={() => void handleInstall()} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#173F36] px-4 text-sm font-bold text-white hover:bg-[#245347] disabled:cursor-default disabled:bg-[#DCE2DC] disabled:text-[#5F6963]"><Download aria-hidden="true" size={17} />{isInstalled ? "Aplikasi sudah terpasang" : "Install Aplikasi"}</button>
            )}
          </section>
          <p className="px-2 text-center text-xs leading-5 text-[#5F6963]">Gunakan Safari di iPhone atau browser yang mendukung PWA untuk memasang aplikasi.</p>
        </div>
      </section>
      {showGuide ? <InstallGuide isIOS={isIOS} isAndroid={isAndroid} onClose={() => setShowGuide(false)} /> : null}
    </main>
  );
}
