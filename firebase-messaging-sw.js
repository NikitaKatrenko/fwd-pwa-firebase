// Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js')
importScripts('sw.js');

const firebaseConfig = {
    apiKey: "*********",
    authDomain: "*********",
    projectId: "*********",
    storageBucket: "*********",
    messagingSenderId: "*********",
    appId: "*********"
};
//
// const app = firebase.initializeApp(firebaseConfig);
//
// // Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging.js = firebase.messaging.js();

// messaging.js.onBackgroundMessage(payload => {
//     const  { notification } = payload;
//     const { title, body }  = notification;
//
//     const notificationOptions = {
//         body: body,
//         icon: ''
//     };
//
//     self.registration.showNotification(title, notificationOptions);
// });