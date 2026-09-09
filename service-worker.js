const CACHE_NAME = "honglin-snowboard-v12";
const APP_SHELL = [
  "./",
  "./index.html",
  "./programs.html",
  "./student-clips.html",
  "./about.html",
  "./styles.css?v=20260909-2",
  "./google-sheets-config.js?v=20260909-2",
  "./script.js?v=20260909-2",
  "./manifest.webmanifest",
  "./assets/snowboard-avatar.svg?v=20260909-2",
  "./assets/app-icons/icon-192.png",
  "./assets/app-icons/icon-512.png",
  "./assets/app-icons/apple-touch-icon.png",
  "./assets/hero-snowboard-coach.png",
  "./assets/aasi-certification-l1-hong-lin.jpg?v=20260909-2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.destination === "video") {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(new URL("./index.html", self.registration.scope).toString()))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
