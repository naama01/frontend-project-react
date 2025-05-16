import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function AdminNewStudent({ onAddRow, onCancel, data }) {
  const [formData, setFormData] = useState({
    studentId: data?.studentId || '',
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = 'מספר סטודנט הוא שדה חובה';
    if (!formData.name) newErrors.name = 'שם הוא שדה חובה';
    if (!formData.email) newErrors.email = 'מייל הוא שדה חובה';
    if (!formData.phone) newErrors.phone = 'טלפון הוא שדה חובה';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Call the onAddRow function to add the new student
    onAddRow(formData);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        gap: '10px',
      }}
    >
      <TextField
        label="מספר סטודנט"
        name="studentId"
        value={formData.studentId}
        onChange={handleInputChange}
        error={!!errors.studentId}
        helperText={errors.studentId}
        required
      />
      <TextField
        label="שם"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
        required
      />
      <TextField
        label="מייל"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={!!errors.email}
        helperText={errors.email}
        required
      />
      <TextField
        label="טלפון"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
        error={!!errors.phone}
        helperText={errors.phone}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ padding: '10px' }}
      >
        {data ? 'עדכן סטודנט' : 'הוסף סטודנט'}
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
