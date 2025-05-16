import React, { useState, useEffect } from 'react';
import AdminTable from './AdminTable';
import AdminNewClass from './AdminNewClass';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function AdminClasses() {
  const dataname = "classes"; // Define the prefix for local storage
  const titles = ["Class ID", "Class Name", "Description"];
  const defaultRows = [
    ["101", "צפון", true],
    ["102", "צפון", true],
    ["103", "דרום", true],
    ["104", "דרום", true],
    ["201", "צפון", true],
    ["202", "צפון", true],
    ["203", "מעבדת סייבר", true],
    ["302", "צפון", true],
    ["303", "צפון", true],
    ["304", "מעבדת מחקר", true],
    ["401", "הנהלה", true],
    ["500", "גג", true]
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
            הוסף כיתה חדשה
          </Button>
        </Box>
      )}

      {showNewRowForm && (
        <AdminNewClass
          onAddRow={handleAddRow}
          onCancel={() => setShowNewRowForm(false)}
        />
      )}
    </div>
  );
}

