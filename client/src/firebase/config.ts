// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP81UU3yRe4N-Gb5NCTphQYH9XV9F3nb0",
  authDomain: "note-app-384ec.firebaseapp.com",
  projectId: "note-app-384ec",
  storageBucket: "note-app-384ec.appspot.com",
  messagingSenderId: "1058758952676",
  appId: "1:1058758952676:web:cc1f5bd8786896eac14ef1",
  measurementId: "G-L71KTZN6JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const imageDb = getStorage(app)