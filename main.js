import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  push,
  update,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const nameField = document.querySelector("#name-field");
const listConteiner = document.querySelector(".item-list");
const listOutConteiner = document.querySelector(".item-out-list");

const firebaseConfig = {
  apiKey: "AIzaSyB6mgn9b8NiWJX45Pv8qb3uI9LBPAYDFyc",
  authDomain: "event-item-confirm.firebaseapp.com",
  databaseURL: "https://event-item-confirm-default-rtdb.firebaseio.com",
  projectId: "event-item-confirm",
  storageBucket: "event-item-confirm.appspot.com",
  messagingSenderId: "749901201064",
  appId: "1:749901201064:web:44bd558e89c95b5e718c9d",
  measurementId: "G-EXBVLWN2RX",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);
var escolheu = false;
var dataBasePath = "";

function ChooseItem(item, person) {
  const updates = {};
  updates["/"+dataBasePath + item + "/chosen"] = true;
  updates["/"+dataBasePath + item + "/person"] = person;

  return update(ref(database), updates);
}

function AddDescriptionViewItemList(item) {
  get(child(dbRef, dataBasePath + item + "/description"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        AddItem(snapshot.val(), item);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function AddDescriptionViewItemOutList(item) {
  get(child(dbRef, dataBasePath + item + "/description"))
    .then((snapshot) => {
      // console.log(snapshot.val());
      get(child(dbRef, dataBasePath + item + "/person"))
        .then((snapshot2) => {
          AddItemOut(snapshot.val(), item, snapshot2.val());
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
}
function GenerateItemList() {
  get(child(dbRef, `itensFestaLilian2022`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key; //nome do item
          var childData = childSnapshot.val(); //childs

          //verify if the chosen database of current item is false: then, additemtoChooseList
          get(child(dbRef, dataBasePath + childKey + "/chosen"))
            .then((snapshot) => {
              if (snapshot.exists()) {
                if (!snapshot.val()) AddDescriptionViewItemList(childKey);
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function GenerateItemOutList() {
  get(child(dbRef, dataBasePath))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key; //nome do item
          var childData = childSnapshot.val(); //childs

          //verify if the chosen database of current item is false: then, additemtoChooseList
          get(child(dbRef, dataBasePath + childKey + "/chosen"))
            .then((snapshot) => {
              if (snapshot.exists()) {
                if (snapshot.val()) AddDescriptionViewItemOutList(childKey);
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function AddItem(description, item) {
  if (description == "") return;
  const option = document.createElement("div");

  option.innerHTML = description;
  option.classList.add("item", "interactable");
  option.id = item;
  option.setAttribute("onclick", "ClickItem(this)");
  listConteiner.appendChild(option);
}

function AddItemOut(description, item, person) {
  const divContainer = document.createElement("div");
  divContainer.id = item;
  divContainer.classList.add("item");
  divContainer.appendChild(GenerateNode(person, "out-person"));
  divContainer.appendChild(GenerateNode(description, "out-description"));
  listOutConteiner.appendChild(divContainer);
}

function GenerateNode(text, className) {
  const node = document.createElement("p");
  node.classList.add(className);
  node.innerHTML = text;
  return node;
}

function ResetListOutConteiner() {
  while (listOutConteiner.firstChild) {
    listOutConteiner.removeChild(listOutConteiner.firstChild);
  }
}

function ClickItem(element) {
  if (escolheu) {
    alert(
      "Você já escolheu um item. Se cometeu um erro, entre em contato com o responsável."
    );
    return;
  }
  if (nameField.value != "") {
    Confirmation(element);
    return;
  }
  
  if (nameField.value == "") {
    nameField.value = prompt(
      "Você deixou seu nome em branco. Digite seu nome:"
    );
    if (nameField.value != "") Confirmation(element);
  } else {
    if (!confirm("Seu nome está correto? \n" + nameField.value)) {
      nameField.value = prompt("Digite seu nome: ");
    }
  }
}

function Confirmation(element) {
  if (
    confirm(
      "você confirma que irá levar " +
        element.innerText.toUpperCase() +
        "  ?"
    )
  ) {
    ChooseItem(element.id, nameField.value);
    listConteiner.removeChild(element);
    ResetListOutConteiner();
    GenerateItemOutList();
    escolheu = true;
    alert("Confirmação realizada!");
  }
}


export function Initialize(path) {
console.log(path)
  dataBasePath = path;
  window.ClickItem = ClickItem;
  GenerateItemList();
  GenerateItemOutList();
  nameField.value = prompt("Primeiro, digite seu nome: ");
}



