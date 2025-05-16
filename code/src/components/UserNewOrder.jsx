import React, { useState, useEffect } from 'react';
import Dish from './Dish';
import '../css/DishMenu.css';
import { fireReadCollection } from '../firebase';

export default function UserNewOrder() {
  const dataname = "dishes"; // Firestore collection name
  const [rows, setRows] = useState([]);
  const [dataEnabled, setDataEnabled] = useState([]); // State for filtered items

  // Fetch rows from Firestore on component mount
  useEffect(() => {
    fireReadCollection(dataname)
      .then((data) => {
        setRows(data); // Set rows from Firestore
        const enabledItems = data.filter((item) => item["פעיל"]); // Filter items where "פעיל" is true
        setDataEnabled(enabledItems); // Set the filtered items
      })
      .catch((error) => {
        console.error("Error fetching dishes:", error);
      });
  }, []);

  return (
    <div className="dishMenu">
      {dataEnabled.map((item, i) => ( // Use dataEnabled to render only active items
        <div key={i}>
          <Dish
            dishId={item["מספר מנה"]}
            dishName={item["שם המנה"]}
            desc={item["תיאור המנה"]}
            price={item["מחיר"]}
            prepTime={item["זמן הכנה"]}
          />
        </div>
      ))}
    </div>
  );
}