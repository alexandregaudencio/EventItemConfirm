// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6mgn9b8NiWJX45Pv8qb3uI9LBPAYDFyc",
  authDomain: "event-item-confirm.firebaseapp.com",
  databaseURL: "https://event-item-confirm-default-rtdb.firebaseio.com",
  projectId: "event-item-confirm",
  storageBucket: "event-item-confirm.appspot.com",
  messagingSenderId: "749901201064",
  appId: "1:749901201064:web:44bd558e89c95b5e718c9d",
  measurementId: "G-EXBVLWN2RX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);