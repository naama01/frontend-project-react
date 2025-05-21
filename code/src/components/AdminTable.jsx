import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { fireReadTitles, fireWriteCollection, fireReadCollection, fireDeleteDoc } from '../firebase'; // Import Firestore functions
import AdminNew from './AdminNew'; // Import AdminNew component
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox component
import '../css/AdminTable.css'; // Import CSS for fade-in effect
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import Link for navigation
import { FireWaitContext } from './FireWaitProvider'; // Import FireWait context
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';


export default function AdminTable({ dataname }) {
  const { setShowFireWait } = useContext(FireWaitContext); // Access setShowFireWait from context
  const [rows, setRows] = useState([]);
  const [titles, setTitles] = useState([]); // Dynamically generated titles
  const [fadeIn, setFadeIn] = useState(false); // Track fade-in effect
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch titles and rows from Firestore
  useEffect(() => {
    setShowFireWait(true); // Set loading to true before fetching data
    fireReadTitles(dataname)
      .then((titlesData) => {
        if (titlesData) {
          setTitles(Object.values(titlesData)); // Set titles from the "titles" document
        } else {
          console.error("No titles document found!");
        }

        // Fetch rows after titles are retrieved
        return fireReadCollection(dataname);
      })
      .then((data) => {
        setRows(data); // Set rows from Firestore
      })
      .catch((error) => {
        console.error("Error fetching data from Firestore:", error);
      })
      .finally(() => {
        setShowFireWait(false); // Set loading to false after data is fetched
        setTimeout(() => setFadeIn(true), 100); // Add a slight delay before triggering fade-in
      });
  }, [dataname]);

  function handleDelete(rowIndex, row) {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    setRows(updatedRows);
    fireDeleteDoc(dataname, row.id); // Save updated rows to Firestore
  }

  function handleNewItemSubmit(newItem) {
    setRows([...rows, newItem]); // Add the new item to the rows
    setShowNewForm(false); // Hide the AdminNew form after submission
  }

  // Create table titles
  const titles_html = titles.map((title, index) => (
    <TableCell key={index}>{title}</TableCell>
  ));
  titles_html.push(<TableCell key={titles.length}></TableCell>); // space for actions column

  // Create table rows using template
  function createRow(row, rowIndex) {
    return titles.map((title, cellIndex) => (
      <TableCell key={cellIndex}>
        {(title === "פעיל" || title === "משלוח") ? (
          <Checkbox
            checked={!!row[title]} // Ensure the value is always a boolean
            disabled={true}
        
            onChange={(e) => {
              const updatedRows = [...rows];
              updatedRows[rowIndex][title] = e.target.checked; // Update the value in the rows state
              setRows(updatedRows); // Update the state
            }}
          />
        ) : (
          row[title] // Render the plain text for other fields
        )}
      </TableCell>
    ));
  }

  const rows_html = rows.map((row, rowIndex) => (
    <TableRow key={rowIndex} >
      {createRow(row, rowIndex)}
      <TableCell  > 
        <div >
          <IconButton
            aria-label="ערוך"
            size="small"
            component={Link}
            to={`/adminNew/${dataname}/${row.id}`}
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            aria-label="מחק"
            size="small"
            onClick={() => handleDelete(rowIndex, row)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  ));

  function saveTable() {
    fireWriteCollection(dataname, rows); // Save rows to Firestore
  }

  return (
    <div>
      <>
        <TableContainer 

          component={Paper}
          className={`table-container fade-in ${fadeIn ? 'visible' : ''}`}
        >

          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>{titles_html}</TableRow>
            </TableHead>
            <TableBody>{rows_html}</TableBody>
          </Table>

        </TableContainer>




      </>

    </div>
  );

}


/*
          <Button
            variant="contained"
            onClick={saveTable}
            style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white' }}
          >
            שמור את הנתונים
          </Button>
*/