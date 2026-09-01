export const NOTIFICATION_PREFERENCE_KEY = "terracure_notifications_enabled";

export type NotificationSupport = {
  supported: boolean;
  permission: NotificationPermission | "unsupported";
};

export function getNotificationErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/push service|registration failed|service worker/i.test(message)) {
    return "Layanan push browser tidak tersedia. Gunakan HTTPS atau localhost, lalu buka TERRACURE dari Safari/Chrome utama. Di iOS, install PWA ke Home Screen terlebih dahulu.";
  }
  return message || "Pengaturan notifikasi gagal diproses.";
}

export function getNotificationSupport(): NotificationSupport {
  if (typeof window === "undefined" || !("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
    return { supported: false, permission: "unsupported" };
  }

  return { supported: true, permission: Notification.permission };
}

function getVapidPublicKey() {
  const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!key) throw new Error("Notifikasi belum dikonfigurasi untuk environment ini.");
  return key;
}

function decodeBase64Url(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((character) => character.charCodeAt(0)));
}

async function getRegistration() {
  await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  return navigator.serviceWorker.ready;
}

export async function subscribeToNotifications() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error(permission === "denied" ? "Izin notifikasi ditolak oleh perangkat." : "Izin notifikasi belum diberikan.");

  const registration = await getRegistration();
  const existingSubscription = await registration.pushManager.getSubscription();
  const subscription = existingSubscription ?? await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: decodeBase64Url(getVapidPublicKey())
  });

  window.localStorage.setItem(NOTIFICATION_PREFERENCE_KEY, "on");
  return subscription;
}

export async function unsubscribeFromNotifications() {
  const registration = await getRegistration();
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) await subscription.unsubscribe();
  window.localStorage.setItem(NOTIFICATION_PREFERENCE_KEY, "off");
}

export async function getActiveNotificationSubscription() {
  if (!getNotificationSupport().supported) return null;
  const registration = await navigator.serviceWorker.getRegistration("/");
  return registration ? registration.pushManager.getSubscription() : null;
}

export async function sendTestNotification(subscription: PushSubscription) {
  const response = await fetch("/api/notifications/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscription: subscription.toJSON() })
  });

  const result = (await response.json().catch(() => null)) as { message?: string } | null;
  if (!response.ok) throw new Error(result?.message ?? "Notifikasi percobaan gagal dikirim.");
}
