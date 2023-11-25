// utils.js

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

export { doBackgroundSync, doPeriodicSync };
