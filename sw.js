//install service worker
self.addEventListener('install', evt => {
    console.log('service worker is installed', evt);
})

//activate service worker 2
self.addEventListener('activate', evt => {
    console.log('service worker is activated', evt );
})

//fetch event
self.addEventListener('fetch', evt => {
    console.log('fetch event', evt)
})