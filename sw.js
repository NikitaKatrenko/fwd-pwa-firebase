const staticCacheName = 'site-static-v13';
const dynamicCacheName = 'site-dynamic-v10';

const assets = [
    '/fwd-pwa-native/',
    '/fwd-pwa-native/index.html',
    '/fwd-pwa-native/pages/fallback.html',
    '/fwd-pwa-native/js/app.js',
    '/fwd-pwa-native/js/ui.js',
    '/fwd-pwa-native/js/blog.js',
    '/fwd-pwa-native/css/styles.css',
    '/fwd-pwa-native/assets/logo.png',
    'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css',
];

//install service worker
self.addEventListener('install', evt => {
    // console.log('service worker is installed', evt);
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets).then();
        })
    );
});

//activate service worker
self.addEventListener('activate', evt => {
    // console.log('service worker is activated', evt );
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys)
            return Promise.all(
                keys
                    .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                    .map(key => caches.delete(key))
            ).then(() => {
                console.log('Old caches have been removed.');
            });
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt)
    evt.respondWith(
        caches.match(evt.request).then(cachesRes => {
            return cachesRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 3);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1) {
                return caches.match('/fwd-pwa-native/pages/fallback.html')
            }
            //Також ми можемо окремо додати хендлери на різні типи файлів
            //Наприклад повернути дефолтну картинку замість будь якої іншої
        })
    );
});

//cache size limit
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};