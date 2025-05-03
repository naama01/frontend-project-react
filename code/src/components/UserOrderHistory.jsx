import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';
import { useCart } from './CartContext'; // Import the useCart hook

export default function UserOrderHistory() {
  const titles = ["מספר הזמנה", "תאריך הזמנה", "פריטים נרכשים", "כמות", "מחיר כולל", "סטטוס הזמנה"];
  const [rows, setRows] = useState([]);
  const { currentStudentId } = useCart(); // Access the current student ID from the context

  useEffect(() => {
    const storedOrderHistory = JSON.parse(localStorage.getItem('orderhistory_tableData')) || { rows: [] };
    const filteredOrders = storedOrderHistory.rows
      .filter(order => order.shipmentInfo?.student?.id === currentStudentId)
      .map((order, index) => {
        const totalQuantity = order.cart.reduce((sum, item) => sum + item.quantity, 0);
        const purchasedItems = order.cart.map(item => item.dishName).join(", ");
        return [
          index + 1,
          order.date,
          purchasedItems,
          totalQuantity,
          `₪${order.totalAmount}`,
          "הושלמה"
        ];
      });
    setRows(filteredOrders);
  }, [currentStudentId]);

  return (
    <div>
      <UserTable titles={titles} rows={rows} />
    </div>
  );
}