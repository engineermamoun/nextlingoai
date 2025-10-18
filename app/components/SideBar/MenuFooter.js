// /app/components/SideBar/MenuFooter.js

// -------------------------------
// Imports
// -------------------------------
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
// Box: Generic container component for layout and spacing
// FormControl: Wraps input components to provide structure, labels, and state management
// InputLabel: Label for input fields such as Select
// MenuItem: Represents selectable options in a Select dropdown
// Select: Dropdown component for choosing one option from multiple
// Typography: For rendering styled text elements

import React, { useContext } from "react";
// React import to define functional components and use hooks
// useContext: Hook to consume context values from AppContext

import styles from "./SideBar.module.css";
// CSS module for styling the footer with scoped class names

import { AppContext } from "../context/AppContext";
// Context providing application-wide state, such as user-selected level

// -------------------------------
// MenuFooter Component
// -------------------------------
// Purpose:
// - Render the bottom section of the sidebar containing a level selector, informational text, copyright, and logo
// Inputs:
// - Consumes `level` and `setLevel` from AppContext
// Outputs:
// - JSX rendering the footer UI with select dropdown, text, and logo
// Side Effects:
// - Updates the global `level` state when a user selects a different option
export default function MenuFooter() {
  // Get current year dynamically for copyright display
  const date = new Date().getFullYear();

  return (
    // Footer container with scoped CSS styling
    <Box component="footer" className={styles.menufooter}>
      {/* Informational text */}
      <Typography component="span" noWrap>
        this app uses Gemini api{" "}
        {/* Frensh text meaning "Gemini uses technology" */}
      </Typography>
      {/* <Typography component="p" noWrap>
        جميع الحقوق محفوظة @
        <Typography component="span">{date}</Typography> 
      </Typography> */}
      {/* Dynamically rendered current year */}
      {/* Application logo */}
    </Box>
  );
}
