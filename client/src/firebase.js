
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-7fa13.firebaseapp.com",
  projectId: "mern-blog-7fa13",
  storageBucket: "mern-blog-7fa13.firebasestorage.app",
  messagingSenderId: "256415898360",
  appId: "1:256415898360:web:6e25b2049230ab1579f90d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);