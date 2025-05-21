import React, { useEffect, useState } from 'react';
import OrderProgress from './OrderProgress';
import { fireReadQuery } from '../firebase';
import { useCart } from './CartContext';
import '../css/UserOrderStatus.css';
import {
    Box,
    Paper,
    Typography,
    Divider,
    Grid,
    Button,
    Stepper,
    Step,
    StepLabel,
    Alert,
    Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KitchenIcon from '@mui/icons-material/Kitchen';
import DoneIcon from '@mui/icons-material/Done';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent
} from '@mui/lab';

export default function UserOrderStatus() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentStudentId } = useCart();

    useEffect(() => {
        const fetchOrderData = async () => {
            if (!currentStudentId) {
                setLoading(false);
                return;
            }

            try {
                const results = await fireReadQuery(
                    "orders",
                    ["תז סטודנט מזמין", "==", currentStudentId],
                    { orderBy: ["id", "desc"], limit: 1 }
                );

                setOrderData(results.length > 0 ? results[0] : null);
            } catch (error) {
                console.error("Error fetching order data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [currentStudentId]);

    if (loading) return <div className="user-order-status-loading">טוען...</div>;
    if (!orderData?.id) return <div className="user-order-status-empty">אין הזמנות פתוחות.</div>;

    const order = {
        id: orderData.id,
        "תז סטודנט מזמין": orderData["תז סטודנט מזמין"],
        "משלוח": orderData["משלוח"],
        "מספר כיתה": orderData["מספר כיתה"],
        "מחיר כולל": orderData["מחיר כולל"],
        "כמות מנות": orderData["כמות מנות"],
        "מספר הזמנה": orderData["מספר הזמנה"],
        "תאריך": orderData["תאריך"],
    };

    const steps = ['התקבלה', 'בהכנה', 'במשלוח', 'נמסרה'];

    function timeSteps(rawTimeString, minutesToAdd) {
        const originalDate = new Date(rawTimeString);
        const newDate = new Date(originalDate.getTime() + minutesToAdd * 60 * 1000);
        return newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    
const orderPrepTime = {s0:0 , s1: 2, s2: 20, s3: 25}; // Define the order preparation time in minutes
    const timelineEvents = [
        { time: order["תאריך"], label: 'הזמנה התקבלה', icon: <CheckCircleIcon /> },
        { time: timeSteps(order["תאריך"], orderPrepTime.s1), label: 'הכנה החלה', icon: <KitchenIcon /> },
        { time: timeSteps(order["תאריך"], orderPrepTime.s2), label: 'הזמנה מוכנה', icon: <RestaurantIcon /> },
        { time: timeSteps(order["תאריך"], orderPrepTime.s3), label: 'הזמנה נשלחה', icon: <LocalShippingIcon /> },
    ];

    const calculateActiveStep = (orderDate) => {
        const now = new Date();
        const orderTime = new Date(orderDate);
        const diffInMinutes = (now - orderTime) / (1000 * 60);

        if (diffInMinutes < orderPrepTime.s1) return 1;
        if (diffInMinutes < orderPrepTime.s2) return 2;
        if (diffInMinutes < orderPrepTime.s3) return 3;
        return 4;
    };

    const activeStep = calculateActiveStep(order["תאריך"]);


    return (
        <Box className="user-order-status-wrapper">
            <Paper elevation={3} className="user-order-status-container">
                <Typography variant="h4" align="center" className="user-order-status-title">
                    סטטוס הזמנה
                </Typography>

                <Divider className="user-order-status-divider" />

                <Grid container spacing={2} className="user-order-status-details">
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            <CheckCircleIcon color="success" className="icon-align" />
                            הזמנה מספר: {order["מספר הזמנה"]}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography><strong>כמות מנות:</strong> {order["כמות מנות"]}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography><strong>מחיר כולל:</strong> ₪{order["מחיר כולל"]}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography><strong>מספר כיתה:</strong> {order["מספר כיתה"]}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography><strong>תאריך:</strong> {order["תאריך"]}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Chip
                            label={order["משלוח"] ? 'משלוח' : 'איסוף עצמי'}
                            color={order["משלוח"] ? 'primary' : 'default'}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Divider className="user-order-status-divider" />

                <Stepper activeStep={activeStep} alternativeLabel className="user-order-status-stepper">
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Alert severity="info" className="user-order-status-alert">
                    ההזמנה שלך בדרכה אליך! זמן משוער להגעה: {timeSteps(order["תאריך"], orderPrepTime.s3)}.
                </Alert>

                <Typography variant="h6" className="user-order-status-timeline-title">
                    ציר זמן של הזמנה:
                </Typography>

                <Timeline position="center" className="user-order-status-timeline">
                    {timelineEvents.map((event, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent color="text.secondary" className="timeline-time">
                                {event.time}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary">{event.icon}</TimelineDot>
                                {index < timelineEvents.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>{event.label}</TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>

                <Box className="user-order-status-buttons">

                </Box>
            </Paper>
        </Box>
    );
}
