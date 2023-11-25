const cacheData = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        "/static/css/main.chunk.css",
        "/bootstrap.min.css",
        "/index.html",
        "/",
        "/users",
        "src/",
      ]);
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
