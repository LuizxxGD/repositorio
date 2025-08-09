// Service Worker for iOS Unlocker Pro
const CACHE_NAME = 'ios-unlocker-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/script.js',
    '/img/COMUNIDADE-removebg-preview.png',
    '/img/md1.png',
    '/img/md2.png',
    '/img/md3.png',
    '/img/md4.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch(error => {
                console.log('Cache failed:', error);
            })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Handle HTML requests
    if (request.destination === 'document') {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then(response => {
                            if (response.status === 200) {
                                const responseClone = response.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => cache.put(request, responseClone));
                            }
                            return response;
                        });
                })
        );
        return;
    }

    // Handle CSS and JS requests
    if (request.destination === 'script' || request.destination === 'style') {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then(response => {
                            if (response.status === 200) {
                                const responseClone = response.clone();
                                caches.open(STATIC_CACHE)
                                    .then(cache => cache.put(request, responseClone));
                            }
                            return response;
                        });
                })
        );
        return;
    }

    // Handle image requests
    if (request.destination === 'image') {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then(response => {
                            if (response.status === 200) {
                                const responseClone = response.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => cache.put(request, responseClone));
                            }
                            return response;
                        });
                })
        );
        return;
    }

    // Default network-first strategy for other requests
    event.respondWith(
        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE)
                        .then(cache => cache.put(request, responseClone));
                }
                return response;
            })
            .catch(() => {
                return caches.match(request);
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Handle background sync tasks
    console.log('Background sync triggered');
    return Promise.resolve();
} 