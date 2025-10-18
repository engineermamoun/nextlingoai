// /app/components/ToolBar/ToolBar.js

// -------------------------------
// Imports
// -------------------------------
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import React, { useContext } from "react";
// React core library and useContext hook for accessing context state

import MenuIcon from "@mui/icons-material/Menu";
// Menu icon for the drawer toggle button

import { AppContext } from "../context/AppContext";
// Context provider for shared application state, e.g., drawer open/close state and width

import { useRouter } from "next/navigation";
import SitemarkIcon from "@/app/marketing-page/components/SitemarkIcon";
import ColorModeIconDropdown from "@/app/shared-theme/ColorModeIconDropdown";
// Next.js hook for programmatic navigation

// -------------------------------
// ToolBar Component
// -------------------------------
// Purpose:
// - Render the top AppBar with navigation controls and app title
// - Provide a responsive drawer toggle button for mobile
// - Allow clicking the title to navigate back to the main page
// Input (via context):
// - mobileOpen: boolean indicating if the mobile drawer is open
// - setMobileOpen: function to toggle mobile drawer state
// - drawerWidth: numeric width of the sidebar/drawer
// Output:
// - Renders AppBar with Toolbar, IconButton, and clickable Typography
// Side Effects:
// - Toggles drawer open/close on mobile
// - Navigates to home when title is clicked
export default function ToolBar() {
  // Extract drawer state and width from AppContext
  const { mobileOpen, setMobileOpen, drawerWidth, setShowlandingpage } =
    useContext(AppContext);

  // Next.js router instance for navigation
  const router = useRouter();

  // Destructure level state and setter from context
  const { level, setLevel } = useContext(AppContext);

  // Handler function to update the user's selected level in global context
  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  return (
    <AppBar
      position="fixed" // Fix the AppBar at the top of the viewport
      sx={{
        // On small screens, reduce width by the drawer width to avoid overlap
        // // Apply left margin equal to drawer width for non-mobile screens
        ml: { sm: `${drawerWidth}px` },
        // boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        // Border radius only on bottom corners
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}

  
    >
      {/* <Container maxWidth="lg"> */}
      <Toolbar>
        {/* IconButton to toggle mobile drawer */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => {
            setMobileOpen(!mobileOpen); // Toggle drawer state
          }}
          sx={{ mr: 2, display: { sm: "none" } }} // Hide button on larger screens
        >
          <MenuIcon /> {/* Hamburger menu icon */}
        </IconButton>

        {/* Application title, clickable to navigate home */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          // onClick={() => router.replace("../")} // Navigate to parent/root page
          onClick={() => setShowlandingpage(true)}
          sx={{
            cursor: "pointer", // Show pointer to indicate clickable
            mr: "auto", // Push any subsequent elements to the right
            fontSize: "20px", // Increase font size for visibility
            fontWeight: "bold", // Make the title bold
          }}
        >
          <SitemarkIcon />
        </Typography>

        {/* Level selection dropdown */}
        <FormControl>
          {/* Label shows the current selected level */}
          {/* <InputLabel id="demo-simple-select-label">{level}</InputLabel> */}

          {/* Select component allows user to change their level */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level} // Controlled component reflecting current state
            label="Age" // Label text for accessibility (can be improved)
            onChange={handleChange} // Updates global context when changed
          >
            <MenuItem value={"A1"}>A1</MenuItem>
            <MenuItem value={"A2"}>A2</MenuItem>
            <MenuItem value={"B1"}>B1</MenuItem>
            <MenuItem value={"B2"}>B2</MenuItem>
            <MenuItem value={"C1"}>C1</MenuItem>
            <MenuItem value={"C2"}>C2</MenuItem>
          </Select>
        </FormControl>
        <ColorModeIconDropdown />
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
