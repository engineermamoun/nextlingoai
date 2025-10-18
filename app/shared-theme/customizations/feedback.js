'use client'; 
// Required directive for Next.js/React to indicate that this file uses client-side features and MUI client APIs

// `alpha` is a utility function from MUI to apply transparency to colors
import { alpha } from '@mui/material/styles';

// Custom color primitives imported from the project theme for consistent design
import { gray, orange } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
// Exporting a single object containing customizations for feedback-related MUI components
export const feedbackCustomizations = {
  
  // Customizations for MUI Alert component
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10, // Rounded corners for better visual aesthetics
        backgroundColor: orange[100], // Light orange background for info/warning alerts
        color: (theme.vars || theme).palette.text.primary, // Ensures readable text color based on theme
        border: `1px solid ${alpha(orange[300], 0.5)}`, // Slightly transparent border for subtle emphasis
        
        // Target the icon inside the Alert component
        '& .MuiAlert-icon': {
          color: orange[500], // Use darker orange to visually highlight the alert icon
        },

        // Dark mode overrides for Alert
        ...theme.applyStyles('dark', {
          backgroundColor: `${alpha(orange[900], 0.5)}`, // Semi-transparent dark background for dark theme
          border: `1px solid ${alpha(orange[800], 0.5)}`, // Darker border to maintain contrast
        }),
      }),
    },
  },

  // Customizations for MUI Dialog component
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Target the inner paper element of the Dialog to apply rounded corners and border
        '& .MuiDialog-paper': {
          borderRadius: '10px', // Consistent rounded corners with other UI elements
          border: '1px solid',  // Apply subtle border
          borderColor: (theme.vars || theme).palette.divider, // Use theme divider color for consistent styling
        },
      }),
    },
  },

  // Customizations for MUI LinearProgress component
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,           // Slightly thicker progress bar for better visibility
        borderRadius: 8,     // Rounded ends for a modern look
        backgroundColor: gray[200], // Light gray background for inactive portion of the bar
        
        // Dark mode overrides for LinearProgress
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800], // Darker background to maintain visibility in dark mode
        }),
      }),
    },
  },
};
