import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { TextField, MenuItem, Typography, Button, Box } from '@mui/material';
import { fireReadCollection, fireReadEnabledOnly } from '../firebase'; // Import Firestore function
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';


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
        onClick={() => navigate("/")}
        style={{ cursor: 'pointer', marginRight: '20px' }} // Add styles for pointer and color
      >      <StorefrontIcon />  

        {`  `+title}
      </Typography>

      <ul className="menu">
        <li className="menuItem" onClick={() => navigate("/")}><HomeIcon /> מסך ראשי</li>
        <li className="menuItem"><RoomServiceIcon />
          שירות ותמיכה
          <ul className="subMenu">
            <li onClick={() => navigate("/SupportChat")}><SupportAgentIcon /> לצ׳ט עם מייקל</li>
            <li onClick={() => navigate("/help")}><HelpCenterIcon /> עזרה</li>
          </ul>
        </li>
        {currentStudentId && <li className="menuItem"><AccountBoxIcon /> אזור אישי
          <ul className="subMenu">
            <li onClick={() => navigate("/UserOrderStatus")}><TipsAndUpdatesIcon /> סטטוס הזמנה פתוחה</li>
            <li onClick={() => navigate("/UserOrderHistory")}><ManageSearchIcon /> הסטורית הזמנות</li>
            <li onClick={() => navigate("/UpdateStudentSelf")}><BorderColorIcon />  עדכון פרטים</li>
          </ul>
        </li>}
        {currentStudentId ? null : <li className="menuItem"><SupervisorAccountIcon /> אזור ניהול
          <ul className="subMenu">
            <li onClick={() => navigate("/AdminClasses")}><BusinessIcon /> ניהול כיתות</li>
            <li onClick={() => navigate("/AdminOrders")}><HandshakeIcon />ניהול הזמנות</li>
            <li onClick={() => navigate("/AdminDishes")}><MenuBookIcon /> ניהול תפריט</li>
            <li onClick={() => navigate("/AdminStudents")}><PeopleIcon /> ניהול סטודנטים</li>
          </ul>
        </li>}

        <li className="menuItem"><LogoutIcon /> התנתקות

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
        onChange={(e) => setCurrentStudentId(e.target.value)} // Update the context when student changes
        style={{ minWidth: '200px' }}
      >
        {students.map((student, index) => (
          <MenuItem key={index} value={student.id}> {/* Use the correct key for the student's ID */}
            {student["שם סטודנט"] || student.name} {/* Use the correct key for the student's name */}
          </MenuItem>
        ))}
      </TextField>
      {currentStudentId &&
        <Box className="cart" display="flex" alignItems="center">
          <ShoppingCartIcon className="cart-icon" />
          <Typography variant="body1" style={{ margin: '10px' }}>
            {cart.length} פריטים בעגלה
          </Typography>
          <Typography variant="body1">סה"כ בעגלה: ₪{totalAmount.toFixed(2)}</Typography>
          <Button
            variant="contained"
            color="success"
            style={{ margin: '10px', height: '30px' }}
            onClick={() => navigate('/ConfirmOrder')} // Navigate to the order confirmation page
            disabled={cart.length === 0} // Disable button if cart is empty
          >
            סיים הזמנה
          </Button>
        </Box>
      }
    </div>
  );
}