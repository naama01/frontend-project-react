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

    function saveToLocalStorage() {
        const tableData = {
            titles: titles,
            rows: rows,
        };
        localStorage.setItem(`${dataname}_tableData`, JSON.stringify(tableData));
        alert('המידע נשמר בהצלחה!');
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
                onClick={saveToLocalStorage}
                style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white' }}
            >
                שמור את הנתונים
            </Button>
            <Button
                variant="contained"
                onClick={addNewRow}
                style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: '#2196F3', color: 'white' }}
            >
                הוסף רשומה חדשה
            </Button>
        </div>
    );
}

