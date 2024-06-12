// Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js')
importScripts('sw.js');

const firebaseConfig = {
    apiKey: "AIzaSyAQ_kqJwud8vN5mM5Fz_ghJsd5lgnQqJ4w",
    authDomain: "pwa-example-a2267.firebaseapp.com",
    projectId: "pwa-example-a2267",
    storageBucket: "pwa-example-a2267.appspot.com",
    messagingSenderId: "898981189017",
    appId: "1:898981189017:web:cf62fe6d0ba7aa0ebb2f08"
};

const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    const  { notification } = payload;
    const { title, body }  = notification;

    const notificationOptions = {
        body: body,
        icon: ''
    };

    self.registration.showNotification(title, notificationOptions);
});