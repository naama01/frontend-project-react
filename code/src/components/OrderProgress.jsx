
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
export default function OrderProgress({step}) {

    const steps = [
        'הזמנה נשלחה למזנון',
        'הזמנה בהכנה',
        'השליח בדרך אליך',
        'הזמנה נמסרה'
    ];

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </div>
    );
}
