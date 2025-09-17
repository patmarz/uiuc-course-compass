// v1.1.6 cache bump
const CACHE = 'uicc-v1.1.6';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js?v=116',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k!==CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.pathname.endsWith('/app.js')) {
    e.respondWith(fetch(e.request).then(r => (caches.open(CACHE).then(c=>c.put(e.request, r.clone())), r)).catch(()=>caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
