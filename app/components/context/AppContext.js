// /app/components/context/AppContext.js

// -------------------------------
// Imports
// -------------------------------
import { createContext, useState } from "react";
// createContext: Used to create a global context object for sharing state across multiple components.
// useState: React hook for managing local state within a functional component.

// -------------------------------
// AppContext
// -------------------------------
// Purpose:
// - Provides a centralized context for sharing application-wide state,
//   such as UI toggles, messages, user levels, and alerts.
// - Avoids prop drilling by allowing nested components to access and update state.
// Usage:
// - Components can use `useContext(AppContext)` to access any provided values.
export const AppContext = createContext();

// -------------------------------
// AppProvider Component
// -------------------------------
// Purpose:
// - Wraps the entire app (or part of the app) to provide global state via AppContext.
// - Encapsulates multiple pieces of state related to UI, messaging, and user interaction.
// Inputs:
// - children: React nodes that will have access to the context values.
// Outputs:
// - Renders children with AppContext.Provider wrapping them.
// Side Effects:
// - Provides state setters that allow any nested component to update global state.
export const AppProvider = ({ children }) => {
  // -------------------------------
  // UI State
  // -------------------------------
  const [mobileOpen, setMobileOpen] = useState(false);
  // Tracks whether the mobile sidebar drawer is open (true) or closed (false).

  const drawerWidth = 370;
  // Fixed width of the sidebar drawer, used for layout calculations in other components.

  // -------------------------------
  // Messaging State
  // -------------------------------
  const [messageValue, setMessageValue] = useState("");
  // Stores the current message typed by the user in the footer input field.

  const [contextPreviousMessage, setContextPreviousMessage] = useState([]);
  // Stores an array of previous messages in chat context to maintain conversation history.

  // -------------------------------
  // Alert & Error State
  // -------------------------------
  const [showAlert, setShowAlert] = useState(false);
  // Boolean flag to control visibility of error or informational alerts.

  const [errorMessage, SetErrorMessage] = useState("");
  // Stores the message content to display inside an alert.

  // -------------------------------
  // Footer Button & Level State
  // -------------------------------
  const [level, setLevel] = useState("A1");
  // Tracks the user-selected level (A1, A2, A3) for language lessons.

  const [textButton, setTextButton] = useState("");
  // Stores the label text for the footer button, allowing dynamic changes.

  const [showFooterButton, setShowFooterButton] = useState(false);
  // Boolean flag to control visibility of the footer button.

  const [showlandingpage, setShowlandingpage] = useState(true);

  // -------------------------------
  // Context Provider
  // -------------------------------
  // Purpose:
  // - Provides all state variables and setters to child components.
  // - Ensures consistent and centralized state management across the app.
  return (
    <AppContext.Provider
      value={{
        mobileOpen,
        setMobileOpen,
        drawerWidth,
        messageValue,
        setMessageValue,
        contextPreviousMessage,
        setContextPreviousMessage,
        showAlert,
        setShowAlert,
        errorMessage,
        SetErrorMessage,
        textButton,
        setTextButton,
        showFooterButton,
        setShowFooterButton,
        level,
        setLevel,
        showlandingpage,
        setShowlandingpage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
