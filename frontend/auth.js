// Import the Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Your Firebase config (from Project Settings > Web App)
const firebaseConfig = {
  apiKey: "AIzaSyAI0I8SZk6Oo6mATILiJJ7Y6mzsnM-YCmo",
  authDomain: "sentiment-analysis-551f6.firebaseapp.com",
  projectId: "sentiment-analysis-551f6",
  storageBucket: "sentiment-analysis-551f6.appspot.com", // corrected `.app` to `.com`
  messagingSenderId: "932939520260",
  appId: "1:932939520260:web:5e67bf2250a2992ceb5851",
  measurementId: "G-G4GDDMK8EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Expose signInWithGoogle function globally
window.signInWithGoogle = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Signed in as:", user.displayName);
      window.location.href = "comment.html";
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
      alert("Sign-in failed: " + error.message);
    });
}
