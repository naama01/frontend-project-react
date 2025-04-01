import 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/*
export function AdminTable({ titles, rows }) {

    function createRow(row) {
        let row_html = row.map(function (item, i) {
            if (item === true || item === false) { return <TableCell key={i}><input type="checkbox" checked={item}></input></TableCell> }
            return <TableCell key={i}><input type="textbox" value={item}></input></TableCell>
        })
        return (row_html)
    }

    let rows_html = rows.map(function (item, i) {
        return <TableRow key={i}>{createRow(item)}</TableRow>
    })

    let titles_html = titles.map(function (item, i) {
        return <TableCell key={i}>{item}</TableCell>
    })

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {titles_html}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows_html}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


*/


export default function AdminTable({ titles, rows }) {

    function createRow(row) {
        let row_html = row.map(function (item, i) {
            if (item === true || item === false) { return <TableCell key={i}><input type="checkbox" checked={item}></input></TableCell> } 
            return <TableCell key={i}><input type="textbox" value={item}></input></TableCell>
        })
        return (row_html)
    }

    let rows_html = rows.map(function (item, i) {
        //return <tr key={i}>{createRow(item)}</tr>
        return <TableRow key={i}>{createRow(item)}</TableRow>

    })

    let titles_html = titles.map(function (item, i) {
 //       return <th key={i}>{item}</th>
 return <TableCell key={i}>{item}</TableCell>

    })

    /*return (
        
        <div>
            <table >
                <thead>
                    <tr>{titles_html}</tr>
                </thead>
                <tbody>
                    {rows_html}
                </tbody>
            </table>
        </div>
    )*/
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {titles_html}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows_html}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
}

