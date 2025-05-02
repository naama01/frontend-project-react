import React, { useState, useEffect } from 'react';
import AdminTable from './AdminTable';
import AdminNewStudent from './AdminNewStudent';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function AdminStudents() {
  const dataname = "students"; // Define the prefix for local storage
  const titles = ["מספר סטודנט", "שם", "מייל", "טלפון" ];
  const defaultRows =  [
    ["39161", "סהר", "saar@gmail.com", "054-1234567"],
    ["48217", "נועה", "noa@gmail.com", "052-8765432"],
    ["57329", "דניאל", "daniel@gmail.com", "050-1122334"],
    ["69403", "יובל", "yuval@gmail.com", "053-9988776"],
    ["31588", "טל", "tal@gmail.com", "054-4455667"],
    ["40671", "מאיה", "maya@gmail.com", "052-3344556"],
    ["52894", "איתי", "itai@gmail.com", "050-6677889"],
    ["64720", "רוני", "roni@gmail.com", "053-2233445"],
    ["73915", "ליאן", "lian@gmail.com", "054-7788990"],
    ["85062", "אדם", "adam@gmail.com", "052-5566778"]
  ]
  ;
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
            הוסף סטודנט חדש
          </Button>
        </Box>
      )}

      {showNewRowForm && (
        <AdminNewStudent
          onAddRow={handleAddRow}
          onCancel={() => setShowNewRowForm(false)}
        />
      )}
    </div>
  );
}

