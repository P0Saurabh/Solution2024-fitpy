import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxH9ULWjI6Fd7ZL3ponbuNlgnch-OJWME",
  authDomain: "gdsc-3395b.firebaseapp.com",
  projectId: "gdsc-3395b",
  storageBucket: "gdsc-3395b.appspot.com",
  messagingSenderId: "528028380509",
  appId: "1:528028380509:web:b1ceb574e5b0132a244cb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };