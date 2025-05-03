/*
import 'react'
import Dish from './Dish'
import '../css/DishMenu.css'
export default function UserNewOrder() {
  const dishes = [
    ["1", "סלט", "סלט טרי קצוץ", "25"],
    ["2", "לחם המכללה", "מאפה ומתבלים", "13"],
    ["3", "מאפה ללא גלוטן", "מאפה ללא גלוטן", "13"],
    ["4", "צ׳יפס", "צ׳יפס תפוח אדמה", "17"],
    ["5", "המבורגר", "בקר 200 גרם", "55"],
    ["6", "פסטה פומודורו", "פסטה ברוטב עגבניות", "45"],
    ["7", "פיצה אישית", "רטוב עגבניות, מוצרלה וזיתים", "25"],
    ["8", "צהריים של אמא", "אורז שעועית עם בשר בקר", "45"],
    ["9", "אדממה", "150 גרם", "22"]
  ]

  return (
    <div className="dishMenu">
      {dishes.map(function (item, i) {
        return <div key={i}>{<Dish dishId={item[0]} dishName={item[1]} desc={item[2]} price={item[3]} />}</div> // need to add picture when moving to real data
      })}
    </div>
  )
}

*/

import 'react'
import Dish from './Dish'
import '../css/DishMenu.css'
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useState } from 'react';


export default function UserNewOrder() {
  const dataname = "dishes"; // Define the prefix for local storage
  const titles = ["מספר מנה", "שם המנה", "תיאור המנה", "נתיב לתמונה", "מחיר", "זמן הכנה", "פעילה"];
  const defaultRows = [
    ["1", "סלט", "סלט טרי קצוץ", "25", "10", true],
    ["2", "לחם המכללה", "מאפה ומתבלים", "13", "10", true],
    ["3", "לחמניה ללא גלוטן", "מאפה ללא גלוטן", "13", "2", true],
    ["4", "צ׳יפס", "צ׳יפס תפוח אדמה", "17", "10", true],
    ["5", "המבורגר", "בקר 200 גרם", "55", "12", true],
    ["6", "פסטה פומודורו", "פסטה ברוטב עגבניות", "45", "7", true],
    ["7", "פיצה אישית", "רטוב עגבניות, מוצרלה וזיתים", "25", "10", true],
    ["8", "צהריים של אמא", "אורז שעועית עם בשר בקר", "45", "7", true],
    ["9", "אדממה", "150 גרם", "22", "10", true],
  ];

  const [rows, setRows] = useState(() => {
    const storedRows = localStorage.getItem(`${dataname}_tableData`);
    return storedRows ? JSON.parse(storedRows).rows : defaultRows;
  });




  return (
    <div className="dishMenu">
      {rows.map(function (item, i) {
        return <div key={i}>{<Dish dishId={item[0]} dishName={item[1]} desc={item[2]} price={item[3]} prepTime={item[4]} />}</div> // need to add picture when moving to real data
      })}
    </div>
  )
}





/*
import React, { useState, useEffect } from 'react';

export default function AdminDishes() {


  return (
    <div className="dishMenu">
      {rows.map(function (item, i) {
        return <div key={i}>{<Dish dishId={item[0]} dishName={item[1]} desc={item[2]} price={item[4]} />}</div> // need to add picture when moving to real data
      })}
    </div>
  )
}




/*
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function AdminDishes() {
  const dataname = "dishes"; // Define the prefix for local storage
  const titles = ["מספר מנה", "שם המנה", "תיאור המנה", "נתיב לתמונה", "מחיר", "זמן הכנה", "פעילה"];
  const defaultRows = [
    ["1", "סלט", "סלט טרי קצוץ", "img/dishes/file.png", "25", "10", true],
    ["2", "לחם המכללה", "מאפה ומתבלים", "img/dishes/file.png", "13", "10", true],
    ["3", "לחמניה ללא גלוטן", "מאפה ללא גלוטן", "img/dishes/file.png", "13", "2", true],
    ["4", "צ׳יפס", "צ׳יפס תפוח אדמה", "img/dishes/file.png", "17", "10", true],
    ["5", "המבורגר", "בקר 200 גרם", "img/dishes/file.png", "55", "12", true],
    ["6", "פסטה פומודורו", "פסטה ברוטב עגבניות", "img/dishes/file.png", "45", "7", true],
    ["7", "פיצה אישית", "רטוב עגבניות, מוצרלה וזיתים", "img/dishes/file.png", "25", "10", true],
    ["8", "צהריים של אמא", "אורז שעועית עם בשר בקר", "img/dishes/file.png", "45", "7", true],
    ["9", "אדממה", "150 גרם", "img/dishes/file.png", "22", "10", true],
  ];

  const [rows, setRows] = useState(() => {
    const storedRows = localStorage.getItem(`${dataname}_tableData`);
    return storedRows ? JSON.parse(storedRows).rows : defaultRows;
  });

  const [showNewRowForm, setShowNewRowForm] = useState(false);

  useEffect(() => {
    // Save rows to local storage whenever they change
    const tableData = { titles, rows };
    localStorage.setItem(`${dataname}_tableData`, JSON.stringify(tableData));
  }, [rows]);

 */