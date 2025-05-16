import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // Assuming the context is in CartContext.jsx
import { TextField, Button } from '@mui/material';
import '../css/UpdateStudentSelf.css'; // Assuming you have a CSS file for styling

export default function UpdateStudentSelf() {
    const { currentStudentId } = useCart(); // Access the current student ID from context
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});

    // Fetch all students from local storage and populate the form with the current student's data
    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students_tableData')) || { rows: [] };
        setStudents(storedStudents.rows);

        if (currentStudentId) {
            const currentStudent = storedStudents.rows.find((student) => student[0] === currentStudentId);
            if (currentStudent) {
                setFormData({
                    name: currentStudent[1],
                    email: currentStudent[2],
                    phone: currentStudent[3],
                });
            }
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

        // Update the student in the local storage
        const updatedStudents = students.map((student) =>
            student[0] === currentStudentId
                ? [student[0], formData.name, formData.email, formData.phone] // Update all fields except student ID
                : student
        );

        // Save the updated students back to local storage
        localStorage.setItem(
            'students_tableData',
            JSON.stringify({ rows: updatedStudents })
        );

        alert('הפרטים עודכנו בהצלחה!');
    };

    return (
        <div dir="rtl" className="update-student-container">
            <form onSubmit={handleSubmit} className="update-student-form">
                <h2 className="update-student-title">עדכון מידע אישי</h2>
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
            </form>
        </div>
    );
}
