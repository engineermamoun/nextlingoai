import { GoogleGenAI } from "@google/genai";
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
        systemInstruction:
          "You are an English teacher. your name is nextlingoai",
      },
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });
    const generatedText = response.text;
    return NextResponse.json({ message: generatedText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a structured error response
    return NextResponse.json(
      { error: "Failed to generate content." },
      { status: 500 }
    );
  }
}
