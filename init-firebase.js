
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, child, get, push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);




function ChooseItem(itemIndex, person) {
    console.log("Dados atualizados.");
    set(ref(database, 'itens/item' + itemIndex), {
        chosen: true,
        person: person

    });
}

const dbRef = ref(database);

function GetDescription(itemKey) {
    get(child(dbRef,"itens/"+ itemKey+"/description")).then((snapshot) => {
        if (snapshot.exists() ) {
            // console.log(snapshot.val());
            AddOption(snapshot.val(),itemKey);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
// get(child(dbRef, `itens/item${1}/chosen`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });



function GenerateItemList() {
    get(child(dbRef, `itens`)).then((snapshot) => {
        if (snapshot.exists()) {

            console.log(snapshot.val());
            snapshot.forEach((childSnapshot) => {
                var childKey = childSnapshot.key; //nome do item
                var childData = childSnapshot.val(); //childs

                GetDescription(childKey);

            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

}

GenerateItemList();



