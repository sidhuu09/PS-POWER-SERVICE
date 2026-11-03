
importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js"
);

// FIREBASE CONFIGURATION
firebase.initializeApp({
  apiKey: "AIzaSyBx8j_W3h49Ypj0VakLSPqut3OXNa5HuxI",
  authDomain: "ps-power-service-68007.firebaseapp.com",
  projectId: "ps-power-service-68007",
  storageBucket: "ps-power-service-68007.firebasestorage.app",
  messagingSenderId: "647095348680",
  appId: "1:647095348680:web:51b3833ce08d767e9d64fd"
});

const messaging = firebase.messaging();

// BACKGROUND NOTIFICATION
messaging.onBackgroundMessage((payload) => {

  const data = payload.data || {};

  const title =
    payload.notification?.title ||
    data.title ||
    "PS POWER SERVICE";

  const options = {
    body:
      payload.notification?.body ||
      data.body ||
      "You have a new notification.",

    icon: "/favicon.ico",

    badge: "/favicon.ico",

    tag: data.notificationId || "ps-power-service",

    data: {
      url: data.url || "/PS-POWER-SERVICE/"
    }
  };

  return self.registration.showNotification(
    title,
    options
  );
});

// NOTIFICATION CLICK
self.addEventListener("notificationclick", (event) => {

  event.notification.close();

  const targetUrl =
    event.notification.data?.url ||
    "/PS-POWER-SERVICE/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {

      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus().then((focusedClient) => {
            if ("navigate" in focusedClient) {
              return focusedClient.navigate(targetUrl);
            }
            return focusedClient;
          });
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
