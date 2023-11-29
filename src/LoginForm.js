import React, { useState } from 'react';
import { Button, TextField, Typography, Link } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Assuming you export your auth instance from firebase.js

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      
      // Handle successful login (e.g., close modal, redirect, etc.)
      console.log('Login successful');
      onClose();
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const handleSignUp = () => {
    // Implement signup logic here
    console.log('Sign Up Now clicked');
  };

  return (
    <div>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Or
      </Typography>
      <Button variant="outlined" color="primary" onClick={handleSignUp}>
        Sign Up Now
      </Button>
      <Link href="#" color="textSecondary" sx={{ marginTop: 1, display: 'block' }}>
        Did you forget your password?
      </Link>
      <Button variant="outlined" color="secondary" onClick={onClose} sx={{ marginTop: 1 }}>
        Cancel
      </Button>
    </div>
  );
};

export default LoginForm;
