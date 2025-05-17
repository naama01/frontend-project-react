import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';
import { useCart } from './CartContext'; // Import the useCart hook
import { fireReadTitles, fireReadQuery } from '../firebase'; // Import Firestore functions

export default function UserOrderHistory() {
  const { currentStudentId } = useCart(); // Access currentStudentId from context
  const dataname = "orders";
  const [rows, setRows] = useState([]);
  const [titles, setTitles] = useState([]); // Dynamically generated titles

  useEffect(() => {
    if (!currentStudentId) {
      console.error("currentStudentId is not set!");
      return;
    }

    // Fetch titles first
    fireReadTitles(dataname)
      .then((titlesData) => {
        if (titlesData) {
          setTitles(Object.values(titlesData)); // Set titles from the "titles" document
        } else {
          console.error("No titles document found!");
        }

        // Fetch orders after titles are retrieved
        return fireReadQuery(dataname, [['תז סטודנט מזמין', '==', currentStudentId]]);
            })
      .then((data) => {
        setRows(data); // Set the rows with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data from Firestore:", error);
      });
  }, [currentStudentId]); // Run when currentStudentId changes

  return (
    <div>
      <UserTable dataname="orders" rows={rows} titles={titles} />
    </div>
  );
}