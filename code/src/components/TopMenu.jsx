import React from 'react'
import { Navigate,useNavigate} from 'react-router-dom'

export default function TopMenu({title}) {
    const navigate = useNavigate(); 

    return (
        <div className="TopHeader">
            <h1 className="title" onClick={() => navigate("/")}>{title}</h1>

            <ul className="menu">
            <li className="menuItem" onClick={() => navigate("/")}>מסך ראשי</li>
                <li className="menuItem">
                    שירות ותמיכה
                    <ul className="subMenu">
                        <li>לצ׳ט עם מייקל</li>
                        <li>שלח פניה</li>
                        <li>אודות שירות המשלוחים</li>
                        <li>תקנון השירות</li>
                        <li onClick={() => navigate("/help")}>עזרה</li>

                    </ul>
                </li>
                <li className="menuItem">
                    אזור אישי
                    <ul className="subMenu">
                    <li onClick={() => navigate("/UserOrderStatus")}> סטטוס הזמנה פתוחה</li>
                    <li onClick={() => navigate("/UserOrderHistory")}> הסטורית הזמנות</li>
                        <li>עדכון פרטים</li>
                    </ul>
                </li>
                <li className="menuItem">
                    אזור ניהול
                    <ul className="subMenu">
                    <li onClick={() => navigate("/AdminClasses")}> ניהול כיתות</li>
                    <li onClick={() => navigate("/AdminOrders")}> ניהול הזמנות</li>
                    <li onClick={() => navigate("/AdminDishes")}> ניהול תפריט</li>
                    <li onClick={() => navigate("/AdminStudents")}> ניהול סטודנטים</li>
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
