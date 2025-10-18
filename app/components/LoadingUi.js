// /app/components/LoadingUi.js
"use client";

// -------------------------------
// Imports
// -------------------------------
import * as React from "react"; 
// React core library for building UI components and using JSX

import { Box, CircularProgress, Typography } from "@mui/material"; 


// -------------------------------
// LoadingUi Component
// -------------------------------
// Purpose:
// - Provides a reusable UI component to indicate loading state
// - Displays a spinner and an optional message
// Input (props):
// - message: string, optional message to show below the spinner
// Output:
// - Renders a centered loading spinner with message
// Side Effects:
// - None (purely presentational)
// Notes:
// - Uses MUI Box with flex styling for vertical centering
// - Can be used in any part of the app where asynchronous actions occur
const LoadingUi = (props) => {
  const { message } = props; // Extract message from props

  return (
    <Box
      component="div"
      sx={{
        display: "flex",           // Enable flex layout
        flexDirection: "column",   // Stack children vertically
        alignItems: "center",      // Horizontally center the content
        justifyContent: "center",  // Vertically center the content
        // height: "100%",          // Optional: full container height for centering
        textAlign: "center",       // Center-align text
        height:'100vh'
      }}
    >
      {/* Spinner indicating ongoing process */}
      <CircularProgress 
        enableTrackSlot 
        size="3rem"                // Small size for compact display
                     // Margin top for spacing
      />

      {/* Optional message displayed below the spinner */}
      <Typography component="p">
        {message}
      </Typography>
    </Box>
  );
};

// Export component for use in other parts of the application
export default LoadingUi;
