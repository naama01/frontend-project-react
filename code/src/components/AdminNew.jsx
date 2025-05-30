import React, { useState, useEffect } from 'react';
import { fireReadDoc, fireReadTitles, fireWriteDoc } from '../firebase'; // Import Firestore function
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox component
import '../css/AdminNew.css'; // Import the new CSS file
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function AdminNew({ }) {
    const [titles, setTitles] = useState([]); // Store the titles
    const [formData, setFormData] = useState({}); // Store form data
   // const [updateMode, setUpdateMode] = useState(useParams().id != null); // Track form mode (true for update, false for new)
    const params = useParams(); // Get URL parameters
    const navigate = useNavigate();
    const dataname = params.dataname; // Get the dataname from URL parameters
    const updateMode = !!params.id; // Determine if in update mode based on presence of id


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

    useEffect(() => {
        if (dataname && params.id) {
            fireReadDoc(dataname, params.id).then((docData) => {
                if (docData) {
                    setFormData(docData); // Populate form fields with retrieved data
                } else {
                    console.error('No document found!');
                }
            }).catch((error) => {
                console.error('Error fetching document:', error);
            });
        }
    }, []);

    // Handle input changes
    const handleInputChange = (title, value) => {
        if (title === "טלפון") {
            let a = 0;

        }

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


    const saveItem = (docData) => {
        fireWriteDoc(dataname, docData, params.id)
            .then(() => {

                console.log('Document successfully written!');

                navigate(`/Admin${dataname}`); // Redirect to the Admin page after saving
            })
            .catch((error) => {
                console.error('Error writing document:', error);
                //  alert('שגיאה בשמירת הנתונים!');


            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate phone number pattern
        if (formData["טלפון"] && !/^0[0-9]{8,9}$/.test(formData["טלפון"])) {
            alert("מספר הטלפון חייב להיות באורך 9-10 ספרות ולהתחיל ב-0.");
            return;
        }

        saveItem(formData);
    };

    return (

        <div className="admin-new-container">
            <h2 className="admin-new-title">{updateMode ? 'עדכון רשומה' : 'הוסף רשומה חדשה'}</h2>
            <form className="admin-new-form" onSubmit={handleSubmit}>
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
                                required
                                value={formData[title] || ''}
                                onChange={(e) => handleInputChange(title, e.target.value)}
                                className="admin-new-text-field"
                                {...((title.includes("מספר") && updateMode) ? { InputProps: { readOnly: true } } : {})} // Make email field read-only
                                {...(title == "טלפון" ? { type: "tel", pattern: "^0[0-9]{0,9}$" } : {})} // Enforce 9-10 digits starting with 0
                                {...(title.includes("תאריך") ? { type: "datetime" } : {})} // Change input type to number for price
                                {...(title == "מייל" ? { type: "email" } : {})} // Change input type to date for date
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
                        onClick={() => navigate(`/Admin${dataname}`)}
                        className="admin-new-cancel-button"
                    >
                        בטל
                    </Button>
                </div>
            </form>
        </div>
    );
}