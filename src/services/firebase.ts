import firebase from 'firebase'
import { CONFIG } from '../config'
import 'firebase/auth'
import 'firebase/database'

const app = firebase.initializeApp(CONFIG.firebaseConfig)

var db = firebase.firestore();

db.collection("tasks").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });