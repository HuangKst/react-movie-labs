// Import the Firebase modules you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA-WEXwxMANptEDLDY984_dxgZzBlbQdE",
  authDomain: "react-83670.firebaseapp.com",
  projectId: "react-83670",
  storageBucket: "react-83670.firebasestorage.app",
  messagingSenderId: "941061261827",
  appId: "1:941061261827:web:fca36617ee95deb94c1c36",
  measurementId: "G-0LPWKSYT81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user; // Get signed-in user's information
    console.log("User Info:", user);
    return user;
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    throw error;
  }
};

// Function to handle Sign-Out
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error during Sign-Out:", error);
  }
};
