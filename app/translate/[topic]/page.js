// /app/translate/[topic]/page.js

"use client"; // Marks this file as a client-side React component in Next.js

// React core imports for state and lifecycle management
import * as React from "react";
import { useEffect, useState } from "react";

// Material UI components for building UI elements
import { Box, Button, CardContent, Input, Typography } from "@mui/material";

// Application context import for shared state and global functions
import { AppContext } from "@/app/components/context/AppContext";

// API controller function for fetching AI-generated content
import { getChatCompletion } from "@/app/controller/dataFetch";

// Layout wrapper providing consistent page structure and loading support
import MainLayout from "@/app/layouts/MainLayout";

// Component for rendering AI responses with custom formatting
import GeminiFormattedResponse from "@/app/components/Styling/GeminiFormattedResponse";

// Loading component to display progress indicators during async operations
import LoadingUi from "@/app/components/LoadingUi";

// Main Lecture component for translating sentences from English to Frensh
export default function Lecture({ params }) {
  // Local state variables
  const [message, setMessage] = useState(""); // Stores the current AI-generated English sentence
  const [loading, setLoading] = useState(false); // Tracks overall page loading state
  const [value, setValue] = useState(""); // Stores the user's attempted translation
  const [assistanceAnswer, setAssistanceAnswer] = useState(""); // Stores AI feedback for the user's translation
  const [translateLoading, setTranslateLoading] = useState(false); // Tracks loading state during translation checking

  // Destructuring context values from global AppContext
  const {
    contextPreviousMessage, // Maintains conversation context for AI
    setContextPreviousMessage, // Updates conversation context
    SetErrorMessage, // Stores global error messages
    setShowAlert, // Displays alert notifications
    setTextButton, // Updates footer button text
    setShowFooterButton, // Controls visibility of footer button
    level,
  } = React.useContext(AppContext);

  // Extract the topic from route params
  const { topic } = React.use(params);
  const subject = topic; // More descriptive variable for the topic

  // Initial AI prompt to generate a simple English sentence containing the topic
  const prompt = {
    role: "user",
    parts: [
      {
        text: `I am frensh student with ${level} level . give me a simple engish sentence that contianes the ${subject}. the sentence must be in english.Do **not** add any explanations, comments, or extra words before or after.`,
      },
    ],
  };

  /**
   * Fetches the initial English sentence from the AI.
   * Resets assistance answer, hides footer button, and sets loading state.
   */
  const getSentence = async () => {
    setAssistanceAnswer(""); // Clear previous AI feedback
    setShowFooterButton(false); // Hide footer button while fetching
    setLoading(true); // Show page-level loading indicator

    try {
      const response = await getChatCompletion([prompt]); // Fetch AI-generated sentence
      checkResponse(response, "question"); // Process AI response
      setShowFooterButton(true); // Show footer button after fetch
      setTextButton("Give me a new sentence"); // Update footer button text
    } catch (error) {
      console.error(error); // Log errors for debugging
      setShowAlert(true); // Show error alert in UI
      SetErrorMessage(error); // Store error globally
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  /**
   * Fetches a new English sentence while maintaining conversation context.
   */
  const getNewSentence = async () => {
    setAssistanceAnswer(""); // Clear previous feedback
    setShowFooterButton(false); // Hide footer button
    setLoading(true); // Show loading indicator

    try {
      const response = await getChatCompletion([
        ...contextPreviousMessage, // Include previous conversation context
        {
          role: "user",
          parts: [{ text: `Give me a new sentence about ${subject}` }], // Request new sentence
        },
      ]);
      checkResponse(response, "question"); // Process AI response
      setShowFooterButton(true); // Show footer button after fetch
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      SetErrorMessage(error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  /**
   * Processes AI responses for either new sentences or translation corrections.
   * Updates local and global context accordingly.
   * @param {Object} response - AI API response object
   * @param {string} messageType - "question" for sentence generation, "answer" for translation check
   */
  const checkResponse = (response, messageType) => {
    if (response.status === 200) {
      if (messageType === "question") {
        setMessage(response.data.responseModel.parts[0].text); // Store AI-generated English sentence
      } else {
        setAssistanceAnswer(response.data.responseModel.parts[0].text); // Store AI feedback for translation
      }
      // Update conversation context to maintain AI continuity
      setContextPreviousMessage([prompt, response.data.responseModel]);
    } else {
      setShowAlert(true); // Show alert for API errors
      SetErrorMessage(response.data.error); // Store error message globally
    }
  };

  /**
   * Checks the user's attempted translation against AI.
   * Provides correction and feedback in Frensh  only.
   */
  const checkAnswer = async () => {
    setAssistanceAnswer(""); // Clear previous feedback
    setShowFooterButton(false); // Hide footer button during checking
    setTranslateLoading(true); // Show translation-specific loading indicator

    try {
      const response = await getChatCompletion([
        ...contextPreviousMessage, // Include previous conversation context
        {
          role: "user",
          parts: [
            {
              text: `i am working on translating this ${message} from english to frensh, and this is my try ${value}, please correct me and if i have done a mistak tell me and correct it .my answer must in english otherwise tell me that is wrong, you must answer me only in english`,
            },
          ],
        },
      ]);
      checkResponse(response, "answer"); // Process AI feedback
      setShowFooterButton(true); // Show footer button after checking
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      SetErrorMessage(error);
    } finally {
      setTranslateLoading(false); // Hide translation loading indicator
      setValue(""); // Clear user's input field
    }
  };

  // Fetch initial sentence on component mount
  useEffect(() => {
    getSentence();
  }, []);

  // JSX rendering
  return (
    <MainLayout loading={loading} onButtonClick={getNewSentence}>
      {/* Render content only if AI sentence exists */}
      {message && (
        <CardContent sx={{ mb: 12, textAlign: "center" }}>
          {/* Instruction for translation */}
          <Typography component="h3" sx={{ mb: 4, mt: 4, fontSize: "2rem" }}>
            Translate this sentence into Frensh:
          </Typography>

          {/* Display AI-generated English sentence */}
          <Typography
            sx={{ mt: 6, fontSize: "16px", textAlign: "left" }}
            variant="p"
            component="span"
          >
            <GeminiFormattedResponse response={message} />
          </Typography>

          {/* User input field and submission button */}
          <Box component="div" sx={{ mt: 5 }}>
            <Input
              placeholder="Translation" // Input placeholder
              sx={{
                padding: 1,
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
              value={value} // Bind to user translation input
              onChange={(e) => setValue(e.target.value)} // Update state on change
            />
            <Button
              variant="contained"
              sx={{ display: "block", mt: 2, mx: "auto" }}
              onClick={checkAnswer} // Trigger translation check
            >
              Check the translation
            </Button>
          </Box>

          {/* Display AI feedback or loading indicator */}
          <Box component="div" sx={{ mt: 3 }}>
            {translateLoading ? (
              <LoadingUi message="Checking the translation now" /> // Show loader while AI checks translation
            ) : (
              assistanceAnswer && (
                <Typography
                  sx={{ mt: 6, fontSize: "16px", textAlign: "left" }}
                  variant="p"
                  component="span"
                >
                  <GeminiFormattedResponse response={assistanceAnswer} />{" "}
                  {/* Show AI-corrected translation */}
                </Typography>
              )
            )}
          </Box>
        </CardContent>
      )}
    </MainLayout>
  );
}
