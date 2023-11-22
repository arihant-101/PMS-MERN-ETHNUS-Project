// Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth from your AuthContext

function Login({ onSuccessfulLogin }) {
  const { handleLogin } = useAuth(); // Get handleLogin from the AuthContext
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate from react-router-dom

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.text(); // Correctly handle the token as text
        localStorage.setItem('authToken', token);
        onSuccessfulLogin();
        handleLogin(); // Call handleLogin from AuthContext to update login state
      } else {
        const errorData = await response.json(); // Handle error data as JSON
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const navigateToSignup = () => {
    navigate('/signup'); // Function to navigate to the signup page
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button type="submit" className="submit-button">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <p className="signup-link">
        Don't have an account? <span onClick={navigateToSignup}>Sign Up</span>
      </p>
    </div>
  );
}

export default Login;