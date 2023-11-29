import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const OrganizationForm = ({ onNext, onPrevious, formData, setFormData }) => {
  const [organizationData, setOrganizationData] = useState({
    organizationType: formData.organizationType,
    organizationName: formData.organizationName,
    role: formData.role,
    phoneNumber: formData.phoneNumber,
  });

  const [isFormFilled, setFormFilled] = useState(false);

  // Subscribe to authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If a user is logged in, enable the form
        setFormFilled(true);
      } else {
        // If no user is logged in, disable the form
        setFormFilled(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleChange = (field) => (event) => {
    const updatedOrganizationData = { ...organizationData, [field]: event.target.value };
    setOrganizationData(updatedOrganizationData);
    setFormData(updatedOrganizationData);
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Step 2
      </Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="organization-type-label">Organization Type</InputLabel>
        <Select
          labelId="organization-type-label"
          label="Organization Type"
          value={organizationData.organizationType}
          onChange={handleChange('organizationType')}
        >
          <MenuItem value="primary-secondary">Primary-Secondary</MenuItem>
          <MenuItem value="university">University</MenuItem>
          <MenuItem value="corporate">Corporate</MenuItem>
          <MenuItem value="personal">Personal</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Organization Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={organizationData.organizationName}
        onChange={handleChange('organizationName')}
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          label="Role"
          value={organizationData.role}
          onChange={handleChange('role')}
        >
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="it-technology">IT/Tecnology</MenuItem>
          <MenuItem value="administrative">Administrative</MenuItem>
          <MenuItem value="others">Others</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={organizationData.phoneNumber}
        onChange={(event) => {
          const numericValue = event.target.value.replace(/[^0-9]/g, ''); // Allow only numeric input
          handleChange('phoneNumber')({ target: { value: numericValue } });
        }}
      />
      <Button variant="outlined" color="secondary" onClick={onPrevious} sx={{ marginRight: 2 }}>
        Previous
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={!isFormFilled}
      >
        Join
      </Button>
    </Box>
  );
};

export default OrganizationForm;
