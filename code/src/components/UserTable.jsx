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
import { fireReadTitles, fireWriteCollection, fireReadCollection, fireDeleteDoc, fireReadQuery } from '../firebase'; // Import Firestore functions
import AdminNew from './AdminNew'; // Import AdminNew component
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox component

export default function UserTable({ dataname,query}){
    const [rows, setRows] = useState([]);
    const [titles, setTitles] = useState([]); // Dynamically generated titles
    if (!query) {
        query = "";
    }

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
                return fireReadQuery(dataname,query);
            })
            .then((data) => {
                setRows(data); // Set rows from Firestore
            })
            .catch((error) => {
                console.error("Error fetching data from Firestore:", error);
            });
    }, [dataname,query]);

  
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
                    disabled={true}
                        checked={!!row[title]} // Ensure the value is always a boolean
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
            <TableCell>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>

                </div>
            </TableCell>
        </TableRow>
    ));

    

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

        </div>
    );
}