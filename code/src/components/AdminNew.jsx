import React, { useState, useEffect } from 'react';
import { fireReadTitles } from '../firebase'; // Import Firestore function
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function AdminNew({ dataname, onSubmit }) {
  const [titles, setTitles] = useState([]); // Store the titles
  const [formData, setFormData] = useState({}); // Store form data

  // Fetch titles from Firestore
  useEffect(() => {
    fireReadTitles(dataname)
      .then((titlesData) => {
        if (titlesData) {
          const titlesArray = Object.values(titlesData); // Convert titles object to array
          setTitles(titlesArray);

          // Initialize formData with empty values for each title
          const initialFormData = titlesArray.reduce((acc, title) => {
            acc[title] = ''; // Set each title as a key with an empty value
            return acc;
          }, {});
          setFormData(initialFormData);
        } else {
          console.error('No titles document found!');
        }
      })
      .catch((error) => {
        console.error('Error fetching titles:', error);
      });
  }, [dataname]);

  // Handle input changes
  const handleInputChange = (title, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [title]: value, // Update the value for the specific title
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the parent component
  };

  return (
    <div>
      <h2>הוסף רשומה חדשה</h2>
      <form onSubmit={handleSubmit}>
        {titles.map((title, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <TextField
              label={title}
              variant="outlined"
              fullWidth
              value={formData[title] || ''}
              onChange={(e) => handleInputChange(title, e.target.value)}
            />
          </div>
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
        >
          שמור
        </Button>
      </form>
    </div>
  );
}