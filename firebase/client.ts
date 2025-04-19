// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
// import {getFirestore} from "firebase-admin/firestore";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBXVTloF9u3w4XNTZX5j1-CbTeB-yLyKmA",
    authDomain: "prepwise-53c3b.firebaseapp.com",
    projectId: "prepwise-53c3b",
    storageBucket: "prepwise-53c3b.firebasestorage.app",
    messagingSenderId: "1059422268452",
    appId: "1:1059422268452:web:1e26cba34836e333cbbcb1",
    measurementId: "G-YEEEBXZLH7"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);

export  const db = getFirestore(app);
