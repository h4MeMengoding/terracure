import webpush from "web-push";

type SubscriptionPayload = {
  endpoint?: unknown;
  keys?: { p256dh?: unknown; auth?: unknown };
};

type ValidSubscription = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

function isSubscription(value: unknown): value is ValidSubscription {
  if (!value || typeof value !== "object") return false;
  const subscription = value as SubscriptionPayload;
  return typeof subscription.endpoint === "string"
    && typeof subscription.keys?.p256dh === "string"
    && typeof subscription.keys?.auth === "string";
}

export async function POST(request: Request) {
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
  const vapidSubject = process.env.VAPID_SUBJECT;

  if (!vapidPublicKey || !vapidPrivateKey || !vapidSubject) {
    return Response.json({ message: "Notifikasi belum dikonfigurasi di server." }, { status: 503 });
  }

  let body: { subscription?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Payload notifikasi tidak valid." }, { status: 400 });
  }

  if (!isSubscription(body.subscription)) {
    return Response.json({ message: "Subscription perangkat tidak valid." }, { status: 400 });
  }

  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

  try {
    await webpush.sendNotification(body.subscription, JSON.stringify({
      title: "TERRACURE",
      body: "Notifikasi percobaan berhasil diterima dari sistem HMI sawah.",
      url: "/"
    }));
    return Response.json({ message: "Notifikasi berhasil dikirim." });
  } catch (error) {
    const statusCode = error && typeof error === "object" && "statusCode" in error ? error.statusCode : undefined;
    const message = statusCode === 404 || statusCode === 410
      ? "Subscription perangkat sudah tidak aktif. Aktifkan kembali notifikasi."
      : "Notifikasi gagal dikirim dari server.";
    return Response.json({ message }, { status: statusCode === 404 || statusCode === 410 ? 410 : 502 });
  }
}
