import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  throw new Error('Google API key is not set in environment variables');
}

export const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: GOOGLE_API_KEY
});