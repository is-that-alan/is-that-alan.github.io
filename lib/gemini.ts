import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function callGemini(prompt: string, onChunk: (chunk: string) => void) {
  try {
    const result = await gemini.generateContentStream(prompt);
    for await (const chunk of result.stream) {
      onChunk(chunk.text());
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini.");
  }
}
