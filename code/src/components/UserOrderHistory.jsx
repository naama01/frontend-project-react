import React from 'react';
import UserTable from './UserTable';
import { useCart } from './CartContext'; // Import the useCart hook

export default function UserOrderHistory() {
  const { currentStudentId } = useCart(); // Access currentStudentId from context
  const dataname = "orders";

  if (!currentStudentId) {
    return <div>לא נמצאו נתונים עבור סטודנט זה.</div>; // Display a message if currentStudentId is not set
  }

  return (
    <div>
      <UserTable dataname={dataname} query={['תז סטודנט מזמין', "==", currentStudentId]} />
    </div>
  );
}