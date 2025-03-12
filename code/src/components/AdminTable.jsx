import React from 'react'

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



/*
            <table >
                <thead>
                    <tr><th>מספר חדר</th><th>מיקום</th><th>מותר למשלוח</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>101</td>
                        <td>צפון</td>
                        <td><input type="checkbox" checked="true"></input></td>
                    </tr>
                    <tr>
                        <td>102</td>
                        <td>דרום</td>
                        <td><input type="checkbox" checked="true"></input></td>
                    </tr>
                    <tr>
                        <td>104</td>
                        <td>ספריה</td>
                        <td><input type="checkbox" value="0"></input></td>
                    </tr>
                    <tr>
                        <td>201</td>
                        <td>צפון</td>
                        <td><input type="checkbox" checked="true"></input></td>
                    </tr>
                    <tr>
                        <td>202</td>
                        <td>צפון</td>
                        <td><input type="checkbox" checked="true"></input></td>
                    </tr>
                    <tr>
                        <td>203</td>
                        <td>מעבדת סייבר</td>
                        <td><input type="checkbox" value="0"></input></td>
                    </tr>
                    <tr>
                        <td>204</td>
                        <td>מעבדת מחקר</td>
                        <td><input type="checkbox" value="0"></input></td>
                    </tr>
                    <tr>
                        <td>300</td>
                        <td>צפון</td>
                        <td><input type="checkbox" checked="true"></input></td>
                    </tr>
                    <tr>
                        <td>310</td>
                        <td>דרום</td>
                        <td><input type="checkbox" checked="true"></input></td>
                    </tr>
                    <tr>
                        <td>320</td>
                        <td>גג</td>
                        <td><input type="checkbox" checked="true"></input></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

*/