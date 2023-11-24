const cacheVersion = "appV2";
const cacheName = `static-${cacheVersion}`;

const preCacheUrls = [
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/static/js/bundle.js",
  "/static/css/main.chunk.css",
  "/bootstrap.min.css",
  "/index.html",
  "/",
  "/users",
  "/offline.html",
];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(preCacheUrls);
    })
  );
});

this.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      // Clean up old caches
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

this.addEventListener("fetch", (event) => {
  // Handle offline fallbacks for "/static/js/main.chunk.js"
  if (event.request.url.includes("/static/js/main.chunk.js")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).catch(() => {
            // Return a meaningful offline fallback
            return caches.match("/offline.html");
          })
        );
      })
    );
    return;
  }

  // For other resources, handle offline fallbacks generically
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // Return a meaningful offline fallback
          return caches.match("/offline.html");
        })
      );
    })
  );
});
