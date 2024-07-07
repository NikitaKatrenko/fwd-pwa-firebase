// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js')
//         .then((reg) => console.log('service worker registered', reg))
//         .catch((e) => console.log('service worker not registered', e))
// }

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging.js-sw.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((e) => console.log('service worker not registered', e))
}

if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Notification permission denied.');
        }
    });
} else {
    console.log('Notification permission already granted.');
}