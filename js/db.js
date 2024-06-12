// Import the functions you need from the SDKs you need
import { initializeApp, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    doc,
    query,
    onSnapshot,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


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

//
// const unsub = onSnapshot(collection(db, "posts"), (doc) => {
//     console.log("Current data: ", doc.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     })));
// });
//
// const q = query(collection(db, "posts"));
//
// const unsubscribe = onSnapshot(q, (snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//             console.log("New post: ", { ...change.doc.data(), id: change.doc.id });
//         }
//         if (change.type === "modified") {
//             console.log("Modified post: ", { ...change.doc.data(), id: change.doc.id });
//         }
//         if (change.type === "removed") {
//             console.log("Removed removed: ", { ...change.doc.data(), id: change.doc.id });
//         }
//     });
// });