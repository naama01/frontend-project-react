import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { TextField, MenuItem } from '@mui/material';

export default function TopMenu({ title }) {
  const navigate = useNavigate();
  const { cart, currentStudentId, setCurrentStudentId } = useCart(); // Access student ID from context
  const [students, setStudents] = useState([]);

  // Fetch students from local storage
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students_tableData')) || { rows: [] };
    setStudents(storedStudents.rows);
  }, []);

  // Calculate the total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
 
  return (
    <div className="TopHeader">
      <h1 className="title" onClick={() => navigate("/")}>{title}</h1>

      <ul className="menu">
        <li className="menuItem" onClick={() => navigate("/")}>מסך ראשי</li>
        <li className="menuItem">
          שירות ותמיכה
          <ul className="subMenu">
          <li onClick={() => navigate("/SupportChat")}>לצ׳ט עם מייקל</li>
            <li onClick={() => navigate("/help")}>עזרה</li>
          </ul>
        </li>
        <li className="menuItem">
          אזור אישי
          <ul className="subMenu">
            <li onClick={() => navigate("/UserOrderStatus")}>סטטוס הזמנה פתוחה</li>
            <li onClick={() => navigate("/UserOrderHistory")}>הסטורית הזמנות</li>
            <li onClick={() => navigate("/UpdateStudentSelf")}>עדכון פרטים</li>
          </ul>
        </li>
        <li className="menuItem">
          אזור ניהול
          <ul className="subMenu">
            <li onClick={() => navigate("/AdminClasses")}>ניהול כיתות</li>
            <li onClick={() => navigate("/AdminOrders")}>ניהול הזמנות</li>
            <li onClick={() => navigate("/AdminDishes")}>ניהול תפריט</li>
            <li onClick={() => navigate("/AdminStudents")}>ניהול סטודנטים</li>
          </ul>
        </li>
      </ul>

      {/* Student Selection */}
      <div style={{ marginBottom: '20px' }}>
        <TextField
          select
          label="בחר תלמיד"
          value={currentStudentId || ''}
          onChange={(e) => setCurrentStudentId(e.target.value)} // Update the context when student changes
          style={{ width: '300px' }}
        >
          {students.map((student, index) => (
            <MenuItem key={index} value={student[0]}> {/* Assuming student ID is in the first column */}
              {student[1]} ({student[0]}) {/* Assuming student name is in the second column */}
            </MenuItem>
          ))}
        </TextField>
      </div>

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
    </div>
  );
}
