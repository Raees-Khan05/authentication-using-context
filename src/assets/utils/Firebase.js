// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyARoumL2e85JzTtz9uhxRCaVDDb2mgzbGQ",
  authDomain: "first-project-cc18b.firebaseapp.com",
  projectId: "first-project-cc18b",
  storageBucket: "first-project-cc18b.appspot.com",
  messagingSenderId: "770785505812",
  appId: "1:770785505812:web:cd9aa86b5761327af16d01",
  measurementId: "G-WC0ZSCJ5ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);


export {
     app , auth 
}