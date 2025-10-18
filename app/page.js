// /app/page.js

"use client";
/**
 * Marks this file as a **client-side** component in Next.js.
 * Client components can use React hooks and manage interactive UI behavior.
 */

// -------------------- IMPORTS --------------------

// React core library — provides the foundation for component creation and state management
import * as React from "react";

// Layout wrapper — provides a consistent page structure,
// including header/footer layout and global loading state handling
import MainLayout from "./layouts/MainLayout";

// Material UI (MUI) components for layout and typography
// - CardContent: wrapper for structured card content
// - Typography: text display component with semantic styling
import { CardContent, Typography } from "@mui/material";

// Global application context providing shared state, configuration, and methods
import { AppContext } from "./components/context/AppContext";

// Controller function responsible for communicating with the backend API
// It sends messages to an AI model and returns the generated response
import { getChatCompletion } from "./controller/dataFetch";

// Custom component that formats and renders AI-generated text output
import GeminiFormattedResponse from "./components/Styling/GeminiFormattedResponse";

// Marketing landing page component displayed when `showlandingpage` is true
import MarketingPage from "./marketing-page/MarketingPage";

// Introductory or default first page shown before the user interacts with the AI
import FirstPage from "./components/FirstPage";

// -------------------- MAIN COMPONENT --------------------

/**
 * The main **Home** component serves as the root page for the AI interaction feature.
 * It manages:
 * - Sending user messages to the AI
 * - Displaying AI responses
 * - Controlling global UI states (loading, alerts, etc.)
 */
export default function Home() {
  // -------------------- LOCAL STATE --------------------

  const [message, setMessage] = React.useState("");
  /**
   * Stores the AI-generated message returned from the API.
   * Used for rendering the formatted AI response on the UI.
   */

  const [loading, setLoading] = React.useState(false);
  /**
   * Tracks whether the page or API call is currently loading.
   * Used to display loading spinners or disable UI elements during processing.
   */

  // -------------------- GLOBAL CONTEXT --------------------

  const {
    messageValue, // The user's input message to be sent to the AI
    contextPreviousMessage, // Conversation history (used to preserve context across messages)
    setContextPreviousMessage, // Function to update the conversation history
    setShowAlert, // Triggers an alert display (used for error notifications)
    SetErrorMessage, // Stores the specific error message for global error handling
    setShowFooterButton, // Controls visibility of footer buttons during message send
    showlandingpage, // Determines whether to show the marketing page instead of the AI interface
  } = React.useContext(AppContext);

  // -------------------- CORE FUNCTION --------------------

  /**
   * Asynchronously sends the user's message to the AI service, retrieves the response,
   * and updates both the local and global context.
   *
   * Workflow:
   * 1. Temporarily hides UI buttons and enables loading state.
   * 2. Sends the user's message + conversation history to `getChatCompletion()`.
   * 3. On success, updates global message context and displays the AI's reply.
   * 4. On failure, shows an alert and logs the error.
   *
   * @async
   * @function getAnswer
   * @returns {Promise<void>} - No return value; updates component and context states.
   */
  const getAnswer = async () => {
    setShowFooterButton(false); // Hide footer buttons while waiting for AI response
    setLoading(true); // Activate loading spinner

    try {
      // Build conversation payload including previous messages and the new user input
      const response = await getChatCompletion([
        ...contextPreviousMessage,
        {
          role: "user",
          parts: [
            {
              text: messageValue, // User's latest message content
            },
          ],
        },
      ]);

      // -------------------- SUCCESS RESPONSE --------------------
      if (response.status === 200) {
        // Append both user message and AI response to the conversation history
        setContextPreviousMessage([
          ...contextPreviousMessage,
          {
            role: "user",
            parts: [
              {
                text: messageValue,
              },
            ],
          },
          response.data.responseModel, // AI response model from the backend
        ]);

        // Store AI's text message locally for display
        setMessage(response.data.responseModel.parts[0].text);
      }
      // -------------------- ERROR RESPONSE --------------------
      else {
        setShowAlert(true); // Trigger alert for API-level error
        SetErrorMessage(response.data.error); // Display backend error message
      }
    } catch (error) {
      // -------------------- NETWORK / UNKNOWN ERROR --------------------
      console.error(error); // Log for developer debugging
      setShowAlert(true); // Show alert for user feedback
      SetErrorMessage(error); // Set detailed error message
    } finally {
      setLoading(false); // Reset loading state after operation completes
    }
  };

  // -------------------- SIDE EFFECTS --------------------

  /**
   * Watches for changes in `messageValue` (the user's input).
   * Automatically sends the new message to the AI when it changes.
   * Clears displayed messages if the input becomes empty.
   */
  React.useEffect(() => {
    if (messageValue) {
      getAnswer(); // Trigger AI fetch for new message
    } else {
      setMessage(null); // Clear displayed AI message
    }
  }, [messageValue]); // Dependency: re-run effect whenever messageValue changes

  // -------------------- CONDITIONAL RENDERING --------------------

  // If the landing page flag is active, render the marketing view instead of the chat
  if (showlandingpage) return <MarketingPage />;

  // -------------------- RENDER OUTPUT --------------------
  return (
    <MainLayout loading={loading}>
      {/* Conditional rendering:
          - If no AI message is available, display the introductory FirstPage
          - Otherwise, display the formatted AI-generated response */}
      {!message ? (
        <FirstPage />
      ) : (
        <CardContent sx={{ mb: 12 }}>
          <Typography
            sx={{ mt: 6, fontSize: "16px", textAlign: "left" }}
            variant="p"
            component="span"
          >
            {/* Render formatted AI response text */}
            <GeminiFormattedResponse response={message} />
          </Typography>
        </CardContent>
      )}
    </MainLayout>
  );
}
