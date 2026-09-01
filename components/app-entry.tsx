"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "@/components/splash-screen";

export function AppEntry({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return loading ? <SplashScreen /> : children;
}
