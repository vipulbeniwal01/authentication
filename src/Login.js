import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert('User logged in successfully');
      navigate('/'); // Redirect to home page or dashboard
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('User not found, please sign up');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password, please try again');
      } else {
        console.error('Error during login: ', error.message);
        alert('Error during login: ' + error.message);
      }
    }
  };

  // Google Sign-In function
  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      alert('User logged in with Google');
      navigate('/'); // Redirect to home page or dashboard
    } catch (error) {
      console.error('Error during Google Sign-In: ', error.message);
      alert('Error during Google Sign-In: ' + error.message);
    }
  };

  return (
    <div className="login-form">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Log In</button>
      </form>
      <p>Or</p>
      <button onClick={handleGoogleSignIn} className="google-signup-button">
      <img
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          alt="Google logo"
          className="google-logo"
        />
        Log In with Google</button>
      <p>Don't have an account? <a href="/">Sign Up</a></p>
    </div>
  );
}

export default Login;