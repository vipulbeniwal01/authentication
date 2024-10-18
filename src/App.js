import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import { auth } from './firebase'; // Import Firebase auth

import './App.css';

// PrivateRoute Component to restrict access
const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user); // Set authentication status
    });
    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Private Route for Dashboard */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;