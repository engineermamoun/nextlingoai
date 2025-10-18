// /app/conversation/[topic]/page.js

"use client"; // Indicates this is a client-side component in Next.js

// React core library imports for component creation, state management, and lifecycle hooks
import * as React from "react";
import { useEffect, useState } from "react";

// Material UI component imports for UI building
import {
  Box, // Generic container component with styling support
  Button, // Button UI component
  CardContent, // Card content wrapper
  IconButton, // Icon button for clickable icons
  Typography, // Text component for consistent typography
} from "@mui/material";

// Importing the application-wide context for global state management
import { AppContext } from "@/app/components/context/AppContext";

// API controller functions for interacting with OpenAI or backend services
import {
  getChatCompletion, // Fetches a chat completion response from the AI
  getTextCompetion, // Fetches a text completion / evaluation response from the AI
  getTranscription, // Sends audio to backend/AI for speech-to-text transcription
} from "@/app/controller/dataFetch";

// Layout and UI components
import MainLayout from "@/app/layouts/MainLayout"; // Main page layout wrapper
import GeminiFormattedResponse from "@/app/components/Styling/GeminiFormattedResponse"; // Custom component to display AI responses
import { useReactMediaRecorder } from "react-media-recorder"; // Hook for handling audio recording
import { Mic, StopCircle } from "@mui/icons-material"; // Icons for microphone and stop recording
import LoadingUi from "@/app/components/LoadingUi"; // Component to show a loading spinner with message

// Main component for the lecture page
export default function Lecture({ params }) {
  // Local state variables for UI and data management
  const [message, setMessage] = useState(""); // Stores the AI-generated sentence for the user to read
  const [loading, setLoading] = useState(false); // Tracks if a network/API call is in progress
  const [sentence, setSentence] = useState(""); // Stores user's spoken sentence after transcription
  const [assistanceAnswer, setAssistanceAnswer] = useState(""); // Stores AI feedback on user's pronunciation
  const [transcriptionLoading, setTranscriptionLoading] = useState(false); // Tracks transcription process loading

  // Hook from react-media-recorder for audio recording functionality
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true }); // Configured for audio-only recording

  // Destructuring global context values for state and UI management
  const {
    contextPreviousMessage, // Stores previous AI conversation messages for context
    setContextPreviousMessage, // Updates the previous messages
    SetErrorMessage, // Sets the error message in global context
    setShowAlert, // Triggers alert popup in UI
    setTextButton, // Updates the footer button text
    setShowFooterButton, // Controls visibility of the footer button
    level,
  } = React.useContext(AppContext);

  // Extracting the topic from the route parameters
  const { topic } = React.use(params);
  const subject = topic; // Assign topic to a subject variable for clarity

  // Initial prompt object sent to the AI for generating a sentence
  const prompt = {
    role: "user", // Role indicating this is the user's input
    parts: [
      {
        text: ` give me a simple engish sentence that contianes the ${subject}. the sentence must be in english.Do **not** add any explanations, comments, or extra words before or after.`, // Clear instruction for AI
      },
    ],
  };

  /**
   * Fetches the initial AI-generated sentence for the given topic.
   * Resets previous AI feedback, clears audio recording, and sets loading states.
   */
  const getSentence = async () => {
    setAssistanceAnswer(""); // Reset assistance message
    setShowFooterButton(false); // Hide footer button while fetching
    clearBlobUrl(); // Clear any previous audio recordings
    setLoading(true); // Show loading indicator

    try {
      const response = await getChatCompletion([prompt]); // Call AI API
      checkResponse(response, "question"); // Process and validate AI response
      setShowFooterButton(true); // Show footer button after successful fetch
      setTextButton("Give me a new sentence"); // Update button text to "Give me a new sentence"
    } catch (error) {
      console.error(error);
      setShowAlert(true); // Show error alert in UI
      SetErrorMessage(error); // Set global error message
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  /**
   * Fetches a new sentence from AI while maintaining conversation context.
   * This allows the AI to provide related sentences rather than resetting the topic.
   */
  const getNewSentence = async () => {
    setAssistanceAnswer("");
    setShowFooterButton(false);
    clearBlobUrl();
    setLoading(true);

    try {
      const response = await getChatCompletion([
        ...contextPreviousMessage, // Include previous conversation messages
        {
          role: "user",
          parts: [
            {
              text: `Give me a new sentence about ${subject}. i am frensh student in ${level} level`,
            },
          ], // Request a new sentence on the same topic
        },
      ]);
      checkResponse(response, "question");
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
   * Validates AI responses and updates state accordingly.
   * @param {Object} response - Response object returned from AI API.
   * @param {string} messageType - Type of message, "question" or "assistance".
   */
  const checkResponse = (response, messageType) => {
    if (response.status === 200) {
      // Depending on type, update either the main message or the assistance answer
      if (messageType === "question") {
        setMessage(response.data.responseModel.parts[0].text);
      } else {
        setAssistanceAnswer(response.data.responseModel.parts[0].text);
      }

      // Store the prompt and response for context in subsequent AI calls
      setContextPreviousMessage([prompt, response.data.responseModel]);
    } else {
      // Handle API error
      setShowAlert(true);
      SetErrorMessage(response.data.error);
    }
  };

  /**
   * Sends user's spoken sentence to AI for validation and feedback.
   * AI checks correctness and provides detailed assistance.
   * @param {string} confirmSentence - The user's spoken sentence to check.
   */
  const getConfirmSentence = async (confirmSentence) => {
    const prompt = ` أكمل لي النص التالي والذي يحاول المستخدم من خلاله التأكد من أن جمله متطابقة مع الحاسوب
        Computer: I study English every day to improve my language skills
        User: I study English every day to improve my language skills
        Assistent: جملة متطابقة تمامًا، أحسنت
        Computer: The sun rises in the east and sets in the west
        User: The sun rise in the east and set in the west
        Assistent: هنالك خطأ في الجملة حيث أنك لم تلفظ الحرف s في كلمة rises و كلمة sets
        Computer: Water boils at 100 degrees Celsius
        User: vater bols at 100 degrees Clsius
        Assistent: لديك خطأ في لفظ Water و boils و Celsius
        Computer: ${message}
        User: ${confirmSentence}
        Assistent:`;

    try {
      const response = await getTextCompetion(prompt);

      if (response.status === 200) {
        setAssistanceAnswer(response.data.message); // Show AI's feedback
      } else {
        setShowAlert(true);
        SetErrorMessage(response.data.error);
      }
    } catch (error) {
      setShowAlert(true);
      SetErrorMessage(response.data.error);
    }
  };

  // Automatically fetch the initial sentence when the component mounts
  useEffect(() => {
    getSentence();
  }, []);

  /**
   * Sends recorded audio to transcription API.
   * Updates the transcribed sentence and triggers AI validation.
   */
  const fetchText = async () => {
    setTranscriptionLoading(true); // Show transcription loading indicator
    try {
      const response = await getTranscription(mediaBlobUrl);

      if (response.status === 200) {
        setSentence(response.data.message); // Store transcribed sentence
        getConfirmSentence(response.data.message); // Validate sentence with AI
      } else {
        setShowAlert(true);
        SetErrorMessage(response.data.error);
      }
    } catch (error) {
      setShowAlert(true);
      SetErrorMessage(response.data.error);
    } finally {
      setTranscriptionLoading(false); // Hide loading indicator
    }
  };

  // JSX Rendering
  return (
    <MainLayout loading={loading} onButtonClick={getNewSentence}>
      {/* Render only if message exists */}
      {message && (
        <CardContent sx={{ mb: 12, textAlign: "center" }}>
          {/* Prompt user to read the sentence */}
          <Typography component="h3" sx={{ mb: 4, mt: 4, fontSize: "2rem" }}>
            Try reading this sentence :{" "}
          </Typography>

          {/* Display AI-generated sentence in formatted style */}
          <Typography
            sx={{ mt: 6, fontSize: "16px", textAlign: "left" }}
            variant="p"
            component="span"
          >
            <GeminiFormattedResponse response={message} />
          </Typography>

          {/* Audio recording and transcription UI */}
          <Box component="div" sx={{ mt: 5 }}>
            {status == "recording" ? (
              <IconButton onClick={() => stopRecording()}>
                <StopCircle /> {/* Stop recording icon */}
              </IconButton>
            ) : (
              <IconButton onClick={() => startRecording()}>
                <Mic /> {/* Start recording icon */}
              </IconButton>
            )}

            {/* Display audio player and transcription check button */}
            {mediaBlobUrl && (
              <Box component="div" sx={{ mt: 10 }}>
                <audio src={mediaBlobUrl} controls autoPlay />
                <Box component="div" sx={{ mt: 2 }}>
                  {transcriptionLoading ? (
                    <LoadingUi message="Please wait, the verification is in progress" />
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={fetchText}
                    >
                      check the sentence
                    </Button>
                  )}
                </Box>
              </Box>
            )}

            {/* Display AI assistance feedback and transcribed sentence */}
            {assistanceAnswer && (
              <Box component="div" sx={{ mt: 5 }}>
                <Typography component="p">{assistanceAnswer}</Typography>
                <Typography component="p">
                  The sentence you pronounced
                </Typography>
                <Typography component="p">{sentence}</Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      )}
    </MainLayout>
  );
}
