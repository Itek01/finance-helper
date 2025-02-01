import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBV03HuUDQpflFmd8xVWBL_UlMg2uwu3cA",
    authDomain: "finance-helper-15cbd.firebaseapp.com",
    projectId: "finance-helper-15cbd",
    storageBucket: "finance-helper-15cbd.firebasestorage.app",
    messagingSenderId: "951419338326",
    appId: "1:951419338326:web:e401c40ca823619bc645f7",
    measurementId: "G-K7W4EL10GL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
