import type { Metadata } from "next";
import { InstallPage } from "@/components/install-page";

export const metadata: Metadata = { title: "Install Aplikasi" };

export default function InstallPageRoute() {
  return <InstallPage />;
}
