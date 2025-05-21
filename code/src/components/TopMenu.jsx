import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { TextField, MenuItem, Typography } from '@mui/material';
import { fireReadCollection, fireReadEnabledOnly } from '../firebase'; // Import Firestore function

export default function TopMenu({ title }) {
  const navigate = useNavigate();
  const { cart, currentStudentId, setCurrentStudentId } = useCart(); // Access student ID from context
  const [students, setStudents] = useState([]);

  // Fetch students from Firestore
  useEffect(() => {
    fireReadEnabledOnly("students")
      .then((data) => {
        setStudents(data); // Set the students retrieved from Firestore
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  // Calculate the total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="TopHeader">
      <Typography
        variant="h3" // Adjust the variant to match the heading size
        component="h1"
        onClick={() => navigate("/")}
        style={{ cursor: 'pointer', marginRight: '20px' }} // Add styles for pointer and color
      >
        {title}
      </Typography>

      <ul className="menu">
        <li className="menuItem" onClick={() => navigate("/")}>מסך ראשי</li>
        <li className="menuItem">
          שירות ותמיכה
          <ul className="subMenu">
            <li onClick={() => navigate("/SupportChat")}>לצ׳ט עם מייקל</li>
            <li onClick={() => navigate("/help")}>עזרה</li>
          </ul>
        </li>
        {currentStudentId && <li className="menuItem">
          אזור אישי
          <ul className="subMenu">
            <li onClick={() => navigate("/UserOrderStatus")}>סטטוס הזמנה פתוחה</li>
            <li onClick={() => navigate("/UserOrderHistory")}>הסטורית הזמנות</li>
            <li onClick={() => navigate("/UpdateStudentSelf")}>עדכון פרטים</li>
          </ul>
        </li>}
        {currentStudentId ? null : <li className="menuItem">
          אזור ניהול
          <ul className="subMenu">
            <li onClick={() => navigate("/AdminClasses")}>ניהול כיתות</li>
            <li onClick={() => navigate("/AdminOrders")}>ניהול הזמנות</li>
            <li onClick={() => navigate("/AdminDishes")}>ניהול תפריט</li>
            <li onClick={() => navigate("/AdminStudents")}>ניהול סטודנטים</li>
          </ul>
        </li>}

        <li className="menuItem">
          יציאה
          <ul className="subMenu">
            <li onClick={() => window.location.reload()}>צא ורוקן את הסל</li>
          </ul>
        </li>
      </ul>

      {/* Student Selection */}
      <TextField
        select
        label="סטודנט נוכחי"
        value={currentStudentId || ''}
        onChange={(e) => setCurrentStudentId(e.target.value)  } // Update the context when student changes
        style={{ minWidth: '200px' }}
      >
        {students.map((student, index) => (
          <MenuItem key={index} value={student.id}> {/* Use the correct key for the student's ID */}
            {student["שם סטודנט"] || student.name} {/* Use the correct key for the student's name */}
          </MenuItem>
        ))}
      </TextField>
      {currentStudentId &&
        <div className="cart">
          <span>סה"כ בעגלה: ₪{totalAmount.toFixed(2)}</span>
          <button
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
            onClick={() => navigate('/ConfirmOrder')}
          >
            סיים הזמנה
          </button>
        </div>
      }
    </div>
  );
}