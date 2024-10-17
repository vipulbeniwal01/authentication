import React, { useState } from 'react';
import { auth } from './firebase';
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
      // Redirect to the home page or dashboard
      navigate('/');
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
      <p>Don't have an account? <a href="/">Sign Up</a></p>
    </div>
  );
}

export default Login;