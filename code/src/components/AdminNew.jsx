import React, { useState, useEffect } from 'react';
import { fireReadTitles } from '../firebase'; // Import Firestore function
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox component
import '../css/AdminNew.css'; // Import the new CSS file
import { useNavigate } from 'react-router-dom';


export default function AdminNew({ dataname, onSubmit, onCancel }) {
    const [titles, setTitles] = useState([]); // Store the titles
    const [formData, setFormData] = useState({}); // Store form data
    const navigate = useNavigate();
    
    // Fetch titles from Firestore
    useEffect(() => {
        fireReadTitles(dataname)
            .then((titlesData) => {
                if (titlesData) {
                    const titlesArray = Object.values(titlesData); // Convert titles object to array
                    setTitles(titlesArray);

                    // Initialize formData with empty values for each title
                    const initialFormData = titlesArray.reduce((acc, title) => {
                        acc[title] = title === "פעיל" || title === "משלוח" ? false : ''; // Default boolean fields to false
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

    // Handle checkbox changes
    const handleCheckboxChange = (title, checked) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [title]: checked, // Update the boolean value for the specific title
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pass the form data to the parent component
    };

    return (
        <div className="admin-new-container">
            <h2 className="admin-new-title">הוסף רשומה חדשה</h2>
            <form onSubmit={handleSubmit} className="admin-new-form">
                {titles.map((title, index) => (
                    <div key={index} className="admin-new-field">
                        {(title === "פעיל" || title === "משלוח") ? (
                            <div className="admin-new-checkbox-container">
                                <label className="admin-new-checkbox-label">{title}</label>
                                <Checkbox
                                    checked={!!formData[title]} // Ensure the value is always a boolean
                                    onChange={(e) => handleCheckboxChange(title, e.target.checked)}
                                />
                            </div>
                        ) : (
                            <TextField
                                label={title}
                                variant="outlined"
                                fullWidth
                                value={formData[title] || ''}
                                onChange={(e) => handleInputChange(title, e.target.value)}
                                className="admin-new-text-field"
                            />
                        )}
                    </div>
                ))}
                <div className="admin-new-buttons">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="admin-new-submit-button"
                    >
                        שמור
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate('/')} // Navigate to the root path
                        className="admin-new-cancel-button"
                    >
                        בטל
                    </Button>
                </div>
            </form>
        </div>
    );
}