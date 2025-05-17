import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function OrderProgress({ step = 0 }) {
  const steps = [
    { label: 'הזמנה נשלחה למזנון', icon: <LocalDiningIcon /> },
    { label: 'הזמנה בהכנה', icon: <LocalDiningIcon /> },
    { label: 'השליח בדרך אליך', icon: <DeliveryDiningIcon /> },
    { label: 'הזמנה נמסרה', icon: <DoneAllIcon /> }
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        margin: '40px auto',
        padding: '24px',
        backgroundColor: '#fefefe',
        textAlign: 'center',
        direction: 'rtl'
      }}
    >
      <Typography variant="h6" gutterBottom>
        סטטוס ההזמנה שלך
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((stepItem, index) => (
            <Step key={stepItem.label}>
              <StepLabel icon={stepItem.icon}>{stepItem.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Paper>
  );
}
