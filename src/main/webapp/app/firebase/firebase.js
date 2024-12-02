// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJM6xbM4zYmHzdrOQiKrgk5i1gezStEtk",
  authDomain: "kfz-login-fecb2.firebaseapp.com",
  projectId: "kfz-login-fecb2",
  storageBucket: "kfz-login-fecb2.appspot.com",
  messagingSenderId: "49083625664",
  appId: "1:49083625664:web:31020a8dfa8279e2f73d25"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);