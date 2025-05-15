import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { fireReadTitles, fireReadCollection } from '../firebase'; // Import Firestore functions

export default function AdminTable({ dataname }) {
    const [rows, setRows] = useState([]);
    const [titles, setTitles] = useState([]); // Dynamically generated titles

    // Fetch titles and rows from Firestore
    useEffect(() => {
        // Fetch titles first
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
            });
    }, [dataname]);

    function handleDelete(rowIndex) {
        const updatedRows = rows.filter((_, index) => index !== rowIndex);
        setRows(updatedRows);
    }

    function addNewRow() {
        const emptyRow = titles.reduce((acc, title) => {
            acc[title] = ""; // Create an empty object with keys matching the titles
            return acc;
        }, {});
        setRows([...rows, emptyRow]); // Add the new row to the rows state
    }

    function createRow(row, rowIndex) {
        return titles.map((title, cellIndex) => (
            <TableCell key={cellIndex}>{row[title]}</TableCell>
        ));
    }

    const rows_html = rows.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
            {createRow(row, rowIndex)}
            <TableCell>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        style={{ color: '#f44336' }}
                        onClick={() => handleDelete(rowIndex)}
                    >
                        🗑️
                    </IconButton>
                </div>
            </TableCell>
        </TableRow>
    ));

    const titles_html = titles.map((title, index) => (
        <TableCell key={index}>{title}</TableCell>
    ));
    titles_html.push(<TableCell key={titles.length}></TableCell>); // space for actions column

    function saveToLocalStorage() {
        const tableData = {
            titles: titles,
            rows: rows,
        };
        //localStorage.setItem(`${dataname}_tableData`, JSON.stringify(tableData));
        alert("הנתונים נשמרו בהצלחה!");
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>{titles_html}</TableRow>
                    </TableHead>
                    <TableBody>{rows_html}</TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                onClick={addNewRow}
                style={{ marginTop: '10px', backgroundColor: '#2196F3', color: 'white' }}
            >
                הוסף שורה חדשה
            </Button>
            <Button
                variant="contained"
                onClick={saveToLocalStorage}
                style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white' }}
            >
                שמור את הנתונים
            </Button>
        </div>
    );
}

