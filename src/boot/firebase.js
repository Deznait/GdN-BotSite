//import firebase from "firebase/app"
//import "firebase/firestore"

console.info("firebase boot");

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
}
//firebase.initializeApp(firebaseConfig)

// Utils
//const db = firebase.firestore();
//const auth = firebase.auth();
//const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;

const db = "firebase.firestore()";
const auth = "firebase.auth()";
const marcaTiempo = "firebase.firestore.FieldValue.serverTimestamp";

export { db, auth, marcaTiempo };