const DEFAULT_NOTIFICATION = {
  title: "TERRACURE",
  body: "Ada pembaruan kondisi lahan.",
  url: "/"
};

self.addEventListener("push", (event) => {
  let payload = DEFAULT_NOTIFICATION;

  if (event.data) {
    try {
      payload = { ...DEFAULT_NOTIFICATION, ...event.data.json() };
    } catch {
      payload = { ...DEFAULT_NOTIFICATION, body: event.data.text() };
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/icons/icon.svg",
      badge: "/icons/icon.svg",
      data: { url: payload.url }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "/", self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existingClient = clients.find((client) => "focus" in client);
      if (existingClient) {
        existingClient.navigate(targetUrl);
        return existingClient.focus();
      }
      return self.clients.openWindow(targetUrl);
    })
  );
});
