// /app/api/create-text-completion/route.js

// -------------------------------
// Imports
// -------------------------------
import { ApiError, GoogleGenAI } from "@google/genai";
// ApiError: Exception class to handle errors returned specifically by Gemini API.
// GoogleGenAI: Main client for interacting with Gemini AI models, including text generation and corrections.

import { NextResponse } from "next/server";
// NextResponse: Next.js utility for constructing structured HTTP responses in API routes.

// -------------------------------
// POST Handler: Text Completion / Grammar Correction
// -------------------------------
/**
 * Handles POST requests to generate a grammatically correct and polished version of the user's input.
 * Workflow:
 * 1. Parse incoming JSON request body for the 'message' field.
 * 2. Validate that the message content exists.
 * 3. Call Gemini AI's generateContent API with a system instruction to perform grammar correction.
 * 4. Return the polished text as JSON.
 * 5. Catch and handle errors, providing structured responses for API or general errors.
 *
 * @param {Request} request - Incoming Next.js request object containing JSON with 'message'.
 * @returns {NextResponse} - JSON response containing corrected text or error message.
 */
export async function POST(request) {
  // -------------------------------
  // Step 0: Initialize Gemini AI client
  // -------------------------------
  // Reads API key and environment configuration from environment variables automatically
  const ai = new GoogleGenAI({});

  // -------------------------------
  // Step 1: Parse request body
  // -------------------------------
  const body = await request.json();
  const messagecontent = body.message;

  // -------------------------------
  // Step 2: Validate message content
  // -------------------------------
  if (!messagecontent) {
    // Return 400 Bad Request if the message is missing
    return NextResponse.json({ error: "Message content is missing." });
  }

  try {
    // -------------------------------
    // Step 3: Generate corrected text using Gemini AI
    // -------------------------------
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Using Gemini's 2.5 Flash model for fast and accurate text processing
      contents: messagecontent, // Pass the user input directly to the AI
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables additional reasoning/thinking to ensure direct output
        },
        systemInstruction:
          "You are a clean grammar and spelling checker. Your only output must be the grammatically correct and polished version of the user's input. Do not include greetings, explanations, or any conversational text.",
      },
    });

    // -------------------------------
    // Step 4: Extract generated text from AI response
    // -------------------------------
    const generatedText = response.text;

    // -------------------------------
    // Step 5: Return corrected text to client
    // -------------------------------
    return NextResponse.json({ message: generatedText });
  } catch (error) {
    // -------------------------------
    // Step 6: Error Handling
    // -------------------------------
    console.error("Gemini API Error:", error);

    // Handle Gemini-specific API errors
    if (error instanceof ApiError) {
      // Log structured error for debugging
      console.error(
        `API Error Status: ${error.status}, Message: ${error.message}`
      );

      let errorMessage = "An error occurred with the AI service.";
      let status = 500;

      // Map API error status codes to user-friendly messages
      if (error.status === 400) {
        errorMessage = "Invalid request or malformed data sent to the AI.";
        status = 400;
      } else if (error.status === 403) {
        errorMessage =
          "Permission denied. Check your API key or billing setup.";
        status = 403;
      } else if (error.status === 429) {
        errorMessage = "Rate limit exceeded. Please try again shortly.";
        status = 429;
      }

      // Return structured error response
      return NextResponse.json({ error: errorMessage }, { status });
    }

    // Handle non-API/general errors (e.g., network failure, JSON parse error)
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
