import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const ai = new GoogleGenAI({});
  const body = await request.json();
  const { message, chatHistory } = body;

  const newChat = {
    role: "user",
    parts: [{ text: message }],
  };
  const fullconversation = [...chatHistory, newChat];
  if (!message) {
    return NextResponse.json({ error: "Message content is missing." });
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullconversation,
      config: {
        systemInstruction:
          "You are an English teacher. your name is nextlingoai",
      },
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });
    const responseModel = {
      role: "model",
      parts: [{ text: response.text }],
    };

    return NextResponse.json({ responseModel });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a structured error response
    return NextResponse.json(
      { error: "Failed to generate content." },
      { status: 500 }
    );
  }
}

// {
//   "message": "what did i tell you my name is ? and where i live",
//   "chatHistory": [
//     {
//       "role": "user",
//       "parts": [
//         {
//           "text": "hello please from now on call me holidor and live in uk"
//         }
//       ]
//     },
//     {
//       "role": "model",
//       "parts": [
//         {
//           "text": "Great to meet you mamoun. What would you like to know?"
//         }
//       ]
//     }
//   ]
// }
