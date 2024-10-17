import React, { useState } from 'react';
import { auth, db, googleProvider } from './firebase';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Check if user exists in Firestore
    const userRef = db.collection('users');
    const snapshot = await userRef.where('email', '==', email).get();
    if (!snapshot.empty) {
      alert('User already exists!');
    } else {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        await db.collection('users').doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          username: username,
          createdAt: new Date(),
        });
        console.log('User registered');
        navigate('/login'); // Redirect to login page after sign-up
      } catch (error) {
        console.error('Error during sign-up: ', error.message);
      }
    }
  };

  // Google Sign-up function
  const handleGoogleSignUp = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;
      const userRef = db.collection('users');
      const snapshot = await userRef.where('email', '==', user.email).get();

      // If the user doesn't exist in Firestore, create a new document for them
      if (snapshot.empty) {
        await db.collection('users').doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          username: user.displayName || 'Google User', // Default to 'Google User' if no displayName
          createdAt: new Date(),
        });
      }
      console.log('User signed up with Google');
      navigate('/'); // Redirect to home page after sign-up
    } catch (error) {
      console.error('Error during Google sign-up: ', error.message);
      alert('Error during Google sign-up: ' + error.message);
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Or</p>
      <button onClick={handleGoogleSignUp} className="google-signup-button">
        <img
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          alt="Google logo"
          className="google-logo"
        />
        Sign Up with Google
      </button>
      <p>Already have an account? <a href="/login">Log In</a></p>
    </div>
  );
}

export default SignUp;