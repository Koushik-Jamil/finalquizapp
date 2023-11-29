// TeacherSignup.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import OrganizationForm from './OrganizationForm';

const TeacherSignup = ({ onCancel, onNext }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    confirmEmail: '',
    organizationType: '',
    organizationName: '',
  });

  const [isNextEnabled, setNextEnabled] = useState(false);
  const [validationWarning, setValidationWarning] = useState('');
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);

  // Use the imported auth object
  const auth = getAuth();

  const handleChange = (field) => (event) => {
    const updatedFormData = { ...formData, [field]: event.target.value };
    setFormData(updatedFormData);
    validateForm(updatedFormData);
  };

  const validateForm = (data) => {
    // Validate the form fields

    // Additional validation logic for the organization form
    const isOrganizationTypeFilled = data.organizationType !== '';
    const isOrganizationNameFilled = data.organizationName !== '';

    setValidationWarning('');

    if (showOrganizationForm) {
      if (!isOrganizationTypeFilled) {
        setValidationWarning('Please select an organization type.');
      } else if (!isOrganizationNameFilled) {
        setValidationWarning('Please enter an organization name.');
      }
      setNextEnabled(isOrganizationTypeFilled && isOrganizationNameFilled);
    } else {
      // Validation for the initial teacher signup form
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

      if (!isPasswordMatch) {
        setValidationWarning('Passwords do not match.');
      } else if (!isEmailMatch) {
        setValidationWarning('Emails do not match.');
      } else if (!isEmailValid) {
        setValidationWarning('Email is not valid (Gmail, Yahoo, Outlook only).');
      }

      setNextEnabled(isEmailValid && isPasswordMatch && isEmailMatch && isFormFilled);
    }
  };

  const isValidEmail = (email) => {
    // Check for Gmail, Yahoo, and outlook domains
    return (
      email.endsWith('@gmail.com') ||
      email.endsWith('@yahoo.com') ||
      email.endsWith('@outlook.com')
    );
  };

  const handleNext = async () => {
    if (!showOrganizationForm) {
      setShowOrganizationForm(true);
      validateForm(formData); // Validate the organization form initially
    } else if (isNextEnabled) {
      try {
        // Create the user account using Firebase authentication
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        // Optionally, you can store other details in your database here
        const db = collection(auth, 'teachers');
        await addDoc(db, {
          // ... your teacher data
        });

        // Send email verification
        const user = auth.currentUser;
        await sendEmailVerification(user);

        // Handle final step, e.g., submit data, call an API, etc.
        // Optionally, you can call onNext here if needed
        onNext();
      } catch (error) {
        // Handle account creation errors
        console.error('Error creating user account:', error.message);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {showOrganizationForm ? 'Organization Form' : 'Create New Teacher Account'}
      </Typography>
      <form>
        {showOrganizationForm ? (
          <OrganizationForm
            onNext={onNext}
            onPrevious={() => setShowOrganizationForm(false)}
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          <>
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
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancel}
              sx={{ marginLeft: 2 }}
            >
              Cancel
            </Button>
          </>
        )}
      </form>
    </Box>
  );
};

export default TeacherSignup;
