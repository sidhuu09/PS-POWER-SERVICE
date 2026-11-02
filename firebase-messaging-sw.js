importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBx8j_W3h49Ypj0VakLSPqut3OXNa5HuxI",
  authDomain: "ps-power-service-68007.firebaseapp.com",
  projectId: "ps-power-service-68007",
  storageBucket: "ps-power-service-68007.firebasestorage.app",
  messagingSenderId: "647095348680",
  appId: "1:647095348680:web:51b3833ce08d767e9d64fd"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "PS POWER SERVICE";

  self.registration.showNotification(title, {
    body: payload.notification?.body || "You have a new notification.",
    icon: "/favicon.ico"
  });
});
