"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "@/components/splash-screen";

export function AppEntry({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js", { scope: "/" });
    }
  }, []);

  return (
    <>
      {children}
      {loading ? <div className="fixed inset-0 z-[60]"><SplashScreen /></div> : null}
    </>
  );
}
