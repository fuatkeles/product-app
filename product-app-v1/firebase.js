import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB83BqkazNf81nw73-DZSp1ImAZc6OxhoM",
  authDomain: "product-app-608e9.firebaseapp.com",
  databaseURL: "https://product-app-608e9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "product-app-608e9",
  storageBucket: "product-app-608e9.appspot.com",
  messagingSenderId: "398276732831",
  appId: "1:398276732831:web:68126de97868b4adfdbfaa"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const brandsRef = ref(database, 'brands');

export { app, auth, db, brandsRef };