import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyBd9H7KVFOp1Qlys5Fm-AdI1vjD4MHrSkM",
  authDomain: "gdn-bot.firebaseapp.com",
  databaseURL: "https://gdn-bot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gdn-bot",
  storageBucket: "gdn-bot.appspot.com",
  messagingSenderId: "621639358864",
  appId: "1:621639358864:web:de8c59fa5c995c4ad43b15",
  measurementId: "G-BEQEZF0M15"
};
firebase.initializeApp(firebaseConfig);

// Utils
const db = firebase.firestore();
const auth = firebase.auth();
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, serverTimestamp, googleAuthProvider };