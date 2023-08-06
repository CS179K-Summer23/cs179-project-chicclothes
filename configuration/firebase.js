import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCqjKHFl50dLIpjzblN3QD3a7mJkQ8FQSc",
  authDomain: "chic-clothes.firebaseapp.com",
  projectId: "chic-clothes",
  storageBucket: "chic-clothes.appspot.com",
  messagingSenderId: "280620591422",
  appId: "1:280620591422:web:5080e7e13cf97cfa6be46f"
};

let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // if already initialized, use that one
}

const db = getFirestore(app);
const auth = getAuth();


export { db, auth };
