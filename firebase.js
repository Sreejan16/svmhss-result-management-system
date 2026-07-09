import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBy3vNBcWYmuWdEsqbxUoeER8Mawd5y-w8",
  authDomain: "svmhss-result-portal.firebaseapp.com",
  projectId: "svmhss-result-portal",
  storageBucket: "svmhss-result-portal.firebasestorage.app",
  messagingSenderId: "786847918597",
  appId: "1:786847918597:web:29acfdf5f4f8ef8d71ca6c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };