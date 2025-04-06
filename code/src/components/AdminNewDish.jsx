import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';

export default function AdminNewDish({ onAddRow, onCancel, data }) {
  const [formData, setFormData] = useState({
    מספר_מנה: '',
    שם_המנה: '',
    תיאור_המנה: '',
    נתיב_לתמונה: '',
    מחיר: '',
    זמן_הכנה: '',
    מאופשר: false,
  });

  const [errors, setErrors] = useState({});

  // Populate formData with the passed data if it exists
  // for future if we will use the same form form editing
  // the data will be passed as props
  // and the form will be populated with the data
  useEffect(() => {
    if (data) {
      setFormData({
        מספר_מנה: data[0] || '',
        שם_המנה: data[1] || '',
        תיאור_המנה: data[2] || '',
        נתיב_לתמונה: data[3] || '',
        מחיר: data[4] || '',
        זמן_הכנה: data[5] || '',
        מאופשר: data[6] || false,
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
      if (!formData[key] && key !== 'מאופשר') {
        newErrors[key] = `${key} הוא שדה חובה.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Pass the new or updated dish data to the parent component
    onAddRow(formData);

    // Reset the form
    setFormData({
      מספר_מנה: '',
      שם_המנה: '',
      תיאור_המנה: '',
      נתיב_לתמונה: '',
      מחיר: '',
      זמן_הכנה: '',
      מאופשר: false,
    });
    setErrors({});
  }

  function handleCancel() {
    // Reset the form
    setFormData({
      מספר_מנה: '',
      שם_המנה: '',
      תיאור_המנה: '',
      נתיב_לתמונה: '',
      מחיר: '',
      זמן_הכנה: '',
      מאופשר: false,
    });
    setErrors({});
    onCancel(); // Call the onCancel function to bring back the table
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
      <TextField
        label="מספר מנה"
        name="מספר_מנה"
        value={formData.מספר_מנה}
        onChange={handleInputChange}
        error={!!errors.מספר_מנה}
        helperText={errors.מספר_מנה}
        required
      />
      <TextField
        label="שם המנה"
        name="שם_המנה"
        value={formData.שם_המנה}
        onChange={handleInputChange}
        error={!!errors.שם_המנה}
        helperText={errors.שם_המנה}
        required
      />
      <TextField
        label="תיאור המנה"
        name="תיאור_המנה"
        value={formData.תיאור_המנה}
        onChange={handleInputChange}
        error={!!errors.תיאור_המנה}
        helperText={errors.תיאור_המנה}
        multiline
        rows={3}
        required
      />
      <TextField
        label="נתיב לתמונה"
        name="נתיב_לתמונה"
        value={formData.נתיב_לתמונה}
        onChange={handleInputChange}
        error={!!errors.נתיב_לתמונה}
        helperText={errors.נתיב_לתמונה}
        required
      />
      <TextField
        label="מחיר"
        name="מחיר"
        type="number"
        value={formData.מחיר}
        onChange={handleInputChange}
        error={!!errors.מחיר}
        helperText={errors.מחיר}
        required
      />
      <TextField
        label="זמן הכנה"
        name="זמן_הכנה"
        value={formData.זמן_הכנה}
        onChange={handleInputChange}
        error={!!errors.זמן_הכנה}
        helperText={errors.זמן_הכנה}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            name="מאופשר"
            checked={formData.מאופשר}
            onChange={handleInputChange}
          />
        }
        label="מאופשר"
      />
      <Button type="submit" variant="contained" color="primary" style={{ padding: '10px' }}>
        {data ? 'עדכן מנה' : 'הוסף מנה'}
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