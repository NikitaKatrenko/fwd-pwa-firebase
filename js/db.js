// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    query,
    onSnapshot,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQ_kqJwud8vN5mM5Fz_ghJsd5lgnQqJ4w",
    authDomain: "pwa-example-a2267.firebaseapp.com",
    projectId: "pwa-example-a2267",
    storageBucket: "pwa-example-a2267.appspot.com",
    messagingSenderId: "898981189017",
    appId: "1:898981189017:web:cf62fe6d0ba7aa0ebb2f08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Firestore connection
export const db = initializeFirestore(app, {
    //Offline data
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager() // persistentSingleTabManager()
    })
});

const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // Display the notification or update the UI as needed
    // new Notification(payload.notification.title, { body: payload.notification.body });
});

// Initialize Messaging
getToken(messaging, {vapidKey: "BE10zy7H72wc6zYxXGFC1nExLbeKR-hftEBkW2_QZdvKUaOU8cmT1GlPQ2IEajXTz1eDEvTh2bbuC4aJT2VzEu8"})
    .then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});