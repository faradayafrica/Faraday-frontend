const cacheData = "appV1";
const PRECACHE_ASSETS = ["/public/", "/src/", "/"];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
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

// Background Sync
function doBackgroundSync() {
  return new Promise((resolve, reject) => {
    // Fetch data from the server or perform background tasks
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => {
        // Process the data, update caches, or perform other tasks
        console.log("Background sync completed:", data);
        resolve();
      })
      .catch((error) => {
        console.error("Background sync failed:", error);
        reject(error);
      });
  });
}

// Periodic Sync
this.addEventListener("periodicsync", (event) => {
  if (event.registration.tag === "periodic-sync") {
    event.waitUntil(doPeriodicSync());
  }
});

// Periodic Sync
function doPeriodicSync() {
  return new Promise((resolve, reject) => {
    // Perform periodic tasks, update caches, or fetch updated data
    fetch("https://api.example.com/periodic-task")
      .then((response) => response.json())
      .then((data) => {
        // Process the data or update caches
        console.log("Periodic sync completed:", data);
        resolve();
      })
      .catch((error) => {
        console.error("Periodic sync failed:", error);
        reject(error);
      });
  });
}
