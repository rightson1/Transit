import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";
import "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyDjRbpbg7ubhCyV-4qihQp7G4IiQX8tMOg",
    authDomain: "gedion-3c190.firebaseapp.com",
    projectId: "gedion-3c190",
    storageBucket: "gedion-3c190.appspot.com",
    messagingSenderId: "860385609811",
    appId: "1:860385609811:web:8483e279d924fdc751dea6"
};

const app = initializeApp(firebaseConfig, {

});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
