import React, { useState, useEffect, useContext } from 'react';
import { fireReadTitles, fireReadCollection, fireDeleteDoc } from '../firebase';
import { Link } from 'react-router-dom';
import { FireWaitContext } from './FireWaitProvider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

import '../css/AdminTable.css';

export default function AdminTable({ dataName }) {
  const { setShowFireWait } = useContext(FireWaitContext);
  const [rows, setRows] = useState([]);
  const [titles, setTitles] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  // Fetch titles and rows from Firestore
  useEffect(() => {
    setShowFireWait(true); // Set loading to true before fetching data
    fireReadTitles(dataName)
      .then((titlesData) => {
        if (titlesData) {
          setTitles(Object.values(titlesData)); // Set titles from the "titles" document
        } else {
          console.error("No titles document found!");
        }

        // Fetch rows after titles are retrieved
        return fireReadCollection(dataName);
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
  }, [dataName, setShowFireWait]);

  function handleDelete(rowIndex, row) {
    const confirmed = window.confirm(`האם למחוק את רשומה ${row.id}?`);
    if (!confirmed) return;

    const updatedRows = rows.filter((_, index) => index !== rowIndex); //remove row from rows
    setRows(updatedRows); // update the table with new rows
    fireDeleteDoc(dataName, row.id); // Save updated rows to Firestore
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
    <TableRow key={rowIndex}>
      {createRow(row, rowIndex)}

      <TableCell align="center">
        <Stack direction="row" spacing={1} justifyContent="center">
          <Tooltip title="עריכה">
            <IconButton
              color="primary"
              component={Link}
              to={`/adminNew/${dataName}/${row.id}`}
              size="small"
            >
              <BorderColorIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="מחיקה">
            <IconButton
              color="error"
              onClick={() => handleDelete(rowIndex, row)}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
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
    </div>
  );

}
