import { doBackgroundSync, doPeriodicSync } from "../src/utils";

const cacheData = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(["/src/", "/index.html", "/offline.html", "/"]);
    })
  );
});

this.addEventListener("activate", (event) => {
  const cacheWhitelist = [cacheData];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
      event.respondWith(
        caches.match(event.request).then((resp) => {
          if (resp) {
            return resp;
          }
          return fetch(event.request);
        })
      );

      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "Internet not working",
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request).then((resp) => {
          return resp || fetch(event.request);
        })
      );
    }
  }
});

// Background Sync
this.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

// Periodic Sync
this.addEventListener("periodicsync", (event) => {
  if (event.registration.tag === "periodic-sync") {
    event.waitUntil(doPeriodicSync());
  }
});

// Background Sync
this.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

// Periodic Sync
this.addEventListener("periodicsync", (event) => {
  if (event.registration.tag === "periodic-sync") {
    event.waitUntil(doPeriodicSync());
  }
});
