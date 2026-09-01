import { RiceMark } from "@/components/icons";

export function SplashScreen() {
  return (
    <main className="flex min-h-dvh justify-center bg-[#DFE2DC]">
      <section className="relative flex min-h-dvh w-full max-w-[460px] items-center justify-center bg-[#173F36] px-6 text-center text-white">
        <div className="flex w-full flex-col items-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-[#CDE974] text-[#173F36]">
            <RiceMark className="h-14 w-14" />
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-none">TERRACURE</h1>
          <p className="mt-3 max-w-[280px] text-base font-semibold leading-6 text-[#DCE7E2]">Sahabat Sawahmu</p>
        </div>
        <div className="absolute inset-x-6 bottom-[max(32px,env(safe-area-inset-bottom))] mx-auto w-auto max-w-[300px] text-center">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-3/4 rounded-full bg-[#CDE974]" />
          </div>
          <p className="mt-3 text-xs font-semibold text-[#DCE7E2]">Menyiapkan data</p>
        </div>
      </section>
    </main>
  );
}
