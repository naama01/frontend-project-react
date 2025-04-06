import React, { useState, useEffect } from 'react';
import AdminTable from './AdminTable';
import AdminNewDish from './AdminNewDish';
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

  function handleAddRow(newRow) {
    setRows([...rows, Object.values(newRow)]); // Add the new row to the rows
    setShowNewRowForm(false); // Hide the form after adding
  }

  return (
    <div>
      {showNewRowForm || (
        <Box>
          <AdminTable titles={titles} rows={rows} dataname={dataname} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowNewRowForm(true)}
          >
            הוסף מנה חדשה
          </Button>
        </Box>
      )}

      {showNewRowForm && (
        <AdminNewDish onAddRow={handleAddRow} onCancel={() => setShowNewRowForm(false)} />
      )}
    </div>
  );
}