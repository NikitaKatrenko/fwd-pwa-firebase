if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/fwd-pwa-native/sw.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((e) => console.log('service worker not registered', e))
}