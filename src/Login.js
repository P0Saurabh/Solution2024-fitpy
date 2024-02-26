import React, { useState } from 'react';
import { auth } from './firebase-config';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from './AuthContext'; // Import useAuth
import './Register.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login method

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      login(); // Call login from AuthContext
      navigate('/chat');
    } catch (error) {
      console.error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      login(); // Call login here as well
      navigate('/chat');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={signIn}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
        <button type="button" onClick={signInWithGoogle}>Login with Google</button>
      </form>
    </div>
  );
}

export default Login;
