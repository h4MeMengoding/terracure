"use client";

import { useEffect, useState } from "react";
import { Bell, Send } from "lucide-react";
import {
  getActiveNotificationSubscription,
  getNotificationSupport,
  getNotificationErrorMessage,
  NOTIFICATION_PREFERENCE_KEY,
  sendTestNotification,
  subscribeToNotifications,
  unsubscribeFromNotifications
} from "@/lib/notifications";
import type { NotificationSupport } from "@/lib/notifications";

type Feedback = { tone: "success" | "error"; message: string } | null;

export function NotificationSettings() {
  const [support, setSupport] = useState<NotificationSupport>({ supported: false, permission: "unsupported" });
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    const nextSupport = getNotificationSupport();
    setSupport(nextSupport);
    if (!nextSupport.supported) return;

    getActiveNotificationSubscription().then((subscription) => {
      const preference = window.localStorage.getItem(NOTIFICATION_PREFERENCE_KEY);
      setEnabled(Boolean(subscription) && preference !== "off");
    });
  }, []);

  async function handleToggle() {
    setBusy(true);
    setFeedback(null);
    try {
      if (enabled) {
        await unsubscribeFromNotifications();
        setEnabled(false);
        setSupport(getNotificationSupport());
        setFeedback({ tone: "success", message: "Notifikasi OS dinonaktifkan." });
      } else {
        await subscribeToNotifications();
        setEnabled(true);
        setSupport(getNotificationSupport());
        setFeedback({ tone: "success", message: "Notifikasi OS berhasil diaktifkan." });
      }
    } catch (error) {
      setFeedback({ tone: "error", message: getNotificationErrorMessage(error) });
      setSupport(getNotificationSupport());
    } finally {
      setBusy(false);
    }
  }

  async function handleTest() {
    setBusy(true);
    setFeedback(null);
    try {
      const subscription = await getActiveNotificationSubscription();
      if (!subscription) throw new Error("Aktifkan notifikasi terlebih dahulu.");
      await sendTestNotification(subscription);
      setFeedback({ tone: "success", message: "Notifikasi percobaan dikirim ke perangkat." });
    } catch (error) {
      setFeedback({ tone: "error", message: getNotificationErrorMessage(error) });
    } finally {
      setBusy(false);
    }
  }

  const statusText = !support.supported
    ? "Browser ini belum mendukung Web Push."
    : support.permission === "denied"
      ? "Izin ditolak. Aktifkan kembali dari pengaturan browser atau perangkat."
      : enabled
        ? "Notifikasi akan muncul sebagai pemberitahuan OS."
        : "Aktifkan untuk menerima pemberitahuan dari TERRACURE.";

  return (
    <section className="surface-card p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#EEF1EB] text-[#173F36]">
          <Bell aria-hidden="true" size={20} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[18px] font-extrabold leading-tight text-[#17201C]">Notifikasi</h2>
              <p className="mt-1 text-xs leading-5 text-[#5F6963]">{statusText}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E3E8E3] pt-3">
            <span className={`text-xs font-bold ${enabled ? "text-[#23483E]" : "text-[#5F6963]"}`}>{enabled ? "Aktif" : "Nonaktif"}</span>
            <button
              type="button"
              onClick={() => void handleToggle()}
              aria-pressed={enabled}
              aria-label={enabled ? "Matikan notifikasi" : "Aktifkan notifikasi"}
              disabled={!support.supported || busy}
              className="!min-h-9 rounded-md border border-[#173F36] px-3 text-xs font-bold text-[#173F36] transition-colors hover:bg-[#EFF7D7] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {enabled ? "Matikan" : "Aktifkan"}
            </button>
          </div>
          <button type="button" disabled={!enabled || busy} onClick={handleTest} className="mt-4 flex min-h-11 w-full items-center justify-between border border-[#CBD4CC] px-3 text-sm font-bold text-[#23483E] transition-colors hover:bg-[#EFF7D7] disabled:cursor-not-allowed disabled:opacity-45">
            <span>Test Notifikasi</span>
            <Send aria-hidden="true" size={17} strokeWidth={2.1} />
          </button>
        </div>
      </div>
      {feedback ? <p role="status" className={`mt-3 border-t pt-3 text-xs font-semibold leading-5 ${feedback.tone === "success" ? "border-[#D7DEC0] text-[#23483E]" : "border-[#F0C4C0] text-[#A92B24]"}`}>{feedback.message}</p> : null}
    </section>
  );
}
