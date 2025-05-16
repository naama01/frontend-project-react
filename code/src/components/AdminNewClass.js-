import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';

export default function AdminNewClass({ onAddRow, onCancel, data }) {
  const [formData, setFormData] = useState({
    classId: '',
    classLocation: '',
    classEnabled: false,
  });

  const [errors, setErrors] = useState({});

  // Populate formData with the passed data if it exists
  // for future if we will use the same form form editing
  // the data will be passed as props
  // and the form will be populated with the data
  useEffect(() => {
    if (data) {
      setFormData({
        classId: data[0] || '',
        classLocation: data[1] || '',
        classEnabled: data[2] || false,
      });
    }
  }, [data]);

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'classEnabled') {
        newErrors[key] = `${key} הוא שדה חובה.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Pass the new or updated class data to the parent component
    onAddRow(formData);

    // Reset the form
    setFormData({
      classId: '',
      classLocation: '',
      classEnabled: false,
    });
    setErrors({});
  }

  function handleCancel() {
    // Reset the form
    setFormData({
      classId: '',
      classLocation: '',
      classEnabled: false,
    });
    setErrors({});
    onCancel(); // Call the onCancel function to bring back the table
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
      <TextField
        label="מספר מנה"
        name="classId"
        value={formData.classId}
        onChange={handleInputChange}
        error={!!errors.classId}
        helperText={errors.classId}
        required
        inputProps={{ min: 0, max: 100 }}
      />
      <TextField
        label="שם המנה"
        name="classLocation"
        value={formData.classLocation}
        onChange={handleInputChange}
        error={!!errors.classLocation}
        helperText={errors.classLocation}
        required
      />
      <TextField
        label="תיאור המנה"
        name="classDescription"
        value={formData.classDescription}
        onChange={handleInputChange}
        error={!!errors.classDescription}
        helperText={errors.classDescription}
        multiline
        rows={3}
        required
      />
      <TextField
        label="נתיב לתמונה"
        name="classPicPath"
        value={formData.classPicPath}
        onChange={handleInputChange}
        error={!!errors.classPicPath}
        helperText={errors.classPicPath}
        required
      />
      <TextField
        label="מחיר"
        name="classPrice"
        type="number"
        value={formData.classPrice}
        onChange={handleInputChange}
        error={!!errors.classPrice}
        helperText={errors.classPrice}
        required
      />
      <TextField
        label="זמן הכנה"
        name="classTime"
        value={formData.classTime}
        onChange={handleInputChange}
        error={!!errors.classTime}
        helperText={errors.classTime}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            name="classEnabled"
            checked={formData.classEnabled}
            onChange={handleInputChange}
          />
        }
        label="classEnabled"
      />
      <Button type="submit" variant="contained" color="primary" style={{ padding: '10px' }}>
        {data ? 'כיתה מנה' : 'הוסף כיתה'}
      </Button>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={handleCancel}
        style={{ padding: '10px' }}
      >
        ביטול
      </Button>
    </form>
  );
}