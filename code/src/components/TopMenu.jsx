import React from 'react'

export default function TopMenu({title}) {
    return (
        <div className="TopHeader">
            <h1 className="title">{title}</h1>

            <ul className="menu">
                <li className="menuItem">
                    שירות ותמיכה
                    <ul className="subMenu">
                        <li>לצ׳ט עם מייקל</li>
                        <li>שלח פניה</li>
                        <li>אודות שירות המשלוחים</li>
                    </ul>
                </li>
                <li className="menuItem">
                    אזור אישי
                    <ul className="subMenu">
                    <li>סטטוס הזמנה פתוחה</li>
                    <li>הסטורית הזמנות</li>
                        <li>עדכון פרטים</li>
                    </ul>
                </li>
                <li className="menuItem">
                    אזור ניהול
                    <ul className="subMenu">
                    <li>ניהול כיתות</li>
                    <li>ניהול הזמנות</li>
                    <li>ניהול תפריט</li>
                    <li>ניהול סטודנטים</li>
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
/*
import React from 'react';
import './TopMenu.css'; // Import the CSS for styling

export default function TopMenu({ title }) {
    return (
        <div className="TopHeader">
            <h1 className="title">{title}</h1>
            <ul className="menu">
                <li className="menuItem">
                    Support
                    <ul className="subMenu">
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Online Help</li>
                    </ul>
                </li>
                <li className="menuItem">
                    Save
                    <ul className="subMenu">
                        <li>Save Work</li>
                        <li>Export Data</li>
                        <li>Import Data</li>
                    </ul>
                </li>
                <li className="menuItem">
                    Exit
                    <ul className="subMenu">
                        <li>Log Out</li>
                        <li>Close Application</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}


*/
