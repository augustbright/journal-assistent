// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHBw6eBm-Rrzcipd3YmxEgW-X6Cq6y81Y",
  authDomain: "my-bot-d40a6.firebaseapp.com",
  projectId: "my-bot-d40a6",
  storageBucket: "my-bot-d40a6.firebasestorage.app",
  messagingSenderId: "954122883640",
  appId: "1:954122883640:web:1382a0dffdffc22d190ccd",
  measurementId: "G-L7Q5S267DB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider }; 