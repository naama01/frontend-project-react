import React, { useState, useEffect } from 'react';
import AdminTable from './AdminTable';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { fireReadCollection, fireReadTitles } from '../firebase'; // Import Firestore functions
import AdminNew from './AdminNew';

export default function AdminPage({dataname}) {

  const [rows, setRows] = useState([]);
  const [titles, setTitles] = useState([]); // Dynamically generated titles

  useEffect(() => {
    // Fetch titles first
    fireReadTitles(dataname)
      .then((titlesData) => {
        if (titlesData) {
          setTitles(Object.values(titlesData)); // Set titles from the "titles" document
        } else {
          console.error("No titles document found!");
        }

        // Fetch dishes after titles are retrieved
        return fireReadCollection(dataname);
      })
      .then((data) => {
          setRows(data);
        }
      )
      .catch((error) => {
        console.error("Error fetching data from Firestore:", error);
      });
  }, []); // Run only once on component mount

  const [showNewRowForm, setShowNewRowForm] = useState(false);



  function handleAddRow(newRow) {
    setRows([...rows, newRow]); // Add the new row to the rows
    setShowNewRowForm(false); // Hide the form after adding
  }

  return (
    <div>
      {showNewRowForm || (
        <Box>
          {titles.length > 0 && (
            <AdminTable titles={titles} rows={rows} dataname={dataname} />
          )}

        </Box>
      )}

      {showNewRowForm && (
        <AdminNew dataname={dataname} onSubmit={handleAddRow} />
      )}
    </div>
  );
}