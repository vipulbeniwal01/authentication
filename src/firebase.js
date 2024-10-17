// Import Firebase SDK and initialize
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your Firebase configuration object (replace this with your actual configuration)
const firebaseConfig = {
    apiKey: "AIzaSyCm9YI6egHenw8BPNqbSjg86_PrPWN-vB8",
    authDomain: "myapp-5a872.firebaseapp.com",
    projectId: "myapp-5a872",
    storageBucket: "myapp-5a872.appspot.com",
    messagingSenderId: "310480201237",
    appId: "1:310480201237:web:6372543dcb874b4ef4501c",
    measurementId: "G-K3P2GM7N3R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set up authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };