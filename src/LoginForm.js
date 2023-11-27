import React, { useState } from 'react';
import { Button, TextField, Typography, Link } from '@mui/material';

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login clicked:', { username, password });
  };

  const handleSignUp = () => {
    // Implement signup logic here
    console.log('Sign Up Now clicked');
  };

  return (
    <div>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
