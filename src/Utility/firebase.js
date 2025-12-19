// Import the functions you need from the SDKs you need

import  firebase from "firebase/compat/app";

import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRgCO30eLU6msDfoQGcET3hp8bYTgQxjk",
  authDomain: "clone-b6144.firebaseapp.com",
  projectId: "clone-b6144",
  storageBucket: "clone-b6144.firebasestorage.app",
  messagingSenderId: "293038739014",
  appId: "1:293038739014:web:f6de35d7ff4c640a8b4447",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
