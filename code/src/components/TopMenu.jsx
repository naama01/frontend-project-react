import React from 'react'

export default function TopMenu({title}) {
    return (
        <div className="TopHeader">
            <h1 className="title"><a href="/">{title}</a></h1>

            <ul className="menu">
                <li className="menuItem">
                    שירות ותמיכה
                    <ul className="subMenu">
                        <li>לצ׳ט עם מייקל</li>
                        <li>שלח פניה</li>
                        <li>אודות שירות המשלוחים</li>
                        <li>תקנון השירות</li>
                        <li><a href="/Help"> עזרה </a></li>
                    </ul>
                </li>
                <li className="menuItem">
                    אזור אישי
                    <ul className="subMenu">
                    <li><a href="/UserOrderStatus"> סטטוס הזמנה פתוחה</a></li>
                    <li><a href="/UserOrderHistory"> הסטורית הזמנות</a></li>
                        <li>עדכון פרטים</li>
                    </ul>
                </li>
                <li className="menuItem">
                    אזור ניהול
                    <ul className="subMenu">
                    <li><a href="/AdminClasses"> ניהול כיתות</a></li>
                    <li><a href="/AdminOrders"> ניהול הזמנות</a></li>
                    <li><a href="/AdminDishes"> ניהול תפריט</a></li>
                    <li><a href="/AdminStudents"> ניהול סטודנטים</a></li>
                    </ul>
                </li>
                <li className="menuItem">
                    יציאה
                    <ul className="subMenu">
                        <li>צא</li>
                        <li>צא ורוקן את הסל</li>
                    </ul>
                </li>
            </ul>

        </div>
    )
}