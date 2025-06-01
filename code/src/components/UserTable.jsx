import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { fireReadTitles, fireReadQuery } from '../firebase'; // Import Firestore functions
import { FireWaitContext } from './FireWaitProvider'; // Import FireWait context

export default function UserTable({ dataname, query }) {
    const [rows, setRows] = useState([]);
    const [titles, setTitles] = useState([]); // Dynamically generated titles
    const { setShowFireWait } = useContext(FireWaitContext); // Access setShowFireWait from context


    // Ensure query is valid
    const validQuery = Array.isArray(query) && query.length === 3 ? query : null;

    // Fetch titles and rows from Firestore
    useEffect(() => {
        if (!validQuery) {
            console.error("Invalid query format. Query must be an array with 3 elements: [field, operator, value].");
            return;
        }

        setShowFireWait(true);
        fireReadTitles(dataname)
            .then((titlesData) => {
                if (titlesData) {
                    setTitles(Object.values(titlesData));
                } else {
                    console.error("No titles document found!");
                }

                return fireReadQuery(dataname, validQuery);
            })
            .then((data) => {
                setRows(data);
            })
            .catch((error) => {
                console.error("Error fetching data from Firestore:", error);
            })
            .finally(() => {
                setShowFireWait(false);
            });
    }, [dataname, validQuery]);

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
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}></div>
            </TableCell>
        </TableRow>
    ));

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
            <Table
                sx={{
                    minWidth: 650,
                    '& th': { fontWeight: 600 },
                    '& td, & th': { textAlign: 'right' }, // RTL alignment
                }}
                aria-label="טבלת משתמש"
            >
                <TableHead>
                    <TableRow>{titles_html}</TableRow>
                </TableHead>
                <TableBody>{rows_html}</TableBody>
            </Table>
        </TableContainer>

    );
}