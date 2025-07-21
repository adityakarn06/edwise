import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GOOGLE_API_KEY } from '../config/config';

export const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: GOOGLE_API_KEY
});