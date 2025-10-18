// /app/lecture/[topic]/page.js

"use client"; // Marks this file as a client-side React component in Next.js

// React core imports for component creation, state, and lifecycle hooks
import * as React from "react";
import { useEffect, useState } from "react";

// Material UI components for UI building
import { CardContent, Typography } from "@mui/material";

// Application context import for global state and shared functions
import { AppContext } from "@/app/components/context/AppContext";

// API controller function to fetch AI-generated lecture content
import { getChatCompletion } from "@/app/controller/dataFetch";

// Layout and UI components
import MainLayout from "@/app/layouts/MainLayout"; // Page wrapper with header, footer, and loading state
import GeminiFormattedResponse from "@/app/components/Styling/GeminiFormattedResponse"; // Custom component to display AI response text

// Main Lecture component
export default function Lecture({ params }) {
  // Local state variables
  const [message, setMessage] = useState(""); // Stores the AI-generated lecture content
  const [loading, setLoading] = useState(false); // Tracks if an API call is in progress

  // Destructuring global context values for shared state and UI management
  const {
    contextPreviousMessage, // Stores previous messages to maintain conversation context
    setContextPreviousMessage, // Updates previous messages in context
    SetErrorMessage, // Function to set error messages in global context
    setShowAlert, // Function to trigger alert notifications
    setTextButton, // Updates footer button text
    setShowFooterButton, // Controls visibility of footer button
    level
  } = React.useContext(AppContext);

  // Extracting topic from route parameters
  const { topic } = React.use(params);
  const subject = topic; // Assign topic to a more descriptive variable

  // Prompt object to request an AI-generated lecture
  const prompt = {
    role: "user", // Role indicates this is user input for the AI
    parts: [
      {
        text: `
You are a French teacher.
I am a student at level ${level}.
I want you to teach me about ${subject} in a very simple and concise way.
Write the complete lesson (explanation + example + exercise) in one paragraph of no more than 20 words.
Use simple and clear words appropriate for level ${level}.
`, // Clear instruction for AI to generate a concise and simple lecture
      },
    ],
  };

  /**
   * Fetches the initial lecture from AI for the given topic.
   * Resets the footer button, sets loading state, and processes the response.
   */
  const getLecture = async () => {
    setShowFooterButton(false); // Hide footer button while loading
    setLoading(true); // Show loading spinner

    try {
      const response = await getChatCompletion([prompt]); // Call AI API with initial prompt
      checkResponse(response); // Process the response
      setShowFooterButton(true); // Show footer button after successful fetch
      setTextButton("Explain more"); // Update footer button text to "Explain more"
    } catch (error) {
      console.error(error); // Log error for debugging
      setShowAlert(true); // Show alert in UI
      SetErrorMessage(error); // Set global error message
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  /**
   * Fetches additional content from AI while maintaining conversation context.
   * Ensures the AI provides content related to previous messages.
   */
  const getMoreData = async () => {
    setShowFooterButton(false);
    setLoading(true);

    try {
      const response = await getChatCompletion([
        ...contextPreviousMessage, // Include previous AI responses for context
        {
          role: "user",
          parts: [{ text: `Tell me more about ${subject}` }], // Request more details on the topic
        },
      ]);
      checkResponse(response); // Process response
      setShowFooterButton(true);
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      SetErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Processes AI response and updates local and global state.
   * @param {Object} response - AI API response object
   */
  const checkResponse = (response) => {
    if (response.status === 200) {
      setMessage(response.data.responseModel.parts[0].text); // Store AI-generated lecture
      setContextPreviousMessage([prompt, response.data.responseModel]); // Save conversation context
    } else {
      setShowAlert(true); // Show alert for API errors
      SetErrorMessage(response.data.error); // Store error message
    }
  };

  // Fetch initial lecture on component mount
  useEffect(() => {
    getLecture();
  }, []);

  // JSX Rendering
  return (
    <MainLayout loading={loading} onButtonClick={getMoreData}>
      {/* Render lecture content only if message exists */}
      {message && (
        <CardContent sx={{ mb: 12 }}>
              <Typography component="h3" sx={{ mb: 4, mt: 4, fontSize:"2rem" }}>
                      Read, and Take note :
                    </Typography>
          {/* Display AI-generated lecture with formatted styling */}
          <Typography
            sx={{ mt: 6, fontSize: "16px", textAlign: "left" }}
            variant="p"
            component="span"
          >
            <GeminiFormattedResponse response={message} />
          </Typography>
        </CardContent>
      )}
    </MainLayout>
  );
}
