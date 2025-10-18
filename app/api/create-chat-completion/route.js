// /app/api/create-chat-completion/route.js

// -------------------------------
// Imports
// -------------------------------
import { GoogleGenAI, ApiError } from "@google/genai";
// GoogleGenAI: Main client for interacting with Gemini AI models, including chat and text generation.
// ApiError: Exception class for structured errors returned specifically by the Gemini API.

import { NextResponse } from "next/server";
// NextResponse: Utility from Next.js to create structured HTTP responses in API routes.

// -------------------------------
// POST Handler: Chat Completion
// -------------------------------
/**
 * Handles POST requests to generate AI-based chat responses.
 * Workflow:
 * 1. Parses incoming JSON request body to retrieve 'chatHistory'.
 * 2. Sends the chat history to Gemini AI's generateContent API.
 * 3. Returns a structured model response as JSON.
 * 4. Handles API-specific and general errors with user-friendly messages.
 *
 * @param {Request} request - Incoming Next.js request object containing JSON with 'chatHistory'.
 * @returns {NextResponse} - JSON response containing the AI-generated chat message or error.
 */
export async function POST(request) {
  // -------------------------------
  // Step 0: Initialize Gemini AI client
  // -------------------------------
  // Automatically uses the GOOGLE_API_KEY from environment variables
  const ai = new GoogleGenAI({});

  // -------------------------------
  // Step 1: Parse incoming request body
  // -------------------------------
  const body = await request.json();
  const { chatHistory } = body;
  // chatHistory is expected to be an array of objects following Gemini AI's structured chat format:
  // [
  //   { role: "user", parts: [{ text: "user message" }] },
  //   { role: "model", parts: [{ text: "previous AI response" }] },
  //   ...
  // ]

  try {
    // -------------------------------
    // Step 2: Generate chat response using Gemini AI
    // -------------------------------
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Fast and capable Gemini model for chat interactions
      contents: chatHistory, // Pass the structured chat history
      config: {
        systemInstruction:
          "You are an English teacher. your name is nextlingoai", // Provides context and role for the AI
      },
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disable additional internal reasoning for faster response
        },
      },
    });

    // -------------------------------
    // Step 3: Structure AI response for client
    // -------------------------------
    const responseModel = {
      role: "model", // Denotes this message is from the AI
      parts: [{ text: response.text }], // Extracted text from Gemini API response
    };

    // -------------------------------
    // Step 4: Return AI response as JSON
    // -------------------------------
    return NextResponse.json({ responseModel });
  } catch (error) {
    // -------------------------------
    // Step 5: Error Handling
    // -------------------------------
    console.error("Gemini API Error:", error);

    // Handle Gemini-specific API errors
    if (error instanceof ApiError) {
      console.error(
        `API Error Status: ${error.status}, Message: ${error.message}`
      );

      let errorMessage = "An error occurred with the AI service.";
      let status = 500;

      // Map API error codes to user-friendly messages
      if (error.status === 400) {
        errorMessage = "Invalid request or malformed data sent to the AI.";
        status = 400;
      } else if (error.status === 401) {
        errorMessage =
          "Missing or invalid API key. Please verify your GOOGLE_API_KEY environment variable.";
        status = 401;
      } else if (error.status === 403) {
        errorMessage =
          "Permission denied. Check your API key or billing setup.";
        status = 403;
      } else if (error.status === 429) {
        errorMessage = "Rate limit exceeded. Please try again shortly.";
        status = 429;
      }

      // ✅ Handle cases where the API key is missing before request is sent
      if (
        error.message?.includes("API key") ||
        error.message?.includes("apiKey")
      ) {
        return NextResponse.json(
          {
            error:
              "Missing Google API key. Please set GOOGLE_API_KEY in your environment.",
          },
          { status: 401 }
        );
      }

      // Return structured API error response
      return NextResponse.json({ error: errorMessage }, { status });
    }

    // Handle general or unexpected errors
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

// -------------------------------
// Example chatHistory payload for testing
// -------------------------------
/*
{
  "message": "what did i tell you my name is ? and where i live",
  "chatHistory": [
    {
      "role": "user",
      "parts": [
        {
          "text": "hello please from now on call me holidor and live in uk"
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "Great to meet you mamoun. What would you like to know?"
        }
      ]
    }
  ]
}
*/
