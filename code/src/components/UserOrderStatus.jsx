import React, { useEffect, useState } from 'react';
import OrderProgress from './OrderProgress';
import { fireReadQuery } from '../firebase';
import { useCart } from './CartContext';

export default function UserOrderStatus() {
    const [orderData, setOrderData] = useState(null);
    const { currentStudentId } = useCart();

    useEffect(() => {
        const fetchOrderData = async () => {
            if (!currentStudentId) return;

            try {
                const querySnapshot = await fireReadQuery("students", ["תז סטודנט מזמין", "==", currentStudentId], { orderBy: "תאריך", limit: 1 });
                if (querySnapshot?.docs?.length) {
                    const lastOrder = querySnapshot.docs[0].data();
                    console.log("Retrieved order data:", lastOrder); // Debugging log
                    setOrderData(lastOrder);
                } else {
                    console.warn("No order data found for the current student.");
                    setOrderData(null);
                }
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        };

        fetchOrderData();
    }, [currentStudentId]);

    if (!currentStudentId) {
        return <div>לא נמצאו נתונים עבור סטודנט זה.</div>;
    }

    if (!orderData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>סטטוס הזמנה פתוחה</h1>
            <OrderProgress step={orderData.step || "1"} />

            <table>
                <tr>
                    <th>מספר הזמנה</th>
                    <td>{orderData.orderNumber}</td>
                </tr>
                <tr>
                    <th>תאריך הזמנה</th>
                    <td>{orderData.orderDate}</td>
                </tr>
                <tr>
                    <th>זמן אספקה משוער</th>
                    <td>{orderData.estimatedDeliveryTime}</td>
                </tr>
                <tr>
                    <th>פריטים נרכשים</th>
                    <td>{orderData.items}</td>
                </tr>
                <tr>
                    <th>סכום כולל</th>
                    <td>₪{orderData.totalAmount}</td>
                </tr>
                <tr>
                    <th>סטטוס הזמנה</th>
                    <td>{orderData.orderStatus}</td>
                </tr>
                <tr>
                    <th>שיטת משלוח</th>
                    <td>{orderData.deliveryMethod}</td>
                </tr>
                <tr>
                    <th>סטטוס תשלום</th>
                    <td>{orderData.paymentStatus}</td>
                </tr>
                <tr>
                    <th>מידע למעקב</th>
                    <td><a href={orderData.trackingLink}>לחץ כאן למעקב אחר ההזמנה</a></td>
                </tr>
                <tr>
                    <th>פרטי יצירת קשר</th>
                    <td>{orderData.contactInfo}</td>
                </tr>
            </table>

            <div className="actions">
                <button>בטל הזמנה</button>
                <button>שנה הזמנה</button>
                <button>הזמן שוב</button>
            </div>
        </div>
    );
}
