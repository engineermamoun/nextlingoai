// /app/layouts/MainLayout.js

"use client"; // Marks this file as a client-side React component in Next.js

// -------------------------------
// Imports
// -------------------------------
import * as React from "react"; // React core library for component creation and hooks
import Box from "@mui/material/Box"; // MUI Box component for layout and styling
import CssBaseline from "@mui/material/CssBaseline"; // MUI component to normalize CSS across browsers
import { Alert, Grid, IconButton, Snackbar, Toolbar } from "@mui/material"; // MUI components for alerts, layout, buttons, and toolbar

import SideBar from "../components/SideBar/SideBar"; // Custom sidebar component for navigation
import styles from "./MainLayout.module.css"; // Module CSS for layout-specific styling
import { AppContext } from "../components/context/AppContext"; // App-wide context for shared state and functions
import ToolBar from "../components/ToolBar/ToolBar"; // Custom top toolbar component
import Footer from "../components/Footer/Footer"; // Footer component
import { Close } from "@mui/icons-material"; // Icon for closing alerts
import LoadingUi from "../components/LoadingUi"; // Custom loading component for displaying processing state

// -------------------------------
// MainLayout Component
// -------------------------------
// This component is a reusable layout wrapper for pages, providing:
// - Global MUI styling and layout structure
// - Top toolbar
// - Sidebar navigation
// - Main content area with dynamic loading state
// - Footer
// - Global error alert handling
// Props:
// - children: ReactNode, the main content of the page
// - loading: boolean, indicates whether the page is in a loading state
// - onButtonClick: optional callback for footer button actions
// - window: optional, used for SSR or container targeting
export default function MainLayout(props) {
  // -------------------------------
  // Context and state
  // -------------------------------
  const { drawerWidth, showAlert, setShowAlert, errorMessage } =
    React.useContext(AppContext); // Extract global state for drawer width, alert visibility, and error message

  const { window } = props;
  // Define container for Drawer (optional, useful for SSR or specific window targets)
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    // -------------------------------
    // Root grid container (column layout)
    // -------------------------------
    <Grid
      container
      spacing={0}
      direction="column"
      sx={(theme) => ({
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Box sx={{ display: "flex" }}>
        {/* CssBaseline normalizes browser styles across all components */}
        <CssBaseline />
        {/* Top toolbar */}
        <ToolBar />
        {/* Sidebar navigation */}
        <SideBar />
        {/* -------------------------------
            Main content area
            - Adjusts width based on drawer width
            - Centers content horizontally
            - Displays either loading UI or children
        ------------------------------- */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3, // padding
            width: { sm: `calc(100% - ${drawerWidth}px)` }, // responsive width
            mx: "auto", // horizontal center
            maxWidth: 950, // max width for readability
          }}
        >
          {/* Toolbar spacer to avoid overlapping with fixed AppBar */}
          <Toolbar />
          {props.loading ? (
            // Loading state UI
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <LoadingUi message="Please wait, your request is being processed." />
            </Box>
          ) : (
            // Render page content when not loading
            props.children
          )}
        </Box>
      </Box>

      {/* -------------------------------
          Footer section
          - Fixed at the bottom of layout
          - Receives callback from props     
          -className={styles.footer}
      ------------------------------- */}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        sx={{
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "transparent",
          backgroundImage: "none",
          width: "100%",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Footer onButtonClick={props.onButtonClick} />
      </Box>

      {/* -------------------------------
          Global error alert
          - Displays at the bottom of the page
          - Auto hides after 5 second
          - Allows manual close via icon
      ------------------------------- */}
      {showAlert && (
        <Snackbar open={showAlert} autoHideDuration={5000}>
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            {errorMessage}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setShowAlert(false)}
            >
              <Close fontSize="small" />
            </IconButton>
          </Alert>
        </Snackbar>
      )}
    </Grid>
  );
}
