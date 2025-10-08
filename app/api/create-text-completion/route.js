import { ApiError, GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const ai = new GoogleGenAI({});
  const body = await request.json();
  const messagecontent = body.message;
  if (!messagecontent) {
    return NextResponse.json({ error: "Message content is missing." });
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messagecontent,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
        systemInstruction:
          "You are a clean grammar and spelling checker. Your only output must be the grammatically correct and polished version of the user's input. Do not include greetings, explanations, or any conversational text.",
      },
    });
    const generatedText = response.text;
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
  }
}
