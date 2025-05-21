import React, { createContext, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import '../css/FireWait.css';

export const FireWaitContext = createContext(); // Create FireWait context

export function FireWaitProvider({ children }) {
  const [showFireWait, setShowFireWait] = useState(false); // State to manage loading

  return (
    <FireWaitContext.Provider value={{ showFireWait, setShowFireWait }}>
      {children}
      {showFireWait && (
        <Box 
        className="fireWait" 
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="background.default"
          position="fixed"
          top={0}
          left={0}
          width="100%"
          zIndex={1300}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" mt={2}>
            אנא המתן, אנו עובדים על הבקשה שלך...
          </Typography>
        </Box>
      )}
    </FireWaitContext.Provider>
  );
}
