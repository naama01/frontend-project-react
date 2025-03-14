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
                        <li>תקנון השירות</li>
                        <li>עזרה</li>
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