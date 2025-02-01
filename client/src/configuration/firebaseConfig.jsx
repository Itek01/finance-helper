// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPziMT6004RmUMr3Y_Tst7pN-ch3S__cE",
  authDomain: "lethimcook-1d740.firebaseapp.com",
  projectId: "lethimcook-1d740",
  storageBucket: "lethimcook-1d740.firebasestorage.app",
  messagingSenderId: "150561317213",
  appId: "1:150561317213:web:6654aed3266679a8ba48b4",
  measurementId: "G-H3F4JRDG4B"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { app, db, collection, getDoc, doc, storage, auth, googleProvider, facebookProvider };