// /app/api/speech-to-text/route.js

// -------------------------------
// Imports
// -------------------------------
import { ApiError, createPartFromUri, GoogleGenAI } from "@google/genai";
// ApiError: Exception class for handling Gemini API-specific errors.
// createPartFromUri: Utility function to create a reference part for uploaded files.
// GoogleGenAI: Main Gemini AI client for model interaction, file uploads, and content generation.

import { NextResponse } from "next/server";
// NextResponse: Next.js utility to build structured HTTP responses from API routes.

// -------------------------------
// Helper Function: convertToBuffer
// -------------------------------
/**
 * Converts a ReadableStream (from uploaded audio file) into a Buffer.
 * This is required because the Gemini SDK expects file data as a Blob or Buffer.
 *
 * @param {File} file - Uploaded audio file object from FormData.
 * @returns {Promise<Buffer>} - Resolves to a Buffer containing the file's binary data.
 */
async function convertToBuffer(file) {
  const stream = file.stream(); // Access the ReadableStream from the uploaded File object
  const chunks = []; // Array to accumulate stream chunks

  // Iterate asynchronously over the stream and store chunks
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  // Concatenate all chunks into a single Buffer
  const buffer = Buffer.concat(chunks);
  return buffer;
}

// -------------------------------
// POST Handler: Audio Transcription
// -------------------------------
/**
 * Handles POST requests to transcribe audio files into text using Gemini AI.
 * Workflow:
 * 1. Extract audio file from FormData request body.
 * 2. Convert audio to Buffer and prepare it for Gemini file upload.
 * 3. Upload the audio file to Gemini File API.
 * 4. Generate a transcription using Gemini 2.5 Flash model.
 * 5. Return the transcript as JSON.
 * 6. Clean up uploaded file from Gemini storage.
 *
 * @param {Request} request - Incoming Next.js request object containing FormData with audio file.
 * @returns {NextResponse} - JSON response containing either the transcript or an error message.
 */
export async function POST(request) {
  // Initialize Gemini AI client (reads API key from environment variables)
  const ai = new GoogleGenAI({});

  // User-facing instruction for transcription
  const prompt =
    "Generate a full and accurate transcript of the speech in this audio file.";

  // -------------------------------
  // Step 0: Extract uploaded audio file
  // -------------------------------
  const formData = await request.formData();
  const audio_file = formData.get("file");

  // Validate existence of audio file
  if (!audio_file) {
    return NextResponse.json(
      { error: "No file found under the 'file' field." },
      { status: 400 }
    );
  }

  let uploadedFile = null; // Tracks uploaded file for cleanup

  try {
    // -------------------------------
    // Step 1: Convert audio stream to Buffer
    // -------------------------------
    const audioBuffer = await convertToBuffer(audio_file);

    // -------------------------------
    // Step 2: Determine MIME type
    // -------------------------------
    const mimeType = audio_file.type || "audio/mp3";

    // -------------------------------
    // Step 3: Prepare Blob for Gemini SDK
    // -------------------------------
    const fileToUpload = new Blob([audioBuffer], { type: mimeType });
    fileToUpload.name = audio_file.name || "uploaded_audio";

    // -------------------------------
    // Step 4: Upload audio to Gemini File API
    // -------------------------------
    uploadedFile = await ai.files.upload({
      file: fileToUpload,
      config: {
        mimeType: mimeType,
        displayName: audio_file.name || "uploaded_audio",
      },
    });

    // -------------------------------
    // Step 5: Create a Part reference from uploaded file URI
    // -------------------------------
    const audioPart = createPartFromUri(
      uploadedFile.uri,
      uploadedFile.mimeType
    );

    // -------------------------------
    // Step 6: Generate transcription via Gemini model
    // -------------------------------
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [audioPart, { text: prompt }],
        },
      ],
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        systemInstruction:
          "You are a helpful assistant. Your sole task is to provide a transcript of the audio provided by the user. Do not add any conversational text.  You must answer only with english",
      },
    });

    // -------------------------------
    // Step 7: Extract transcription text
    // -------------------------------
    const generatedText = response.text;

    // -------------------------------
    // Step 8: Return transcription as JSON
    // -------------------------------
    return NextResponse.json({ message: generatedText });
  } catch (error) {
    console.error("Gemini API Error:", error);

    // -------------------------------
    // API-specific error handling
    // -------------------------------
    if (error instanceof ApiError) {
      console.error(
        `API Error Status: ${error.status}, Message: ${error.message}`
      );

      let errorMessage = "An error occurred with the AI service.";
      let status = 500;

      // Map Gemini API error status codes to user-friendly messages
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

      return NextResponse.json({ error: errorMessage }, { status });
    }

    // General error handling (network failures, unexpected errors)
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  } finally {
    // -------------------------------
    // Cleanup uploaded file from Gemini storage
    // -------------------------------
    if (uploadedFile) {
      await ai.files
        .delete({ name: uploadedFile.name })
        .catch((e) => console.error("File cleanup failed:", e));
    }
  }
}
