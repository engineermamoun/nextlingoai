// /app/components/Footer/Footer.js
"use client";

// -------------------------------
// Imports
// -------------------------------
import * as React from "react"; // React core library for state management and component rendering
import { AppContext } from "../context/AppContext"; // Global app context to share state across components
import { IconButton, TextField, Box, Button, Typography } from "@mui/material"; // MUI components for UI elements
import SendIcon from "@mui/icons-material/Send"; // Send icon for message submission
import TelegramIcon from "@mui/icons-material/Telegram";
import styles from "./footer.module.css"; // CSS module for component-specific styling
import { useRouter } from "next/navigation"; // Next.js hook for programmatic navigation

// -------------------------------
// Footer Component
// -------------------------------
// Purpose:
// - Renders the footer of the application with an input field for user messages and a send button
// - Optionally displays a customizable button above the message input
// Inputs:
// - props.onButtonClick: callback function executed when the optional footer button is clicked
// Outputs:
// - JSX rendering the footer layout, input form, send icon, and optional button
// Side Effects:
// - Updates global context with typed messages
// - Navigates to the home page on message submission
export default function Footer(props) {
  // Extract relevant values from AppContext
  const {
    drawerWidth, // Width of the sidebar, used to adjust footer width
    setMessageValue, // Function to set the global message value for chat interactions
    textButton, // Label text for the optional footer button
    showFooterButton, // Boolean flag to control visibility of the optional button
  } = React.useContext(AppContext);

  // Local state for controlling the value typed by the user in the input field
  const [typedMessage, setTypedMessage] = React.useState("");

  // Next.js router for programmatic navigation
  const router = useRouter();

  // -------------------------------
  // handleChange Function
  // -------------------------------
  // Purpose:
  // - Handles form submission or send icon click
  // - Updates the global message value, navigates to home, and clears the input
  // Input:
  // - e: event object from form submission or button click
  // Output: none (side effects only)
  // Side Effects:
  // - Updates global message via setMessageValue
  // - Navigates to home page
  // - Resets local typedMessage state
  const handleChange = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setMessageValue(typedMessage); // Set the global context message
    router.push("../"); // Navigate to home page or main chat screen
    setTypedMessage(""); // Clear the local input field
  };

  return (
    <Box
      component="footer"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`, // Adjust footer width dynamically based on sidebar
        justifyContent: "center", // Center footer content horizontally
        pb: 3, // Padding at the bottom
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0), #fcfcfc 65%)", // Gradient for subtle UI effect
      }}
      className={styles.footerBox} // Apply custom CSS styles
    >
      {/* Optional button displayed conditionally above the message input */}
      {showFooterButton && (
        // Render dynamic button label
        <Button
          variant="outlined"
          sx={{
            display: "block",
            mx: "auto", // Center horizontally
            mb: 1, // Margin-bottom
            backgroundColor: "white", // Button background
          }}
          onClick={props.onButtonClick} // Execute callback when clicked
        >
          {textButton}
        </Button>
      )}

      {/* Message input form */}
      <form className={styles.form} onSubmit={(e) => handleChange(e)}>
        {/* Input field for typing user message */}
        <TextField
          value={typedMessage} // Controlled input value
          placeholder="Ask anything "
          onChange={(e) => setTypedMessage(e.target.value)} // Update local state on change
          fullWidth // Expand to full width of parent
          label="" // Input label
            sx={{
                // padding: 1,
                "&::placeholder": {
                  color: "text.primary", // your custom color
                  opacity: 1, // ensure the color shows fully
                },
                // For better browser support:
                "& input::placeholder": {
                  color: "text.secondary",
                  opacity: 1,
                },
              }}
          className={styles.input} // Apply CSS module styling
        />

        {/* Send button as an icon */}
        <IconButton
          aria-label="send"
          size="small"
          className={styles.sendIcon}
          onClick={handleChange} // Trigger the same handler as form submission
        >
          <TelegramIcon /> {/* Send icon displayed inside the button */}
        </IconButton>
      </form>
    </Box>
  );
}
