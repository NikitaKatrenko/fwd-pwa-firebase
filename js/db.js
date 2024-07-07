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
    apiKey: "*********",
    authDomain: "*********",
    projectId: "*********",
    storageBucket: "*********",
    messagingSenderId: "*********",
    appId: "*********"
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
getToken(messaging, {vapidKey: "**********"})
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