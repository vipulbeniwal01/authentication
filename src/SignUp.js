import React, { useState } from 'react';
import { auth, db } from './firebase';
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
      <p>Already have an account? <a href="/login">Log In</a></p>
    </div>
  );
}

export default SignUp;