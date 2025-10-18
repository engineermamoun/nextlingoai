// /app/question/[topic]/page.js

"use client"; // Marks this as a client-side React component in Next.js

// Importing global application context for shared state and functions
import { AppContext } from "@/app/components/context/AppContext";

// Component to format and display AI responses
import GeminiFormattedResponse from "@/app/components/Styling/GeminiFormattedResponse";

// API controller function to fetch AI-generated content
import { getChatCompletion } from "@/app/controller/dataFetch";

// Layout wrapper for consistent page structure and loading handling
import MainLayout from "@/app/layouts/MainLayout";

// Material UI components for building UI
import { Box, Button, CardContent, Typography } from "@mui/material";

// React core imports for component creation, state, and lifecycle hooks
import React, { useEffect, useState } from "react";

// Loading component to show progress indicators
import LoadingUi from "@/app/components/LoadingUi";

// Main component for the multiple-choice question page
export default function Page({ params }) {
  // Local state variables
  const [loading, setLoading] = useState(false); // Tracks overall page loading state
  const [message, setMessage] = useState(""); // Stores raw AI-generated question text
  const [answerArray, setAnswerArray] = useState([]); // Stores parsed multiple-choice options
  const [question, setQuestion] = useState(""); // Stores only the main question text
  const [assistantAnswer, setAssistantAnswer] = useState(""); // Stores AI evaluation of user's answer
  const [answerLoading, setAnswerLoading] = useState(false); // Tracks loading state for answer checking
  const [userAnswer, setUserAnswer] = useState(""); // Stores the answer selected by the user

  // Destructuring global context for shared state and functions
  const {
    contextPreviousMessage, // Maintains conversation context for AI
    setContextPreviousMessage, // Updates the conversation context
    SetErrorMessage, // Sets a global error message
    setShowAlert, // Displays alert in UI
    setTextButton, // Updates footer button text
    setShowFooterButton, // Controls footer button visibility
    level, // Current user level for AI question difficulty
  } = React.useContext(AppContext);

  // Extract topic from route params
  const { topic } = React.use(params);
  const subject = topic; // Use a more descriptive variable for the topic

  // Prompt for AI to generate a multiple-choice question
  const prompt = {
    role: "user",
    parts: [
      {
        text: `Please give me one multiple-choice question exercise about ${subject} without an answer so that i can work on solving it. also, consider me an english language student learning the ${subject} section. please put each answer one a separate line and choices should start by capital letter A) , B), C) and D). the questions should be in level ${level} in english.Do **not** add any explanations, comments, or extra words before or after.`,
      },
    ],
  };

  /**
   * Fetches a new AI-generated question.
   * Resets assistant feedback, hides footer button, and updates loading state.
   */
  const getQuestion = async () => {
    setShowFooterButton(false); // Hide footer button while fetching question
    setLoading(true); // Show page-level loading indicator
    setAssistantAnswer(""); // Reset previous assistant feedback

    const response = await getChatCompletion([prompt]); // Fetch AI question
    checkResponse(response, "question"); // Process AI response
    setShowFooterButton(true); // Show footer button after fetch
    setTextButton("Give me a new question"); // Update footer button text
    setLoading(false); // Hide loading indicator
  };

  /**
   * Processes AI responses based on type (question or answer).
   * Updates local and global state accordingly.
   * @param {Object} response - AI API response
   * @param {string} messageType - Either "question" or "answer"
   */
  const checkResponse = (response, messageType) => {
    if (response.status === 200) {
      if (messageType === "question") {
        questionRegex(response.data.responseModel.parts[0].text); // Parse question and options
        setContextPreviousMessage([prompt, response.data.responseModel]); // Save context
      } else {
        setAssistantAnswer(response.data.responseModel.parts[0].text); // Show AI feedback for user's answer
        setContextPreviousMessage([
          ...contextPreviousMessage,
          {
            role: "user",
            parts: [
              {
                text: userAnswer, // Include user's answer in context
              },
            ],
          },
          response.data.responseModel, // Add AI feedback to context
        ]);
      }
    } else {
      setShowAlert(true); // Display alert for errors
      SetErrorMessage(response.data.error); // Store error message globally
    }
  };

  // Fetch initial question when component mounts
  useEffect(() => {
    getQuestion();
  }, []);

  /**
   * Parses AI-generated multiple-choice question.
   * Splits question from options and stores each in separate state variables.
   * @param {string} msg - Raw AI response text
   */
  const questionRegex = (msg) => {
    const regex = /([A-Ea-e]\) |[A-Ea-e]\.)(.*)/g; // Matches lines starting with A), B), C), etc.
    const answerArray = msg.match(regex); // Extract options using regex
    const firstLine = msg.split("\n")[0]; // First line is the main question
    setAnswerArray(answerArray); // Store options array
    setQuestion(firstLine); // Store main question
    setMessage(msg); // Store full raw question
  };

  /**
   * Sends user's selected answer to AI for evaluation.
   * Updates loading state while waiting for response.
   * @param {string} userAnswer - User's selected answer
   */
  const checkAnswer = async (userAnswer) => {
    setAnswerLoading(true); // Show answer-checking loading indicator

    const response = await getChatCompletion([
      ...contextPreviousMessage, // Include previous conversation context
      {
        role: "user",
        parts: [
          {
            text: `Is the answer ${userAnswer} correct for the question ${message}? , you must answer only with english`, // Ask AI if answer is correct
          },
        ],
      },
    ]);

    checkResponse(response, "answer"); // Process AI feedback
    setAnswerLoading(false); // Hide loading indicator
  };

  // JSX rendering
  return (
    <MainLayout loading={loading} onButtonClick={getQuestion}>
      {/* Render question only if it exists */}
      {question && (
        <CardContent sx={{ mb: 12, textAlign: "center" }}>
             <Typography component="h3" sx={{ mb: 4, mt: 4, fontSize: "2rem" }}>
                      Practice Time :
                    </Typography>
          {/* Display the main question in formatted style */}
          <Typography
            sx={{   mt: 6, fontSize: "16px" }}
            variant="h3"
            component="span"
          >
            <GeminiFormattedResponse response={question} />
          </Typography>

          {/* Render multiple-choice options as buttons */}
          {answerArray &&
            answerArray.map((item, index) => {
              return (
                <Button
                  key={index}
                  variant="contained"
                  size="small"
                  sx={{ ml: 2, mt: 2,   }}
                  onClick={() => {
                    setUserAnswer(item); // Store selected answer
                    checkAnswer(item); // Send answer to AI for evaluation
                  }}
                >
                  {item}
                </Button>
              );
            })}

          <Box component="div" sx={{ mt: 3 }}>
            {answerLoading ? (
             <LoadingUi message="Please wait, the correction process is in progress" /> // Show loading while AI checks answer
            ) : (
              assistantAnswer && (
                <Typography
                  sx={{ mt: 6, fontSize: "16px", textAlign: "left" }}
                  variant="p"
                  component="span"
                >
                  <GeminiFormattedResponse response={assistantAnswer} />{" "}
                  {/* Display AI feedback */}
                </Typography>
              )
            )}
          </Box>
        </CardContent>
      )}
    </MainLayout>
  );
}
