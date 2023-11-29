import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlmc0cup1K0yFx8Mu289VAyT9Uw1Lx1AA",
  authDomain: "quiz-app-9aefb.firebaseapp.com",
  projectId: "quiz-app-9aefb",
  storageBucket: "quiz-app-9aefb.appspot.com",
  messagingSenderId: "282033674609",
  appId: "1:282033674609:web:5fa8193165427b9a0d7ed0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPasswordFirebase as createUserWithEmailAndPassword };
