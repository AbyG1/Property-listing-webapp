// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-property-listing.firebaseapp.com",
  projectId: "mern-property-listing",
  storageBucket: "mern-property-listing.appspot.com",
  messagingSenderId: "635506771819",
  appId: "1:635506771819:web:adcace9568115ffa602e2e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);