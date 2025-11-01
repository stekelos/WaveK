const CACHE_NAME = ‘breathing-app-v1’;
const urlsToCache = [
‘/anapnoh.html’,
‘/manifest.json’
];

// Install event - cache files
self.addEventListener(‘install’, event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
console.log(‘Opened cache’);
return cache.addAll(urlsToCache);
})
);
self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener(‘fetch’, event => {
event.respondWith(
caches.match(event.request)
.then(response => {
// Return cached version or fetch from network
return response || fetch(event.request);
})
.catch(() => {
// If both cache and network fail, return the main page from cache
return caches.match(’/anapnoh.html’);
})
);
});

// Activate event - clean up old caches
self.addEventListener(‘activate’, event => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (!cacheWhitelist.includes(cacheName)) {
return caches.delete(cacheName);
}
})
);
})
);
self.clients.claim();
});
