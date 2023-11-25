// TeacherSignup.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const TeacherSignup = ({ onNext, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    confirmEmail: '',
  });

  const [isNextEnabled, setNextEnabled] = useState(false);
  const [validationWarning, setValidationWarning] = useState('');

  const handleChange = (field) => (event) => {
    const updatedFormData = { ...formData, [field]: event.target.value };
    setFormData(updatedFormData);
    validateForm(updatedFormData);
  };

  const validateForm = (data) => {
    const isEmailValid = isValidEmail(data.email);
    const isPasswordMatch = data.password === data.confirmPassword;
    const isEmailMatch = data.email === data.confirmEmail;
    const isFormFilled =
      data.firstName !== '' &&
      data.lastName !== '' &&
      data.password !== '' &&
      data.confirmPassword !== '' &&
      data.email !== '' &&
      data.confirmEmail !== '';

    setValidationWarning('');

    if (!isPasswordMatch) {
      setValidationWarning('Passwords do not match.');
    } else if (!isEmailMatch) {
      setValidationWarning('Emails do not match.');
    } else if (!isEmailValid) {
      setValidationWarning('Email is not valid (Gmail, Yahoo, Outlook only).');
    }

    setNextEnabled(isEmailValid && isPasswordMatch && isEmailMatch && isFormFilled);
  };

  const isValidEmail = (email) => {
    // Check for Gmail, Yahoo, and outmail domains
    return (
      email.endsWith('@gmail.com') ||
      email.endsWith('@yahoo.com') ||
      email.endsWith('@outlook.com')
    );
  };

  const handleNext = () => {
    if (isNextEnabled) {
      // Add additional logic before proceeding to the next page
      onNext();
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Create New Teacher Account
      </Typography>
      <form>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleChange('firstName')}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleChange('lastName')}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange('password')}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange('email')}
        />
        <TextField
          label="Confirm Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.confirmEmail}
          onChange={handleChange('confirmEmail')}
        />
        {validationWarning && (
          <Typography variant="body2" color="error">
            {validationWarning}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!isNextEnabled}
        >
          Next
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ marginLeft: 2 }}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default TeacherSignup;
