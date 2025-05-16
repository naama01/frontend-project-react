import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { firestore, FireWriteDoc } from '../firebase.js'; // Adjust the import path as necessary

export default function AdminNewDish({ onAddRow, onCancel, data }) {
  const [formData, setFormData] = useState({
    dishId: '',
    dishName: '',
    dishDescription: '',
    dishPrice: '',
    dishTime: '',
    dishEnabled: false,
  });

  const [errors, setErrors] = useState({});

  // Populate formData with the passed data if it exists
  // for future if we will use the same form form editing
  // the data will be passed as props
  // and the form will be populated with the data
  useEffect(() => {
    if (data) {
      setFormData({
        dishId: data.dishId || '',
        dishName: data[1] || '',
        dishDescription: data[2] || '',
        dishPrice: data[3] || '',
        dishTime: data[4] || '',
        dishEnabled: data[5] || false,
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

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'dishEnabled') {
        newErrors[key] = `${key} הוא שדה חובה.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Save the dish to Firestore using FireWriteDoc
      const docId = await FireWriteDoc('dishes', {
        dishId: formData.dishId,
        dishName: formData.dishName,
        dishDescription: formData.dishDescription,
        dishPrice: formData.dishPrice,
        dishTime: formData.dishTime,
        dishEnabled: formData.dishEnabled,
      });

      console.log('Dish added with ID:', docId);

      // Pass the new or updated dish data to the parent component
      onAddRow(formData);

      // Reset the form
      setFormData({
        dishId: '',
        dishName: '',
        dishDescription: '',
        dishPrice: '',
        dishTime: '',
        dishEnabled: false,
      });
      setErrors({});
      alert('העדכון הצליח!');
    } catch (error) {
      console.error('Error adding dish to Firestore:', error);
      alert('שגיאה בשמירת הנתונים.');
    }
  }

  function handleCancel() {
    // Reset the form
    setFormData({
      dishId: '',
      dishName: '',
      dishDescription: '',
      dishPrice: '',
      dishTime: '',
      dishEnabled: false,
    });
    setErrors({});
    onCancel(); // Call the onCancel function to bring back the table
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
      <TextField
        label="מספר מנה"
        name="dishId"
        value={formData.dishId}
        onChange={handleInputChange}
        error={!!errors.dishId}
        helperText={errors.dishId}
        required
        inputProps={{ min: 0, max: 100 }} //need to understand what is the correct key
      />
      <TextField
        label="שם המנה"
        name="dishName"
        value={formData.dishName}
        onChange={handleInputChange}
        error={!!errors.dishName}
        helperText={errors.dishName}
        required
      />
      <TextField
        label="תיאור המנה"
        name="dishDescription"
        value={formData.dishDescription}
        onChange={handleInputChange}
        error={!!errors.dishDescription}
        helperText={errors.dishDescription}
        multiline
        rows={3}
        required
      />

      <TextField
        label="מחיר"
        name="dishPrice"
        type="number"
        value={formData.dishPrice}
        onChange={handleInputChange}
        error={!!errors.dishPrice}
        helperText={errors.dishPrice}
        required
      />
      <TextField
        label="זמן הכנה"
        name="dishTime"
        value={formData.dishTime}
        onChange={handleInputChange}
        error={!!errors.dishTime}
        helperText={errors.dishTime}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            name="dishEnabled"
            checked={formData.dishEnabled}
            onChange={handleInputChange}
          />
        }
        label="dishEnabled"
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