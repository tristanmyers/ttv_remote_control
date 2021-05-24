// Call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
})

// Call activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activate');
})

`caches` in window;
caches.open('cacheName').then(cache => {
    cache.add('http://localhost:8000/send_action').then(() => {
        console.log('data cached');
    });
});