// Service Worker for Stilla Trading PWA

const CACHE_NAME = "stilla-cache-v2"
const OFFLINE_URL = "/offline.html"

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/",
  "/offline.html",
  "/images/stilla-peanut-butter.png",
  "/images/stilla-logo.png",
  "/images/stilla-logo-white.png",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/icon-192x192.png",
  "/icon-512x512.png",
]

// Install event - precache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        // Add all precache assets
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting()
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              return caches.delete(cacheName)
            }),
        )
      })
      .then(() => {
        // Claim clients so the SW is in control immediately
        return self.clients.claim()
      }),
  )
})

// Fetch event - network-first strategy with fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Handle navigation requests differently
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If offline, serve the offline page
        return caches.match(OFFLINE_URL)
      }),
    )
    return
  }

  // For other requests, try network first, then cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
        }
        return response
      })
      .catch(() => {
        // If network fails, try the cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // For image requests, return a fallback image if available
          if (event.request.destination === "image") {
            return caches.match("/placeholder.svg")
          }

          // Otherwise, just fail
          return new Response("Network error", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          })
        })
      }),
  )
})

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "submit-form") {
    event.waitUntil(syncForms())
  }
})

// Push notification handler
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || "/icon-192x192.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
        url: data.url || "/",
      },
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      const url = event.notification.data.url

      // If a window is already open, focus it
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus()
        }
      }

      // Otherwise open a new window
      if (clients.openWindow) {
        return clients.openWindow(url)
      }
    }),
  )
})

// Helper function for form sync
async function syncForms() {
  const db = await openDatabase()
  const forms = await db.getAll("outbox")

  return Promise.all(
    forms.map(async (form) => {
      try {
        const response = await fetch(form.url, {
          method: form.method,
          headers: form.headers,
          body: form.body,
        })

        if (response.ok) {
          await db.delete("outbox", form.id)
        }
      } catch (error) {
        console.error("Sync failed:", error)
      }
    }),
  )
}

// IndexedDB helper for offline storage
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("stilla-offline-db", 1)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      db.createObjectStore("outbox", { keyPath: "id", autoIncrement: true })
    }

    request.onsuccess = (event) => {
      const db = event.target.result
      resolve({
        getAll: (storeName) => {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readonly")
            const store = transaction.objectStore(storeName)
            const request = store.getAll()

            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
          })
        },
        delete: (storeName, id) => {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readwrite")
            const store = transaction.objectStore(storeName)
            const request = store.delete(id)

            request.onsuccess = () => resolve()
            request.onerror = () => reject(request.error)
          })
        },
        add: (storeName, item) => {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readwrite")
            const store = transaction.objectStore(storeName)
            const request = store.add(item)

            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
          })
        },
      })
    }

    request.onerror = () => reject(request.error)
  })
}
