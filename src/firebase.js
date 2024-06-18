// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBfPhKyT0MK9BkmwbTR3UUTaqCsDzG3CE",
  authDomain: "notes-app-b40de.firebaseapp.com",
  projectId: "notes-app-b40de",
  storageBucket: "notes-app-b40de.appspot.com",
  messagingSenderId: "517190716653",
  appId: "1:517190716653:web:a7bd1769b9091bfae750e4",
  measurementId: "G-J48HYB7RY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);