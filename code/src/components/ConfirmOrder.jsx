import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem } from '@mui/material';

export default function ConfirmOrder() {
  const { cart, currentStudentId, clearCart } = useCart(); // Access clearCart from context
  const [classes, setClasses] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');

  // Fetch classes from local storage
  useEffect(() => {
    const storedClasses = JSON.parse(localStorage.getItem('classes_tableData')) || { rows: [] };
    setClasses(storedClasses.rows);
  }, []);

  // Fetch student details based on the global currentStudentId
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students_tableData')) || { rows: [] };
    if (currentStudentId) {
      const student = storedStudents.rows.find((s) => s[0] === currentStudentId); // Assuming student ID is in the first column
      if (student) {
        setStudentDetails({
          id: student[0],
          name: student[1],
          email: student[2],
          phone: student[3],
        });
      } else {
        setStudentDetails(null);
      }
    }
  }, [currentStudentId]);

  // Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle order submission
  const handleSubmitOrder = () => {
    if (!selectedClass || !currentStudentId) {
      alert('אנא בחר כיתה ותלמיד להשלמת ההזמנה.');
      return;
    }

    const orderDetails = {
      cart,
      totalAmount,
      shipmentInfo: {
        class: selectedClass,
        student: studentDetails,
      },
      date: new Date().toLocaleString(),
    };

    const storedOrderHistory = JSON.parse(localStorage.getItem('orderhistory_tableData')) || { rows: [] };
    const updatedOrderHistory = {
      ...storedOrderHistory,
      rows: [...storedOrderHistory.rows, orderDetails],
    };

    localStorage.setItem('orderhistory_tableData', JSON.stringify(updatedOrderHistory));
    alert('ההזמנה הושלמה בהצלחה!');

    // Empty the cart using clearCart
    clearCart();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>אישור הזמנה</h1>

      {/* Cart Details Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם המנה</TableCell>
              <TableCell>כמות</TableCell>
              <TableCell>מחיר ליחידה</TableCell>
              <TableCell>סה"כ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.dishName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₪{item.price}</TableCell>
                <TableCell>₪{(item.price * item.quantity)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} style={{ fontWeight: 'bold' }}>סה"כ לתשלום</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>₪{totalAmount.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Shipment Information */}
      <div style={{ marginTop: '20px' }}>
        <h2>פרטי משלוח</h2>
        <TextField
          select
          label="בחר כיתה"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{ marginBottom: '20px', width: '300px' }}
        >
          {classes.map((cls, index) => (
            <MenuItem key={index} value={cls[0]}>
              {cls[0]}
            </MenuItem>
          ))}
        </TextField>

        {/* Display Selected Student Details */}
        {studentDetails && (
          <div style={{ marginTop: '10px' }}>
            <p><strong>שם:</strong> {studentDetails.name}</p>
            <p><strong>אימייל:</strong> {studentDetails.email}</p>
            <p><strong>טלפון:</strong> {studentDetails.phone}</p>
          </div>
        )}
      </div>

      {/* Submit Order Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitOrder}
        style={{ marginTop: '20px' }}
      >
        סיים הזמנה
      </Button>
    </div>
  );
}
