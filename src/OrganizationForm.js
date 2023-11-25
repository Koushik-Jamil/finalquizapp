// OrganizationForm.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const OrganizationForm = ({ onNext, onPrevious, formData, setFormData }) => {
  const [organizationData, setOrganizationData] = useState({
    organizationType: formData.organizationType,
    organizationName: formData.organizationName,
  });

  const handleChange = (field) => (event) => {
    const updatedOrganizationData = { ...organizationData, [field]: event.target.value };
    setOrganizationData(updatedOrganizationData);
    setFormData(updatedOrganizationData); // Update the parent form data
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Organization Information
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
      <Button variant="outlined" color="secondary" onClick={onPrevious} sx={{ marginRight: 2 }}>
        Previous
      </Button>
      <Button variant="contained" color="primary" onClick={handleNext}>
        Next
      </Button>
    </Box>
  );
};

export default OrganizationForm;
