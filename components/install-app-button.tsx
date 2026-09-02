"use client";

import { useEffect, useState } from "react";
import { Download, MoreVertical, Share, SquarePlus, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallAppButton() {
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
      if (!isAndroid) setShowGuide(true);
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }

  return (
    <>
      <section className="surface-card p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#EEF1EB] text-[#173F36]">
            <Download aria-hidden="true" size={20} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[18px] font-extrabold leading-tight text-[#17201C]">Install Aplikasi</h2>
            <p className="mt-1 text-xs leading-5 text-[#5F6963]">Tambahkan TERRACURE ke Home Screen agar mudah dibuka.</p>
            <button type="button" disabled={isInstalled} onClick={handleInstall} className="mt-4 flex min-h-11 w-full items-center justify-between border border-[#CBD4CC] px-3 text-sm font-bold text-[#23483E] transition-colors hover:bg-[#EFF7D7] disabled:cursor-default disabled:bg-[#EEF1EB] disabled:text-[#5F6963]">
              <span>{isInstalled ? "Aplikasi sudah terpasang" : "Install Aplikasi"}</span>
              <Download aria-hidden="true" size={17} strokeWidth={2.1} />
            </button>
          </div>
        </div>
      </section>
      {showGuide ? <InstallGuide isIOS={isIOS} isAndroid={isAndroid} onClose={() => setShowGuide(false)} /> : null}
    </>
  );
}

export function InstallGuide({ isIOS, isAndroid = false, onClose }: { isIOS: boolean; isAndroid?: boolean; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#17201C]/45 px-3 pb-3" role="presentation" onMouseDown={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="install-guide-title" className="w-full max-w-[428px] rounded-[20px] bg-white p-5 shadow-[0_18px_50px_rgb(23_32_28/28%)]" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">PANDUAN INSTALASI</p>
            <h2 id="install-guide-title" className="mt-1 text-xl font-extrabold text-[#17201C]">Tambahkan ke Home Screen</h2>
          </div>
          <button type="button" aria-label="Tutup panduan instalasi" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[#DCE2DC] text-[#173F36] hover:bg-[#EFF7D7]"><X aria-hidden="true" size={19} /></button>
        </div>
        {isIOS ? (
          <ol className="mt-4 space-y-3 text-sm leading-6 text-[#4E5A53]">
            <li className="flex gap-3"><Share className="mt-1 shrink-0 text-[#477064]" size={18} /><span>Tekan tombol Share pada Safari.</span></li>
            <li className="flex gap-3"><SquarePlus className="mt-1 shrink-0 text-[#477064]" size={18} /><span>Pilih Add to Home Screen, lalu tekan Add.</span></li>
          </ol>
        ) : (
          <ol className="mt-4 space-y-3 text-sm leading-6 text-[#4E5A53]">
            <li className="flex gap-3"><MoreVertical className="mt-1 shrink-0 text-[#477064]" size={18} /><span>Buka menu browser di kanan atas.</span></li>
            <li className="flex gap-3"><Download className="mt-1 shrink-0 text-[#477064]" size={18} /><span>{isAndroid ? "Pilih Install app untuk memasang TERRACURE." : "Pilih Install app atau Add to Home screen."}</span></li>
          </ol>
        )}
      </section>
    </div>
  );
}
