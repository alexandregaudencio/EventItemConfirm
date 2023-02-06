import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

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
firebase.initializeApp(firebaseConfig);
function writeUserData(itemIndex, person) {
    console.log("Dados atualizados.");
    const db = firebase.getDatabase();
    set(ref(db, 'itens/item' + itemIndex), {
    chosen: true,
    person: person

  });
}

writeUserData(1, "Pedrinho");

