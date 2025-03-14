import 'react'

export default function AdminTable({ titles, rows }) {

    function createRow(row) {
        let row_html = row.map(function (item, i) {
            if (item === true || item === false) { return <td key={i}><input type="checkbox" checked={item}></input></td> } 
            return <td key={i}><input type="textbox" value={item}></input></td>
        })
        return (row_html)
    }

    let rows_html = rows.map(function (item, i) {
        return <tr key={i}>{createRow(item)}</tr>
    })

    let titles_html = titles.map(function (item, i) {
        return <th key={i}>{item}</th>
    })

    return (
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
    )
}
