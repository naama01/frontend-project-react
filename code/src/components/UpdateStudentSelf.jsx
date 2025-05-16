import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // Assuming the context is in CartContext.jsx
import { TextField, Button } from '@mui/material';
import { fireReadCollection, fireUpdateDocument } from '../firebase'; // Firestore helper functions
import '../css/UpdateStudentSelf.css'; // Assuming you have a CSS file for styling

export default function UpdateStudentSelf() {
    const { currentStudentId } = useCart(); // Access the current student ID from context
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch the current student's data from Firestore
    useEffect(() => {
        if (currentStudentId) {
            setLoading(true);
            fireReadCollection('students')
                .then((students) => {
                    const currentStudent = students.find((student) => student.id === currentStudentId);
                    if (currentStudent) {
                        setFormData({
                            name: currentStudent['שם סטודנט'] || '',
                            email: currentStudent['מייל'] || '',
                            phone: currentStudent['טלפון'] || '',
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching student data:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [currentStudentId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'שם הוא שדה חובה';
        if (!formData.email) newErrors.email = 'מייל הוא שדה חובה';
        if (!formData.phone) newErrors.phone = 'טלפון הוא שדה חובה';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Update the student's data in Firestore
        fireUpdateDocument('students', currentStudentId, {
            'שם סטודנט': formData.name,
            'מייל': formData.email,
            'טלפון': formData.phone,
        })
            .then(() => {
                alert('הפרטים עודכנו בהצלחה!');
            })
            .catch((error) => {
                console.error('Error updating student data:', error);
                alert('שגיאה בעדכון הפרטים. נסה שוב.');
            });
    };

    return (
        <div dir="rtl" className="update-student-container">
            <form onSubmit={handleSubmit} className="update-student-form">
                <h2 className="update-student-title">עדכון מידע אישי</h2>
                {loading ? (
                    <p>טוען נתונים...</p>
                ) : (
                    <>
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
                        <Button type="submit" variant="contained" className="update-student-button">
                            עדכן
                        </Button>
                    </>
                )}
            </form>
        </div>
    );
}