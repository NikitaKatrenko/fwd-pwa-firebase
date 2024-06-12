// Import the functions you need from the SDKs you need
import { initializeApp, } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getFirestore,
    collection,
    doc,
    query,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "***",
    authDomain: "***",
    projectId: "***",
    storageBucket: "***",
    messagingSenderId: "***",
    appId: "***"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Firestore connection
export const db = getFirestore(app);
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