import React, { useState } from 'react';
import { Button, Modal, Typography, Box } from '@mui/material';
import LoginForm from './LoginForm';
import TeacherSignup from './TeacherSignup';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loginOption, setLoginOption] = useState('');

  const handleModalOpen = (option) => {
    setLoginOption(option);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSignupNext = () => {
    // Add logic for handling the signup form's "Next" button
    console.log('Signup Next Clicked');
    // If needed, you can add logic to navigate to the next step or perform other actions
    // For now, just closing the modal
    handleModalClose();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to the Quiz App
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => handleModalOpen('student')}
        style={{ margin: '16px' }}
      >
         Student
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => handleModalOpen('teacher')}
        style={{ margin: '16px' }}
      >
        Teacher
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => handleModalOpen('signup')}
        style={{ margin: '16px' }}
      >
        Sign Up
      </Button>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {loginOption === 'signup' ? 'Sign Up' : 'Login'}
          </Typography>
          {loginOption === 'signup' ? (
            <TeacherSignup onNext={handleSignupNext} onCancel={handleModalClose} />
          ) : (
            <LoginForm onClose={handleModalClose} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default App;
