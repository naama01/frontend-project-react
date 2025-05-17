import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem } from '@mui/material';
import { fireReadEnabledOnly, FireWriteDoc } from '../firebase'; // Ensure FireWriteDoc is imported

export default function ConfirmOrder() {
  const { cart, currentStudentId, clearCart } = useCart(); // Access clearCart from context
  const [classes, setClasses] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');

  // Fetch students from Firestore
  useEffect(() => {
    fireReadEnabledOnly("students")
      .then((data) => {
        setStudents(data); // Set the students retrieved from Firestore
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });

    fireReadEnabledOnly("classes")
      .then((data) => {
        setClasses(data); // Set the students retrieved from Firestore
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  // Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle order submission
  const handleSubmitOrder = () => {
    if (!selectedClass || !currentStudentId) {
      alert('אנא בחר כיתה ותלמיד להשלמת ההזמנה.');
      return;
    }

    // Generate a unique ID based on the current time in epoch
    const orderId = `${Date.now()}`;

    // Calculate total quantity of items in the cart
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Calculate max preparation time
    const maxPrepTime = cart.reduce((max, item) => Math.max(max, Number(item.prepTime)), 0);

    // Prepare the order details
    const orderDetails = {
      id: orderId, // Unique order ID
      "תז סטודנט מזמין": currentStudentId, // Student ID
      "משלוח": true, // Assuming delivery is always true; adjust as needed
      "זמן הכנה מינימלי": `${maxPrepTime} דקות`, // Max prep time
      "מספר כיתה": selectedClass, // Selected class ID
      "מחיר כולל": totalAmount, // Total price
      "כמות מנות": totalQuantity, // Total quantity of items
      "מספר הזמנה": orderId, // Order number (same as ID)
      "תאריך": new Date().toLocaleString(), // Human-readable date
    };

    // Write the order to the Firestore "orders" collection
    FireWriteDoc("orders", orderDetails)
      .then(() => {
        alert('ההזמנה הושלמה בהצלחה!');
        clearCart(); // Clear the cart after successful order submission
      })
      .catch((error) => {
        console.error("Error writing order to Firestore:", error);
        alert('אירעה שגיאה בעת השלמת ההזמנה. נסה שוב.');
      });
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
            <MenuItem key={index} value={cls.id}>
              ({cls.id}) {cls["שם כיתה"]} {/* Display both class name and ID */}
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
