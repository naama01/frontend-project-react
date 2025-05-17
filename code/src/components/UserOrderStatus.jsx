import React from 'react'
import OrderProgress from './OrderProgress'

export default function UserOrderStatus() {
  return (
    <div>
    <h1>סטטוס הזמנה פתוחה</h1>
    <OrderProgress step="2"/>

    <table>
        <tr>
            <th>מספר הזמנה</th>
            <td>12345</td>
        </tr>
        <tr>
            <th>תאריך הזמנה</th>
            <td>12/03/2025</td>
        </tr>
        <tr>
            <th>זמן אספקה משוער</th>
            <td>15:30, 12/03/2025</td>
        </tr>
        <tr>
            <th>פריטים נרכשים</th>
            <td>פיצה (2), סלט (1)</td>
        </tr>
        <tr>
            <th>סכום כולל</th>
            <td>₪25.00</td>
        </tr>
        <tr>
            <th>סטטוס הזמנה</th>
            <td>בהכנה</td>
        </tr>
        <tr>
            <th>שיטת משלוח</th>
            <td>משלוח</td>
        </tr>
        <tr>
            <th>סטטוס תשלום</th>
            <td>שולם</td>
        </tr>
        <tr>
            <th>מידע למעקב</th>
            <td><a href="#">לחץ כאן למעקב אחר ההזמנה</a></td>
        </tr>
        <tr>
            <th>פרטי יצירת קשר</th>
            <td>מספר טלפון: 123-456-7890</td>
        </tr>
    </table>
    
    <div className="actions">
        <button>בטל הזמנה</button>
        <button>שנה הזמנה</button>
        <button>הזמן שוב</button>
    </div>

    </div>
  )
}
