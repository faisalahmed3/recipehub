// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAdEYoEpSGkEcupr-WFUcNOlM__qYdpiuk",
  authDomain: "recipehub-80472.firebaseapp.com",
  projectId: "recipehub-80472",
  storageBucket: "recipehub-80472.firebasestorage.app",
  messagingSenderId: "251168205960",
  appId: "1:251168205960:web:eb6afa294fa2acedf0433d"
};

const app = initializeApp(firebaseConfig);
export default app;
