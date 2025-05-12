import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore, FireWriteDoc } from "../firebase"; // Ensure correct import of Firestore instance


export function fireGetColl(dataname) {
    return getDocs(collection(firestore, dataname))
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(), // Spread the document data
        }));
        console.log(`Documents retrieved from ${dataname}:`, documents);
        return documents; // Return the array of documents
      })
      .catch((error) => {
        console.error(`Error retrieving documents from ${dataname}:`, error);
        throw error; // Re-throw the error to handle it in the calling function
      });
  }

export default function AdminTable({ titles, rows: initialRows, dataname }) {
    const [rows, setRows] = useState(initialRows);
    const [editingRowIndex, setEditingRowIndex] = useState(null);



    

    function handleInputChange(rowIndex, cellIndex, value) {
        const updatedRows = [...rows];
        updatedRows[rowIndex][cellIndex] = value;
        setRows(updatedRows);
    }

    
    function handleEdit(rowIndex) {
        setEditingRowIndex(rowIndex);
    }

    function handleSave(rowIndex) {
        setEditingRowIndex(null); // Exit edit mode
    }

    function handleDelete(rowIndex) {
        const updatedRows = rows.filter((_, index) => index !== rowIndex);
        setRows(updatedRows);
    }

    function addNewRow() {
        const emptyRow = titles.map(() => ""); // Create an empty row with the same number of columns as titles
        setRows([...rows, emptyRow]); // Add the new row to the rows state
        setEditingRowIndex(rows.length); // Set the new row to edit mode
    }

    function createRow(row, rowIndex) {
        return row.map((item, cellIndex) => {
            if (editingRowIndex === rowIndex) {
                // Editable mode
                if (typeof item === 'boolean') {
                    return (
                        <TableCell key={cellIndex}>
                            <input
                                type="checkbox"
                                checked={item}
                                onChange={(e) => handleInputChange(rowIndex, cellIndex, e.target.checked)}
                            />
                        </TableCell>
                    );
                }
                return (
                    <TableCell key={cellIndex}>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleInputChange(rowIndex, cellIndex, e.target.value)}
                        />
                    </TableCell>
                );
            }
            // View mode
            if (typeof item === 'boolean') {
                return (
                    <TableCell key={cellIndex}>
                        <input type="checkbox" checked={item} readOnly />
                    </TableCell>
                );
            }
            return <TableCell key={cellIndex}>{item}</TableCell>;
        });
    }

    const rows_html = rows.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
            {createRow(row, rowIndex)}
            <TableCell>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                    {editingRowIndex === rowIndex ? (
                        <>
                            <IconButton
                                aria-label="save"
                                size="small"
                                style={{ color: '#4CAF50' }}
                                onClick={() => handleSave(rowIndex)}
                            >
                                💾
                            </IconButton>
                        </>
                    ) : (
                        <IconButton
                            aria-label="edit"
                            size="small"
                            style={{ color: '#2196F3' }}
                            onClick={() => handleEdit(rowIndex)}
                        >
                            📝
                        </IconButton>
                    )
                    }
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

    async function saveToLocalStorage() {
        const tableData = {
            titles: titles,
            rows: rows,
        };

        try {
            for (const row of rows) {
                const doc = {};
                titles.forEach((title, index) => {
                    doc[title] = row[index];
                });

            
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    // If no duplicate is found, save the record
                    await FireWriteDoc(dataname, doc);
                } else {
                    console.log(`Duplicate record found for ID: ${doc.id}. Skipping save.`);
                }
            }

            alert("הנתונים נשמרו בהצלחה!");
        } catch (error) {
            console.error("Error saving data to Firestore:", error);
            alert("שגיאה בשמירת הנתונים.");
        }
    }

    return (
        <div>
