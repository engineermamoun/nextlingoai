import { ApiError, createPartFromUri, GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

/** * Converts a ReadableStream (from uploaded audio file) into a Buffer.
 *  @param {File} file - The uploaded audio file object from FormData.
 *  @returns {Promise<Buffer>} - A Buffer representation of the file contents. */
async function convertToBuffer(file) {
  const stream = file.stream();
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  return buffer;
}
/** * Handles the POST request for audio transcription.
 *  The route expects a 'file' field in the FormData body containing an audio file.
 *  Workflow:
 *  1. Converts uploaded audio into a Buffer.
 *  2. Uploads the audio to Gemini’s File API.
 *  3. Generates a transcription using Gemini 2.5 Flash.
 *  4. Returns the transcript as JSON.
 *  5. Cleans up uploaded files from Gemini’s storage. */
export async function POST(request) {
  const ai = new GoogleGenAI({}); // Initialize Gemini AI client (reads API key from environment)
  // Text instruction sent to the model
  const prompt =
    "Generate a full and accurate transcript of the speech in this audio file.";
  // Extract uploaded audio file from the incoming request
  const formData = await request.formData();
  const audio_file = formData.get("file");
  // Validate file existence
  if (!audio_file) {
    return NextResponse.json(
      { error: "No file found under the 'file' field." },
      { status: 400 }
    );
  }

  let uploadedFile = null;
  try {
    // STEP 1: Convert uploaded audio stream to Buffer
    const audioBuffer = await convertToBuffer(audio_file);
    // STEP 2: Determine MIME type (default to MP3 if not specified)
    const mimeType = audio_file.type || "audio/mp3";
    // STEP 3: Convert Buffer to Blob — required by Gemini SDK to include file size metadata
    const fileToUpload = new Blob([audioBuffer], { type: mimeType });
    fileToUpload.name = audio_file.name || "uploaded_audio";
    // STEP 4: Upload audio Blob to Gemini’s File API
    uploadedFile = await ai.files.upload({
      file: fileToUpload, // Pass the Buffer
      config: {
        mimeType: mimeType,
        displayName: audio_file.name || "uploaded_audio",
      },
    });
    // STEP 5: Create a reference Part for the uploaded file using its URI
    const audioPart = createPartFromUri(
      uploadedFile.uri,
      uploadedFile.mimeType
    );
    // STEP 6: Call the Gemini model with both audio reference and prompt
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // The contents now contain the audio reference and the prompt
      contents: [{ role: "user", parts: [audioPart, { text: prompt }] }],
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
        // IMPORTANT: The system instruction must align with the prompt!
        systemInstruction:
          "You are a helpful assistant. Your sole task is to provide a transcript of the audio provided by the user. Do not add any conversational text.",
      },
    });
    // STEP 7: Extract the transcription text
    const generatedText = response.text;
    // STEP 8: Return the transcript as JSON
    return NextResponse.json({ message: generatedText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a structured error response

    // 1. Check for the specific API Error type
    if (error instanceof ApiError) {
      // Log structured error info for debugging
      console.error(
        `API Error Status: ${error.status}, Message: ${error.message}`
      );
      // Determine user-friendly status and message based on API status
      let errorMessage = "An error occurred with the AI service.";
      let status = 500;

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

      // Return the structured error response
      return NextResponse.json({ error: errorMessage }, { status });
    }

    // 2. Handle non-API/general errors (e.g., network failure, JSON parse error)
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  } finally {
    // CRUCIAL: Always clean up the uploaded file resource
    if (uploadedFile) {
      // Use uploadedFile.name (the files API resource name) for deletion
      await ai.files
        .delete({ name: uploadedFile.name })
        .catch((e) => console.error("File cleanup failed:", e));
    }
  }
}
