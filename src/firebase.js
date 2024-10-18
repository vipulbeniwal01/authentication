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
const googleProvider = new firebase.auth.GoogleAuthProvider(); // Google Provider

// Function to add authenticated user to Firestore
const addUserToFirestore = async (user) => {
    const userRef = db.collection('users').doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
        // Store user details if not already present
        await userRef.set({
            displayName: user.displayName,
            email: user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
};

// Google Sign-In function
const signInWithGoogle = async () => {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;
        // Add user to Firestore after successful sign-in
        await addUserToFirestore(user);
    } catch (error) {
        console.error("Error signing in with Google: ", error);
    }
};

// Sign-Out function
const signOut = () => {
    auth.signOut().then(() => {
        console.log('User signed out');
    }).catch((error) => {
        console.error('Error signing out: ', error);
    });
};

export { auth, db, googleProvider, signInWithGoogle, signOut };