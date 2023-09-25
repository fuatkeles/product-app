// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB83BqkazNf81nw73-DZSp1ImAZc6OxhoM",
  authDomain: "product-app-608e9.firebaseapp.com",
  projectId: "product-app-608e9",
  storageBucket: "product-app-608e9.appspot.com",
  messagingSenderId: "398276732831",
  appId: "1:398276732831:web:40030e5a0cabac94fdbfaa"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db};