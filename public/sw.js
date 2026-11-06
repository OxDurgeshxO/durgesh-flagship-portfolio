/**
 * Durgesh Dutt Sinha Portfolio — Stale-While-Revalidate Service Worker
 * Version: v10-offline-cache-v1
 * Provides offline access to resume, case studies, and core portfolio assets.
 */

const CACHE_NAME = 'dds-portfolio-v10-cache-v1';

const STATIC_PRECACHE = [
  '/',
  '/resume',
  '/resume.pdf',
  '/recruiter',
  '/lab',
  '/spaceedu',
  '/favicon.svg',
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests from the same origin
  if (req.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Never cache API requests or telemetry
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Stale-While-Revalidate for static pages and assets
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req).then((cachedResponse) => {
        const fetchPromise = fetch(req)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(req, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    )
  );
});
